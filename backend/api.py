import yaml

from azure.identity import DefaultAzureCredential, get_bearer_token_provider
from fastapi import FastAPI, Request, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from openai import AzureOpenAI
from pydantic import BaseModel
from typing import List, Optional

class ChatRequest(BaseModel):
    conversation: List[dict]  # List of message dictionaries with sender & text
    images: Optional[List[str]]  # List of base64-encoded images or URLs
    
class OpenAIConfig:
    def __init__(self, config: dict):
        self.api_key = config['api_key']
        self.endpoint = config['endpoint']
        self.deployment_name = config['deployment_name']
        self.api_version = config['api_version']

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

with open('config.yml') as config:
    openai_config = OpenAIConfig(yaml.safe_load(config)['azure_openai'])

llm = AzureOpenAI(
    api_key=openai_config.api_key,
    azure_endpoint=openai_config.endpoint,
    azure_deployment=openai_config.deployment_name,
    api_version=openai_config.api_version
)

chat_prompt = {
    "role": "system",
    "content": """
            You are an expert technical writer and assembly procedure specialist. Your task is to analyze a CAD drawing image (in PNG or JPG format) provided as input and generate a clear, step-by-step assembly procedure for the product shown in the image. 

            Please follow this structure in your response:

            1. **Title and Product Information:** 
            - Provide a descriptive title for the assembly procedure. 
            - Include a brief overview of the product and its intended use.

            2. **Safety Warnings:** 
            - List any important safety precautions that should be observed during the assembly process.

            3. **Parts List:** 
            - Identify and list all the visible parts or components in the image. Include quantities and any identifiers if possible.

            4. **Tools Required:** 
            - List any tools or equipment that are necessary for assembly, as inferred from the image.

            5. **Step-by-Step Assembly Instructions:** 
            - Generate a numbered sequence of clear and concise assembly steps. 
            - Reference specific features visible in the image (e.g., "base," "side panel," "fasteners") and include notes on how parts connect.

            6. **Quality Check:** 
            - Provide guidelines on how to verify that the assembly is correct and stable.

            7. **Maintenance or Troubleshooting Tips (Optional):** 
            - Include any recommendations for maintenance or troubleshooting that would be useful.

            Ensure that your output is structured, easy to follow, and uses clear, technical language appropriate for users with basic assembly knowledge. Focus on accuracy, clarity, and brevity.
            """
}


@app.get("/")
async def health():
    return {"message": "This server is running."}


@app.post("/chat")
async def chat(request: ChatRequest):
    # Convert frontend messages to OpenAI-compatible format
    formatted_messages = [
        {"role": "user" if msg['role'] == 'user' else 'assistant', "content": msg["text"]} for msg in request.conversation
    ]
    
    # If images are included, add them to the message content
    if request.images:
        for img in request.images:
            formatted_messages.insert(0, {"role": "user", "content": [{"type": "image_url", "image_url": {"url": img}}]})
            
    # Prepend the system message
    formatted_messages.insert(0, chat_prompt)
        
    print(f"\nInput Messages: \n{formatted_messages}")

    # Invoke OpenAI's API
    reply = llm.chat.completions.create(messages = formatted_messages, model = openai_config.deployment_name)

    return {"response": reply.choices[0].message.content}

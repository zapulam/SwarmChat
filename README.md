# AI Chatbot with Image and Text Input

## Overview
This project is a web application that allows users to upload images and text as input to interact with an AI-powered agentic chatbot. The application consists of a React frontend and a FastAPI backend, enabling seamless communication between the user and the AI model.

## Features
- Upload images and text as input
- AI chatbot capable of discussing and analyzing the provided image and text
- Real-time conversation with the chatbot
- Secure and scalable architecture using FastAPI and React

## Tech Stack
### Frontend
- React (with Vite or Create React App)
- TailwindCSS (optional for styling)
- Axios (for API requests)
- WebSockets (for real-time communication, if applicable)

### Backend
- FastAPI
- OpenAI API (or another LLM API)
- Pillow (for image processing)
- Pydantic (for request validation)
- Uvicorn (for running the FastAPI server)

## Installation
### Prerequisites
- Node.js and npm installed
- Python 3.9+ installed
- Virtual environment (optional but recommended)

### Backend Setup
```sh
# Clone the repository
git clone <repo-url>
cd backend

# Create a virtual environment
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`

# Install dependencies
pip install -r requirements.txt

# Run FastAPI server
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

### Frontend Setup
```sh
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the React development server
npm run dev  # or `npm start` if using Create React App
```

## Usage
1. Start the FastAPI backend server.
2. Start the React frontend application.
3. Upload an image and provide some text input.
4. Interact with the chatbot, discussing and analyzing the provided input.

## API Endpoints
### `POST /upload`
- Accepts an image and text input
- Returns processed response from the chatbot

### `GET /chat`
- Initiates a chat session

### `POST /chat`
- Sends user messages and receives responses

## Deployment
For production deployment:
- Use Docker to containerize the application.
- Deploy the FastAPI backend on an Azure App Service or AWS Lambda.
- Deploy the React frontend using Vercel, Netlify, or an Nginx server.

## License
This project is licensed under the MIT License.

## Contributing
Feel free to open issues and pull requests for improvements.

## Contact
For inquiries, contact [Your Name] at [Your Email].


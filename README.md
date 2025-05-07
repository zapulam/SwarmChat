# React + FastAPI Image Chatbot App

This is a full-stack web application featuring a chatbot interface where users can upload images and text to chat about the uploaded content. The app consists of a React frontend for user interaction and a FastAPI backend for processing and handling chat requests.

## Features

- Users can upload images and text.
- The chatbot processes the uploaded content and engages in a conversation about the images and text.
- Real-time communication between the frontend and backend.
- Easy-to-use UI with support for multiple uploads.

## Tech Stack

- **Frontend**: Vite React.js
- **Backend**: FastAPI

## Installation

### Prerequisites

- Python 3.12
- Node.js and npm
- FastAPI
- React

### Backend (FastAPI)

1. Clone the repository:

   ```bash
   git clone https://github.com/zapulam/SwarmChat.git
   cd SwarmChat
   ```

2. Create a virtual environment

    ```bash
    cd backend
    python -m venv .venv
    . .venv/bin/activate
    ```

3. Install the required Python packages

    ```bash
    pip install -r requirements.txt
    ```

4. Start the FastAPI backend

    ```bash
    uvicorn app.main:app --reload
    ```

The FastAPI backend should now be running at http://localhost:8000.

### Frontend (React)

1. In a new terminal navigate to the project root

2. Install dependencies in the root directory:

    ```bash
    npm install
    ```

3. Start the React development server

    ```bash
    npm run dev
    ```

The React frontend should now be running at http://localhost:5173.

### Usage

1. Visit the frontend on your browser.

2. Upload an image or provide text for the chatbot.

3. Engage in a conversation with the chatbot about the uploaded content.

4. The backend will process the content and respond accordingly.

### API Endpoints

POST /chat: Send a message to the chatbot about the uploaded content.

- Request body: JSON with the message text and associated image ID (if any).
- Response: Chatbot's response.

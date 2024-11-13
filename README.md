Here's an updated README file to reflect your setup without Docker Compose and with a Node.js backend:

---

# ATS Resume Scanner

This ATS (Applicant Tracking System) Resume Scanner uses AI to help users optimize their resumes for specific job descriptions. The app scores resumes, provides ATS-friendliness feedback, and offers bias removal suggestions, enhancing the overall resume quality.

## Features

- **Customized Resume Scoring:** Evaluates resumes based on the job description.
- **ATS-Friendliness Feedback:** Identifies resume elements that may affect automated scanning.
- **AI-Powered Enhancements:** Offers improvement suggestions to boost resume quality.
- **Bias Detection and Removal:** Assesses and removes potential bias in the resume.

## Technologies Used

- **Frontend:** React (built with Vite)
- **Backend:** Node.js with AI integration (OpenAI)
- **Dockerized:** Separate Docker files for frontend and backend

## Project Structure

- **frontend/** - Contains the React frontend code.
- **backend/** - Contains the Node.js backend code.
- **Dockerfile** - Separate Dockerfiles for both frontend and backend.

## Prerequisites

- Docker installed on your machine.

## Setup Instructions

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/ATS-Resume-Scanner.git
cd ATS-Resume-Scanner
```

### Step 2: Build and Start the Backend and Frontend Containers

#### Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Build the Docker image for the backend:
   ```bash
   docker build -t ats-backend .
   ```

3. Run the backend container:
   ```bash
   docker run -d -p 8000:8000 ats-backend
   ```

   This starts the backend server on port 8000.

#### Frontend

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Build the Docker image for the frontend:
   ```bash
   docker build -t ats-frontend .
   ```

3. Run the frontend container:
   ```bash
   docker run -d -p 3000:3000 ats-frontend
   ```

   This starts the frontend on port 3000.

### Step 3: Access the Application

Once both containers are up and running, access the application at:

- **Frontend (React UI):** [http://localhost:3000](http://localhost:3000)
- **Backend (Node.js API):** [http://localhost:8000](http://localhost:8000)

## Stopping the Application

To stop the containers, use:

```bash
docker stop <container_id>
```

You can find the container IDs with:

```bash
docker ps
```

## Additional Notes

- **Environment Variables:** Ensure to set any required environment variables in the `.env` files for both frontend and backend.
- **AI Integration:** The backend requires an OpenAI API key for resume scoring and suggestions. Be sure to configure this in the backend environment settings.

--- 


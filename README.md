
# To-Do Application

This is a simple To-Do application consisting of a **Next.js** frontend and a **Flask REST API** backend, with **PostgreSQL** as the database. The app allows users to add tasks, mark them as completed, and delete tasks, with all data persisted in the database.

Live demo available at: [https://todo-flusk.vercel.app/](https://todo-flusk.vercel.app/)

---

## Project Overview

### Frontend (Next.js)
- Provides a user-friendly interface to add new tasks.
- Displays a list of tasks fetched from the backend.
- Allows marking tasks as completed.
- Enables deleting tasks from the list.

### Backend (Flask REST API)
- RESTful endpoints for creating, fetching, updating, and deleting tasks.
- Uses SQLAlchemy to interact with PostgreSQL database.

### Database (PostgreSQL)
- Stores task information in a table called `tasks`.
- Each task has fields like `id`, `task_name`, and `status`.

---

## Features
- Add new tasks via a form.
- Fetch and display all tasks.
- Update task status (e.g., mark as completed).
- Delete tasks.
- Basic form validation (optional bonus).
- Can be extended with pagination or filtering.

---

## Prerequisites
Before running the app locally, make sure you have:

- **Node.js** and **npm** installed (for frontend)
- **Python ** installed (for backend)
- **PostgreSQL** installed and running
- `git` installed (to clone the repo)

---

## Installation and Setup

### 1. Clone the Repository
```bash
https://github.com/mosfeqahamed/todo_flusk.git
cd todo_flusk

### 2. Create a Python virtual environment and activate it:

python3 -m venv venv
source venv/bin/activate

###3. Install dependencies:
pip install -r requirements.txt

###4.Download and install PostgreSQL from https://www.postgresql.org/download/windows/

During installation, set a password for the postgres user (remember it).

Open Command Prompt and run psql:

bash

"C:\Program Files\PostgreSQL\<version>\bin\psql.exe" -U postgres

Create the database:
CREATE DATABASE todo_task;


###5. Set yor .env file following .env.example

###6. run python create_db.py

###7. run python app.py

then your server will run 

###6. got to todo-frontend/src/app/page.tsx and write your local host http where your server site is running

the  run : npm run dev

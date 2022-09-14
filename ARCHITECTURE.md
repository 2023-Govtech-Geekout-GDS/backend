# Architecture

This web application consists of two parts:
- le frontend
- le backend

## Infrastructure
These environment variables control the API endpoints used to communicate between each component.
- API_URL (docker-compose)
- REACT_APP_API_ENDPOINT (production builds e.g. `https://my-backend-server-hostname/api`)

## Frontend
A React-based Single Page Application is the frontend for our application.

On the Home page, a clock polls the Application Programming Interface (API) for the current time, which also helps to determine if the backend server is running correctly.

The Todo application contains a simple user interface for users to create, view, and update the status of todo items.

## Backend
Express was used as the backend framework.

It exposes API endpoints which implement the Create, Read, Update, Delete, and List actions of Todo items.

## Git Repository

![Overview of Git Branching Strategy](https://user-images.githubusercontent.com/710625/134364889-38a456e9-9192-4a93-a9e2-c6eda8666f15.jpg)
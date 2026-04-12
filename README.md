# Knowledge Hub API

## Description

Knowledge Hub is a REST API built with NestJS for managing users, categories, articles, and comments.

The application supports:

- CRUD operations for all entities
- Validation using DTOs
- Query filtering for articles
- Cascade-like behavior on delete operations
- Request logging via middleware
- Swagger API documentation

---

## Tech Stack

- Node.js
- NestJS
- TypeScript
- REST API
- Swagger (OpenAPI)
- class-validator / class-transformer

---

## Installation

Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd <project-folder>
npm install
```

## Environment Variables

Create a .env file in the root directory:

```bash
PORT=4000
```

## Running the Application

Development mode

```bash
npm run start:dev
```

Production mode

```
npm run build
npm run start
```

## API Documentation

Swagger documentation is available at:

```
http://localhost:4000/doc
```

## Running Tests

```
npm run test
```

## Docker Hub

The application image is available at:

https://hub.docker.com/r/alexeyal/knowledge-hub

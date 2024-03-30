# GraphQL Job Board

This job search application stands out for its simplicity and ease of use. By utilizing GraphQL, it optimizes HTTP requests, making them more efficient and economical.

## Motivation

I became interested in GraphQL and its integration with Express. I managed to understand the principles of GraphQL interaction with the client side.

The choice of GraphQL was due to its popularity as a tool for query optimization. To implement the interaction, I used the Apollo Server and Apollo Client libraries.

## What I was learn

I have learned:

- Benefits of GraphQL: GraphQL allows you to clearly describe the data structure, which makes the API more understandable and convenient to use.
- Integration with Express: Express is a popular web framework for Node.js that easily integrates with GraphQL.
- Apollo Libraries: Apollo Server and Apollo Client are powerful libraries that greatly simplify working with GraphQL on both the server and the client.

---

# Installing

## Prerequisites

Before you begin, ensure you have Node.js version 18.16.0 or later installed on your machine.

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository from GitHub:

   ```bash
   git clone https://github.com/danylo1dev/express-feed.git
   ```

2. Install all dependencies in client and service:

   ```bash
   npm ci
   ```

## Environment Configuration

The repository includes an `.env.example` file. You should create the following environment files:

- `.env`: Default environment for new scripts

You can use the `.env.example` file as a template.

## Running the Application

To run the application, use the following commands:

- Server

  - **Development**:

    ```bash
    npm run start:dev
    ```

- Client

  - **Development**:

    ```bash
    npm run start
    ```

Once the application is running, you can access Server via `http://localhost:9000/graphql` and Client via `http://localhost:3000`.

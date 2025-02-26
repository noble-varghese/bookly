# Bookly

Checkout the project [here](https://bookly-web-hazel.vercel.app/home)

NOTE: Authentication is currently restricted to Sprinto accounts only. So login with your sprinto gmail account.

Bookly is a fullstack application that allows users to manage books and authors. The application provides complete CRUD (Create, Read, Update, Delete) operations for both books and authors, with authentication handled by Supabase and image storage using supabase storage. The application is deployed on [Vercel(front-end)](https://vercel.com/) and [Railway(backend)](https://railway.com/):

## Features

- 📚 Complete book management (add, edit, delete, view details)
- ✍️ Author management with CRUD operations
- 🔐 Authentication via Supabase
- 📷 Image upload capabilities for books and authors
- 💾 S3 compatible storage for managing uploaded images
- 📱 Responsive UI built with shadcn components and lucide-react

## Project Structure

This project is built as a Turborepo monorepo with the following structure:

```
bookly/
├── apps/
│   ├── api/               # Apollo GraphQL server
│   │   ├── src/
│   │   │   ├── schema/    # GraphQL schema definitions
│   │   │   ├── resolvers/ # Query and mutation resolvers
│   │   │   └── ...
│   └── web/               # Next.js frontend application
│       ├── components/    # Reusable UI components
│       ├── pages/         # Next.js pages
│       ├── lib/           # Utility functions and configs
│       └── ...
└── ...
```

## Tech Stack

### Backend (`apps/api`)
- TypeScript
- Apollo Server
- GraphQL
- Supabase (Authentication)
- Supabase S3 store (Image Storage)


### Frontend (`apps/web`)
- Next.js
- TypeScript
- Apollo Client (GraphQL)
- shadcn/ui components
- lucide-react icons

## Getting Started

### Prerequisites

- Node.js (latest version 20+)
- pnpm package manager

### Environment Variables

Create a `.env` file in the root folder.

**For the API (apps/api/.env):**
```
```

### Installation

1. Clone the repository
```sh
git clone https://github.com/noble-varghese/bookly.git
cd bookly
```

2. Install dependencies
```sh
pnpm install
```

3. Start the frontend server
```sh
pnpm frontend:dev
```

4. Start the backend server
```sh
pnpm backend:dev
```

This will start both the API and web application in development mode.


## GraphQL Schema

The API uses a modular GraphQL schema approach with files located in the [schema](apps/api/src/schema) directory.

### Main Types

- `Book`: Represents book data, including title, description, cover image, and author reference
- `Author`: Contains author information, including name, bio, and profile image

### Queries

- `books`: Fetch all books
- `book(id: ID!)`: Fetch a specific book by ID
- `authors`: Fetch all authors
- `author(id: ID!)`: Fetch a specific author by ID

### Mutations

- Book operations:
  - `createBook`: Add a new book
  - `updateBook`: Update an existing book
  - `deleteBook`: Remove a book
- Author operations:
  - `createAuthor`: Add a new author
  - `updateAuthor`: Update an existing author
  - `deleteAuthor`: Remove an author
- Image operations:
  - `uploadBookCover`: Upload a cover image for a book
  - `uploadAuthorImage`: Upload a profile image for an author

Implemented batch load authors for books and books for authors to prevent N+1 query issues.

## Frontend Components

The web application uses a component-based architecture with shadcn UI components and lucide-react icons for a clean, responsive interface.

Key components include:

- Book management components (BookList, BookForm, BookModal)
- Author management components (AuthorList, AuthorForm, AuthorModal)
- Authentication components (Login, Settings)
- Image upload components (using supabase)
- Paginated infinite scroll on the book and author listing page.

## Authentication

Authentication is handled by Supabase, which provides:
- User registration and login
- Session management
- Protected routes for authenticated operations


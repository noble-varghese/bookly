# Bookly

Bookly is a fullstack application that allows users to manage books and authors. The application provides complete CRUD (Create, Read, Update, Delete) operations for both books and authors, with authentication handled by Supabase and image storage using supabase storage.

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
DATABASE_URL=your_database_connection_string
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_KEY=your_supabase_service_key
S3_ACCESS_KEY=your_s3_access_key
S3_SECRET_KEY=your_s3_secret_key
S3_BUCKET_NAME=your_s3_bucket_name
S3_REGION=your_s3_region
PORT=4000
```

**For the Web app (apps/web/.env.local):**
```
NEXT_PUBLIC_API_URL=http://localhost:4000/graphql
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Installation

1. Clone the repository
```sh
git clone https://github.com/yourusername/bookly.git
cd bookly
```

2. Install dependencies
```sh
pnpm install
```

3. Start the development server
```sh
pnpm dev
```

This will start both the API and web application in development mode.

### Building for Production

```sh
pnpm build
```

This will build both the API and web application for production.

## GraphQL Schema

The API uses a modular GraphQL schema approach with files located in the `apps/api/src/schema` directory.

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

## Frontend Components

The web application uses a component-based architecture with shadcn UI components and lucide-react icons for a clean, responsive interface.

Key components include:

- Book management components (BookList, BookForm, BookModal)
- Author management components (AuthorList, AuthorForm, AuthorModal)
- Authentication components (Login, Register)
- Image upload components

## Authentication

Authentication is handled by Supabase, which provides:
- User registration and login
- Session management
- Protected routes for authenticated operations

## Deployment

The application is deployed on Vercel(front-end) and Railway(backend):
- API can be deployed to a Node.js hosting service (Railway, )
- Web application can be deployed to Vercel, Netlify, or any Next.js-compatible platform

# User Management Application

A schema-driven React application for managing users with a mock REST backend.

## Tech Stack
- **Frontend:** React, TypeScript, Vite
- **UI Component Library:** Ant Design
- **API Client:** Axios
- **Mock Backend:** JSON Server

## Prerequisites
- Node.js (v18+)
- npm

## Setup Instructions

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Run JSON Server:**
   ```bash
   npm run server
   ```
   *(Wait, I need to add this script to package.json)*

3. **Start Development Server:**
   ```bash
   npm run dev
   ```

## Design Decisions

- **Schema-Driven Forms:** Form fields are purely descriptive. Adding a new field only requires adding an entry to `src/schemas/userSchema.ts`.
- **API Layer:** Abstracted into a service layer to handle base URLs, headers, and error catching centrally.
- **TypeScript:** Strict typing for User objects and Schema definitions to ensure compile-time safety.

## How to Add New Form Fields

1. Open `src/schemas/userSchema.ts`.
2. Add a new object to the `userSchema` array:
   ```typescript
   {
     name: "address",
     label: "Address",
     type: "text",
     rules: [{ required: true, message: "Please enter address" }]
   }
   ```
3. The UI (Table and Form) will automatically update to include this field.

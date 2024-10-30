
---

# Rick and Morty API - NestJS

This project is an example API to manage **Rick and Morty** characters, developed with **NestJS**, applying **SOLID principles**, **Clean Architecture**, **clean code**, **Vertical Slice Architecture**, **design patterns**, and development best practices.

## Technologies Used

- **Node.js** with **NestJS** as the main framework.
- **Firestore** (Firebase) for data storage.
- **axios** for consuming external APIs (Rick and Morty API).
- **class-validator** for input data validation.

## Applied SOLID Principles

- **S: Single Responsibility Principle (SRP):** Each class has a single responsibility. For example, `CreateCharacterCommand` handles the creation logic, while `CharacterRepository` manages data access.
- **O: Open/Closed Principle (OCP):** Classes are open to extension but closed for modification. DTOs allow extending functionality without modifying existing services.
- **L: Liskov Substitution Principle (LSP):** Derived classes can replace their base classes without affecting functionality.
- **I: Interface Segregation Principle (ISP):** Specific interfaces ensure that each module depends only on what it needs.
- **D: Dependency Inversion Principle (DIP):** Services and repositories depend on abstractions rather than concrete implementations, thanks to dependency injection.

## Design Patterns Used

### Creational Patterns

- **Factory Pattern:** Character entities are created through commands, allowing centralized creation.

### Structural Patterns

- **Dependency Injection:** Services and repositories are injected into controllers, enabling cleaner, more testable code.
  
### Behavioral Patterns

- **Repository Pattern:** `CharacterRepository` manages data access logic, separating business logic from data access logic.
- **DTO (Data Transfer Object):** DTOs, like `CreateCharacterDto`, define expected data, ensuring precise validation.

## Clean Architecture

This project follows **Clean Architecture** principles, separating business logic, infrastructure, and presentation into independent layers. This ensures highly maintainable, scalable, and testable code. The layers are organized as follows:

- **Domain**: Contains entities and business rules.
- **Application**: Defines use cases or application logic.
- **Infrastructure**: Provides adapters for databases, external services, etc.
- **Presentation**: Defines controllers and DTOs that expose the API.

## Vertical Slice Architecture

The **Vertical Slice Architecture** organizes code by feature (or “slice”) rather than by layer. This structure allows each module to encapsulate its business logic, commands, queries, and data access. In other words, each slice (e.g., `characters`) handles all of its responsibilities independently, which improves code scalability and maintainability.

### Project Structure

```
src/
├── characters/
│   ├── application/            # Use cases
│   │   ├── commands/           # Business commands
│   │   └── queries/            # Business queries
│   ├── domain/                 # Entities and domain logic
│   ├── infrastructure/         # Repositories and external services
│   └── presentation/           # Controllers and DTOs
├── config/                     # Global configurations
└── main.ts                     # Application entry point
```

## Clean Code Principles

This project follows **Clean Code** principles to ensure code quality:

- **Clear Naming**: All methods, variables, and classes have meaningful and descriptive names.
- **Small and Specific Functions**: Each function does only one thing, enhancing readability.
- **Minimized Dependencies**: Thanks to dependency injection, the code is modular and easy to test.
- **Consistent Formatting**: The code follows a consistent style, making it easier to read and maintain.

## Endpoints and `curl` Examples

### 1. Create a Character

   **Endpoint:** `/characters`

   **Method:** `POST`

   ```bash
   curl -X POST http://localhost:3000/api/characters \
     -H "Content-Type: application/json" \
     -d '{
       "id": 1,
       "name": "Rick Sanchez",
       "status": "Alive",
       "species": "Human",
       "type": "",
       "gender": "Male",
       "origin": { "name": "Earth (C-137)", "url": "https://rickandmortyapi.com/api/location/1" },
       "location": { "name": "Citadel of Ricks", "url": "https://rickandmortyapi.com/api/location/3" },
       "image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
       "episode": ["https://rickandmortyapi.com/api/episode/1"],
       "url": "https://rickandmortyapi.com/api/character/1",
       "created": "2017-11-04T18:48:46.250Z"
     }'
   ```

### 2. Get a Character by ID

   **Endpoint:** `/characters/{id}`

   **Method:** `GET`

   ```bash
   curl -X GET http://localhost:3000/api/characters/{id}
   ```

### 3. List Characters with Filters and Pagination

   **Endpoint:** `/characters`

   **Method:** `GET`

   **Example with Filters:**

   ```bash
   curl -X GET "http://localhost:3000/api/characters?page=2&status=Alive&gender=Male"
   ```

### 4. Update a Character

   **Endpoint:** `/characters/{id}`

   **Method:** `PUT`

   ```bash
   curl -X PUT http://localhost:3000/api/characters/{id} \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Updated Rick Sanchez",
       "status": "Dead",
       "species": "Human",
       "gender": "Male",
       "origin": { "name": "Unknown", "url": "" },
       "location": { "name": "Unknown", "url": "" }
     }'
   ```

### 5. Delete a Character

   **Endpoint:** `/characters/{id}`

   **Method:** `DELETE`

   ```bash
   curl -X DELETE http://localhost:3000/api/characters/{id}
   ```
---

## Deployment to Google Cloud Run

This project includes a `Dockerfile` configured to build and deploy the application on Google Cloud Run. Follow these steps for deployment:

### 1. Build and Push the Image to Google Container Registry

Run the following command from the project's root directory to build and push the image to Google Container Registry:

```bash
gcloud builds submit --tag gcr.io/PROJECT_ID/IMAGE_NAME
```

- Replace `PROJECT_ID` with your Google Cloud project ID.
- Replace `IMAGE_NAME` with a name for the image (e.g., `rick-and-morty`).

### 2. Deploy to Google Cloud Run

Run the following command to deploy the image to Google Cloud Run:

```bash
gcloud run deploy SERVICE_NAME \
  --image gcr.io/PROJECT_ID/IMAGE_NAME \
  --platform managed \
  --region REGION \
  --allow-unauthenticated \
  --env-vars-file .env.yaml
```

- Replace `SERVICE_NAME` with the desired name for your service on Google Cloud Run.
- Replace `PROJECT_ID` and `IMAGE_NAME` with your project ID and the image name, respectively.
- Replace `REGION` with the desired region (e.g., `us-central1`).

---

## Installation and Running

1. Clone the repository.

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure the environment variables in a `.env` file for Firestore credentials:

   ```plaintext
   FIREBASE_PROJECT_ID=your-project-id
   FIREBASE_PRIVATE_KEY="your-private-key"
   FIREBASE_CLIENT_EMAIL=your-client-email
   ```

4. Run the application in development mode:

   ```bash
   npm run start:dev
   ```

This README covers design principles, architecture used, clean code practices, and how to interact with the endpoints. Be sure to add the `.env` file to `.gitignore` to keep Firestore credentials secure.
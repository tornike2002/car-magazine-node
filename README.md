# Car Magazine API

A Node.js/Express backend API for a car magazine application with authentication, articles, and user management.

## Features

- User authentication (JWT)
- Article management
- MongoDB database integration
- Swagger API documentation
- TypeScript support
- Comprehensive testing with Jest

## Technology Stack

- **Runtime**: Node.js
- **Framework**: Express
- **Database**: MongoDB (via Mongoose)
- **Authentication**: JWT, bcrypt
- **API Documentation**: Swagger
- **Language**: TypeScript
- **Linting**: ESLint + Prettier
- **Testing**: Jest + Supertest

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example` (see Environment Variables section)
4. Start the development server:
   ```bash
   npm run dev
   ```

## Available Scripts

- `npm run dev`: Start development server with hot-reloading
- `npm start`: Start production server
- `npm run build`: Compile TypeScript to JavaScript
- `npm test`: Run tests

## Configuration

The project uses the following configuration files:

- `tsconfig.json`: TypeScript configuration (targeting ES2020)
- `.eslintrc.js`: ESLint rules with TypeScript and Prettier support
- `.prettierrc`: Code formatting rules
- `jest.config.js`: Jest testing configuration

## Testing

The project includes comprehensive tests using Jest. To run tests:

```bash
npm test
```

## API Documentation

The API is documented using Swagger. After starting the server, access the documentation at:

```
http://localhost:<PORT>/api-docs
```

## Environment Variables

The following environment variables are required:

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/car-magazine
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=90d
```

## License

ISC

---

*This project was generated with Node.js, Express, and TypeScript.*

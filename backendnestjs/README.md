# Verdant Backend (NestJS)

PostgreSQL-backed auth API for the Verdant mobile app.

## Setup

1. Copy the environment file:

```bash
cp .env.example .env
```

2. Update `.env` with your PostgreSQL credentials and a strong `JWT_SECRET`.

3. Create the database:

```sql
CREATE DATABASE verdant;
```

4. Install and run:

```bash
npm install
npm run start:dev
```

The API runs at `http://localhost:3000/v1`.

## Auth endpoints

| Method | Path | Body |
|--------|------|------|
| POST | `/v1/auth/register` | `{ name, email, password, phone? }` |
| POST | `/v1/auth/login` | `{ email, password }` |
| POST | `/v1/auth/logout` | Bearer token required |

### Response shape

```json
{
  "token": "jwt-token",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "User Name",
    "phone": "+1234567890"
  }
}
```

## Project structure

```
src/
  auth/          controllers, services, DTOs, JWT strategy & guard
  users/         user entity and repository service
  config/        env loading and validation
  database/      TypeORM PostgreSQL module
  common/        middleware, filters, decorators
```

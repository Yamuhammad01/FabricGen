# FabricGen Backend

AI-powered Nigerian fashion concept generation and photorealistic fashion image generation from uploaded fabric images.

## Architecture

The backend follows a clean layered architecture with strict separation of concerns:

```
Controllers → Services → Repositories → Database
```

### Layers

- **Controllers**: Handle HTTP requests/responses. Never access Prisma or contain business logic.
- **Services**: Contain business logic. Orchestrate AI providers and prompt building.
- **Repositories**: Communicate only with Prisma/Database.
- **Providers**: Abstract AI service integrations (Vision, Image Generation).

### AI Pipeline

```
Upload Image → Gemini Vision → Structured JSON → Prompt Builder → FLUX → Generated Images
```

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript (strict mode)
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Validation**: Zod
- **Logging**: Pino
- **File Upload**: Multer
- **Image Processing**: Sharp

## Project Structure

```
backend/
├── src/
│   ├── app.ts                    # Express application setup
│   ├── server.ts                 # Server entry point
│   ├── config/                   # Centralized configuration
│   ├── controllers/              # Request handlers
│   ├── routes/                   # Route definitions
│   ├── middleware/               # Express middleware
│   ├── services/
│   │   ├── ai/                   # AI service wrappers
│   │   ├── prompt/               # Prompt builder
│   │   └── image/                # Image processing
│   ├── providers/
│   │   ├── vision/               # Vision provider interface
│   │   └── image/                # Image generation interface
│   ├── repositories/             # Data access layer
│   ├── models/                   # Data models
│   ├── validators/               # Zod validation schemas
│   ├── database/                 # Prisma client
│   ├── utils/                    # Utilities (logger, response)
│   ├── types/                    # TypeScript type definitions
│   ├── constants/                # Application constants
│   ├── interfaces/               # TypeScript interfaces
│   ├── errors/                   # Custom error classes
│   ├── uploads/                  # Uploaded files directory
│   └── logs/                     # Log files directory
├── prisma/
│   └── schema.prisma             # Prisma schema
├── .env                          # Environment variables
├── .env.example                  # Environment variables template
├── package.json
├── tsconfig.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js >= 18
- PostgreSQL >= 14
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Copy environment variables:

```bash
cp .env.example .env
```

4. Configure your `.env` file with your database URL and API keys:

```env
PORT=3000
NODE_ENV=development
DATABASE_URL="postgresql://user:password@localhost:5432/fabricgen?schema=public"
GEMINI_API_KEY="your-gemini-api-key"
FAL_API_KEY="your-fal-api-key"
ACTIVE_VISION_PROVIDER="gemini"
ACTIVE_IMAGE_PROVIDER="flux"
LOG_LEVEL=info
UPLOAD_PATH="./uploads"
MAX_UPLOAD_SIZE=5242880
```

5. Generate Prisma client:

```bash
npm run prisma:generate
```

6. Start development server:

```bash
npm run dev
```

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run prisma:generate` | Generate Prisma client |
| `npm run prisma:validate` | Validate Prisma schema |
| `npm run prisma:format` | Format Prisma schema |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint issues |
| `npm run clean` | Clean dist directory |

## API Endpoints

### Health Check

```
GET /health
```

Response:

```json
{
  "success": true,
  "message": "Service is healthy",
  "data": {
    "status": "ok",
    "environment": "development",
    "timestamp": "2024-01-01T00:00:00.000Z"
  }
}
```

All future API routes are prefixed with `/api/v1`.

## Provider Architecture

### Vision Providers

The system supports multiple vision providers through a common interface:

- `VisionProvider` interface
- Planned implementations: Gemini, OpenAI Vision, Claude Vision

### Image Generation Providers

The system supports multiple image generation providers through a common interface:

- `ImageGenerationProvider` interface
- Planned implementations: FLUX.1 Pro (fal.ai), OpenAI DALL-E

To switch providers, update the `ACTIVE_VISION_PROVIDER` and `ACTIVE_IMAGE_PROVIDER` environment variables.

## Error Handling

Custom error classes:

- `ValidationError` - 400
- `NotFoundError` - 404
- `UnauthorizedError` - 401
- `ForbiddenError` - 403
- `ConflictError` - 409
- `TooManyRequestsError` - 429
- `InternalServerError` - 500

All errors return consistent JSON responses:

```json
{
  "success": false,
  "message": "Error description",
  "error": "ErrorType",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Response Format

### Success

```json
{
  "success": true,
  "message": "Success message",
  "data": {},
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## License

MIT
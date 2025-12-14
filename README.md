# Home Library Service

🎧 _RESTful API for managing your personal music library (users, artists, albums, tracks, favorites)._

## ✅ Prerequisites
- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Download & Install Docker](https://docs.docker.com/get-docker/)

## 🚀 Quick Start
1. Clone the repository:
```
git clone https://github.com/Zorro-amarillo/nodejs2025Q2-service.git
```

2. Go to folder `nodejs2025Q2-service`:
```
cd nodejs2025Q2-service
```

3. _(Optional)_ Switch to the `part2-dev` branch for latest features:
```
git checkout part2-dev
```

4. Copy environment sample (save it as .env file):
```
cp .env.example .env
```
## 🏃 Running application
### Development mode
1. Start the Docker containers:
```
npm run docker:dev:build      # build and start
# OR
npm run docker:dev:up         # start (without build)

```

2. Access the application:
   - API: http://localhost:4000
   - OpenAPI (Swagger) docs: http://localhost:4000/doc
   - Prisma Studio (dev): http://localhost:5555

### Production mode
1. Start the Docker containers:
```
npm run docker:prod:build      # build and start
# OR
npm run docker:prod:up         # start (without build)
```

2. App will start on http://localhost:4000 (port 4000 as default).

## 🔄 Automated Database Setup

**When you build the image (one-time):**
- Prisma Client is generated and included in the image

**Every time you start a container:**
- Database migrations are automatically applied
- Application starts ready to use

It means zero manual database setup required.

## ⚙️ Manual operations (if needed)

Use shell access for manual operations:

```
npm run shell:api:dev     # dev mode shell
# OR
npm run shell:api:prod    # prod mode shell
```
In the opened shell:
  - to apply migrations enter the following command
```
npx prisma migrate deploy
```

- to generate Prisma Client enter the following
```
npx prisma generate
```
  To exit shell: enter `exit` or Ctrl+D.

## 📖 Documentation
While running the app you can open in your browser OpenAPI (Swagger) documentation: http://localhost:4000/doc.

For more information about OpenAPI/Swagger please visit https://swagger.io/.

## 📦 Public Docker Image

[Link to the image](https://hub.docker.com/repository/docker/ya6ka0/home-library/general)

Pull and run instantly:
```
docker pull ya6ka0/home-library:latest
```
Compressed size: 138.7 MB (< 500 MB requirement met).

## 🔒 Vulnerabilities scanning

To run the vulnerability scan:

```
npm run scan
```

## 🧪 Testing

While application running open new terminal and enter:

- To run all tests without authorization

```
npm run test
```

- To run only one of all test suites

```
npm run test -- <path to suite>
```

- To run all test with authorization

```
npm run test:auth
```

- To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

## 🔧 Useful Scripts
| Script                    | Description                   |
| ------------------------- | ----------------------------- |
| `npm run docker:dev:logs` | follow dev containers logs    |
| `npm run shell:api:dev`       | exec into api_dev container shell |
| `npm run shell:api:prod`       | exec into api_prod container shell |
| `npm run prisma:studio`   | launch Prisma Studio (dev)    |
| `npm run lint`            | lint & auto-fix               |
| `npm run format`          | format code with Prettier     |

## 🐞 Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging

## 📖 API Documentation
After start open: http://localhost:4000/doc
(Auto-generated OpenAPI 3.0 / Swagger UI)

## 📡 API Overview

| Resource    | Endpoints (base `/`)                                |
| ----------- | --------------------------------------------------- |
| 👤 Users    | `GET\|POST /user`, `GET\|PUT\|DELETE /user/:id`     |
| 🎤 Artists  | `GET\|POST /artist`, `GET\|PUT\|DELETE /artist/:id` |
| 💿 Albums   | `GET\|POST /album`, `GET\|PUT\|DELETE /album/:id`   |
| 🎵 Tracks   | `GET\|POST /track`, `GET\|PUT\|DELETE /track/:id`   |
| ⭐ Favorites | `GET /favs`, `POST\|DELETE /favs/{type}/:id`        |

🌐 Full interactive docs: [http://localhost:4000/doc](http://localhost:4000/doc)
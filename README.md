# Home Library Service

🎧 _RESTful API for managing your personal music library (users, artists, albums, tracks, favorites)._

## ✅ Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## 🚀 Installation

1. Clone the repository:

```
git clone https://github.com/Zorro-amarillo/nodejs2025Q2-service.git
```

2. Go to folder `nodejs2025Q2-service`:

```
cd nodejs2025Q2-service
```

3. Install dependencies:

```
npm install
```

4. _(Optional)_ Switch to the `dev` branch for latest features:

```
git checkout dev
```

## ⚙️ Environment Setup

Create your own `.env` file with proper environment variables. As an example you may use `.env.example` at the root of the project.

## 🏃 Running application

### Development mode

```
npm run start:dev
```

### Production mode

```
npm start
```

App will start on http://localhost:4000 (port 4000 as default).

## 📖 Documentation

After starting the app you can open in your browser OpenAPI (Swagger) documentation: http://localhost:4000/doc/.

For more information about OpenAPI/Swagger please visit https://swagger.io/.

## 🧪 Testing

After application running open new terminal and enter:

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

---

### 🧹 Auto-fix and format

```
npm run lint
```

```
npm run format
```

### 🐞 Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging

---

## 📡 API Overview

| Resource    | Endpoints (base `/`)                                |
| ----------- | --------------------------------------------------- |
| 👤 Users    | `GET\|POST /user`, `GET\|PUT\|DELETE /user/:id`     |
| 🎤 Artists  | `GET\|POST /artist`, `GET\|PUT\|DELETE /artist/:id` |
| 💿 Albums   | `GET\|POST /album`, `GET\|PUT\|DELETE /album/:id`   |
| 🎵 Tracks   | `GET\|POST /track`, `GET\|PUT\|DELETE /track/:id`   |
| ⭐ Favorites | `GET /favs`, `POST\|DELETE /favs/{type}/:id`        |

🌐 Full interactive docs: [http://localhost:4000/doc](http://localhost:4000/doc)
# Cryptocurreny Watchlist Webapp
A full-stack web application for cryptocurrency data, built with Next.js (frontend) and ASP.NET Core (backend). Includes .NET Xunit and Moq unit tests, integration tests and Playwright End-to-End (E2E) tests and Docker support for backend containerization.

---

## Project Structure

```
balaji-cohort/
├── .env.local                # Frontend environment variables
├── app/                      # Next.js frontend app
├── CryptoApi/                # ASP.NET Core backend API
├── CryptoApi/Tests           # ASP.NET Core tests
├── domains/                  # Domain logic (crypto)
├── shared/                   # Shared frontend components
├── tests/                    # Playwright test specs
├── playwright.config.ts      # Playwright test config
└── ...                       # Other config and support files
```

---

## Usage


### 1. Frontend (Next.js)

#### Clone this repository:
```
git clone https://github.com/agility-partners/balaji-cohort.git .
```

#### Install dependencies
```bash
npm install
```

#### Run frontend
```bash
npm run dev
```
Frontend runs at [http://localhost:3000](http://localhost:3000).

---

### 2. Docker compose (backend, sqlserver, data-ingestion, dbt-scheduler, backend-test, AI agent dependencies)

#### Configure environment variables
Add a `.env.local` file in root dir:
```bash
NEXT_PUBLIC_API_URL=http://localhost:8080
```

#### Create .env file that contains SQL Server password and Google Gemini API Key
```bash
SQL_SERVER_PASS=...
GOOGLE_GENERATIVE_AI_API_KEY=...
```

#### Run docker compose to spin up all containers ()
```bash
docker compose up -d
```

---

### 3. Testing

**End-to-End (E2E) Playwright Testing**

NOTE: make sure to first run the [Usage](#usage) instructions to ensure all docker compose containers are all running

#### Install Playwright
```bash
npm install --save-dev playwright
```

#### Run tests
```bash
npx playwright test
```

Test specs are in the `tests/` folder.

**.NET Backend Testing**

#### Run tests
```bash 
docker compose run --rm backend-test
```

**dbt Testing**

#### Setup profiles.yml config
crypto_dbt/profiles.yml
```yml
crypto_dbt:
  target: dev
  outputs:
    dev:
      type: sqlserver
      driver: "ODBC Driver 18 for SQL Server"
      server: localhost
      database: crypto_data
      schema: dbo
      user: ...
      password: ...
      port: 1433
      threads: 4
      trust_cert: true
  target: dev
```

#### Respin up docker containers again
Re-run the [Usage](#usage) instructions.

#### Run tests
```bash
docker compose run --rm dbt-scheduler dbt test
```

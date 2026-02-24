# Cryptocurreny Watchlist Webapp
A full-stack web application for cryptocurrency data, built with Next.js (frontend) and ASP.NET Core (backend). Includes Playwright tests and Docker support for backend containerization.

---

## Project Structure

```
balaji-cohort/
├── .env.local                # Frontend environment variables
├── app/                      # Next.js frontend app
├── CryptoApi/                # ASP.NET Core backend API
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

### 2. Backend (ASP.NET Core)

**OPTION A: Run backend locally**

#### Configure environment variables
Edit `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:5037
```

#### Install dependencies
```powershell
cd CryptoApi
dotnet restore
```

#### Run backend
```powershell
dotnet run
```
Backend runs at [http://localhost:5037](http://localhost:5037).

---

**OPTION B: Run backend in Docker**

#### Build Docker image
```powershell
cd CryptoApi
docker build -t cryptoapi .
```

#### Run Docker container
```powershell
docker run --rm -p 8080:8080 cryptoapi
```

---

### 4. End-to-End Testing (Playwright)

#### Install Playwright
```bash
npm install --save-dev playwright
```

#### Run tests
```bash
npx playwright test
```

Test specs are in the `tests/` folder.
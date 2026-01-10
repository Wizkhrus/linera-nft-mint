# Linera NFT Mint Platform - Fullstack

🚀 **Полнофункциональный fullstack проект для минта NFT на блокчейне Linera**

## 🏗️ Архитектура

```
┌─────────────────────────────────────────────┐
│   Frontend (Next.js) - Vercel              │
│   https://linera-nft-mint.vercel.app       │
│   - React компоненты                       │
│   - Подключение кошелька                   │
│   - UI для минта NFT                       │
└─────────────────┬───────────────────────────┘
                  │ API calls
                  ↓
┌─────────────────────────────────────────────┐
│   Backend (Node.js + Express) - Railway    │
│   localhost:3001 (dev)                     │
│   - POST /api/mint - минт NFT              │
│   - GET /api/nft/:id - получить NFT       │
│   - GET /api/nfts - все NFT                │
│   - GET /api/stats - статистика            │
└─────────────────┬───────────────────────────┘
                  │ Linera SDK calls
                  ↓
┌─────────────────────────────────────────────┐
│   Smart Contract (Rust) - Linera Chain    │
│   - MintNft { to, name, uri }              │
│   - GetNft { id }                          │
│   - GetTotalSupply                         │
└─────────────────────────────────────────────┘
```

## 📁 Структура проекта

```
.
├── app/                     # Frontend (Next.js)
│   ├── components/
│   │   └── MintComponent.tsx  # React компонент минта
│   ├── page.tsx               # Главная страница
│   ├── layout.tsx
│   └── globals.css
│
├── backend/                 # Backend API (Node.js)
│   ├── server.js             # Express сервер
│   ├── package.json
│   └── .env.example
│
├── contract/                # Rust контракт
│   ├── src/
│   │   ├── lib.rs            # Основная логика NFT
│   │   └── bin/service.rs    # Service для API
│   ├── Cargo.toml
│   └── README.md
│
├── package.json             # Frontend зависимости
├── tsconfig.json
├── next.config.js
└── README.md
```

## 🚀 Быстрый старт

### 1️⃣ Frontend (Next.js + Vercel)

```bash
npm install
npm run dev
# Откроется на http://localhost:3000
```

Автоматический деплой на Vercel: https://linera-nft-mint.vercel.app

### 2️⃣ Backend (Node.js + Express)

```bash
cd backend

# Скопировать .env файл
cp .env.example .env

# Установить зависимости
npm install

# Запустить dev сервер
npm run dev
# Server запустится на http://localhost:3001

# Для production
NODE_ENV=production npm start
```

**API Endpoints:**
```
POST   /api/mint         - Mint new NFT
GET    /api/nft/:id      - Get NFT by ID
GET    /api/nfts         - Get all NFTs
GET    /api/stats        - Get stats
GET    /health           - Health check
```

### 3️⃣ Smart Contract (Rust)

См. `/contract/README.md` для полных инструкций

```bash
cd contract

# Установить Rust и Linera
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
cargo install linera-cli
rustup target add wasm32-unknown-unknown

# Скомпилировать
cargo build --target wasm32-unknown-unknown --release

# Развернуть
linera publish-contract \
  target/wasm32-unknown-unknown/release/linera_nft_contract.wasm \
  --service target/wasm32-unknown-unknown/release/linera_nft_contract_service.wasm
```

## 🔄 Как это работает

1. **Пользователь** открывает фронтенд на Vercel
2. **Фронтенд** отправляет запрос к Backend API (POST /api/mint)
3. **Backend** обрабатывает запрос и вызывает Linera контракт
4. **Контракт** создает NFT и сохраняет в цепи
5. **Результат** возвращается пользователю

## 🛠️ Стек технологий

| Слой | Технология | Версия |
|------|-----------|--------|
| Frontend | Next.js | 14.0 |
| Frontend | React | 18.2 |
| Frontend | TypeScript | 5.0 |
| Backend | Node.js | 18+ |
| Backend | Express | 4.18 |
| Backend | Axios | 1.4 |
| Contract | Rust | 2021 |
| Contract | Linera SDK | 0.9 |

## 📦 Деплой

### Frontend → Vercel ✅
Автоматический деплой при push в main

### Backend → Railway (или Render)
```bash
# Railway
railway up

# или Render
# Подключить GitHub репо через Render UI
```

### Contract → Linera Testnet
Полные инструкции в `/contract/README.md`

## 📚 Полезные ссылки

- [Linera Documentation](https://linera.dev)
- [Next.js Docs](https://nextjs.org)
- [Express.js Guide](https://expressjs.com)
- [Rust Book](https://doc.rust-lang.org/book)
- [Vercel Dashboard](https://vercel.com/wizkhrus-projects/linera-nft-mint)

## 🤝 Контрибьютинг

Отправляй PR и создавай Issues!

## 📄 Лицензия

MIT - свободно используй в своих проектах

---

**Вопросы?** Смотри README.md в каждой папке (app, backend, contract) для деталей.

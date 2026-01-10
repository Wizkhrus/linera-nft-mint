# Linera NFT Mint Platform

Рust контракт + Next.js фронтенд для NFT минта на Linera

## Компоненты проекта

### Frontend (Next.js) - https://linera-nft-mint.vercel.app
- Подключение кошелька
- UI для минта NFT
- Отображение успешного минта

### Smart Contract (Rust)
- `MintNft` - создать NFT
- `GetNft` - получить инфо об NFT
- `GetTotalSupply` - общее кол-во

## Структура

```
.
├── app/              # Next.js приложение
├── contract/         # Rust контракт
├── package.json
└── README.md
```

## Быстрый старт

### Frontend
```bash
npm install
npm run dev
```

### Contract
См. `contract/README.md` для инструкций по компиляции

## Полезные ссылки
- [Linera Docs](https://linera.dev)
- [Vercel Project](https://vercel.com/wizkhrus-projects/linera-nft-mint)

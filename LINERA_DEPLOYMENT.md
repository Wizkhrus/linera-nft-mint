# Linera NFT Contract Deployment Guide

## Пошаговое развёртывание контракта на Linera Testnet

### Шаг 1: Установка Linera CLI

```bash
# Установить Rust (если ещё не установлен)
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Установить Linera CLI
cargo install --git https://github.com/linera-io/linera-protocol linera-cli

# Проверить установку
linera --version
```

### Шаг 2: Инициализация кошелька на Testnet Babbage

```bash
# Инициализировать кошелек с Testnet Babbage faucet
linera wallet init --faucet https://faucet.testnet-babbage.linera.net

# Запросить цепь для разработки
linera wallet request-chain --faucet https://faucet.testnet-babbage.linera.net

# Проверить баланс
linera sync
linera query-balance
```

### Шаг 3: Компиляция контракта

```bash
cd contract
cargo build --release
```

### Шаг 4: Развёртывание контракта

```bash
# Опубликовать приложение
linera publish-program ./target/release/linera_nft_mint.wasm

# Получить Application ID (сохраните это значение!)
# Пример: 0x123abc...xyz
```

### Шаг 5: Создание экземпляра контракта

```bash
# Создать приложение с Application ID из шага 4
linera create-application <APPLICATION_ID> --json-argument '{}'

# Получить Chain ID (сохраните это значение!)
```

### Шаг 6: Обновление API для интеграции с Linera

Обновите `.env` файл с ID вашего контракта:

```bash
LINERA_APPLICATION_ID=<ваш_application_id>
LINERA_CHAIN_ID=<ваш_chain_id>
LINERA_RPC_URL=https://rpc.testnet-babbage.linera.net
```

## SDK Интеграция в API

Обновите `app/api/mint/route.ts` для работы с реальным контрактом:

```typescript
import { LineraClient } from '@linera-io/sdk';

const client = new LineraClient({
  url: process.env.LINERA_RPC_URL,
});

// При минте вызывать реальный контракт:
const tx = await client.call({
  applicationId: process.env.LINERA_APPLICATION_ID,
  entrypoint: 'mint_nft',
  argument: { to, name, uri },
});

// Возвращать реальный tx hash
return NextResponse.json({
  transactionHash: tx.hash,
  blockchainLink: `https://explorer.testnet-babbage.linera.net/transaction/${tx.hash}`,
});
```

## Проверка транзакций

После развёртывания можно проверить транзакции:

```bash
# Синхронизировать цепь
linera sync

# Проверить приложение
linera query-application <APPLICATION_ID>

# Проверить баланс
linera query-balance
```

## Testnet Explorer

Когда Linera запустит официальный explorer:
- Будет доступен по адресу: `https://explorer.testnet-babbage.linera.net`
- Вы сможете искать транзакции по хешу
- Просматривать состояние микроцепей

## Troubleshooting

### Ошибка: "faucet not found"
- Проверьте URL faucet (может измениться для новых версий testnета)

### Ошибка: "insufficient balance"
- Запросите новую цепь через faucet
- Или используйте `linera wallet request-chain`

### Ошибка при компиляции
- Обновите Rust: `rustup update`
- Очистите кэш: `cargo clean && cargo build --release`

## Полезные ссылки

- [Linera Developer Docs](https://linera.dev)
- [Linera GitHub](https://github.com/linera-io/linera-protocol)
- [Linera Testnet Info](https://linera.io)

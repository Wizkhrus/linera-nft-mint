# Linera NFT Contract

Rust контракт для NFT минта на блокчейне Linera.

## Структура проекта

```
contract/
├── Cargo.toml          # Конфигурация проекта
├── src/
│   ├── lib.rs          # Основной контракт (NFT логика)
│   └── bin/
│       └── service.rs  # Service interface для фронта
└── README.md           # Эта инструкция
```

## Компоненты контракта

### NFT структура
```rust
pub struct NFT {
    pub id: u64,              // ID NFT
    pub owner: String,        // Адрес владельца
    pub name: String,         // Имя NFT
    pub uri: String,          // Ссылка на метаданные
}
```

### Функции

1. **MintNft** - Создать новый NFT
   - `to`: адрес получателя
   - `name`: имя NFT
   - `uri`: ссылка на изображение/метаданные

2. **GetNft** - Получить информацию об NFT
   - `id`: ID NFT
   - Возвращает: NFT или None

3. **GetTotalSupply** - Общее количество минтованных NFT
   - Возвращает: u64

## Как скомпилировать

### 1. Установка Rust и Linera

```bash
# Установить Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source $HOME/.cargo/env

# Установить Linera CLI
cargo install linera-cli

# Установить WebAssembly target
rustup target add wasm32-unknown-unknown
```

### 2. Компиляция контракта

```bash
cd contract

# Собрать контракт в WASM
cargo build --target wasm32-unknown-unknown --release
```

Компилированные файлы будут в:
```
./target/wasm32-unknown-unknown/release/
├── linera_nft_contract.wasm         # Контракт
└── linera_nft_contract_service.wasm # Service
```

### 3. Деплой на Linera

```bash
# Запустить локальный симулятор
linera start-simulator

# В новом терминале: создать цепь
linera create-chain

# Развернуть контракт
linera publish-contract \
  target/wasm32-unknown-unknown/release/linera_nft_contract.wasm \
  --service target/wasm32-unknown-unknown/release/linera_nft_contract_service.wasm
```

## Интеграция с фронтом

Отправить сообщение на контракт:

```json
{
  "message": {
    "MintNft": {
      "to": "0x...",
      "name": "My NFT",
      "uri": "ipfs://..."
    }
  }
}
```

Запросить данные:

```json
{
  "request": {
    "GetNft": 0
  }
}
```

## Документация

- [Linera SDK](https://linera.dev)
- [Rust Documentation](https://docs.rs)
- [Serde Documentation](https://serde.rs)

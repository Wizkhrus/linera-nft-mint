use linera_sdk::{
    base::WithServiceAbi,
    views::{MapView, RootView, View},
    Contract, ContractRuntime, MessageHandler, Service, ViewError,
};
use serde::{Deserialize, Serialize};

/// NFT структура
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct NFT {
    pub id: u64,
    pub owner: String,
    pub name: String,
    pub uri: String,
}

/// Главное состояние контракта
#[derive(RootView)]
pub struct NftContract {
    pub nfts: MapView<u64, NFT>,
    pub next_id: u64,
}

/// Сообщения для контракта
#[derive(Debug, Serialize, Deserialize, Clone)]
pub enum Message {
    MintNft { to: String, name: String, uri: String },
}

/// Запросы для Service
#[derive(Debug, Serialize, Deserialize, Clone)]
pub enum Request {
    GetNft(u64),
    GetTotalSupply,
}

/// Ответы
#[derive(Debug, Serialize, Deserialize, Clone)]
pub enum Response {
    Nft(Option<NFT>),
    TotalSupply(u64),
}

/// Контракт реализация
pub struct NftService;

#[service]
impl Service<NftContract> for NftService {
    type Query = Request;
    type Response = Response;
    type Error = String;

    async fn handle_query(
        self,
        state: &<NftContract as Contract>::State,
        request: Self::Query,
    ) -> Result<Self::Response, Self::Error> {
        match request {
            Request::GetNft(id) => {
                let nft = state.nfts.get(&id).await.map_err(|e| e.to_string())?;
                Ok(Response::Nft(nft))
            }
            Request::GetTotalSupply => Ok(Response::TotalSupply(state.next_id)),
        }
    }
}

#[contract]
impl Contract for NftContract {
    type Message = Message;
    type MessageHandler = NftMessageHandler;

    async fn initialize(
        &mut self,
        _context: &ContractRuntime<Self>,
    ) -> Result<(), Self::Error> {
        self.next_id = 0;
        Ok(())
    }
}

pub struct NftMessageHandler;

#[message_handler]
impl MessageHandler<Message> for NftMessageHandler {
    async fn handle(
        state: &mut <NftContract as Contract>::State,
        message: Message,
        _context: &mut ContractRuntime<NftContract>,
    ) -> Result<(), String> {
        match message {
            Message::MintNft { to, name, uri } => {
                let id = state.next_id;
                let nft = NFT {
                    id,
                    owner: to,
                    name,
                    uri,
                };
                state.nfts.insert(&id, nft).await.map_err(|e| e.to_string())?;
                state.next_id = id + 1;
                Ok(())
            }
        }
    }
}

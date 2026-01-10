use linera_nft_contract::{NftContract, NftService, Request, Response};
use linera_sdk::Service;

linera_sdk::export_service!(NftService with Query = Request, Response = Response);

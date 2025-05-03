use starknet::{ContractAddress};

#[derive(Copy, Drop, Serde, Debug)]
pub enum FriendRequestStatus {
    PENDING,
    ACCEPTED,
    REJECTED
}

#[derive(Copy, Drop, Serde, Debug)]
#[dojo::model]
pub struct FriendRequest {
    #[key]
    pub player: (u64, u64), // request_id, player_id
    pub sender: u64, // player_id
    pub sent: bool,
    pub accepted: bool
    pub status: FriendRequestStatus
}

#[derive(Copy, Drop, Serde, Debug)]
#[dojo::model]
pub struct FriendRequestCount {
    #[key]
    pub player: u64,
    pub count: u64 // Keeps track of the id
}

#[derive(Copy, Drop, Serde, Debug)]
#[dojo::model]
pub struct FriendsList{
    pub player: u64,
    pub friends: Array<u64> //
}
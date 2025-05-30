use aqua_stark_od::models::aquarium_model::Aquarium;
use starknet::{ContractAddress};

#[starknet::interface]
pub trait IActions<T> {
     fn create_aquarium(ref self: T, aquarium_id: u256, owner: ContractAddress, max_capacity: u32) -> u256;
}
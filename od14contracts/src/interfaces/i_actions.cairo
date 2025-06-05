use aqua_stark_od::models::aquarium_model::Aquarium;
use starknet::{ContractAddress};

#[starknet::interface]
pub trait IActions<T> {
     fn create_aquarium(ref self: T, aquarium_id: u256, owner: ContractAddress, max_capacity: u32) -> u256;
     // fn add_fish(ref self: TContractState, aquarium_id: u64, fish_id: u64) -> bool;
//     fn remove_fish(ref self: TContractState, aquarium_id: u64, fish_id: u64) -> bool;
//     fn clean(ref self: TContractState, aquarium_id: u64, amount: u32);
//     fn update_cleanliness(ref self: TContractState, aquarium_id: u64, hours_passed: u32);
//     fn get_cleanliness(self: @TContractState, aquarium_id: u64) -> u32;
//     fn get_capacity(self: @TContractState, aquarium_id: u64) -> u32;
//     fn get_fish_count(self: @TContractState, aquarium_id: u64) -> u32;
//     fn is_full(self: @TContractState, aquarium_id: u64) -> bool;
}
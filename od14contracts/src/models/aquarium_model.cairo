use starknet::ContractAddress;

#[derive(Drop, Serde, Debug)]
#[dojo::model]
pub struct Aquarium {
    #[key]
    pub id: u64,
    pub owner: ContractAddress,
    pub max_capacity: u32,
    pub cleanliness: u32, // 0-100 scale
    pub housed_fish: Array<u64>,
}

// #[starknet::interface]
// pub trait IAquariumState<TContractState> {
//     fn create_aquarium(ref self: TContractState, owner: ContractAddress, max_capacity: u32) -> u64;
//     fn add_fish(ref self: TContractState, aquarium_id: u64, fish_id: u64) -> bool;
//     fn remove_fish(ref self: TContractState, aquarium_id: u64, fish_id: u64) -> bool;
//     fn clean(ref self: TContractState, aquarium_id: u64, amount: u32);
//     fn update_cleanliness(ref self: TContractState, aquarium_id: u64, hours_passed: u32);
//     fn get_cleanliness(self: @TContractState, aquarium_id: u64) -> u32;
//     fn get_capacity(self: @TContractState, aquarium_id: u64) -> u32;
//     fn get_fish_count(self: @TContractState, aquarium_id: u64) -> u32;
//     fn is_full(self: @TContractState, aquarium_id: u64) -> bool;
// }

#[generate_trait]
pub impl AquariumImpl of IAquarium {

    fn create_aquarium(aquarium_id: u64, owner: ContractAddress, max_capacity: u32) -> Aquarium {
        Aquarium {
            id: aquarium_id,
            owner: owner,
            max_capacity: max_capacity,
            cleanliness: 100, // Start with a clean aquarium
            housed_fish: array![],
        }
    }
}


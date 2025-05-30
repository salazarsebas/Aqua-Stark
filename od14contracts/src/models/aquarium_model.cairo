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

    fn add_fish(&mut aquarium: Aquarium, fish_id: u64) -> Aquarium {
        // add fish to an aquarium

        let number_of_fishes_in_aquarium = aquarium.housed_fish.len();
        assert!(number_of_fishes_in_aquarium < aquarium.max_capacity, "Aquarium is full");
        aquarium.housed_fish.push(fish_id);
        aquarium
    }
    fn remove_fish(&mut aquarium: Aquarium, fish_id: u64) -> Aquarium{
        aquarium.housed_fish.iter().position(|&id| id == fish_id).map_or(aquarium, |index| {
            aquarium.housed_fish.remove(index);
        });

        aquarium
    }
    fn clean(aquarium: Aquarium, amount: u32) -> Aquarium {

    }
    fn update_cleanliness(aquarium: Aquarium, hours_passed: u32) -> Aquarium {

    }
    fn get_cleanliness(aquarium: Aquarium) -> u32 {

    }
    fn get_capacity(aquarium: Aquarium) -> u32 {

    }
    fn get_fish_count(aquarium: Aquarium) -> u32 {

    }
    fn is_full(aquarium: Aquarium) -> bool {

    }
}


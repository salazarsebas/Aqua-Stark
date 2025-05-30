use starknet::{ContractAddress, contract_address_const};
// use Option::{ OptionTrait};
// use array::{ Array, ArrayTrait };


#[derive(Drop, Introspect, Serde, Debug)]
#[dojo::model]
pub struct Aquarium {
    #[key]
    pub id: u64,
    pub owner: ContractAddress,
    pub max_capacity: u32,
    pub cleanliness: u32, // 0-100 scale
    pub housed_fish: Array::<u64>, // Array of fish IDs
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

    fn add_fish(mut aquarium: Aquarium, fish_id: u64) -> Aquarium {
        // add fish to an aquarium

        let number_of_fishes_in_aquarium = aquarium.housed_fish.len();
        assert!(number_of_fishes_in_aquarium < aquarium.max_capacity, "Aquarium is full");
        aquarium.housed_fish.append(fish_id);
        return aquarium;
    }
    fn remove_fish(mut aquarium: Aquarium, fish_id: u64) -> Aquarium{

        // let len_of_fishes = aquarium.housed_fish.len();
        // assert!(len_of_fishes> 0, "No fish to remove");
        // let last_fish_id = aquarium.housed_fish[len_of_fishes - 1];
        // let mut index = 0;
        // let mut target_index = Option::None;
        // while index < len_of_fishes {
        //     if *aquarium.housed_fish.at(index) == fish_id {
        //         target_index = Option::Some(index);
        //         break;
        //     }
        //     index += 1;
        // };

        // let mut new_housed_aquarium_fishes_id = ArrayTrait::<u64>::new();
        // index = 0;
        // while index < (len_of_fishes - 1 ){

        //     if index == target_index.unwrap() {
        //         new_housed_aquarium_fishes_id.append(@last_fish_id);
        //     }
        //     new_housed_aquarium_fishes_id.append(aquarium.housed_fish[index]);
        //     index += 1;
        // };
        // aquarium.housed_fish = *new_housed_aquarium_fishes_id;

        let len_of_aquarium_fishes = aquarium.housed_fish.len();
        assert!(len_of_aquarium_fishes > 0, "No fish to remove");
        let mut index = 0;
        let mut new_fishes_id = array![];
        while index < len_of_aquarium_fishes {
            let gotten_aquarium_fish_id = *aquarium.housed_fish.at(index);

            if gotten_aquarium_fish_id != fish_id {
                new_fishes_id.append(gotten_aquarium_fish_id);
            }
            index += 1;
        };
        aquarium.housed_fish = new_fishes_id;
        return aquarium;
    }
    fn clean(mut aquarium: Aquarium, amount: u32) -> Aquarium {
        Aquarium {
            id: 0,
            owner: contract_address_const::<0>(),
            max_capacity: 0,
            cleanliness: 100, 
            housed_fish: array![],
        }
    }
    fn update_cleanliness(mut aquarium: Aquarium, hours_passed: u32) -> Aquarium {
        Aquarium {
            id: 0,
            owner: contract_address_const::<0>(),
            max_capacity: 0,
            cleanliness: 100,
            housed_fish: array![],
        }
    }
    // fn get_cleanliness(aquarium: Aquarium) -> u32 {
    //     0_u32
    // }
    // fn get_capacity(aquarium: Aquarium) -> u32 {
    //     0_u32
    // }
    // fn get_fish_count(aquarium: Aquarium) -> u32 {
    //     0_u32
    // }
    // fn is_full(aquarium: Aquarium) -> bool {
    //     true
    // }
}


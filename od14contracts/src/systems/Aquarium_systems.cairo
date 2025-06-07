



#[dojo::contract]
pub mod Aquarium {

    use dojo::model::ModelStorage;
    use starknet::{ContractAddress, get_caller_address};
    use aqua_stark_od::models::aquarium_model::{Aquarium, AquariumGetter, AquariumChanger,};
    // use aqua_stark_od::interfaces::IAquarium::IAquarium;

    #[abi(embed_v0)]
    #[generate_trait]
    impl AquariumImpl<ContractState> of IAquarium<ContractState> {
        // fn create_aquarium(ref self: ContractState, aquarium_id: u256, owner: ContractAddress, max_capacity: u32) -> Aquarium {
        //     let mut world = self.world_default();
        //     let mut aquarium: Aquarium = world.read_model(aquarium_id);
        //     aquarium = AquariumTrait::create_aquarium(aquarium, owner, max_capacity);
        //     world.write_model(@aquarium);
        //     aquarium
        // }

        // fn add_fish(ref self: ContractState, aquarium_id: u256, fish_id: u64) {
        //     let mut world = self.world_default();
        //     let mut aquarium: Aquarium = world.read_model(aquarium_id);
        //     aquarium = AquariumTrait::add_fish(aquarium, fish_id);
        //     world.write_model(@aquarium);
        // }

        // fn remove_fish(ref self: ContractState, aquarium_id: u256, fish_id: u64) {
        //     let mut world = self.world_default();
        //     let mut aquarium: Aquarium = world.read_model(aquarium_id);
        //     aquarium = AquariumTrait::remove_fish(aquarium, fish_id);
        //     world.write_model(@aquarium);
        // }

        // fn clean(ref self: ContractState, aquarium_id: u256, amount: u32) {
        //     let mut world = self.world_default();
        //     let caller = get_caller_address();
        //     let mut aquarium: Aquarium = world.read_model(aquarium_id);
        //     aquarium = AquariumTrait::clean(aquarium, amount, caller);
        //     world.write_model(@aquarium);
        // }

        // fn update_cleanliness(ref self: ContractState, aquarium_id: u256, hours_passed: u32) {
        //     let mut world = self.world_default();
        //     let mut aquarium: Aquarium = world.read_model(aquarium_id);
        //     aquarium = AquariumTrait::update_cleanliness(aquarium, hours_passed);
        //     world.write_model(@aquarium);
        // }
    }

    #[generate_trait]
    impl InternalImpl of InternalTrait {
       fn world_default(self: @ContractState) -> dojo::world::WorldStorage {
            self.world(@"dojo_starter")
        }
    } 
}
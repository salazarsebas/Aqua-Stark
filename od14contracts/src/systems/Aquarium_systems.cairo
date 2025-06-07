



#[dojo::contract]
pub mod Aquarium {

    use dojo::model::ModelStorage;
    use dojo::event::EventStorage;
    use starknet::{ContractAddress, get_caller_address};
    use aqua_stark_od::models::aquarium_model::{Aquarium, AquariumId, AquariumGetter, AquariumChanger,};
    use aqua_stark_od::interfaces::i_aquarium::IAquarium;
    use aqua_stark_od::constants::aquarium_constants::AQUARIUM_ID_TARGET;
    use aqua_stark_od::events::aquarium_events::{
        AquariumCreated, FishAdded, FishRemoved, AquariumCleaned, CleanlinessUpdated
    };

    // since it is a constract , it can have a constructor
    #[constructor]
    fn constructor(ref self: ContractState) {
        // initialize the world storage
        let mut world = self.world_default();
        // create a default aquarium counter
        let aquarium_counter = AquariumId {
            id: AQUARIUM_ID_TARGET,
            count: 0_u256,
        };
        // write the aquarium counter to the world storage
        world.write_model(@aquarium_counter);

    }

    #[abi(embed_v0)]
    impl AquariumImpl of IAquarium<ContractState> {
        fn create_aquarium(ref self: ContractState, aquarium_id: u256, owner: ContractAddress, max_capacity: u32) -> u256 {
            // get the world
            let mut world = self.world_default();
            // read the aquarium counter
            let mut aquarium_counter: AquariumId = world.read_model(AQUARIUM_ID_TARGET);
            // increment the aquarium counter
            aquarium_counter.count += 1_u256;
            // write the updated aquarium counter back to the world storage
            world.write_model(@aquarium_counter);
            // create a new aquarium
            let new_aquarium = AquariumChanger::create_aquarium(aquarium_id, owner, max_capacity);
            // write the new aquarium to the world storage
            world.write_model(@new_aquarium);
            // return the new aquarium id

            world.emit_event(
                @AquariumCreated {
                    id: aquarium_id,
                    owner: owner,
                    max_capacity: max_capacity,
                    cleanliness: new_aquarium.cleanliness,
                }
            );
            return aquarium_counter.count;
        }

        fn add_fish(ref self: ContractState, aquarium_id: u256, fish_id: u64) -> bool {
            // get the world
            let mut world = self.world_default();
            // read the aquarium
            let mut aquarium: Aquarium = world.read_model(aquarium_id);
            // add the fish to the aquarium
            aquarium.add_fish(fish_id);
            // write the updated aquarium back to the world storage
            world.write_model(@aquarium);

            world.emit_event(
                @FishAdded {
                    aquarium_id: aquarium_id,
                    fish_id: fish_id,
                }
            );
            return true;
        }

            
    }

    #[generate_trait]
    impl InternalImpl of InternalTrait {
       fn world_default(self: @ContractState) -> dojo::world::WorldStorage {
            self.world(@"dojo_starter")
        }
    } 
}
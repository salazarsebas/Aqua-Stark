



#[dojo::contract]
pub mod Aquarium {

    use dojo::model::ModelStorage;
    use starknet::{ContractAddress, get_caller_address};
    use aqua_stark_od::models::aquarium_model::{Aquarium, AquariumId, AquariumGetter, AquariumChanger,};
    use aqua_stark_od::interfaces::i_aquarium::IAquarium;
    use aqua_stark_od::constants::aquarium_constants::AQUARIUM_ID_TARGET;

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

            0
        }
            
    }

    #[generate_trait]
    impl InternalImpl of InternalTrait {
       fn world_default(self: @ContractState) -> dojo::world::WorldStorage {
            self.world(@"dojo_starter")
        }
    } 
}
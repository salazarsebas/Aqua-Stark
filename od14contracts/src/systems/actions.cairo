// use dojo_starter::models::{Direction, Position};

// // define the interface
// #[starknet::interface]
// pub trait IActions<T> {
//     fn spawn(ref self: T);
//     fn move(ref self: T, direction: Direction);
// }

// // dojo decorator
// #[dojo::contract]
// pub mod actions {
//     use super::{IActions, Direction, Position, next_position};
//     use starknet::{ContractAddress, get_caller_address};
//     use dojo_starter::models::{Vec2, Moves};

//     use dojo::model::{ModelStorage};
//     use dojo::event::EventStorage;

//     #[derive(Copy, Drop, Serde)]
//     #[dojo::event]
//     pub struct Moved {
//         #[key]
//         pub player: ContractAddress,
//         pub direction: Direction,
//     }

//     #[abi(embed_v0)]
//     impl ActionsImpl of IActions<ContractState> {
//         fn spawn(ref self: ContractState) {
//             // Get the default world.
//             let mut world = self.world_default();

//             // Get the address of the current caller, possibly the player's address.
//             let player = get_caller_address();
//             // Retrieve the player's current position from the world.
//             let position: Position = world.read_model(player);

//             // Update the world state with the new data.

//             // 1. Move the player's position 10 units in both the x and y direction.
//             let new_position = Position {
//                 player, vec: Vec2 { x: position.vec.x + 10, y: position.vec.y + 10 },
//             };

//             // Write the new position to the world.
//             world.write_model(@new_position);

//             // 2. Set the player's remaining moves to 100.
//             let moves = Moves {
//                 player, remaining: 100, last_direction: Option::None, can_move: true,
//             };

//             // Write the new moves to the world.
//             world.write_model(@moves);
//         }

//         // Implementation of the move function for the ContractState struct.
//         fn move(ref self: ContractState, direction: Direction) {
//             // Get the address of the current caller, possibly the player's address.

//             let mut world = self.world_default();

//             let player = get_caller_address();

//             // Retrieve the player's current position and moves data from the world.
//             let position: Position = world.read_model(player);
//             let mut moves: Moves = world.read_model(player);
//             // if player hasn't spawn, read returns model default values. This leads to sub
//             overflow // afterwards.
//             // Plus it's generally considered as a good pratice to fast-return on matching
//             // conditions.
//             if !moves.can_move {
//                 return;
//             }

//             // Deduct one from the player's remaining moves.
//             moves.remaining -= 1;

//             // Update the last direction the player moved in.
//             moves.last_direction = Option::Some(direction);

//             // Calculate the player's next position based on the provided direction.
//             let next = next_position(position, moves.last_direction);

//             // Write the new position to the world.
//             world.write_model(@next);

//             // Write the new moves to the world.
//             world.write_model(@moves);

//             // Emit an event to the world to notify about the player's move.
//             world.emit_event(@Moved { player, direction });
//         }
//     }

//     #[generate_trait]
//     impl InternalImpl of InternalTrait {
//         /// Use the default namespace "dojo_starter". This function is handy since the ByteArray
//         /// can't be const.
//         fn world_default(self: @ContractState) -> dojo::world::WorldStorage {
//             self.world(@"dojo_starter")
//         }
//     }
// }

// // Define function like this:
// fn next_position(mut position: Position, direction: Option<Direction>) -> Position {
//     match direction {
//         Option::None => { return position; },
//         Option::Some(d) => match d {
//             Direction::Left => { position.vec.x -= 1; },
//             Direction::Right => { position.vec.x += 1; },
//             Direction::Up => { position.vec.y -= 1; },
//             Direction::Down => { position.vec.y += 1; },
//         },
//     };
//     position
// }

#[dojo::contract]
pub mod Actions {
    use aqua_stark_od::constants::aquarium_constants::AQUARIUM_ID_TARGET;
    use aqua_stark_od::events::aquarium_events::{
        AquariumCleaned, AquariumCreated, CleanlinessUpdated, FishAdded, FishRemoved,
    };
    use aqua_stark_od::interfaces::i_actions::IActions;
    use aqua_stark_od::models::aquarium_model::{Aquarium, AquariumId, IAquarium};
    use dojo::event::EventStorage;
    use dojo::model::{ModelStorage, ModelValueStorage};
    use dojo::world::WorldStorage;
    use starknet::{ContractAddress, get_caller_address};

    #[constructor]
    fn constructor(ref self: ContractState) {
        // initialize the aquarium_id model

        let mut world = self.world_default();
        let aquarium_id = AquariumId { id: AQUARIUM_ID_TARGET, count: 0_u256 };
        world.write_model(@aquarium_id);
    }

    #[abi(embed_v0)]
    pub impl ActionsImpl of IActions<ContractState> {
        fn create_aquarium(
            ref self: ContractState, aquarium_id: u256, owner: ContractAddress, max_capacity: u32,
        ) -> u256 {
            let mut world = self.world_default();

            // get the aquarium_id model
            let mut aquarium_id_model: AquariumId = world.read_model(AQUARIUM_ID_TARGET);

            // generate the id for the new aquarium
            let new_aqurium_id: u256 = aquarium_id_model.count + 1;

            // generate the new aquarium
            let new_aquarium: Aquarium = IAquarium::create_aquarium(
                new_aqurium_id, owner, max_capacity,
            );

            // save the aquarium
            world.write_model(@new_aquarium);

            // save the aquarium_id model
            aquarium_id_model.count = new_aqurium_id;
            world.write_model(@aquarium_id_model);

            // emit an event to notify about the new aquarium creation
            world
                .emit_event(
                    @AquariumCreated {
                        id: new_aqurium_id,
                        owner,
                        max_capacity,
                        cleanliness: new_aquarium.cleanliness,
                    },
                );
            return new_aqurium_id;
        }

        fn add_fish(ref self: ContractState, aquarium_id: u64, fish_id: u64) -> bool {
            let mut found_aquarium = self.aquarium_checker(aquarium_id);

            // call on the Aquarium interface
            found_aquarium = IAquarium::add_fish(found_aquarium, fish_id);

            let mut world = self.world_default();

            world.emit_event(@FishAdded { aquarium_id, fish_id });

            world.write_model(@found_aquarium);

            return true;
        }

        fn remove_fish(ref self: ContractState, aquarium_id: u64, fish_id: u64) -> bool {
            let mut found_aquarium = self.aquarium_checker(aquarium_id);

            found_aquarium = IAquarium::remove_fish(found_aquarium, fish_id);

            let mut world = self.world_default();

            world.emit_event(@FishRemoved { aquarium_id, fish_id });

            world.write_model(@found_aquarium);

            return true;
        }

        fn clean(ref self: ContractState, aquarium_id: u64, amount: u32) {
            let caller = get_caller_address();

            let mut found_aquarium = self.aquarium_checker(aquarium_id);

            found_aquarium = IAquarium::clean(found_aquarium, amount, caller);

            let mut world = self.world_default();

            world.write_model(@found_aquarium);

            world
                .emit_event(
                    @AquariumCleaned { aquarium_id, new_cleanliness: found_aquarium.cleanliness },
                );
        }

        fn update_cleanliness(ref self: ContractState, aquarium_id: u64, hours_passed: u32) {
            let mut found_aquarium = self.aquarium_checker(aquarium_id);

            found_aquarium = IAquarium::update_cleanliness(found_aquarium, hours_passed);

            let mut world = self.world_default();

            world.write_model(@found_aquarium);

            world
                .emit_event(
                    @CleanlinessUpdated {
                        aquarium_id, new_cleanliness: found_aquarium.cleanliness,
                    },
                );
        }

        fn get_cleanliness(self: @ContractState, aquarium_id: u64) -> u32 {
            let world = self.world_default();
            let found_aquarium: Aquarium = world.read_model(aquarium_id);
            return found_aquarium.cleanliness;
        }
        fn get_capacity(self: @ContractState, aquarium_id: u64) -> u32 {
            let world = self.world_default();
            let found_aquarium: Aquarium = world.read_model(aquarium_id);
            return found_aquarium.max_capacity;
        }
        fn get_fish_count(self: @ContractState, aquarium_id: u64) -> u32 {
            let world = self.world_default();
            let found_aquarium: Aquarium = world.read_model(aquarium_id);
            return found_aquarium.housed_fish.len();
        }
        fn is_full(self: @ContractState, aquarium_id: u64) -> bool {
            let world = self.world_default();
            let found_aquarium: Aquarium = world.read_model(aquarium_id);

            let housed_fishes = found_aquarium.housed_fish.len();
            let aqua_max_capacity = found_aquarium.max_capacity;

            return housed_fishes >= aqua_max_capacity;
        }
    }


    #[generate_trait]
    impl InternalImpl of InternalTrait {
        /// Use the default namespace "aqua_stark_od".
        fn world_default(self: @ContractState) -> dojo::world::WorldStorage {
            self.world(@"aquastarkod")
        }

        fn aquarium_checker(ref self: ContractState, aquarium_id: u64) -> Aquarium {
            let world = self.world_default();
            let mut found_aquarium: Aquarium = world.read_model(aquarium_id);
            assert!(found_aquarium.id > 0, "could not locate aqua");

            return found_aquarium;
        }
    }
}

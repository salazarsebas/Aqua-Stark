// dojo decorator
#[dojo::contract]
pub mod AquaStark {
    use aqua_stark::interfaces::IAquaStark::{IAquaStark};
    use starknet::{
        ContractAddress, get_caller_address, get_block_timestamp, contract_address_const,
    };
    use aqua_stark::models::player_model::{
        Player, PlayerTrait, PlayerCounter, UsernameToAddress, AddressToUsername,
    };
    use aqua_stark::models::aquarium_model::{
        Aquarium, AquariumTrait, AquariumCounter, AquariumOwner,
    };
    use aqua_stark::models::decoration_model::{Decoration, DecorationCounter, DecorationTrait};
    use aqua_stark::models::fish_model::{Fish, FishCounter, Species, FishTrait, FishOwner};

    use dojo::model::{ModelStorage};
    use dojo::event::EventStorage;

    #[derive(Copy, Drop, Serde)]
    #[dojo::event]
    pub struct PlayerCreated {
        #[key]
        pub username: felt252,
        #[key]
        pub player: ContractAddress,
        pub timestamp: u64,
    }

    #[abi(embed_v0)]
    impl AquaStarkImpl of IAquaStark<ContractState> {
        fn get_username_from_address(self: @ContractState, address: ContractAddress) -> felt252 {
            let mut world = self.world_default();

            let address_map: AddressToUsername = world.read_model(address);

            address_map.username
        }
        fn create_new_player_id(ref self: ContractState) -> u256 {
            let mut world = self.world_default();
            let mut game_counter: PlayerCounter = world.read_model('v0');
            let new_val = game_counter.current_val + 1;
            game_counter.current_val = new_val;
            world.write_model(@game_counter);
            new_val
        }

        fn create_decoration_id(ref self: ContractState) -> u256 {
            let mut world = self.world_default();
            let mut decoration_counter: DecorationCounter = world.read_model('v0');
            let new_val = decoration_counter.current_val + 1;
            decoration_counter.current_val = new_val;
            world.write_model(@decoration_counter);
            new_val
        }

        fn create_aquarium_id(ref self: ContractState) -> u256 {
            let mut world = self.world_default();
            let mut aquarium_counter: AquariumCounter = world.read_model('v0');
            let new_val = aquarium_counter.current_val + 1;
            aquarium_counter.current_val = new_val;
            world.write_model(@aquarium_counter);
            new_val
        }

        fn create_fish_id(ref self: ContractState) -> u256 {
            let mut world = self.world_default();
            let mut fish_counter: FishCounter = world.read_model('v0');
            let new_val = fish_counter.current_val + 1;
            fish_counter.current_val = new_val;
            world.write_model(@fish_counter);
            new_val
        }

        fn new_aquarium(
            ref self: ContractState,
            owner: ContractAddress,
            max_capacity: u32,
            max_decorations: u32,
        ) -> Aquarium {
            let mut world = self.world_default();
            let caller = get_caller_address();
            let aquarium_id = self.create_aquarium_id();
            let mut aquarium: Aquarium = world.read_model(aquarium_id);
            aquarium =
                AquariumTrait::create_aquarium(aquarium_id, owner, max_capacity, max_decorations);

            let mut aquarium_owner: AquariumOwner = world.read_model(aquarium_id);
            aquarium_owner.owner = caller;

            let mut player: Player = world.read_model(caller);
            player.aquarium_count += 1;
            player.player_aquariums.append(aquarium.id);
            world.write_model(@player);

            world.write_model(@aquarium_owner);
            world.write_model(@aquarium);

            aquarium
        }

        fn add_fish_to_aquarium(ref self: ContractState, mut fish: Fish, aquarium_id: u256) {
            let mut world = self.world_default();
            let mut aquarium: Aquarium = world.read_model(aquarium_id);
            assert(aquarium.max_capacity < aquarium.housed_fish.len(), 'Aquarium full');
            assert(fish.aquarium_id == aquarium_id, 'Fish in aquarium');
            assert(fish.owner == get_caller_address(), 'You do not own this fish');

            AquariumTrait::add_fish(aquarium.clone(), fish.id);
            world.write_model(@aquarium);
        }

        fn add_decoration_to_aquarium(
            ref self: ContractState, mut decoration: Decoration, aquarium_id: u256,
        ) {
            let mut world = self.world_default();
            let mut aquarium: Aquarium = world.read_model(aquarium_id);
            assert(
                aquarium.max_decorations > aquarium.housed_decorations.len(),
                'Aquarium deco limit reached',
            );
            assert(decoration.aquarium_id == aquarium_id, 'Deco in aquarium');
            assert(decoration.owner == get_caller_address(), 'You do not own this deco');
            AquariumTrait::add_decoration(aquarium.clone(), decoration.id);
            world.write_model(@aquarium);
        }

        fn new_decoration(
            ref self: ContractState,
            aquarium_id: u256,
            name: felt252,
            description: felt252,
            price: u256,
            rarity: felt252,
        ) -> Decoration {
            let mut world = self.world_default();
            let aquarium = self.get_aquarium(aquarium_id);
            assert(aquarium.owner == get_caller_address(), 'You do not own this aquarium');
            let id = self.create_decoration_id();

            let mut decoration = world.read_model(id);

            decoration =
                DecorationTrait::decoration(
                    decoration, id, aquarium_id, name, description, price, rarity,
                );

            let mut player: Player = world.read_model(get_caller_address());
            player.decoration_count += 1;
            player.player_decorations.append(decoration.id);
            world.write_model(@player);

            world.write_model(@decoration);

            decoration
        }

        fn new_fish(ref self: ContractState, aquarium_id: u256, species: Species) -> Fish {
            let mut world = self.world_default();
            let caller = get_caller_address();
            let aquarium = self.get_aquarium(aquarium_id);
            assert(aquarium.owner == get_caller_address(), 'You do not own this aquarium');
            let fish_id = self.create_fish_id();
            let mut fish: Fish = world.read_model(fish_id);

            fish = FishTrait::create_fish_by_species(fish, aquarium_id, caller, species);

            let mut fish_owner: FishOwner = world.read_model(fish_id);
            fish_owner.owner = caller;
            let mut player: Player = world.read_model(caller);
            player.fish_count += 1;
            player.player_fishes.append(fish_id);
            world.write_model(@player);
            world.write_model(@fish_owner);
            world.write_model(@fish);
            fish
        }

        fn register(ref self: ContractState, username: felt252) {
            let mut world = self.world_default();
            let caller = get_caller_address();

            // Constants
            let zero_address: ContractAddress = contract_address_const::<0x0>();

            // --- Validations ---

            // Username should not be zero
            assert(username != 0, 'USERNAME CANNOT BE ZERO');

            // Username must be unique (not already registered)
            let existing_player: UsernameToAddress = world.read_model(username);
            assert(existing_player.address == zero_address, 'USERNAME ALREADY TAKEN');

            // Address must not already be registered
            let existing_username = self.get_username_from_address(caller);
            assert(existing_username == 0, 'USERNAME ALREADY CREATED');
            // --- Player Registration ---

            let id = self.create_new_player_id();

            let mut new_player = PlayerTrait::register_player(id, username, caller, 0, 0);

            // --- Username ↔ Address Mappings ---

            let username_to_address = UsernameToAddress { username, address: caller };
            let address_to_username = AddressToUsername { address: caller, username };

            // --- Aquarium Setup ---

            let aquarium = self.new_aquarium(caller, 10, 5);
            new_player.aquarium_count += 1;
            new_player.player_aquariums.append(aquarium.id);

            let fish = self.new_fish(aquarium.id, Species::GoldFish);
            new_player.fish_count += 1;
            new_player.player_fishes.append(fish.id);

            let decoration = self.new_decoration(aquarium.id, 'Pebbles', 'Shiny rocks', 0, 0);
            new_player.decoration_count += 1;
            new_player.player_decorations.append(decoration.id);

            // --- Persist to Storage ---

            world.write_model(@new_player);
            world.write_model(@username_to_address);
            world.write_model(@address_to_username);

            // --- Emit Event ---
            world
                .emit_event(
                    @PlayerCreated { username, player: caller, timestamp: get_block_timestamp() },
                );
        }


        fn get_player(self: @ContractState, address: ContractAddress) -> Player {
            let mut world = self.world_default();
            let player: Player = world.read_model(address);
            player
        }
        fn get_fish(self: @ContractState, id: u256) -> Fish {
            let mut world = self.world_default();
            let fish: Fish = world.read_model(id);
            fish
        }
        fn get_aquarium(self: @ContractState, id: u256) -> Aquarium {
            let mut world = self.world_default();
            let aquarium: Aquarium = world.read_model(id);
            aquarium
        }
        fn get_decoration(self: @ContractState, id: u256) -> Decoration {
            let mut world = self.world_default();
            let decoration: Decoration = world.read_model(id);
            decoration
        }
        fn get_player_fishes(self: @ContractState, player: ContractAddress) -> Array<Fish> {
            let mut world = self.world_default();
            let player_model: Player = world.read_model(player);
            let mut fishes: Array<Fish> = array![];
            for fish_id in player_model.player_fishes {
                let fish: Fish = world.read_model(fish_id);
                fishes.append(fish);
            };
            fishes
        }
        fn get_player_aquariums(self: @ContractState, player: ContractAddress) -> Array<Aquarium> {
            let mut world = self.world_default();
            let player_model: Player = world.read_model(player);
            let mut aquariums: Array<Aquarium> = array![];
            for aquarium_id in player_model.player_aquariums {
                let aquarium: Aquarium = world.read_model(aquarium_id);
                aquariums.append(aquarium);
            };
            aquariums
        }
        fn get_player_decorations(
            self: @ContractState, player: ContractAddress,
        ) -> Array<Decoration> {
            let mut world = self.world_default();
            let player_model: Player = world.read_model(player);
            let mut decorations: Array<Decoration> = array![];
            for decoration_id in player_model.player_decorations {
                let decoration: Decoration = world.read_model(decoration_id);
                decorations.append(decoration);
            };
            decorations
        }
        fn get_player_fish_count(self: @ContractState, player: ContractAddress) -> u32 {
            let mut world = self.world_default();
            let player_model: Player = world.read_model(player);
            player_model.fish_count
        }
        fn get_player_aquarium_count(self: @ContractState, player: ContractAddress) -> u32 {
            let mut world = self.world_default();
            let player_model: Player = world.read_model(player);
            player_model.aquarium_count
        }
        fn get_player_decoration_count(self: @ContractState, player: ContractAddress) -> u32 {
            let mut world = self.world_default();
            let player_model: Player = world.read_model(player);
            player_model.decoration_count
        }
    }

    #[generate_trait]
    impl InternalImpl of InternalTrait {
        /// Use the default namespace "aqua_stark". This function is handy since the ByteArray
        /// can't be const.
        fn world_default(self: @ContractState) -> dojo::world::WorldStorage {
            self.world(@"aqua_stark")
        }
    }
}

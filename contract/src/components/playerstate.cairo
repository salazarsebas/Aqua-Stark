use starknet::ContractAddress;

const PLAYER_ID_TARGET: felt252 = 'PLAYER';

#[starknet::interface]
pub trait IPlayerState<ContractState> {
    fn register_player(ref self: ContractState, wallet: ContractAddress) -> u64;
    fn is_player_registered(self: @ContractState, wallet: ContractAddress) -> bool;
    fn get_player_id(self: @ContractState, wallet: ContractAddress) -> u64;
    fn is_player_verified(self: @ContractState, wallet: ContractAddress) -> bool;
    fn verify_player(self: @ContractState, wallet: ContractAddress) -> bool;
}

#[dojo::contract]
pub mod PlayerState {
    use super::*;
    use starknet::{get_block_timestamp, contract_address_const};
    use aqua_stark::entities::player::Player;
    use aqua_stark::entities::base::{Id, CustomErrors};
    use dojo::model::ModelStorage;

    #[abi(embed_v0)]
    impl PlayerStateImpl of IPlayerState<ContractState> {
        fn register_player(ref self: ContractState, wallet: ContractAddress) -> u64 {
            let mut world = self.world_default();

            let existing: Player = world.read_model(wallet);
            assert(existing.registered_at == 0_u64, CustomErrors::ALREADY_REGISTERED);

            let new_id = self.generate_player_id();

            let player = Player {
                wallet,
                id: new_id,
                inventory_ref: contract_address_const::<0>(),
                is_verified: false,
                registered_at: get_block_timestamp(),
            };

            world.write_model(@player);

            new_id
        }


        fn verify_player(self: @ContractState, wallet: ContractAddress) -> bool {
            let mut world = self.world_default();
            let mut player: Player = world.read_model(wallet);
            player.is_verified = true;
            world.write_model(@player);
            true
        }

        fn is_player_registered(self: @ContractState, wallet: ContractAddress) -> bool {
            let mut world = self.world_default();
            let player: Player = world.read_model(wallet);
            player.id > 0_u64 && player.wallet != contract_address_const::<0>()
        }

        fn is_player_verified(self: @ContractState, wallet: ContractAddress) -> bool {
            let mut world = self.world_default();
            let player: Player = world.read_model(wallet);
            player.is_verified
        }

        fn get_player_id(self: @ContractState, wallet: ContractAddress) -> u64 {
            let mut world = self.world_default();
            let player: Player = world.read_model(wallet);
            player.id
        }
    }

    #[generate_trait]
    impl InternalImpl of InternalTrait {
        fn world_default(self: @ContractState) -> dojo::world::WorldStorage {
            self.world(@"aqua_stark")
        }

        fn generate_player_id(self: @ContractState) -> u64 {
            let mut world = self.world_default();
            let mut id_struct: Id = world.read_model(PLAYER_ID_TARGET);
            let new_id = id_struct.nonce + 1;
            id_struct.nonce = new_id;
            world.write_model(@id_struct);
            new_id
        }
    }
}

use starknet::ContractAddress;
use array::ArrayTrait;
use traits::Into;

#[derive(Copy, Drop, Serde, Debug)]
#[dojo::model]
pub struct Player {
    #[key]
    pub id: u64,
    pub wallet: ContractAddress,
    pub inventory_ref: ContractAddress,
}

mod tests {
    use super::player::Player;
    use super::*;

    #[test]
    fn test_player_creation() {
        let player = Player {
            id: 1_u64,
            wallet: ContractAddress::default(),
            inventory_ref: ContractAddress::default(),
        };
        assert(player.id == 1_u64, 'Player ID should match');
    }
}

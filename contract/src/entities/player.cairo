use starknet::{ContractAddress};

#[derive(Copy, Drop, Serde, Debug)]
#[dojo::model]
pub struct Player {
    #[key]
    pub wallet: ContractAddress,
    pub id: u64,
    pub inventory_ref: ContractAddress,
    pub is_verified: bool,
    pub registered_at: u64,
}

#[cfg(test)]
mod tests {
    use super::Player;
    use super::*;
    use starknet::{contract_address_const, get_block_timestamp};

    fn zero_address() -> ContractAddress {
        contract_address_const::<0>()
    }

    #[test]
    fn test_player_creation() {
        let time = get_block_timestamp();
        let player = Player {
            wallet: zero_address(),
            id: 1_u64,
            inventory_ref: zero_address(),
            is_verified: false,
            registered_at: time,
        };
        assert(player.id == 1, 'Player ID should match');
    }
}

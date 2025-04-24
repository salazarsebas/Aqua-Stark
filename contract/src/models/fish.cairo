use starknet::ContractAddress;
use array::ArrayTrait;
use traits::Into;

#[derive(Copy, Drop, Serde, Debug)]
#[dojo::model]
pub struct Fish {
    #[key]
    pub id: u64,
    pub fish_type: u32,
    pub age: u32, // in days
    pub hunger_level: u32, // 0-100 scale
    pub health: u32, // 0-100 scale
    pub growth: u32, // 0-100 scale
    pub owner: ContractAddress,
}

#[generate_trait]
impl FishImpl of FishTrait {
    fn is_dead(self: @Fish) -> bool {
        self.health == 0
    }

    fn is_hungry(self: @Fish) -> bool {
        self.hunger_level < 20
    }

    fn is_fully_grown(self: @Fish) -> bool {
        self.growth >= 100
    }

    fn can_eat(self: @Fish) -> bool {
        self.hunger_level < 100
    }
}


mod tests {
    use super::fish::Fish;
    use super::*;

    #[test]
    fn test_fish_creation() {
        let fish = Fish {
            id: 1_u64,
            fish_type: 1_u32,
            age: 0,
            hunger_level: 0,
            health: 100,
            growth: 0,
            owner: ContractAddress::default(),
        };
        assert(fish.fish_type == 1, 'Fish type should match');
    }
}

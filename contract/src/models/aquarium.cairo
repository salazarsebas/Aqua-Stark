use starknet::ContractAddress;
use array::ArrayTrait;
use traits::Into;

#[derive(Copy, Drop, Serde, Debug)]
#[dojo::model]
pub struct Aquarium {
    #[key]
    pub id: u64,
    pub owner: ContractAddress,
    pub max_capacity: u32,
    pub cleanliness: u32, // 0-100 scale
    pub housed_fish: Array<u64>,
}

#[generate_trait]
impl AquariumImpl of AquariumTrait {
    fn is_full(self: @Aquarium) -> bool {
        self.housed_fish.len() >= self.max_capacity
    }
}

#[cfg(test)]
mod tests {
    use super::aquarium::Aquarium;
    use super::*;

    #[test]
    fn test_aquarium_creation() {
        let aquarium = Aquarium {
            id: 1_u64,
            owner: ContractAddress::default(),
            max_capacity: 10,
            cleanliness: 100,
            housed_fish: ArrayTrait::new(),
        };
        assert(aquarium.max_capacity == 10, 'Aquarium capacity should match');
    }
}

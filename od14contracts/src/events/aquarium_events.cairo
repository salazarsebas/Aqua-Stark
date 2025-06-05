

use starknet::ContractAddress;

#[derive(Copy, Drop, Serde)]
#[dojo::event]
pub struct AquariumCreated {
    #[key]
    pub id: u256,
    pub owner: ContractAddress,
    pub max_capacity: u32,
    pub cleanliness: u32
}
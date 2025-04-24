use starknet::ContractAddress;

// Structs
#[derive(Copy, Drop, Serde, Debug)]
#[dojo::model]
pub struct Id {
    #[key]
    pub target: felt252,
    pub nonce: u64,
}

// Events
#[derive(Drop, Serde)]
#[dojo::event]
pub struct AquariumCreated {
    pub id: u64,
    pub owner: ContractAddress,
    pub max_capacity: u32,
}

#[derive(Drop, Serde)]
#[dojo::event]
pub struct AquariumCleaned {
    pub aquarium_id: u64,
    pub amount: u32,
    pub new_cleanliness: u32,
}

#[derive(Drop, Serde)]
#[dojo::event]
pub struct CleanlinessUpdated {
    pub aquarium_id: u64,
    pub hours_passed: u32,
    pub new_cleanliness: u32,
}

#[derive(Drop, Serde)]
#[dojo::event]
pub struct FishAdded {
    pub aquarium_id: u64,
    pub fish_id: u64,
}

#[derive(Drop, Serde)]
#[dojo::event]
pub struct FishDamaged {
    pub aquarium_id: u64,
    pub fish_id: u64,
    pub damage_amount: u32,
}

#[derive(Drop, Serde)]
#[dojo::event]
pub struct FishRemoved {
    pub aquarium_id: u64,
    pub fish_id: u64,
}

// Fish Events
#[derive(Drop, Serde)]
#[dojo::event]
pub struct FishCreated {
    pub id: u64,
    pub owner: ContractAddress,
    pub fish_type: u32,
}

#[derive(Drop, Serde)]
#[dojo::event]
pub struct FishFed {
    pub fish_id: u64,
    pub amount: u32,
    pub new_hunger: u32,
}

#[derive(Drop, Serde)]
#[dojo::event]
pub struct FishGrown {
    pub fish_id: u64,
    pub amount: u32,
    pub new_growth: u32,
}

#[derive(Drop, Serde)]
#[dojo::event]
pub struct FishHealed {
    pub fish_id: u64,
    pub amount: u32,
    pub new_health: u32,
}

#[derive(Drop, Serde)]
#[dojo::event]
pub struct FishHungerUpdated {
    pub fish_id: u64,
    pub hours_passed: u32,
    pub new_hunger: u32,
}

#[derive(Drop, Serde)]
#[dojo::event]
pub struct FishAgeUpdated {
    pub fish_id: u64,
    pub days_passed: u32,
    pub new_age: u32,
}

// Custom Errors
pub mod CustomErrors {
    pub const NOT_OWNER: felt252 = 'CALLER NOT ONWER';
}

pub mod AquariumErrors {
    pub const AQUARIUM_FULL: felt252 = 'AQUARIUM IS FULL';
    pub const INVALID_AQUARIUM_ID: felt252 = 'AQUARIUM WITH ID NOT FOUND';
}

pub mod FishErrors {
    pub const FISH_DEAD: felt252 = 'FISH IS DEAD';
    pub const INVALID_FISH_ID: felt252 = 'FISH WITH ID NOT FOUND';
    pub const INVALID_HEALTH: felt252 = 'INVALID HEALTH VALUE';
    pub const INVALID_HUNGER: felt252 = 'INVALID HUNGER VALUE';
    pub const INVALID_GROWTH: felt252 = 'INVALID GROWTH VALUE';
}

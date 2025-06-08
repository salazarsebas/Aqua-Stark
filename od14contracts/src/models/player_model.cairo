use starknet::ContractAddress;

#[derive(Serde, Copy, Drop, Introspect, PartialEq)]
#[dojo::model]
pub struct Player {
    #[key]
    pub id: u256,
    pub last_login_day: u64, // day number
    pub streak_counter: u64,
    pub rewards_delivered: u64,
}

use crate::systems::ownership::Ownership;
use starknet::ContractAddress;

#[starknet::contract]
mod MockContract {
    use crate::systems::ownership::Ownership;
    use starknet::ContractAddress;

    component!(path: Ownership, storage: ownable, event: OwnableEvent);

    // Ownable Mixin
    #[abi(embed_v0)]
    impl OwnableMixinImpl = Ownership::OwnableImpl<ContractState>;
    impl InternalImpl = Ownership::InternalImpl<ContractState>;

    #[storage]
    pub struct Storage {
        #[substorage(v0)]
        pub ownable: Ownership::Storage
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        #[flat]
        OwnableEvent: Ownership::Event
    }

    #[constructor]
    fn constructor(ref self: ContractState, owner: ContractAddress) {
        self.ownable.initializer(owner);
    }


}


type TestingState = Ownership::ComponentState<MockContract::ContractState>;

impl TestingStateDefault of Default<TestingState> {
    fn default() -> TestingState {
        Ownership::component_state_for_testing()
    }
}

#[test]
fn test_ownership_component() {
    // Test the ownership component
    let mut state: MockContract::ContractState = MockContract::contract_state_for_testing();
    // define test data
    let owner: ContractAddress = 'owner'.try_into().unwrap();
    let second_owner = 'second_owner'.try_into().unwrap();

    // test initializer
    state.ownable.initializer(owner); // add initial owner
    // check if owner matches
    assert(state.ownable.owner() == owner, 'Unknown owner');

    //test transfer owner
    testing::set_contract_address(owner); // cheat caller
    state.ownable.transfer_ownership(second_owner); // transfer ownership
    assert(state.ownable.owner() == second_owner, 'Unknown new owner');

    // test renounce ownership
    testing::set_contract_address(second_owner); // cheat caller
    state.ownable.renounce_ownership(); // renounce ownership
    assert(state.ownable.owner() == 0.try_into().unwrap(), 'not zero owner');
}
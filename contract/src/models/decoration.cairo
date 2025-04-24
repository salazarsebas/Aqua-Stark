use starknet::ContractAddress;
use array::ArrayTrait;
use traits::Into;

#[derive(Copy, Drop, Serde, Debug)]
#[dojo::model]
pub struct Decoration {
    #[key]
    pub id: u3,
    pub decoration_type: u32,
    pub owner: ContractAddress,
}

mod tests {
    use super::decoration::Decoration;
    use super::*;

    #[test]
    fn test_decoration_creation() {
        let decoration = Decoration {
            id: 1_u32, decoration_type: 1, owner: ContractAddress::default(),
        };
        assert(decoration.decoration_type == 1, 'Decoration type should match');
    }
}

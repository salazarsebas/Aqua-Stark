pub mod systems {
    pub mod actions;
    pub mod ownership;
}

pub mod types {
    pub mod status;
    pub mod condition;
    pub mod reward;
    pub mod rarity;
    pub mod types;
}

pub mod components {
    pub mod auction;
    pub mod aquarium;
    pub mod fish;
    pub mod friends;
    pub mod playerstate;
}

pub mod models;

pub mod entities {
    pub mod auction;
    pub mod aquarium;
    pub mod base;
    pub mod decoration;
    pub mod fish;
    pub mod player;
    pub mod friends;
    pub mod mission;
    pub mod achievement;
}

pub mod tests {
    mod mocks {
        pub mod erc20_mock;
    }
    #[cfg(test)]
    mod test_auction;
    #[cfg(test)]
    mod test_aquarium;
    #[cfg(test)]
    mod test_fish;
    #[cfg(test)]
    mod test_ownership;
    #[cfg(test)]
    mod test_utils;
    mod test_world;
    #[cfg(test)]
    mod test_friends;
    #[cfg(test)]
    mod test_playerstate;
}

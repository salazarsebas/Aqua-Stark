pub mod systems {
    pub mod actions;
    pub mod ownership;
}

pub mod components {
    pub mod aquarium;
    pub mod fish;
}

pub mod models;

pub mod entities {
    pub mod aquarium;
    pub mod base;
    pub mod decoration;
    pub mod fish;
    pub mod player;
}

pub mod tests {
    mod test_aquarium;
    mod test_fish;
    mod test_ownership;
    mod test_utils;
    mod test_world;
}

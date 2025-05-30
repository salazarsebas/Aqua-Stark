use dojo::world::WorldStorage;
fn world_default(self: ContractState) -> WorldStorage {
    self.world(@"aqua_stark")
}

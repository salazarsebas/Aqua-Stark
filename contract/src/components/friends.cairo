use dojo_starter::entities::player::Player;

#[starknet::interface]
pub trait IFriends<TContractState> {
    fn send_friend_request(ref self: TContractState, sender: Player, receiver: Player) -> u64;
    fn accept_friend_request(ref self: TContractState, request_id: u64, player: Player);
    fn delete_friend_request(ref self: TContractState, request_id: u64, player: Player);
    fn friends_list(self: @TContractState, player: Player);
}

#[dojo::contract]
pub mod Friends {
    use super::*;
    use dojo_starter::entities::player::Player;
    use dojo_starter::entities::friends::{FriendRequest, FriendRequestCount, FriendRequestStatus, FriendsList};
    use starknet::get_caller_address;
    use dojo::event::EventStorage;
    use dojo::model::ModelStorage;
    // use dojo::world::{IWorldDispatcher, IWorldDispatcherTrait};

    #[derive(Copy, Drop, Serde)]
    #[dojo::event]
    struct FriendRequestSent {
        #[key]
        request_id: u64,
        #[key]
        player: u64,
        sender: u64
    }
    #[derive(Copy, Drop, Serde)]
    #[dojo::event]
    struct FriendRequestAccepted {
        #[key]
        request_id: u64,
        #[key]
        player: u64,
        sender: u64
    }
    #[derive(Copy, Drop, Serde)]
    #[dojo::event]
    struct FriendRequestRejected {
        #[key]
        request_id: u64,
        #[key]
        player: u64,
        sender: u64
    }
    #[derive(Copy, Drop, Serde)]
    #[dojo::event]
    struct FriendRequestDeleted {
        #[key]
        request_id: u64,
        #[key]
        player: u64,
        sender: u64
    }


    #[abi(embed_v0)]
    impl FriendsImpl of IFriends<ContractState> {
        fn send_friend_request(ref self: ContractState, sender: Player, receiver: Player) -> u64 {
            let mut world = self.world_default();

            // Generate new request id from friendrequestcount
            let mut request_count: FriendRequestCount = world.read_model((receiver.id));
            request_count.count = request_count.count + 1;

            // Create new friend request
            let request = FriendRequest {
                player: (request_count.count, receiver.id),
                sender: sender.id,
                sent: false,
                accepted: false,
                status: FriendRequestStatus::PENDING
            };
            
            // Write to world state
            world.write_model(@request);
            // Write new count to world state
            world.write_model(@request_count);

            // Emit event
            let request_event = FriendRequestSent { request_id: request_count.count, player: receiver.id, sender: sender.id };
            world.emit_event(@request_event);

            request_count.count
        }
        fn accept_friend_request(ref self: ContractState, request_id: u64, player: Player){
            let mut world = self.world_default();

            let mut request: FriendRequest = world.read_model((request_id, player.id));
            assert(request.sent, 'Friend Request not found');
            
            request.accepted = true;
            request.status = FriendRequestStatus::ACCEPTED;

            let mut friend_list: FriendsList = world.read_model(player.id);
            friend_list.friends.append(request.sender); 
            
            world.write_model(@request);
            world.write_model(@friend_list);

            // Emit event
            let request_event = FriendRequestAccepted { request_id, player: player.id, sender: request.sender };
            world.emit_event(@request_event);


        }
        fn delete_friend_request(ref self: ContractState, request_id: u64, player: Player){
            let mut world = self.world_default();

            let mut request: FriendRequest = world.read_model((request_id, player.id));
            assert(request.sent, 'Friend Request not found');

            request.sent = false;
            world.write_model(@request);

            // Emit event
            let request_event = FriendRequestDeleted { request_id, player: player.id, sender: request.sender };
            world.emit_event(@request_event);

        }
        fn friends_list(self: @ContractState, player: Player) -> Array<u64>{
            let mut world = self.world_default();

            let mut friend_list: FriendsList = world.read_model(player.id);

            @friend_list.friends
        }

        
    }

    #[generate_trait]
    impl InternalImpl of InternalTrait {
        fn world_default(self: @ContractState) -> dojo::world::WorldStorage {
            // self.world(@"aquastark")
            self.world(@"dojo_starter")
        }
    }
}

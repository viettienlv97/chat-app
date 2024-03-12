import FriendDropdown from "./FriendDropdown";

const AddFriend = () => {
  return (
    <div className="w-full flex justify-between items-center border-b border-gray-400 select-none">
      <div className="pl-4">Add friend to connect</div>
      <div className="flex">
        <button className="btn">Add friend</button>
        <FriendDropdown />
      </div>
    </div>
  );
};

export default AddFriend;

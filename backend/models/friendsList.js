import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const FriendsList = sequelize.define("FriendsList", {
  userId: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  friendIds: {
    type: DataTypes.ARRAY(DataTypes.UUID),
    defaultValue: [],
  },
});

export const createFriendsList = async (userId) => {
  try {
    if (!userId) return null;

    let friendsList = await FriendsList.create({
      userId,
      friendIds: [],
    });

    if (friendsList) return friendsList;
    return null;
  } catch (error) {
    console.log("Error in createFriendsList", error);
  }
};

export const updateFriendsList = async (userId, friendId) => {
  try {
    if (!userId || !friendId) return null;

    let friendsList = await FriendsList.findByPk(userId);

    if (!friendsList) return null;

    let friendIds = friendsList?.friendIds;

    let updatedFriendsList = await friendsList.update({
      friendIds: [...friendIds, friendId],
    });

    if (!updatedFriendsList) return null;

    return updatedFriendsList;
  } catch (error) {
    console.log(error.message);
  }
};

export default FriendsList;

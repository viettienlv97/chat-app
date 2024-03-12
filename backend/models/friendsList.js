import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const FriendsList = sequelize.define('FriendsList', {
    userId: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    friendIds: {
        type: DataTypes.ARRAY(DataTypes.UUID),
        defaultValue: []
    }
})

export default FriendsList
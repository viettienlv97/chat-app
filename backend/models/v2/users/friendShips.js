import { DataTypes } from "sequelize";
import sequelize from "../../../config/db.js";
import User from "./user.js";


const FriendShip = sequelize.define('FriendShips', {
    senderId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    receiverId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    isAccepted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
})

FriendShip.belongsTo(User, {
    foreignKey: 'senderId',
    as: 'senderId'
})
FriendShip.belongsTo(User, {
    foreignKey: 'receiverId',
    as: 'receiverId'
})

export default FriendShip
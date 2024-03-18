import { DataTypes } from 'sequelize'

//import sequelize from '../../config/db.js'

// Model
const Message = sequelize.define('Message', {
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
    allowNull: true,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  }
})

export default Message

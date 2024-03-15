import { DataTypes } from 'sequelize'

import sequelize from '../../../config/db'

const User = sequelize.define('Users', {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true
  },
  fullname: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  username: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  gender: {
    type: DataTypes.CHAR(6),
    allowNull: false
  },
  profilePic: {
    type: DataTypes.STRING(255)
  },
  isOpenSelfChat: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
})


//utils
export const getUserResponse = (user) => {
  if (!user) return null

  return {
    id: user.id,
    gender: user.gender,
    fullname: user.fullname,
    profilePic: user.profilePic,
    isOpenSelfChat: user.isOpenSelfChat
  }
}

export default User
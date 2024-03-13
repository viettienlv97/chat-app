//libs
//import bcryptjs from 'bcryptjs'
//import {v4 as uuid} from 'uuid'
import { Op } from "sequelize";

//modules
import User from "../models/user.js";
import {
  dataResponse,
  serverResponse,
  invalidResponse,
} from "../utils/httpResponses.js";

//const genders = ['male', 'female']

export const getUsers = async (req, res) => {
  try {
    let users = await User.findAll();

    if (!users) return dataResponse(res, 200, []);

    return dataResponse(res, 200, users);
  } catch (error) {
    return serverResponse(res, 500, error.message);
  }
};

export const getUserDetail = async (req, res) => {
  try {
    let { userId } = req;
    let user = await User.findOne({
      where: userId,
    });

    if (!user) return invalidResponse(res, 400, "Invalid input");

    return dataResponse(res, 200, user);
  } catch (error) {
    return serverResponse(res, 500, error.message);
  }
};

export const getUsersForSidebar = async (req, res) => {
  try {
    const { userId } = req;
    const allUsers = await User.findAll({ where: { id: { [Op.ne]: userId } } });

    if (!allUsers) return dataResponse(res, 200, []);
    return dataResponse(res, 200, allUsers);
  } catch (error) {
    console.log("Error in getUsersForSidebar", error);
    return serverResponse(res, 500, error.message);
  }
};
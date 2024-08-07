import Sequelize, { Op } from 'sequelize'
import sequelize from '../../../config/db.js'

import {
  dataResponse,
  invalidResponse,
  serverResponse
} from '../../../utils/httpResponses.js'
import { v4 as uuid } from 'uuid'
import {
  User,
  Conversation,
  ConversationParticipant,
  Message
} from '../../../models/v2/index.js'

export const createConversation = async (req, res) => {
  try {
    //const { userId } = req
    const { name } = req.body

    if (name === 'selfchat') {
      return await createSelfChat(req, res)
    } else {
      return await createFriendConversation(req, res)
    }
  } catch (error) {
    console.log('Error in createConversation', error)
    return serverResponse(res, 500)
  }
}

export const getConversations = async (req, res) => {
  try {
    const { userId } = req

    const participants = await ConversationParticipant.findAll({
      where: { UserId: userId },
      attributes: ['ConversationId']
    })

    const conversationIds = participants.map((cp) => cp.ConversationId)
    const conversations = await Conversation.findAll({
      where: { id: { [Op.in]: conversationIds } },
      attributes: ['id', 'name'],
      include: [
        {
          model: User,
          through: {
            attributes: [],
            where: { ConversationId: { [Op.in]: conversationIds } }
          },
          attributes: ['id', 'fullname', 'username', 'profilePic']
        }
      ]
    })
    const dataConversations = conversations.map((c) => {
      return {
        id: c.id,
        name: c.name,
        isSelfChat: c.name === 'Self Chat' ? true : false,
        partner:
          c.name !== 'Self Chat'
            ? c.Users.find((user) => user.id !== userId)
            : null
      }
    })

    return dataResponse(res, 200, dataConversations)
  } catch (error) {
    console.log('Error in getConversations', error)
    return serverResponse(res, 500)
  }
}

export const getAllUsersInConversation = async (req, res) => {
  try {
    const { conversationId } = req.query

    if (!conversationId)
      return invalidResponse(res, 400, 'Invalid conversation')

    const users = await ConversationParticipant.findAll({
      where: { ConversationId: conversationId },
      include: [
        {
          model: User,
          as: 'User',
          attributes: ['id', 'fullname', 'profilePic']
        }
      ]
    })

    if (!users) throw new Error('Cannot find user')

    const data = users.map((u) => {
      return {
        id: u.User.id,
        fullname: u.User.fullname,
        profilePic: u.User.profilePic
      }
    })
    return dataResponse(res, 200, data)
  } catch (error) {
    console.log('Error in getAllUsersInConversation', error)
    return serverResponse(res, 500)
  }
}

const createSelfChat = async (req, res) => {
  try {
    const { userId } = req
    const newId = uuid()

    const conversation = await Conversation.create({
      id: newId,
      name: 'Self Chat'
    })
    const conversationParticipant = await ConversationParticipant.create({
      ConversationId: newId,
      UserId: userId
    })
    if (!conversation || !conversationParticipant)
      throw new Error('Cannot create conversaion')

    return dataResponse(res, 200, conversation)
  } catch (error) {
    console.log('Error in createSelfChat', error)
    return serverResponse(res, 500)
  }
}

const createFriendConversation = async (req, res) => {
  try {
    const { userId } = req
    const { friendId } = req.body
    const newId = uuid()
    const userIds = [userId, friendId]

    const ConversationId = await findFriendConversation(userIds)

    let conversation = null
    let created = null
    if (ConversationId) {
      conversation = await Conversation.findByPk(ConversationId)
      created = false
    } else {
      created = true
      conversation = await Conversation.create({
        id: newId,
        name: 'Friend Chat'
      })

      await ConversationParticipant.bulkCreate([
        {
          ConversationId: newId,
          UserId: userId
        },
        {
          ConversationId: newId,
          UserId: friendId
        }
      ])
    }

    return dataResponse(res, 200, { conversation, created })
  } catch (error) {
    console.log('Error in createFriendConversation', error)
    return serverResponse(res, 500)
  }
}

const findFriendConversation = async (userIds) => {
  try {
    if (!userIds || userIds.length < 2) return null

    const [results, metadata] = await sequelize.query(
      `
      select "ConversationId"
      from "ConversationParticipants"
      where "UserId" in (:user1Uuid, :user2Uuid)
      group by "ConversationId"
      having count(distinct "UserId") = 2
      and count("UserId") = (
        select count(*)
        from "ConversationParticipants" as cp
        where cp."ConversationId" = "ConversationParticipants"."ConversationId"
      )
    `,
      {
        replacements: { user1Uuid: userIds[0], user2Uuid: userIds[1] },
        type: Sequelize.QueryTypes.SELECT
      }
    )

    if (results) {
      const ConversationId = results.ConversationId
      return ConversationId
    } else {
      return null
    }
  } catch (error) {
    console.log('Error in findFriendConversation', error)
    return null
  }
}

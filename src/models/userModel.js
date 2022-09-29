import Sequelize from "sequelize"
import BaseModel from "./baseModel"
// const Joi = require("joi")

class UserModel extends BaseModel {
  constructor() {
    super("users", {
      id: {
        type: Sequelize.DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        comment: "会员Id",
      },
      username: { type: Sequelize.STRING },
      password: { type: Sequelize.STRING },
      mobile: { type: Sequelize.STRING },
      email: { type: Sequelize.STRING, allowNull: false },
    })
    this.model = super.getModel()
    this.model.sync()
  }
}
module.exports = new UserModel()

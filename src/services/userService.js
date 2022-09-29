const  BaseService  = require("./baseService")
import { AutoWritedUserModel } from "../utils/AutoWrite.js"

@AutoWritedUserModel
class UserService extends BaseService {
  constructor() {
    super(UserService.model)
  }
}
module.exports = new UserService()
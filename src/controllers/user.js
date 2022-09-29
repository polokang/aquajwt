const { generateToken } = require("../utils/jwt");
const { formatResponse } = require("../utils/helper");
const bcrypt = require("bcryptjs");
const axios = require("axios");
const UserService = require("../services/userService");

async function addUser(req, res) {
  const { username } = req.body;
  let userObj = req.body;
  const existingUser = await UserService.baseFindByFilter(null, {
    username: username,
  });

  if (existingUser.length > 0) {
    return formatResponse(res, "The account already exists.", 400);
  } else {
    let pwd = await bcrypt.hash(userObj.password, 10);
    userObj["password"] = pwd;

    let user = await UserService.baseCreate(userObj);

    const token = generateToken(user);
    return res.status(200).send({
      errMsg: "",
      status: "ok",
      currentAuthority: "admin",
      token,
    });
  }
}

async function login(req, res) {
  const { username, password, type } = req.body;

  const existingUser = await UserService.baseFindByFilter(null, {
    username: username,
  });

  //  need bcrypt.compare pwd and verify with db
  if (existingUser.length > 0) {
    const validPassword = await bcrypt.compare(password, existingUser[0].password);
    if (!validPassword) {
      return formatResponse(res, "Invalid password.", 400);
    } else {
      //  get jwt secret
      axios
        .get(`${process.env.KONG_GW}/consumers`)
        .then((result) => {
          result.data.data.map(async (item, index) => {
            await axios.get(`${process.env.KONG_GW}/consumers/${item.username}/jwt?size=1000`).then((res) => {
              if (res.data.data[0] !== undefined) {
                if (res.data.data[0].secret !== undefined) {
                  console.log("==>", res.data.data[0].secret);
                }
              }
            });
          });

          let user = { username: username };
          const token = generateToken(user);
          return formatResponse(res, {
            errMsg: "",
            type: type,
            status: 200,
            currentAuthority: username,
            token,
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  } else {
    return formatResponse(res, "The account doesn't exists.", 400);
  }
}

module.exports = {
  login,
  addUser,
};

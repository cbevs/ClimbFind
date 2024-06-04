import config from "../config.js"

const getSecret = (oldPass) => {
  const secret = config.jwt.key + oldPass
  return secret
}

export default getSecret
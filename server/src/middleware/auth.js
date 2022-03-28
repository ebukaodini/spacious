
const authMiddleware = (auth) => {
  if (auth.token !== process.env.StrapiBearerToken) throw new Error('Unauthorized access')
}

module.exports = authMiddleware
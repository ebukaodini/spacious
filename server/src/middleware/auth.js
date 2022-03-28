
const authMiddleware = (token) => {
  if (token !== process.env.StrapiBearerToken) throw new Error('Unauthorized access')
}

module.exports = authMiddleware
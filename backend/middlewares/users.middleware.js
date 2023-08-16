import jwt from "jsonwebtoken"

export const userAuth = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split("Bearer ")[1];
    if (!token) {
      return res.status(403).json({
        error: 'Missing or invalid token.'
      })
    }

    jwt.verify(token, process.env.LOGIN_SECRET, (error, result) => {
      if (error) {
        return res.status(401).json({ error: "Missing or invalid token" })
      }

      if (result) {
        next()
      }
    })
  }
  else {
    return res.status(400).json({
      error: 'Missing or invalid token.'
    })
  }
}
import jwt from "jsonwebtoken"

export const userAuthWithBearer = (req, res, next) => {
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
        req.id = result.id;
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

export const userAuthWithCookie = (req, res, next) => {
  if (req.cookies.jwt) {

    console.log(req.cookies)

    const token = req.cookies.jwt;

    if (!token) {
      return res.status(403).json({
        error: 'Missing or invalid cookie.'
      })
    }

    try {
      jwt.verify(token, process.env.LOGIN_SECRET, (error, result) => {
        if (error) {
          return res.status(401).json({ error: "Missing or invalid token" })
        }
        if (result) {
          req.id = result.id;
          next()
        }
      })
    } catch (error) {
      return res.status(403).json({error})
    }

  } else {
    return res.status(400).json({
      error: 'Missing cookie.'
    })    
  }
}
import bcrypt from 'bcrypt';

export const register = (req, res) => {
  let { body } = req;
  bcrypt.hash(body.password, 10, (error, hash) => {
    let regData = { ...body };
    regData = {...regData, password: hash };
    
    res.status(201).json({ added: true, regData });
  });
}

export const login = (req, res) => {
  let { body } = req;
  res.json({ 
    msg: 'Pending find user by email. authenticate and generate jwt.',
    body 
  });
}


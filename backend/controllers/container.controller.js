import Container from "../models/container.model.js";

export const getContainers = (req, res) => {
  Container.find()
    .then((result) => {
      return res.json(result)
    }).catch((err) => {
      return res.status(500).json({ TODO: `Error handling ${err}` })
    });
}

export const containerByNumber = (req, res) => {
  
  return res.json({ ok: true });
}
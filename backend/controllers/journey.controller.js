import Container from "../models/container.model.js";

export const newContainer = (req, res) => {
  const { containerNumber } = req.body
  const container = new Container()
  container.containerNumber = containerNumber
  container.save()
    .then((result) => {
      return res.json(result)
    }).catch((err) => {
      return res.status(500).json({ TODO: err })
    });
}

export const newJourney = (req, res) => {
  

  return res.json({ ok: true });
}
import Container from "../models/container.model.js";

export const containerByNumber = (req, res) => {
  const { containerNumber } = req.params
  const container = Container.findOne({ containerNumber})
    .then((result) => {
      if (!result) {
        return res.status(404).json({ TODO: `Error handling Container not found.` })
      }
      return res.json(result)
    }).catch((err) => {
      return res.status(500).json({ TODO: `Error handling ${err}` })
    });
}
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
export const updateContainer = (req, res) => {
  const { id } = req.params
  const { containerNumber } = req.body
  Container.findById(id)
    .then((result) => {
      result.containerNumber = containerNumber
      result.save()
        .then((saveResult) => {
          return res.json(saveResult)
        }).catch((error) => {
          return res.status(500).json({ error })
        });
      }).catch((error) => {
      
    });
}
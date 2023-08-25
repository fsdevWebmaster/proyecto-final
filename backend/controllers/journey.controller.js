import Container from "../models/container.model.js";
import Journey from "../models/journey.model.js";

export const newContainer = (req, res) => {
  const { containerNumber } = req.body
  const container = new Container()
  container.containerNumber = containerNumber
  container.save()
    .then((result) => {
      return res.json(result)
    }).catch((err) => {
      return res.status(500).json({ TODO: `error handling ${err}` })
    });
};

export const getJourneyByContainerNumber = (req, res) => {
  const {containerNumber} = req.params;
  const journey = Journey.findOne({containerNumber})    
    .then(result =>{
      console.log(result);
      if (!result) {
        return res.status(404).json({ message: 'Journey not found for the given container number.' });
      }
      return res.json(result)
    })
    .catch(error =>{
      return res.status(500).json({ error: 'Error while searching for journey.' });
    })
};

export const newJourney = (req, res) => {
  let insData = { ...req.body }
  // mock entry date
  const now = new Date()
  insData = { ...insData, entryDate: now }
  const journey = new Journey(insData);
  journey.save()
    .then((result) => {
      return res.json(result)
    }).catch((err) => {
      return res.status(500).json({ TODO: `error handling ${err}` })
    });
}
import Container from "../models/container.model.js";
import Journey from "../models/journeyLog.model.js";

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
};

export const getJourneyByContainerNumber = (req, res) => {
  const containerNumber = req.params.containerNumber;

  Journey.findOne({ 'container.containerNumber': containerNumber })
    .populate('driver')
    .populate('container')
    .populate('status')
    .exec((err, journey) => {
      if (err) {
        return res.status(500).json({ error: 'Error while searching for journey.' });
      }

      if (!journey) {
        return res.status(404).json({ message: 'Journey not found for the given container number.' });
      }

      return res.json(journey);
    });
};

export const newJourney = (req, res) => {
  

  return res.json({ ok: true });
}
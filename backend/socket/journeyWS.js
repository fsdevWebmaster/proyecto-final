import Journey from "../models/journey.model.js";

export const isJourneyValid = async (journeyId) => {
  if (!journeyId) return { isValid: false, journeyId: null};

  try {
    const resp = await Journey.findById({ _id: journeyId, status: { $in: ['ON_HOLD', 'IN_PROGRESS'] } }).exec();
    if (!resp) {
      return false;
    }
    return {
      isValid: true,
      journeyId: resp._id.toString()
    };
  } catch (error) {
    return { isValid: false, journeyId: null, err: error};
  }  
}
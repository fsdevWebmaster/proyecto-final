export const newContainerData = {
  containerNumber: "004"
}

export const patchContainerData = {
  id: "004654681d3efc58ee49eef01d4",
  containerNumber: "8888"
}

export const containerId = '654681d3efc58ee49eef01d4'
export const userId = '6536b1bee321fa02a3e3f778'
export const containerNumber = '003'
export const logId = '65550afdb34a7faa884e5aa5'
export const driverId = '64dbeb400422576f15717ada'
export const driverDocId = '2222'
export const journeyId = '65550686f85a3808b86a3b61'

export const gate = {
  id: "64f7a092eb2116cb79ca7445",
  next: "64f7a10aeb2116cb79ca7447"
}

// TODO: get log testing endpoint
export const log = {
  id: "65550afdb34a7faa884e5aa5",
}

// TODO: get journey by id testing endpoint
export const journey = {
  id: journeyId,
}

export const newJourneyData = {
  driver: { id: "64dbeb400422576f15717ada" },
  container: { id: "653fd85a3c2173fd7595d931" },
  step: gate,
  user: userId
}

export const activeJourneys = [
  {
    driver: "64dbeb400422576f15717ada",
    container: "653fd85a3c2173fd7595d931",
    step: "64f7a092eb2116cb79ca7445",
    status: "DONE"
  }
]

export const updateJourneyData = {
  journey: "65550686f85a3808b86a3b61",
  step: gate,
  value: '50001'
}

export const newJourneyLogData = {
  step: gate.id,
  stepValue: 48000,
  journey: journeyId,
  status: "DONE",
  user: userId
}

export const updateLogData = {
  id: logId,
  step: gate.id,
  user: userId,
  stepValue: 10000,
  journey: journeyId
}

export const unloadData = { journeyId, userId }

export const getLogData = {
  journey: journeyId,
  step: "652d7e154bf411f7d939495b"
}

export const stepJourneysData = {
  step: "652d7e154bf411f7d939495b"
}

export const journeyByContainerNumberData = {
  containerNumber: '002'
} 

export const journeyLogsData = {
  journeyId
} 

export const journeyByDriverDocData = {
  driverDocId
} 
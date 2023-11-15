import { app } from "../server"
import supertest from "supertest"
const request = supertest(app)
import { 
  newJourneyData, activeJourneys, updateJourneyData, newJourneyLogData, log,
  logId, updateLogData, driverId, journeyId, userId, unloadData, getLogData, gate, 
  stepJourneysData, journeyByContainerNumberData, journeyLogsData, journeyByDriverDocData
} from "../__test_mocks/mock"

describe('Journey controller tests', () => {
  
  test('Create journey response status 200', async () => {
    const { status } = await request.post('/api/journey').send(newJourneyData)
    expect(status).toBe(200)
  })

  test('Creating data should be complete', () => {
     expect(newJourneyData.container).toBeTruthy()
     expect(newJourneyData.driver).toBeTruthy()
     expect(newJourneyData.step).toBeTruthy()
  })

  test('Creating container should not be on active journey', () => {
    const found = activeJourneys.find(item => item.container === newJourneyData.container.id)
    let isActive = false
    if (found) {
      if (found.status !== 'DECLINED' && found.status !== 'DONE') {
        isActive = true
      }
    }
     expect(isActive).toBe(false)
  })

  test('Update journey response status 200', async () => {
    const { status } = await request.patch('/api/journey').send(updateJourneyData)
    expect(status).toBe(200)
  })  

  test('Updating data should be complete', () => {
     expect(updateJourneyData.journey).toBeTruthy()
     expect(updateJourneyData.step).toBeTruthy()
  })

  test('Creating log response status 200', async () => {
    const { status } = await request.post('/api/journey-log').send(newJourneyLogData)
    expect(status).toBe(200)
  })

  test('Creating log data should be complete', () => {
     expect(newJourneyLogData.step).toBeTruthy()
     expect(newJourneyLogData.journey).toBeTruthy()
     expect(newJourneyLogData.status).toBeTruthy()
     expect(newJourneyLogData.user).toBeTruthy()
  })

  test('Updating log should exist', () => {
    const { id } = log
     expect(id).toBe(logId)
  })

  test('Updating log response status 200', async () => {
    const { status } = await request.patch('/api/journey-log').send(updateLogData)
    expect(status).toBe(200)
  })  

  test('Updating log data should be complete', async () => {
    expect(updateLogData.id).toBeTruthy()
    expect(updateLogData.journey).toBeTruthy()
    expect(updateLogData.step).toBeTruthy()
    expect(updateLogData.user).toBeTruthy()
  })

  test('Driver id param should exist', () => {
     expect(driverId).toBeTruthy()
  })

  test('Journey driver should exist', async () => {
    const { status } = await request.get(`/api/driver/${driverId}`)
    expect(status).toBe(200)
  })

  test('Journey by driver should return 200', async () => {
    const { status } = await request.post(`/api/journey-by-driver`).send({ driver: driverId })
    expect(status).toBe(200)
  })

  test('Unload data should be complete', () => {
     expect(unloadData.journeyId).toBeTruthy()
     expect(unloadData.userId).toBeTruthy()
  })

  test('Unload journey should exist', async () => {
    const { status } = await request.post(`/api/journey-to-unload`).send(unloadData)
    expect(status).toBe(200)
  })

  test('Get log data should be complete', () => {
     expect(getLogData.journey).toBeTruthy()
     expect(getLogData.step).toBeTruthy()
  })

  test('Get log should return 200', async () => {
    const { status } = await request.post(`/api/find-journey-log`).send(getLogData)
    expect(status).toBe(200)
  })

  test('Step journey\'s step param should exist', async () => {
    expect(stepJourneysData.step).toBeTruthy()
  })  

  test('Step journeys should return 200', async () => {
    const { status } = await request.get(`/api/step-journeys/${stepJourneysData.step}`)
    expect(status).toBe(200)
  })

  test('Container by number\'s containerNumber param should exist', async () => {
    expect(journeyByContainerNumberData.containerNumber).toBeTruthy()
  })  

  test('Journey by container number should return 200', async () => {
    const { status } = await request.get(`/api/journey/${journeyByContainerNumberData.containerNumber}`)
    expect(status).toBe(200)
  })  

  test('Journey logs journeyId param should exist', async () => {
    expect(journeyLogsData.journeyId).toBeTruthy()
  })  

  test('Get journey logs should return 200', async () => {
    const { status } = await request.get(`/api/journey-logs/${journeyLogsData.journeyId}`)
    expect(status).toBe(200)
  })  
  
  test('Journey logs journeyId param should exist', async () => {
    expect(journeyByDriverDocData.driverDocId).toBeTruthy()
  })  

  test('Get journey by driver doc id should return 200', async () => {
    const { status } = await request
      .get(`/api/journey-by-driver-doc-id/${journeyByDriverDocData.driverDocId}`)
    expect(status).toBe(200)
  })    
})
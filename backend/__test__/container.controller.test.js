import { app } from "../server"
import supertest from "supertest"
const request = supertest(app)
import { containerId, containerNumber, newContainerData, patchContainerData } from "../__test_mocks/mock"


describe('Container cotroller tests', () => {
  
  test('Get containers should response 200', async () => {
    const { status } = await request.get('/api/containers')
    expect(status).toBe(200)
  })

  test('Get containers should return an array of containers', async () => { 
    const { body } = await request.get('/api/containers')
    expect(Array.isArray(body)).toBe(true)
    body.forEach(container => {
      expect(container.containerNumber).toBeTruthy()
    });
  })

  test('Post data should vaidate Container mongoose model', async () => {
    const { body } = await request.post('/api/container').send(newContainerData)
    expect(body.TODO).not.toMatch(/ValidationError/)
  })

  test('Creating container number should not exist', async () => {
    const { body } = await request.post('/api/container').send(newContainerData)
    expect(body.TODO).not.toMatch(/E11000/)
  })

  test('Patch data should have id and containerNumber', () => {
    expect(patchContainerData.id).toBeTruthy()
    expect(patchContainerData.containerNumber).toBeTruthy()
  })

  test('Patch should return 200 code', async () => {
    const { body, statusCode } = await request.patch(
      `/api/container/${containerId}`).send(patchContainerData)
    expect(statusCode).toBe(200)
  })

  test('Container number param should exist', async () => {
    const { body, req } = await request.get(`/api/container/${containerNumber}`)
    const arrPath = req.path.split('/')
    expect(containerId).toBeTruthy()
    expect(arrPath.length).toBeGreaterThan(3)
  })

  test('Get container should return 200 code', async () => {
    const { body, statusCode } = await request.get(`/api/container/${containerNumber}`)
    expect(statusCode).toBe(200)
  })
  
})
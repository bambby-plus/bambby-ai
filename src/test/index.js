const { expect } = require("chai")
const { agent } = require("supertest")
const app = require("../app")

const request = agent

describe("test server active", () => {
  it("Get request to /api/v1/games", async () => {
    const res = await request(app).get("/healthcheck")
    const response = res.body
    expect(res.status).to.equal(200)
    expect(response.message).to.be.a("string")
    expect(response.message).to.be.equal("Games service is up and running")
  })
})

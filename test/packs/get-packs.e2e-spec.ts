import * as request from "supertest"
import { INestApplication } from "@nestjs/common"
import bootstrapTestApp from "src/utils/bootstrapTestApp"

describe("GET /packs", () => {
  let app: INestApplication

  beforeAll(async () => {
    app = await bootstrapTestApp()
    await app.init()
  })

  it("returns 200", async () => {
    await request(app.getHttpServer()).get("/packs").expect(200)
  })

  it("returns 400 when random query param is given", async () => {
    await request(app.getHttpServer())
      .get("/packs")
      .query({ random: 123 })
      .expect(400)
  })

  afterAll(async () => await app.close())
})

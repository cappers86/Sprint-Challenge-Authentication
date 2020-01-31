const request = require('supertest');

const server = require('./server');
const db = require('../database/dbConfig');
const bcrypt = require('bcryptjs')



describe("GET /login", () => {
  it("i usually get an error", () => {
    return request(server)
    .get("/login")
    .then(res => {
      expect(res.status).toBe(404)
    })
  })
});

describe("POST /api/auth/register", () => {
  it("where is my error", async () => {
    await request(server)
      .post("/register")
      .then(res => {
        expect(res.status).toBe(404) 

      
    })
    
  })
})
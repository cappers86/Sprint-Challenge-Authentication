const request = require('supertest');

const server = require('./server');
const db = require('../database/dbConfig');
const bcrypt = require('bcrypt')


describe('server', () => {
  beforeEach(async () => {
    await db("users").truncate();
  });
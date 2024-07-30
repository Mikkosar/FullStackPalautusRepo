const bcrypt = require('bcrypt');
const User = require('../models/user');

const { test, after, beforeEach, describe } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);

describe('There is only one usre in db at the start', () => {
    beforeEach(async () => {
        await user.deleteMany({});

        const passwordHash = await bcrypt.hash('salaisuus', 10);
        const user = new User({ username: 'user', passwordHash })

        user.save()
    })

    test('user creation works with a fresh username', async () => {
        const usersAtStart = await helper.allUsersInDb();

        const newUser = {
            username: 'Mikki420',
            name: 'Mikki Hiiri',
            password: 'salainen'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        const usersAtEnd = await helper.allUsersInDb();
        assert.strictEqual(usersAtEnd.length, )
    })
});
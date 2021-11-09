const request = require('supertest')
const app = require('../app')
//const User = require('../models/User');

const user1 = {
    name: 'test12',
    email : 'test12@test.com',
    password : 'test112233',
    roleid : '60adf3065056f233cc016da7'
}

// beforeEach(async() =>{
//     await User.deleteMany({})
//    // await User(user1).save();
// })
// afterEach(() =>{
//     console.log('AfterEach')
// })
// test('Should sign up for a user',async()=>{
//     await request(app).post('/users/register')
//     .send({
//         name:'test',
//         email:'test@test.com',
//         password : 'test123',
//         roleid: '60adf3065056f233cc016da7'
//     })
//     .expect(200)
// })

describe('Post Endpoints', () => {
    it('should create a new post', async () => {
      const res = await request(app)
        .post('/users/register')
        .send({
            name:'test',
                    email:'test@test.com',
                    password : 'test123',
                    roleid: '60adf3065056f233cc016da7'
        })
        // console.log(res.statusCode);
        expect(res.statusCode).toEqual(200)
    })
  })

test('Should login for a user',async()=>{
    await request(app)
    .post('/users/login')
    .send({
        email : user1.email,
        password : user1.password
    })
})
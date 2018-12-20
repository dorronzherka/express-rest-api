let mongoose = require("mongoose");
let User = require("../models/User");

// Require the dev-depenendencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let app = require("../app");
let should = chai.should();
let user;

chai.use(chaiHttp);

// Test the /GET  Route of /most-liked
describe("Doing a GET request in route /most-liked", () => {
    it("it should GET all users", (done) => {
        chai.request(app)
            .get("/most-liked")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    })
})

// Test the /POST  Route of /signup
describe("Doing a POST request in route /signup", () => {
    it('it should get a message that is user added', (done) => {
        user = {
            "username": "blla" + Math.random() * (100 - 1) + 1,
            "password": "zherkazherka123",
            "confirmPassword": "zherkazherka123",
        }
        chai.request(app)
            .post("/signup")
            .send(user)
            .end((err, res) => {
                if (!err) {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    done();
                } else {
                    done(err);
                }
            })
    })
})
// Test the /POST  Route of /login
describe("Doing a POST request in route /login", () => {
    it('it should get object logged in user', (done) => {
        let userLoggedIn = {
            "username": user.username,
            "password": user.password
        }
        chai.request(app)
            .post("/login")
            .send(user)
            .end((err, res) => {
                if (!err) {
                    token = res.body.token;
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    done();
                } else {
                    done(err);
                }
            })
    })
})


// Test the /POST  Route of /user/id/lik
describe("Doing a POST request in route /user/id/like", () => {
    it('it should get object logged in user', (done) => {
        chai.request(app)
            .post("/user/5c1af709e07b972e8e6d57d0/like")
            .set("AUTHORIZATION", token)
            .end((err, res) => {
                if (!err) {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    done();
                } else {
                    done(err);
                }
            })
    })
})

// Test the /DELETE  Route of /user/id/unlike
describe("Doing a DELETE request in route /user/id/unlike", () => {
    it('it should get object logged in user', (done) => {
        chai.request(app)
            .del("/user/5c1af709e07b972e8e6d57d0/unlike")
            .set("AUTHORIZATION", token)
            .end((err, res) => {
                if (!err) {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    done();
                } else {
                    done(err);
                }
            })
    })
})
// Test the /GET  Route of /me
describe("Doing a GET request in route /me", () => {
    it('it should get object of logged in user', (done) => {
        chai.request(app)
            .get("/me")
            .set("AUTHORIZATION", token)
            .end((err, res) => {
                if (!err) {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    done();
                } else {
                    done(err);
                }
            })
    })
})

// Test the /PUT  Route of  /me/update-password
describe("Doing a PUT request in route /me/update-password", () => {
    it('it should get object logged in user', (done) => {
        let userLoggedIn = {
            "password": user.password,
            "confirmPassword": user.password
        }
        chai.request(app)
            .put("/me/update-password")
            .set("AUTHORIZATION", token)
            .send(userLoggedIn)
            .end((err, res) => {
                if (!err) {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    done();
                } else {
                    done(err);
                }
            })
    })
})



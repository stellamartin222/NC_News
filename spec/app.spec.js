process.env.NODE_ENV = 'test';
const { expect } = require('chai');
const request = require('supertest');
const app = require('../app');
const connection = require('../db/connection.js')

describe('app', () => {
    beforeEach(() => {
        return connection.seed.run()
    });
    after(() => {
        connection.destroy()
    });
    describe('/api/topics', () => {
        describe('GET', () => {
            it('GET 200, responds with array of topics', () => {
                return request(app)
                    .get('/api/topics')
                    .expect(200)
                    .then(({body}) => {
                        expect(body.topics).to.be.an('array')
                        expect(body.topics[0]).to.contain.keys('slug', 'description')
                    })
            });
        });
    });
    describe('/api/users', () => {
        describe('GET', () => {
            it('GET 200, responds with the requested user', () => {
                return request(app)
                    .get('/api/users/butter_bridge')
                    .expect(200)
                    .then(({body}) => {
                        expect(body.user).to.be.an('object')
                        expect(body.user).to.contain.keys('username', 'avatar_url', 'name')
                        expect(body.user.username).to.eql('butter_bridge')
                    })
            });
        })
    });
    describe('/api/articles', () => {
        describe('GET', () => {
            it('GET 200, responds with articles', () => {
                return request(app)
                    .get('/api/articles/1')
                    .expect(200)
                    .then(({body}) => {
                        expect(body.article).to.be.an('object')
                        expect(body.article).to.contain.keys(
                            'author', 
                            'title',
                            'article_id',
                            'body',
                            'topic',
                            'created_at',
                            'votes',
                            'comment_count')
                        expect(body.article.article_id).to.eql(1);
                    })
            });
        });
        describe('PATCH', () => {
            it('GET 202, reponds with updated article', () => {
                return request(app)
                    .patch('/api/articles/1')
                    .send({inc_votes: 2})
                    .expect(202)
                    .then(({body}) => {
                        expect(body.article).to.be.an('object') 
                        expect(body.article.votes).to.equal(102)
                        expect(body.article).to.contain.keys(
                            'author', 
                            'title',
                            'article_id',
                            'body',
                            'topic',
                            'created_at',
                            'votes'
                        );
                    });
            });
        });
    });





    describe('Error Handling', () => {
        it('Error 404, when inputting an invalid route', () => {
            return request(app)
                .get('/api/banana')
                .expect(404)
                .then(({body}) => {
                    expect(body.msg).to.equal('Route not found')
                })
        });
        it.only('Error 404, not a valid input to an endpoint', () => {
            return request(app)
                .get('/api/articles/500')
                .expect(404)
                .then(({body}) => {
                    console.log(body)
                    expect(body.msg).to.equal('Resource does not exist')
                })
        })
        // it('Error 400, ', () => {

        // })
    });
});

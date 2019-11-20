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
       describe('POST', () => {
           it('GET 201, creates a new comment and responds with the new article', () => {
                return request(app)
                    .post('/api/articles/1/comments')
                    .send({
                        username: 'butter_bridge',
                        body : "new comment"
                    })
                    .expect(201)
                    .then(({body}) => {
                        expect(body.comment).to.be.an('object')
                        expect(body.comment).to.contain({
                            author: 'butter_bridge',
                            body : "new comment"
                        })
                    })
           });
       });
       describe('GET', () => {
            it('GET 200, gets an array of comments by the article id', () => {
                return request(app)
                    .get('/api/articles/1/comments')
                    .expect(200)
                    .then(({body}) => {
                        expect(body.comments).to.be.an('array')
                        expect(body.comments[0]).to.contain.key(
                        'comment_id',
                        'votes',
                        'created_at',
                        'author',
                        'body')
                        expect(body.comments[3].article_id).to.equal(1)
                    })
            });
            it('GET 200, responds with an array of comments sorted by author', () => {
                return request(app)
                    .get('/api/articles/1/comments?sort_by=votes')
                    .expect(200)
                    .then(({body}) => {
                        expect(body.comments).to.be.an('array')
                        expect(body.comments[0]).to.contain.key(
                        'comment_id',
                        'votes',
                        'created_at',
                        'author',
                        'body')
                        expect(body.comments[0].votes).to.equal(100)
                    });
           
            });
            it('GET 200, ', () => {
                return request(app)
                    .get('/api/articles/1/comments?order=asc')
                    .expect(200)
                    .then(({body}) => {
                        expect(body.comments).to.be.an('array')
                        expect(body.comments[0]).to.contain.key(
                        'comment_id',
                        'votes',
                        'created_at',
                        'author',
                        'body')
                        expect(body.comments[0].votes).to.equal(0)
                }); 
            });
       
        });
        describe.only('GET', () => {        
            it('GET 200, returns an array of all articles', () => {
                return request(app)
                    .get('/api/articles')
                    .expect(200)
                    .then(({body}) => {
                        expects(body.articles).to.be.an('array')
                        expects(body.articles).to.contain.keys(
                            "author", 
                            "title",
                            "article_id",
                            "topic",
                            "created_at",
                            "votes",
                            "comment_count"
                        )
                    })
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
        describe('Articles', () => {
            describe('GET', () => {
                it('Error 404, not a valid rescource request', () => {
                    return request(app)
                        .get('/api/articles/500')
                        .expect(404)
                        .then(({body}) => {
                            expect(body.msg).to.equal('Resource does not exist')
                        })
                })
                it('Error 400, not a valid article ID', () => {
                    return request(app)
                        .get('/api/articles/banana')
                        .expect(400)
                        .then(({body}) => {
                            expect(body.msg).to.equal('Bad request')
                        })
                })
            });
            describe('PATCH', () => {
               it('Error 400, malformed body on empty input', () => {
                    return request(app)
                        .patch('/api/articles/1')
                        .send({})
                        .expect(400)
                        .then(({body}) => {
                            expect(body.msg).to.equal('Bad request')
                        })
                });
                it('Error 400, malformed body on invalid input', () => {
                    return request(app)
                        .patch('/api/articles/1')
                        .send({inc_votes: 'banana'})
                        .expect(400)
                        .then(({body}) => {
                            expect(body.msg).to.equal('Bad request')
                        })
                });
            });
            describe('POST comment', () => {
                it('Error 400, missing information on body', () => {
                    return request(app)
                        .post('/api/articles/1/comments')
                        .send({
                            body: "comment"

                        })
                        .expect(400)
                        .then(({body}) => {
                            expect(body.msg).to.equal('Bad request')
                        })
                });
                it('Error 404, article id does not exist', () => {
                    return request(app)
                        .post('/api/articles/1000/comments')
                        .send({
                        username: 'butter_bridge',
                        body: "comment"})
                        .expect(404)
                        .then(({body}) => {
                            console.log(body)
                            expect(body.msg).to.equal('Route not found')
                        })
                });
                it('Error 404, non existant username', () => {
                    return request(app)
                    .post('/api/articles/1/comments')
                    .send({
                        username: 'alan',
                        body: "comment"

                    })
                    .expect(404)
                    .then(({body}) => {
                        expect(body.msg).to.equal('Route not found')
                    })
                });
            });
            describe('GET comments', () => {
                it('404, article id does not exist', () => {
                    return request(app)
                        .get('/api/articles/3000/comments')
                        .expect(404)
                        .then(({body}) => {
                            expect(body.msg).to.equal('Route not found')
                    })
                });
                it('400, not a valid article id input', () => {
                    return request(app)
                        .get('/api/articles/cheese/comments')
                        .expect(400)
                        .then(({body}) => {
                            expect(body.msg).to.equal('Bad request')
                    })
                });
                // it('200, returns an empty array', () => {
                //     return request(app)
                //         .get('/api/articles/12/comments')
                //         .expect(200)
                //         .then(({body}) => {
                //             expect(body.comments).to.equal([])
                //     })
                // });
            });
        });
        describe('Users', () => {
            describe('GET', () => {
                it('Error 404, not a valid rescource request', () => {
                    return request(app)
                        .get('/api/users/500')
                        .expect(404)
                        .then(({body}) => {
                            expect(body.msg).to.equal('Bad request')
                        })
                })
                it('Error 404, not a valid end point', () => {
                    return request(app)
                        .get('/api/users/banana')
                        .expect(404)
                        .then(({body}) => {
                            expect(body.msg).to.equal('Bad request')
                        })
                })
            });
        });
    });
});

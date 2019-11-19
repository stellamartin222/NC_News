const { expect } = require('chai');
const {
  formatDates,
  makeRefObj,
  formatComments,
} = require('../db/utils/utils');

describe('formatDates', () => {
  it('will return an array when given an array', () => {
    expect(formatDates([])).to.be.an('array')
  });
  it('will return one unix timestamp to js a object', ()=> {
    const result =[{created_at: 1511354163389}]
    const expected = Date(1511354163389)
    expect(formatDates(result)[0].created_at).to.equal(expected)
  });
  it('will return a javascript timestamp for a large array of objects', () => {
    const result = [{created_at: 1511354163389}, {created_at: 1416140514171}, {created_at: 1289996514171}]
    const expected1 = Date(1511354163389)
    const expected2 = Date(1416140514171)
    const expected3 = Date(1289996514171)
    expect(formatDates(result)[0].created_at).to.equal(expected1)
    expect(formatDates(result)[1].created_at).to.equal(expected2)
    expect(formatDates(result)[2].created_at).to.equal(expected3)
  })
  it('does not mutate the original data', () => {
    const result = [{created_at: 1511354163389}]
    expect(result).to.eql([{created_at: 1511354163389}])
  });
});

describe('makeRefObj', () => {
  it('will return an object when given an array of objects', () => {
    expect(makeRefObj([{}])).to.be.an('object')
  });
  it('will return an object of key value pairs when passed one obj in an array', () => {
    const result = [{ article_id: 1, title: 'A' }]
    const expected = { A: 1 }
    expect(makeRefObj(result)).to.eql(expected)
  });
  it('will return an object of multiple key value pairs when passed a larger array', () => {
    const result = [{ article_id: 1, title: 'A' }, { article_id: 2, title: 'B' }, { article_id: 3, title: 'C' }]
    const expected = { A: 1, B:2, C:3}
    expect(makeRefObj(result)).to.eql(expected)
  });
  it('does not mutate the original data', () => {
    const result = [{ article_id: 1, title: 'A' }, { article_id: 2, title: 'B' }, { article_id: 3, title: 'C' }]
    expect(result).to.eql([{ article_id: 1, title: 'A' }, { article_id: 2, title: 'B' }, { article_id: 3, title: 'C' }])
  });
});

describe('formatComments', () => {
  it('will return an array of objects when passed an array of objects', () => {
    expect(formatComments([{}])).to.be.an('array')
  });
  it('will rename the object key "created_by" to "author"', () => {
    const result = [{created_by: 'butter_bridge'}]
    const expected = [{author: "butter_bridge"}]
    expect(formatComments(result)).to.eql(expected)
  });
  it('will rename the object key "created_by" to "author" in a large array of comments', () => {
    const result = [{created_by: 'butter_bridge'}, {created_by: 'butter_brid'}, {created_by: 'butter_br'}]
    const expected = [{author: "butter_bridge"}, {author: "butter_brid"}, {author: "butter_br"}]
    expect(formatComments(result)).to.eql(expected)
  });
  it('will rename the object key "belongs_to" to "article_id"', () => {
    const result = [{belongs_to: 'butter_bridge', created_by: 'butter_bridge'}]
    const refId = {"butter_bridge": 1}
    const expected = [{author: "butter_bridge", article_id: 1}]
    expect(formatComments(result, refId)).to.eql(expected)
  })
  it('does not mutate my original data', () => {
    const result = [{belongs_to: 'butter_bridge', created_by: 'butter_bridge'}]
    expect(result).to.eql([{belongs_to: 'butter_bridge', created_by: 'butter_bridge'}])
  });
});


const assert = require('assert');
const sinon = require('sinon');

const router = require('../src/index.js');

describe('gcf-routing', () => {
  let req;
  let res;
  let handler;
  let send;

  beforeEach(() => {
    send = sinon.spy();
    req = {
      headers: {
        host: 'hostit',
      },
      path: '',
      originalUrl: '/functionName',
      baseUrl: '/functionName'
    };
    res = {
      status: sinon.spy(function() {
        return { send: send }
      })
    };
    handler = sinon.spy();
  });

  describe('root', () => {
    it('should match if empty string', () => {
      const app = router('GET', '', handler);
      req.originalUrl = '/functionName';
      req.path = '/';
      app(req, res);
      assert(res.status.called, false);
      assert(send.calledOnce, true);
    });

    it('should match if single root slash', () => {
      const app = router('GET', '', handler);
      app(req, res);
      assert(res.status.called, false);
      assert(send.calledOnce, true);
    });
  });
});

const test = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');

const app = require('../src/app');

test('GET / returns a welcome message', async () => {
  const response = await request(app, 'GET', '/');

  assert.equal(response.statusCode, 200);
  assert.deepEqual(response.body, {
    message: 'Hello from Express',
    status: 'ok'
  });
});

test('GET /health returns healthy status', async () => {
  const response = await request(app, 'GET', '/health');

  assert.equal(response.statusCode, 200);
  assert.equal(response.body.status, 'healthy');
  assert.equal(typeof response.body.uptime, 'number');
});

function request(appInstance, method, path) {
  return new Promise((resolve, reject) => {
    const server = http.createServer(appInstance);

    server.listen(0, () => {
      const { port } = server.address();
      const req = http.request(
        {
          hostname: '127.0.0.1',
          port,
          path,
          method,
          headers: {
            'Content-Type': 'application/json'
          }
        },
        res => {
          let data = '';

          res.setEncoding('utf8');
          res.on('data', chunk => {
            data += chunk;
          });
          res.on('end', () => {
            server.close();

            resolve({
              statusCode: res.statusCode,
              body: data ? JSON.parse(data) : null
            });
          });
        }
      );

      req.on('error', error => {
        server.close();
        reject(error);
      });

      req.end();
    });
  });
}

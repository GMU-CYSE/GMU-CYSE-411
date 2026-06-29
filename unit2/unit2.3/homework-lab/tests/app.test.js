const request = require('supertest');

// Import the student's app (challenge version)
const app = require('../challenge/server');

function getSetCookie(res) {
  const sc = res.headers['set-cookie'];
  if (!sc || sc.length === 0) return '';
  // Join multiple cookies if needed
  return sc.join('; ');
}

describe('Unit 2.3 XSS & Client-Side Threats Lab', () => {
  test('Task C: sets a CSP header (default-src self; script-src self)', async () => {
    const res = await request(app).get('/profile?name=Guest');

    expect(res.headers['content-security-policy']).toBeDefined();

    const csp = res.headers['content-security-policy'];
    expect(csp).toMatch(/default-src\s+'self'/);
    expect(csp).toMatch(/script-src\s+'self'/);
  });

  test('Task A: output encodes reflected input to prevent XSS', async () => {
    const payload = '<script>alert(document.cookie)</script>';
    const res = await request(app).get('/profile?name=' + encodeURIComponent(payload));

    // Should not contain raw <script> tag
    expect(res.text).not.toContain(payload);

    // Should contain encoded version at minimum
    expect(res.text).toContain('&lt;script&gt;');
    expect(res.text).toContain('&lt;/script&gt;');
  });

  test('Task B: sets session cookie with HttpOnly and SameSite', async () => {
    const res = await request(app).get('/login');
    const cookie = getSetCookie(res);

    expect(cookie).toMatch(/sessionId=SESSION-ABC-123/);
    expect(cookie).toMatch(/HttpOnly/i);
    // Accept Lax or Strict
    expect(cookie).toMatch(/SameSite=(Lax|Strict)/i);
  });

  test('Task B: sets Secure cookie flag in production only', async () => {
    const old = process.env.NODE_ENV;

    process.env.NODE_ENV = 'production';
    const resProd = await request(app).get('/login');
    const cookieProd = getSetCookie(resProd);
    expect(cookieProd).toMatch(/Secure/i);

    process.env.NODE_ENV = 'test';
    const resDev = await request(app).get('/login');
    const cookieDev = getSetCookie(resDev);
    expect(cookieDev).not.toMatch(/Secure/i);

    process.env.NODE_ENV = old;
  });
});

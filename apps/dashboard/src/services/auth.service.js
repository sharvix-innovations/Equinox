/**
 * Mock authentication. Accepts a demo credential and returns a fake
 * session token + user profile. Swap the body for a real `/auth/login`
 * call; the shape returned here is what the AuthContext expects.
 */
const DEMO = {
  email: 'admin@equinoxenvi.com',
  password: 'equinox',
}

const SESSION_USER = {
  id: 'usr_admin',
  name: 'Sulakshna Ayarekar',
  role: 'Administrator',
  email: DEMO.email,
}

export const authService = {
  async login({ email, password }) {
    await new Promise((r) => setTimeout(r, 550))
    const ok =
      email.trim().toLowerCase() === DEMO.email && password === DEMO.password
    if (!ok) {
      const err = new Error('Invalid email or password.')
      err.code = 'INVALID_CREDENTIALS'
      throw err
    }
    return {
      token: `demo.${btoa(email)}.${Date.now().toString(36)}`,
      user: SESSION_USER,
    }
  },

  async logout() {
    await new Promise((r) => setTimeout(r, 150))
    return true
  },

  // Exposed so the login screen can show the demo credentials hint.
  demoCredentials: DEMO,
}

import React from 'react'

const LoginForm = ({handleLogin, username, setUsername, password, setPassword}) => (
  <div>
    <h2>log in to application</h2>
    <form onSubmit={handleLogin}>
      <div>
        käyttäjätunnus
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
          />
      </div>
      <div>
        salasana
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
          />
      </div>
      <button type="submit">kirjaudu</button>
    </form>
  </div>
)

export default LoginForm
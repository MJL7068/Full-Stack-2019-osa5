import React from 'react'
import Notification from './Notification'

const LoginForm = ({ handleLogin, username, password, message }) => (
  <div>
    <h2>log in to application</h2>

    <Notification message={message}/>

    <form onSubmit={handleLogin}>
      <div>
        käyttäjätunnus
        <input {...username} />
        <br/>
      </div>
      <div>
        salasana
        <input {...password} />
        <br/>
      </div>
      <button type="submit">kirjaudu</button>
    </form>
  </div>
)

export default LoginForm
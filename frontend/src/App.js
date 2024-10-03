import React, { useContext } from 'react'
import { AuthProvider, AuthContext } from './context/AuthContext'
import Login from './components/Login'
import Register from './components/Register'
import Chat from './components/Chat'

const App = () => {
  const { token } = useContext(AuthContext)

  return (
    <div>
      {!token ? (
        <>
          <Login />
          <Register />
        </>
      ) : (
        <Chat />
      )}
    </div>
  )
}

const AppWithAuthProvider = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
)

export default AppWithAuthProvider

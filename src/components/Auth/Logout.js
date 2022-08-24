import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import Profile from './Profile'



export default function Logout() {
    const { logout } = useAuth()
    const navigate = useNavigate()

    function handleAuth() {
        logout()
        navigate('/')
    }

  return (
    <div className="logout text-center p-3 bg-dark text-white">
        <Profile />
        <button id='logoutButton' className="btn btn-danger" onClick={() => handleAuth()}>
            LOGOUT
        </button>
    </div>
  )
}

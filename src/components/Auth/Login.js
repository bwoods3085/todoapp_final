import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Container, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import '../Custom.css'

 
export default function Login() {

    const { login } = useAuth()
    const navigate = useNavigate()

    async function handleAuth() {
        await login()
        return navigate('/')
    }

  return (
    <div className='background'>   
    <br/>   
      <article id='background' className="mb-5 p-2 text-white">
        <h1 className="text-center">Welcome to Preparation Checklist!</h1>
      </article>
      <Container>
        <Card id='loginCard' className='text-center'>
            <Card.Header id='loginHeader' className='text-white'>
                <h2>Login to use this App</h2>
            </Card.Header>
            <Card.Body id='loginBody' className='bg-dark'>
                <button id='cardButton' className="btn btn-danger" onClick={() => handleAuth()}>
                    Login using GitHub
                </button>
            </Card.Body>
        </Card>
      </Container>
    </div>
  )
}

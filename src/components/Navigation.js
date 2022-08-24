import React from 'react'
import {Nav, Navbar} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'


export default function Navigation() {
    const { currentUser } = useAuth()

  return (
    <Navbar expand='md' variant='dark' bg='dark' className='p-3' id='nav'>
        <Navbar.Brand href='/'>Preparation Checklist</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className='justify-content-right'>
            <Nav variant='pills'>
              {!currentUser &&
                  <Link to='/Login' className='nav-link'>Login</Link>
              }

                
                {currentUser &&
                  <>
                  <Link to='/categories' className='nav-link'>CATEGORIES</Link>                                
                  <Link to='/todos' className='nav-link'>TASKS</Link>
                  </>
                }

            </Nav>
        </Navbar.Collapse>
    </Navbar>
  )
}




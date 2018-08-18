import React from 'react'
import {
  Navbar,
  // Nav,
  // NavItem,
  FormGroup,
  FormControl,
} from 'react-bootstrap'
import { Link } from 'react-router-dom'

import './header.scss'

import logo from '../assets/img/me.jpg'

export const Header = () => {
  const searchStyle = {
    borderRadius: '20px',
    width: '400px',
  }

  return (
    <header>
      <Navbar collapseOnSelect inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#brand">
              <img alt="logo goes here" className="img-circle" src={logo} />
            </a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Navbar.Form pullRight>
            <FormGroup>
              <FormControl placeholder="Search" style={searchStyle} type="text" />
            </FormGroup>
            <div className="nav-item">
              <Link to="/login">
                Login
              </Link>
            </div>
          </Navbar.Form>
        </Navbar.Collapse>
      </Navbar>
    </header>
  )
}

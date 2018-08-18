import React from 'react'
import {
  Navbar,
  Nav,
  NavItem,
  FormGroup,
  FormControl,
} from 'react-bootstrap'

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
              <img alt="logo goes here" src={logo} />
            </a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <Navbar.Form pullLeft>
              <FormGroup>
                <FormControl placeholder="Search" style={searchStyle} type="text" />
              </FormGroup>
              {' '}
            </Navbar.Form>
            <NavItem eventKey={1} href="#">
              Login
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  )
}
import React from 'react'

import './header.scss'

import logo from '../assets/img/me.jpg'

export const Header = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">
          <img alt="logo goes here" className="img-circle" src={logo} />
        </a>
        <button aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" className="navbar-toggler" data-target="#navbarSupportedContent" data-toggle="collapse" type="button">
          <span className="navbar-toggler-icon">{' '}</span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <form className="form-inline my-2 my-lg-0 ml-auto">
            <input aria-label="Search" className="form-control mr-sm-2" placeholder="Search" type="search" />
          </form>
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="/login">
                Login
                <span className="sr-only">
                  (current)
                </span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}

import React from 'react'
import './header.css'

function Header({ toggleSideNavDisplay }) {
  return (
    <div>
      <button onClick={() => toggleSideNavDisplay()}>Show Sidenav</button>
    </div>
  )
}

export default Header

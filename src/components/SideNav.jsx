import React from 'react'
import './sideNav.css'

function SideNav({ toggleSideNavDisplay, sideNavDisplay, titles, handleSetActivePoem }) {

  const titleList = titles.map((title, index) => (
    <div
      className="title"
      onClick={() => handleSetActivePoem(title.id)}
      key={index}
    >
      {title.title}
    </div>
  ))

  return (
    <div className={`side-nav ${sideNavDisplay ? 'displayed' : ''}`}>
      <button onClick={() => toggleSideNavDisplay()}>Close</button>
      {titleList}
    </div>
  )
}

export default SideNav

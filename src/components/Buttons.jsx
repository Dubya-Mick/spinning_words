import React from 'react'
import './buttons.css'

function Buttons({ randomize, handleToggleSpinAll, resetPoem, toggleStutter, newPoem, isStuttering }) {
  return (
    <div className='buttons'>
      <button className="button" onClick={() => randomize()}>New Order</button>
      <button className="button" onClick={() => handleToggleSpinAll()}>Toggle Spin</button>
      <button className="button" onClick={() => resetPoem()}>Reset</button>
      <button 
        className={`button ${isStuttering ? 'active' : ''}` }
        onClick={() => toggleStutter()}
        >Stutter
      </button>
      <button className="button" onClick={() => newPoem()}>Set Poem</button>
    
    </div>
  )
}

export default Buttons

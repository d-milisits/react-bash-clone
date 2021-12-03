import React from 'react'
import '../styles/TerminalOptions.css';

const TerminalOptions = ({handleCloseAttempt}) => {

   return (
      <div className="terminalOptions">
         <div className="options">
            <h4 onClick={()=>{handleCloseAttempt()}}>-</h4>
            <h4 onClick={()=>{handleCloseAttempt()}} className="close">X</h4>
         </div>
      </div>
   )
}

export default TerminalOptions

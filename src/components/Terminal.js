import React, {useState, useEffect, useRef} from 'react'
import '../styles/Terminal.css';
import TerminalOptions from './TerminalOptions';

const Terminal = () => {

   //Input/output variables
   const [input, setInput] = useState('');
   const [executionList, setExecutionList] = useState([]);
   //Used to display commands based on user input.
   const [listPointer, setListPointer] = useState(null);

   //Used to force input focus on page load.
   const inputRef = useRef();
   useEffect(() => {
      inputRef.current.focus();
   }, []);

      //Render error message if user attempts to close console.
      const handleCloseAttempt = () => {
         const newError = {
            userInput: '',
            output: 'Sorry, you are unable to close the console at this time.',
            identifier: new Date().getTime(),
            type: 'failure' //Used to render error style on UI
         }
         setExecutionList([newError, ...executionList])
       }

   //Handle input pagination and 'enter' keypress execution.
   const handleKeyDown = (event) => {
      if (event.key === 'ArrowUp' && listPointer !== null) {
         //If greater than length, reset to 0.
         if (listPointer === executionList.length - 1) {
            setListPointer(executionList.length - 1);
            setInput(executionList[listPointer].userInput);
            console.log(listPointer);
         } else {
            setListPointer(listPointer + 1);
            setInput(executionList[listPointer].userInput);
            console.log(listPointer);
         }
      }
      if (event.key === 'ArrowDown' && listPointer !== null) {
         //If less than 0, go to end of list.
         if (listPointer <= 0) {
            setListPointer(0);
            setInput(executionList[listPointer].userInput);
            console.log(listPointer);
         } else {
            setListPointer(listPointer - 1);
            setInput(executionList[listPointer].userInput);
            console.log(listPointer);
         }
      }
    }

    //Called on 'enter' keypress.
   function executeInput(e) {
      e.preventDefault();
      if (input.trim()) {
         // Create new execution object if executable, if not, create error object and append to list.
         try {
            const newExecution = {
               userInput: input,
               output: eval(input),
               identifier: new Date().getTime(), // Noted: ugly way to create unique ID's
               type: 'success' 
            }
            setInput('');
            setExecutionList([newExecution, ...executionList]);
            setListPointer(executionList.length);
            console.log(listPointer);
         } catch (e) {
            setInput('');
            const newError = {
               userInput: `"${input}"`,
               output: ' is not a recognizable command. Please try again.',
               identifier: new Date().getTime(),
               type: 'failure' //Used to render error style on UI
            }
            setExecutionList([newError, ...executionList]);
            setListPointer(executionList.length);
            console.log(listPointer);
         }
      }
   }

   return (
      <div className="terminal">
         <TerminalOptions handleCloseAttempt={handleCloseAttempt} />
         <div className="terminal-content">
            <form onSubmit={executeInput}>
               <div className="input-ctr">
                  <p><span style={{color: '#2ecc71'}}>C:\Users</span><span style={{color: '#9b59b6'}}>\User</span> >> </p>
                  <input ref={inputRef} onKeyDown={handleKeyDown} value={input} onChange={(e)=>{setInput(e.target.value)}}></input>
               </div>
               {/* <button type="submit">Submit</button> */}
            </form>
            <div className="execution-ctr">
            {
               executionList.map((execution) => {
                  return <div className="execution" key={execution.identifier}>
                     {execution.type === 'success' ? <p>"{execution.userInput}" -> {execution.output}</p> : <p className="error">{execution.userInput} {execution.output}</p>}
                  </div>
               })
            }
            </div>
            <div className="warning">
               <h4>!</h4>
               <div className="warning-msg">
                  <p><span>Please note</span>: This was made in a short period of time and is by no means a flawless program.</p>
                  <p>Enter <span>simple</span> JavaScript functions such as: "3+3", or new String("test " + "string") to see the result.</p>
                  <p>Use <span>up/down arrows</span> on your keyboard to cycle through previous commands.</p>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Terminal

import React, {useState} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";
import {numbersList, upperCaseLetters, lowerCaseLetters, specialCharacters} from "./characters";
import {COPY_SUCCESS} from './message';

function App() {

  const [password, setPassword] = useState('');
  const [passwordLength, setPasswordLength] = useState(20);
  const [uppercase, setUppercase] = useState(false);
  const [lowercase, setLowercase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);

  const handleGeneratePassword = (e) => {
    if(!lowercase && !uppercase && !numbers && !symbols){
      notification("You must select at least on option...", true)
    }
    let characterList = ''
    if(lowercase){
      characterList = characterList + lowerCaseLetters
    }
    if(uppercase){
      characterList = characterList + upperCaseLetters
    }
    if(numbers){
      characterList = characterList + numbersList
    }
    if(symbols){
      characterList = characterList + specialCharacters
    }

    setPassword(createPassword(characterList));
  }

  const createPassword =(characterList) => {
    let password = ''
    const characterListLength = characterList.length

    for(let i=0; i<passwordLength; i++){
      const characterIndex = Math.round(Math.random() * characterListLength)
      password = password + characterList.charAt(characterIndex)
    }
    return password
  }

  const copyToClipboard = () => {
    const newTextArea = document.createElement('textarea')
    newTextArea.innerText = password
    document.body.appendChild(newTextArea)
    newTextArea.select()
    document.execCommand('copy')
    newTextArea.remove()
  }

  const notification = (message, hasError = false) => {
    if(hasError){
      toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }else{
      toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
   
  }

  const handleCopyPassword = () => {
    if(password === ''){
      notification('Nothing to Copy', true)
    }else{
    copyToClipboard()
    notification(COPY_SUCCESS)
    }
  }


  return (
    <div className="App">
       <div className="headline">
        <h2>PASSWORD GENERATOR TOOL</h2>
        <h1>Generate a Secure Password!!!</h1>
        </div>
      <div className="container">
        <div className="password_generator">
          <h2 className="generator_header">Password Generator</h2>
          <div className="password">
            <h3>{password}</h3>
            <button className="copy" onClick={handleCopyPassword}>
            <i class="fa fa-clipboard" aria-hidden="true"></i>
            </button>
          </div>

          <div className="form_group">
            <label htmlFor="password-strength">Password Length</label>
            <input
            defaultValue={passwordLength}
            onChange={(e)=>setPasswordLength(e.target.value)}
              type="number"
              id="password-strength"
              name="password-strength"
              max="20"
              min="10"
            />
          </div>

          <div className="form_group">
            <label htmlFor="uppercase">Include Uppercase Letters</label>
            <input
              checked={uppercase}
              onChange={(e)=>setUppercase(e.target.checked)}
              type="checkbox"
              id="uppercase"
              name="uppercase"
            />
          </div>

          <div className="form_group">
            <label htmlFor="lowercase">Include Lowercase Letters</label>
            <input
              checked={lowercase}
              onChange={(e)=>setLowercase(e.target.checked)}
              type="checkbox"
              id="lowercase"
              name="lowercase"
            />
          </div>

          <div className="form_group">
            <label htmlFor="numbers">Include Numbers</label>
            <input
              checked={numbers}
              onChange={(e)=>setNumbers(e.target.checked)}
              type="checkbox"
              id="numbers"
              name="numbers"
            />
          </div>

          <div className="form_group">
            <label htmlFor="symbols">Include Symbols</label>
            <input
              checked={symbols}
              onChange={(e)=>setSymbols(e.target.checked)}
              type="checkbox"
              id="symbols"
              name="symbols"
            />
          </div>
          
          <button className="generator_btn" onClick={handleGeneratePassword}>
            Generate Password
          </button>
            <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            />
        </div>
      </div>
    </div>
  );
}

export default App;

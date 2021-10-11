import Styles from './App.module.css';
import { useState } from "react";
import Card from "./components/Card";
import { CopyToClipboard } from "react-copy-to-clipboard";

const charLg = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','X'];
const charSm = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
const symbols = ['~','`','!','@','#','$','%','^','&','*','(',')','_','-','+','=','{','[','}',']','|',':',';','"','<',',','>','.','?','/']

function App() {
  const [length, setlength] = useState(0);
  const [output, setoutput] = useState("");
  const [error, seterror] = useState(false);

  const lengthChangeHandler = event => {
    setlength(event.target.value);
    console.log(length);
    setoutput("");
  }

  const generateClickHandler = () =>{
    if(length < 4){
      seterror(true);
      return;
    }
    seterror(false);
    let ans="";
    for(let i=0;i<length;i++){
      let idx=0;
      if(i%4 === 0 || i%4 === 2){
        idx = +Math.floor(Math.random() * 26);
        if(i%4 === 0){
          ans += charLg[idx];
        }else{
          ans += charSm[idx];
        }
      }else{
        if(i%4 === 1){
          idx = Math.floor(Math.random() * 10);
          ans += idx;
        }else{
          idx = Math.floor(Math.random() * 30);
          ans += symbols[idx];
        }
      }
    }
    setoutput(ans);
  }

  return (
    <Card>
      <h1>Password Generator</h1>
      <label>Enter the length of password: </label>
      <input type='number' min='4' onChange={lengthChangeHandler}/>
      {error && <p className={Styles.error}>Length should be greater then 4</p>}
      <button onClick={generateClickHandler} className={Styles.button}> Generate Password </button>
      <input type='text' disabled placeholder='Generated password' value={output} className={Styles.output} />
      <CopyToClipboard text={output}>
        <button className={Styles.icon}><i className="far fa-copy"></i></button>
      </CopyToClipboard>
    </Card>
  );
}

export default App;

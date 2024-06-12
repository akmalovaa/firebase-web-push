import { useState, useEffect } from 'react'
import reactLogo from '/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { generateToken, messaging } from '../src/firebase'
import { onMessage } from 'firebase/messaging'

function App() {
  const [token, setToken] = useState('');
  useEffect(() => {
    onMessage(messaging, (payload) => {
      console.log(payload);
    });
  }, []
  );
  const getToken = async () => {
    try {
      const newToken = await generateToken();
      setToken(newToken);
    } catch (error) {
      console.error('Error receiving the token:', error);
    }
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <p>
        Simple example firebase web push receive
      </p>
      <div className="card">
        {token && <p>Current client token:</p>}
        <div className="token-block" title="Нажмите, чтобы скопировать токен">
          {token}
        </div>
        <p></p>
        <button onClick={() => getToken()}>
          Get token
        </button>
        <p></p>

      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      
    </>
  
  )
}

export default App



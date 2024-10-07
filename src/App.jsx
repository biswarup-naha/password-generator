import { useState, useEffect, useCallback, useRef } from 'react'

function App() {
  const [len, setLen] = useState(8);
  const [num, setNum] = useState(false);
  const [charac, setCharac] = useState(false);
  const [password, setPassword] = useState('');

  //reference hook
  const passwordRef = useRef(null);
  const headerRef = useRef("Copy");

  const generatePassword = useCallback(() => {
    let pass = '';
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if (num) str += "0123456789";
    if (charac) str += "!@#$%^&*()_+-=[]{}|;':,./<>?";

    for (let i = 0; i < len; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length));
    }

    setPassword(pass);
  }, [len, num, charac, setPassword]);

  const copyToClipboard = useCallback(() => { 
    
    window.navigator.clipboard.writeText(password);
    headerRef.current.classList.remove('animate-pulse');
    headerRef.current.innerText="   ✔   ";
    passwordRef.current.select()
  },[password])

  useEffect(() => {
    generatePassword();
  }, [len, num, charac, generatePassword]);

  return (
    <>
      <div className=' w-full max-w-lg px-4 py-3 mx-auto my-8 shadow-md rounded-lg bg-slate-800 text-white'>
        <h1 className='text-center text-4xl text-white my-3 '>Password Generator</h1>
        <div className='flex rounded-lg overflow-hidden mb-4 shadow-md'>
          <input
            type="text"
            value={password}
            className='outline-none w-full py-1 px-3 text-orange-500'
            placeholder='Password'
            readOnly
            ref={passwordRef}
          />
          <button
            className='outline-none bg-emerald-500 animate-pulse text-gray-200 px-3 py-1 shrink-0'
            ref={headerRef}
            onClick={copyToClipboard}
          >
            copy
          </button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
              type="range"
              min={6}
              max={100}
              value={len}
              className='outline-none w-full py-1 px-3 text-orange-500 cursor-pointer'
              onChange={e => setLen(e.target.value)}
            />
            <label>Length:{len}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={num}
              className='outline-none w-4 h-4 text-orange-500 cursor-pointer'
              onChange={() => setNum(prevNum => !prevNum)}
            />
            <label>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type="checkbox"
              className='outline-none w-4 h-4 text-orange-500 cursor-pointer'
              defaultChecked={charac}
              onChange={() => setCharac(charac => !charac)}
            />
            <label>Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App

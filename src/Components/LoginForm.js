import React, { useEffect, useState } from 'react';
import login_bg from '../Assets/images/login-bg.jpg'
import { useNavigate } from 'react-router-dom';
import { USER } from '../Assets/data';
import { GetContext } from '../Context/GetContext';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate()
  const myContext = GetContext()



  useEffect(() => {
    const storedUsername = localStorage.getItem('loginUsername');
    const storedPassword = localStorage.getItem('loginPassword');
    const storedRememberMe = localStorage.getItem('rememberMe');

    if (storedRememberMe && storedRememberMe === 'true') {
      setRememberMe(true);
      setUsername(storedUsername || '');
      setPassword(storedPassword || '');
    }
  }, []);



  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const verifyLogin = (user, pass) => {
    let login = false
    USER.map(el => {
      if (el.user === user) {
        if (el.password === pass) {
          login = el
        }
      }
    })
    return login

  }


  const handleLogin = (e) => {
    e.preventDefault();

    // Perform your login logic here, e.g., making an API call

    if (username === '') {
      setError('Username cannot be empty');
    } else if (password === '') {
      setError('Password cannot be empty');
    } else {
      // Successful login, navigate to the dashboard
      // You can use React Router or any other navigation library here
      const user = verifyLogin(username, password)
      if (user) {
        myContext.setUserData(user)
        user.role === 'user' ? navigate('/dashboard') : navigate('/admin')

        if (rememberMe) {
          localStorage.setItem('loginUsername', username);
          localStorage.setItem('loginPassword', password);
          localStorage.setItem('rememberMe', rememberMe);
        } else {
          localStorage.removeItem('loginUsername');
          localStorage.removeItem('loginPassword');
          localStorage.removeItem('rememberMe');
        }


      }
      else {
        setError('Invalid username or password');
      }
    }

  };

  return (
    <div className="flex flex-col h-screen" style={{ backgroundImage: `url(${login_bg})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>


      <main className="mx-auto my-auto w-[60%] md:w-[40%]  max-w-md">
        <div className="w-full ">
          <form className="bg-gray-900 bg-opacity-60 rounded-md shadow-3xl shadow-xl shadow-[#696464ad]  px-8 pt-6 pb-8 ">
            <div className="mb-4">
              <label className="block text-white text-sm font-bold mb-2" htmlFor="username">
                Username
              </label>
              <input
                className="shadow appearance-none  bg-gray-700 bg-opacity-60 rounded-full border  w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={handleUsernameChange}
              />
            </div>
            <div className="mb-6">
              <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                className="shadow appearance-none bg-gray-700 bg-opacity-60 rounded-full border border-red  w-full py-2 px-3 text-white mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="********"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>




            <div className='px-2 text-white'>
              <input
                className='mr-2 '
                type='checkbox'
                id='rememberMe'
                checked={rememberMe}
                onChange={handleRememberMeChange}
              />
              <label htmlFor='rememberMe'>Remember me</label>
            </div>


            {error && <p className="bg-opacity-25 h-6 text-white tracking-wide px-2 bg-red-500 text-sm italic">{error}</p>}
            <div className="flex items-center justify-between">

              <button
                className="bg-blue-500 hover:bg-blue-700 bg-opacity-70 rounded-full text-white font-bold py-2 px-4  focus:outline-none focus:shadow-outline w-full"
                type="submit"
                onClick={handleLogin}
              >
                Log In
              </button>
            </div>
          </form>
        </div>
      </main>


    </div>
  );
};

export default LoginForm;

import React from 'react'
import '../../assets/style.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Images } from "../../context/images"
import { ToastContainer } from 'react-toastify';
import { SuccessToast, ErrorToast, WarningToast } from '../toaster';

import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
  if (localStorage.getItem('user')) {
    window.location.href = '/sidebar';
  }
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const submitButton = async () => {
    try {
      if (email && password) {
        const user = {
          email: email,
          password: password
        }
        const res = await axios.post('http://localhost:5000/verification/login', user);
        console.log(res.data);
        if (res.status === 200) {
          localStorage.setItem('user', JSON.stringify(res.data.user));
          SuccessToast({ message: res.data.message, isNavigate: true, navigate: navigate, path: '/sidebar' });
        }
        else {
          ErrorToast({ message: res.data.message });
        }
      }
      else {
        WarningToast({ message: "Please fill all the fields" });
      }

    } catch (error) {
      ErrorToast({ message: error.response.data.message });
    }
  }




  const navigate = useNavigate();
  return (
    <>
      <ToastContainer />
      <div className='Header'>
        <img
          src={Images.logoImage}
          alt=''
          className='image'
        />
        <h2>Walchand College of Engineering</h2>
      </div>

      <div className='login-form'>
        <h2>Welcome to Verification Portal</h2>
        <div className='form'>
          <h2 style={{ textAlign: 'start', marginBlockStart: '0rem' }}>
            Sign in
          </h2>
          <div className='innerDiv'>
            <label htmlFor='username'>E-mail*</label>
            <input
              type='text'
              id='username'
              placeholder=' Enter your email'
              name='username'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='innerDiv'>
            <label htmlFor='password'>Password*</label>
            <input
              type='password'
              id='password'
              name='password'
              placeholder=' Enter your password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type='submit' className='submitbtn' onClick={submitButton}>
            Login
          </button>
          <p
            style={{ color: 'blue', textDecoration: 'none', cursor: 'pointer' }}
            onClick={() => {
              navigate('/forgotpassword')
            }}
          >
            Forgot Password
          </p>
        </div>
      </div>
    </>

  );
}

export default Login
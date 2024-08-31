import React, { useState } from 'react'


const Signup = () => {
const [username,setUsername] = useState('');
const [email,setEmail] = useState('');
const [password,setPassword] = useState('');

  return (
    <div className='sign-up-container'>
      
        <form className='sign-up-form'>
        <h2>
            Sign Up
        </h2>
            <label htmlFor='username'>Username</label>
            <input type="text" placeholder='username'/>

            <label htmlFor='email'>Email ID</label>
            <input type="email" autoComplete='off' placeholder='example@gmail.com'/>

            <label htmlFor='password'>Password</label>
            <input type="password" placeholder="Your Password must be strong"/>

            <button type='submit'>
                Sign Up
            </button>

        </form>
      
    </div>
  )
}

export default Signup

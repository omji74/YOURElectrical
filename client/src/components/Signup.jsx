import React, { useState } from 'react'
import Axios from 'axios';


const Signup = () => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) =>{
        e.preventDefault();
        Axios.post('http://localhost:3000/auth/signup',{username,email,password})
        .then(response =>{
            console.log(response)
        })
        .catch(err =>{
            console.log(err)
            
        })
    }

    return (
        <div className='sign-up-container'>

            <form className='sign-up-form' onSubmit={handleSubmit}>
                <h2>
                    Sign Up
                </h2>
                <label htmlFor='username'>Username</label>
                <input type="text" placeholder='username' onchange={(e) => setUsername(e.target.value)} />

                <label htmlFor='email'>Email ID</label>
                <input type="email" autoComplete='off' placeholder='example@gmail.com' onchange={(e) => setEmail(e.target.value)} />

                <label htmlFor='password'>Password</label>
                <input type="password" placeholder="Your Password must be strong" onchange={(e) => setPassword(e.target.value)} />

                <button type='submit'>
                    Sign Up
                </button>

            </form>

        </div>
    )
}

export default Signup

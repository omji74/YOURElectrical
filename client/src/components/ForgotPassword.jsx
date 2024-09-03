import {useState} from 'react'
import axios from 'axios';
import {useNavigate,Link} from 'react-router-dom'


const ForgotPassword = () => {
    const [email, setEmail] = useState("");
 
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:5000/auth/forgot-password', {  email})

        .then(response => {
            if(response.data.status){
                alert("Check Your email for reset password link")
                navigate('/login');
            }
           console.log(response.data);


        })
        .catch(err => {
            console.log(err, "not post from frontend from forgot password page ")

        })
}


  return (
    <div className="sign-up-container">
    <form className="sign-up-form" onSubmit={handleSubmit}>
    
    <h2> Forgot Password</h2>

      <label htmlFor="email">Email:</label>
      <input
        type="email"
        autoComplete="off"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

   

      <button type="submit">Reset Password</button>
      <p>Don't Have Account? <Link to="/signup">Sign Up</Link></p> 
    </form>
  </div>
  )
}

export default ForgotPassword

import {useState} from 'react'
import axios from 'axios';
import {useNavigate,Link,useParams} from 'react-router-dom'


const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const {token} = useParams();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:5000/auth/reset-password/'+token, { password})

        .then(response => {
            if(response.data.status){
                alert("Password Update Successfully")
                navigate('/login');
            }
            console.log(response.data)
           


        })
        .catch(err => {
            console.log(err, "not post from frontend from reset page")

        })
}


  return (
    <div className="sign-up-container">
    <form className="sign-up-form" onSubmit={handleSubmit}>
    
    <h2> Reset Password</h2>

      <label htmlFor="password">Password</label>
      <input
        type="password"
        placeholder="Enter your new password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit"> Update</button>
      <p>Don't Have Account? <Link to="/signup">Sign Up</Link></p> 
    </form>
  </div>
  )
}

export default ResetPassword

import React from 'react'
import { auth } from '../../Config/firebaseConfig'
import {createUserWithEmailAndPassword, updateProfile, 
signInWithEmailAndPassword} from 'firebase/auth'
import './Auth.css'
import {useNavigate} from 'react-router-dom'



function Auth() {

    let navigate = useNavigate();
    //create state to control which form to show
    const [existingUser, setExistingUser] = React.useState(false)
    //create state for user information
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [name, setName] = React.useState('')

    const handleSignup = (e) =>{
        e.preventDefault();
        console.log('signup')
        //call function to create user
        createUserWithEmailAndPassword(auth, email, password)
        .then(res =>{
            console.log(res.user)
            //add username as display name
            updateProfile(auth.currentUser, {displayName: name})
            //navigate to homepage
            navigate('/')
        })
        .catch(err => console.log(err))
    }

    const handleLogin = (e) =>{
        e.preventDefault();
        //login
        signInWithEmailAndPassword(auth, email, password)
        .then(res =>{
            //navigate to homepage
            navigate('/')
        })
        .catch(err => {
            alert(err.com)
        })

    }

  return (
    <div className='auth-container'>
        {
            existingUser?
            <form className='auth-form' onSubmit={handleLogin}>
                <h1>Login with your email</h1>
                        <div className='form-group'>
                            <input type='email'
                            onChange={(e)=>setEmail(e.target.value)}
                            placeholder='Enter your email'
                            required
                            />
                            <input type="password"
                            type='password'
                            onChange={(e)=>setPassword(e.target.value)}
                            placeholder='Enter password'
                            required
                            />
                        </div>
                        <button type="submit">Login</button>
                        <p>Don't have an account? <span onClick={()=>setExistingUser(false)} className='form-link' >Signup</span></p>

            </form>
            :
            <form className='auth-form' onSubmit={handleSignup}>
                    <h1>Signup with your email</h1>
                        <div className='form-group'>
                            <input type='text'
                            onChange={(e)=>setName(e.target.value)}
                                    placeholder='Enter your name'
                                    required
                            />
                            <input type='email'
                            onChange={(e)=>setEmail(e.target.value)}
                                    placeholder='Enter your email'
                                    required
                            />
                            <input type='password'
                            onChange={(e)=>setPassword(e.target.value)}
                                    placeholder='Enter password'
                                    required
                            />
                                            
                        </div>
                        <button type="submit">Register</button>
                        <p>Already have an account? <span
                        onClick={()=>setExistingUser(true)} className="form-link" >Login</span></p>

            </form>
        }
    </div>
  )
}

export default Auth

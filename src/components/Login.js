import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { CiMail } from "react-icons/ci";
import { PiLockKeyOpenLight, PiHandWavingFill } from "react-icons/pi";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

function Login() {
    const [eye, setEye] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate()

    const handleLoginChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('Eamil:', email);
        console.log('Password:', password);

        let storedData = JSON.parse(localStorage.getItem('formData'))
        console.log(storedData);

        if (!storedData) {
            setError("This account is not registered yet!")
        } else {
            if (storedData.email !== email) {
                setError('Wrong Credentials! please try again')
            } else {
                navigate('/shows')
            }
        }
    };

    return (
        <div id='Login' className="container-fluid d-flex justify-content-end">

            <form onSubmit={handleSubmit} className='me-5 d-flex flex-column justify-content-evenly align-items-center vh-100' style={{ width: '30%' }}>
                <div className='logo w-100 d-flex align-items-center'>
                    <img src="../logoGorilla.png" alt="logoGorilla" className='bg-black' style={{ width: "60px", height: "60px", borderRadius: "14px", }} /> <span className='fs-1 font-monospace'>Gorilla Movies</span>
                </div>
                <div className='w-100'>
                    <h3 className='mb-1 fs-1'>Hi dear <PiHandWavingFill style={{ color: '#ffcc46' }} /></h3>
                    <h5 className='text-secondary'>Please enter your details...</h5>
                    <p className='text-danger m-0 position-relative mx-5 px-3'>{error}</p>
                </div>


                <div className='email w-100'>
                    <label className='float-start fs-4 w-100' htmlFor="email">Email:</label>
                    <div className="emailIcon bg-light d-flex align-items-center w-100" style={{ borderRadius: '8px' }}>
                        <CiMail className='fs-4 mx-2 text-black ' />
                        <input type="email" className='fs-5 py-2 pe-3  w-100 border-0' value={email} onChange={handleLoginChange} id='email' style={{ borderRadius: '8px' }} required />
                    </div>
                </div>

                <div className='password w-100'>
                    <label className='float-start fs-4 w-100' htmlFor="password">Password:</label>
                    <div className="passIcon border bg-light border-1 d-flex align-items-center w-100" style={{ borderRadius: '8px' }}>
                        <PiLockKeyOpenLight className='fs-4 mx-2 text-black' />
                        <input type={!eye ? "password" : "text"} className='fs-5 py-2 pe-3 w-100 border-0' value={password} onChange={handlePasswordChange} id='password' style={{ borderRadius: '8px' }} required />
                        {!eye ?
                            < FaRegEye className='fs-4 mx-2 text-black' onClick={() => { setEye(!eye) }} />
                            :
                            < FaRegEyeSlash className='fs-4 mx-2 text-black' onClick={() => { setEye(!eye) }} />
                        }
                    </div>
                </div>

                <button type="submit" className='fs-5 py-2 px-3 w-100 mt-2 text-light border-0'>Log in</button>

                <h6>Don't have account <Link to="/reg">SignUp</Link></h6>
            </form>
            <div className="img">

            </div>
        </div>
    )
}

export default Login

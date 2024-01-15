import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function Login() {

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

        let storedEmail = localStorage.getItem('Email')

        if (storedEmail !== email) {
            setError('Wrong Credentials! please try again')
        } else {
            navigate('/shows')
        }

        setTimeout(() => {
            setError("")
        }, 4000);

    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4"></div>

                <div className="col-md-4">
                    <form onSubmit={handleSubmit} className='container login'>

                        <h3 className='mb-3'>Login Now!</h3>

                        <label className='label' htmlFor="">Email:</label>
                        <input type="email" className='form-control' value={email} onChange={handleLoginChange} required />

                        <label className='label' htmlFor="">Password:</label>
                        <input type="password" className='form-control' value={password} onChange={handlePasswordChange} required />

                        <button type="submit" className='btn btn-success form-control mt-2'>Login</button>

                        <h6>Don't have account <Link to="/reg">SignUp</Link></h6>

                        {error === ""
                            ?
                            <></>
                            :
                            <div className="alert alert-danger d-flex align-items-center mt-2" role="alert">
                                <div>
                                    {error}
                                </div>
                            </div>
                        }

                    </form></div>
                <div className="col-md-4"></div>
            </div>
        </div>
    )
}

export default Login

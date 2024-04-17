import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('Eamil:', email);
        console.log('Password:', password);

        const storedEmail = localStorage.getItem('Email')

        if (email === storedEmail) {
            alert("This email is already in use.")
        } else {

            localStorage.setItem('Email', email)
            localStorage.setItem('Password', password)

            alert('Email Register Successfully')
        }
    };
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4"></div>

                <div className="col-md-4">
                    <form onSubmit={handleSubmit} className='container login'>

                        <h3 className='mb-3'>Register Now!</h3>

                        <label className='label' htmlFor="">Email:</label>
                        <input type="email" className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} required />

                        <label className='label' htmlFor="">Password:</label>
                        <input type="password" className='form-control' value={password} onChange={(e) => setPassword(e.target.value)} required />

                        <button type="submit" className='btn btn-success form-control mt-2'>Register</button>

                        <h6>Already have account <Link to="/">Login</Link></h6>

                    </form></div>
                <div className="col-md-4"></div>
            </div>
        </div>

    )

}
export default Register;

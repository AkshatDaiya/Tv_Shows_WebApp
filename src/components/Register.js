import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { CiMail } from "react-icons/ci";
import { PiLockKeyOpenLight } from "react-icons/pi";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { BiRename } from "react-icons/bi";
import { HiOutlineArrowRight, HiOutlineArrowLeft } from "react-icons/hi2";

function Register() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        repeatPassword: ''
    })
    const [pageNo, setPageNo] = useState(1);
    const [message, setMessage] = useState('');
    const [eye, setEye] = useState(false);
    const [nextBtn, setNextBtn] = useState(false);
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('Email:', formData.email);
        console.log('Password:', formData.password);

        let storedFormData = JSON.parse(localStorage.getItem('formData'));

        if (storedFormData && formData.email === storedFormData.email) {
            setMessage("This email is already in use.");
        } else {
            if (formData.password === formData.repeatPassword) {
                const mergedFormData = {
                    ...storedFormData,
                    ...formData
                };
                localStorage.setItem('formData', JSON.stringify(mergedFormData));
                alert('Email Register Successfully');
                navigate('/shows');
            } else {
                setMessage("Password does not match");
            }
        }
    };




    const handleNextPage = () => {
        setNextBtn(true)

        setTimeout(() => {
            setPageNo(pageNo + 1)
        }, 400);
    }

    const handlePrevPage = () => {
        setNextBtn(false)

        setTimeout(() => {
            setPageNo(pageNo - 1)
        }, 400);
    }

    return (
        <div id='Reg' className="container-fluid d-flex align-items-center justify-content-center">
            <form onSubmit={handleSubmit} className='p-3 text-light d-flex flex-column align-items-center' style={{ background: '#151515d1', borderRadius: '20px' }}>

                <h3 className='mb-4'>Register to log in!</h3>

                <p className='text-danger m-0'>{message}</p>

                {pageNo === 1 ?
                    <div className={`pageNo1 w-100 ${nextBtn ? "opacity-0" : "opacity-1"}`} style={{ transition: 'all 0.3s ease-out' }}>
                        <span onClick={handleNextPage}><HiOutlineArrowRight className='fs-3' /></span>

                        <div className='fullName mb-4 w-100 d-flex flex-column align-items-center'>
                            <label className='float-start fs-4 w-75' htmlFor="fullName">Full Name</label>
                            <div className="emailIcon bg-light d-flex align-items-center w-75" style={{ borderRadius: '8px' }}>
                                <BiRename className='fs-4 mx-2 text-black ' />
                                <input
                                    type="text"
                                    className='fs-5 py-2 pe-3  w-100 border-0'
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} id='fullName'
                                    style={{ borderRadius: '8px' }}
                                    required
                                />
                            </div>
                        </div>

                        <div className='email mb-4 w-100 d-flex flex-column align-items-center'>
                            <label className='float-start fs-4 w-75' htmlFor="email">Email</label>
                            <div className="emailIcon bg-light d-flex align-items-center w-75" style={{ borderRadius: '8px' }}>
                                <CiMail className='fs-4 mx-2 text-black ' />
                                <input
                                    type="email"
                                    className='fs-5 py-2 pe-3  w-100 border-0'
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    id='email'
                                    style={{ borderRadius: '8px' }}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    :

                    <div className={`pageNo2 w-100 ${nextBtn ? "opacity-1" : "opacity-0"}`} style={{ transition: 'all 0.3s ease-out' }}>

                        <span onClick={handlePrevPage}><HiOutlineArrowLeft className='fs-3' /></span>

                        <div className='password mb-4 w-100 d-flex flex-column align-items-center'>
                            <label className='float-start fs-4 w-75' htmlFor="password">Password</label>
                            <div className="passIcon border bg-light border-1 d-flex align-items-center w-75" style={{ borderRadius: '8px' }}>
                                <PiLockKeyOpenLight className='fs-4 mx-2 text-black' />
                                <input
                                    type={!eye ? "password" : "text"}
                                    className='fs-5 py-2 pe-3 w-100 border-0'
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })} id='password'
                                    style={{ borderRadius: '8px' }}
                                    minLength={8} required
                                />
                                {!eye ?
                                    < FaRegEye className='fs-4 mx-2 text-black' onClick={() => { setEye(!eye) }} />
                                    :
                                    < FaRegEyeSlash className='fs-4 mx-2 text-black' onClick={() => { setEye(!eye) }} />
                                }
                            </div>
                        </div>

                        <div className='password mb-2 w-100 d-flex flex-column align-items-center'>
                            <label className='float-start fs-4 w-75' htmlFor="repassword">Repeat Password</label>
                            <div className="passIcon border bg-light border-1 d-flex align-items-center w-75" style={{ borderRadius: '8px' }}>
                                <PiLockKeyOpenLight className='fs-4 mx-2 text-black' />
                                <input
                                    type={!eye ? "password" : "text"}
                                    className='fs-5 py-2 pe-3 w-100 border-0'
                                    value={formData.repeatPassword}
                                    onChange={(e) => setFormData({ ...formData, repeatPassword: e.target.value })}
                                    id='repassword'
                                    style={{ borderRadius: '8px' }}
                                    minLength={8} required
                                />
                                {!eye ?
                                    < FaRegEye className='fs-4 mx-2 text-black' onClick={() => { setEye(!eye) }} />
                                    :
                                    < FaRegEyeSlash className='fs-4 mx-2 text-black' onClick={() => { setEye(!eye) }} />
                                }
                            </div>
                        </div>

                        {!formData.fullName || !formData.email || !formData.password || !formData.repeatPassword ?
                            <button button type="submit" className='fs-5 py-2 px-3 w-100 mt-2 text-light border-0' style={{ cursor: "no-drop" }} disabled>Register</button>
                            :
                            <button type="submit" className='fs-5 py-2 px-3 w-100 mt-2 text-light border-0'>Register</button>
                        }
                    </div>
                }

                <h6 className='mt-2'>Already have account <Link to="/">Login</Link></h6>
            </form >
        </div >
    )

}
export default Register;

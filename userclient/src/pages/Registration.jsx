import React, {useEffect, useState} from "react";
import "./layouts/registrationStyles.css"
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function Registration(){

    const [values, setValues] = useState({
        nameUser: '',
        email: '',
        password: ''
    })

    const navigate = useNavigate()

    async function handleClick(e){
        e.preventDefault()
        try{
            const response = await axios.post("http://localhost:8800/registration", values)
            if (response.data === "User added!"){
                toast.success("User created successfully!", {autoClose: 2000})
                // navigate("/authorization")
            } else{
                toast.error("Error creating user. Please try again!")
            }
        }catch (err){
            console.log(err)
        }
    }
    function handleInput (e) {
        setValues(function (prev){
            return {...prev, [e.target.name]: [e.target.value]}
        })
        console.log(values)
    }

    return (
        <div className="App">
            <section className="sectionClass">
                <div className="mask">
                    <div className="card-body">
                        <h2 className="h2teg">Create an account</h2>

                        <form>

                            <div className="cs1">
                                <input type="text" onChange={handleInput} id="form3Example1cg" name="nameUser" />
                                <label className="form-label" htmlFor="form3Example1cg">Your Name</label>
                            </div>

                            <div className="cs1">
                                <input type="email" onChange={handleInput} id="form3Example3cg" name="email"/>
                                <label className="form-label" htmlFor="form3Example3cg">Your Email</label>
                            </div>

                            <div className="cs1Password">
                                <input type="password" onChange={handleInput} id="form3Example4cdg" name="password" />
                                <label className="form-label" htmlFor="form3Example4cdg">Password</label>
                            </div>

                            <div className="buttonReg ">
                                <button type="button" className="btn" onClick={handleClick}>Register</button>
                            </div>

                            <p className="pTag">Have already an account?
                                <a href="/authorization" className="aTag">
                                    <u>Login here</u>
                                </a>
                            </p>

                        </form>

                    </div>
                </div>
            </section>
            <ToastContainer/>
        </div>
    )
}

export default Registration
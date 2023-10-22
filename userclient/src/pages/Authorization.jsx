import React, {useEffect, useState} from "react";
import "./layouts/authorizationStyles.css"
import axios from "axios";
import { useNavigate } from "react-router-dom"
import  { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

function Authorization(){

    const [values, setValues] = useState({
        emailAuth: ''
    })
    const [val, setVal] = useState(null);
    const navigate = useNavigate()
    async function handleClick(e){
        e.preventDefault()
        try{
            const response = await axios.post("http://localhost:8800/authorization", values)

            if (response.data !== "Authorization error"){
                setVal(response.data)
                toast.success("Authorization passed successfully!", {autoClose: 2000})
            }else{
                toast.error("No such user. Please try again!")
            }
        }catch (err){
            console.log(err)
        }
    }
    useEffect(function (){
        if (val !== null){
            navigate("/", { state: { val } });
            // console.log(val)
        }
    }, [val])
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
                        <h2 className="h2tegAuth">Log In</h2>

                        <form>

                            <div className="cs1">
                                <input type="email" onChange={handleInput} id="form3Example3cg" name="emailAuth"/>
                                <label className="form-label" htmlFor="form3Example3cg">Your Email</label>
                            </div>

                            <div className="cs1PasswordAuth">
                                <input type="password" onChange={handleInput} id="form3Example4cg" name="passwordAuth"/>
                                <label className="form-label" htmlFor="form3Example4cg">Password</label>
                            </div>

                            <div className="buttonLogIn">
                                <button type="button" onClick={handleClick} className="btn">Log In</button>
                            </div>

                            <p className="pTag">No Account?
                                <a href="/registration" className="aTag">
                                    <u>Register</u>
                                </a>
                            </p>

                            <div className="buttonLogIn">
                                <a href="http://localhost:3000/" className="btn">Главное меню</a>
                            </div>

                        </form>

                    </div>
                </div>
            </section>
            <ToastContainer/>
        </div>
    )
}

export default Authorization
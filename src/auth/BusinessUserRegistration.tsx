import Joi from "joi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../components/Title";


interface IBusinessUserData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    biz: boolean;
}

function BusinessUserRegistration() {
    // States
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    function submit() {
        const schema = Joi.object().keys({
            firstName: Joi.string().required().min(2).max(255),
            lastName: Joi.string().required().min(2).max(255),
            email: Joi.string().required().min(6).max(255).email({ tlds: { allow: false}}),
            password: Joi.string().required().min(6).max(30)
        });

        const { error, value } = schema.validate({
            firstName,
            lastName,
            email,
            password
        });

        if (error) {
            setError(error.message);
            return;
        }

        setError('');
        register(value);  
    }

    function register(data: IBusinessUserData) {
        // 1. Send data to the server Rest API...
        console.log(data);
        // 2. If All OK Navigate to Signin
        navigate('/businesscardregistration');
    }

    return ( 
        <>
            <Title 
                main="Business Registration Form"
                sub="Open business account for free !"
            />
            <div className="p-3 form-max-w w-50 m-auto">
                <hr/>
                <div className="mp-3">
                    <label className="mb-2 fs-5">First Name:</label>
                    <input
                        type="text"
                        className="form-control text-muted mb-3"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    >
                    </input>
                </div>
                <div className="mp-3">
                    <label className="mb-2 fs-5">Last Name:</label>
                    <input
                        type="text"
                        className="form-control text-muted mb-3"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    >
                    </input>
                </div>
                <div className="mp-3">
                    <label className="mb-2 fs-5">Email:</label>
                    <input
                        type="email"
                        className="form-control text-muted mb-3"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    >
                    </input>
                </div>
                <div className="mp-3">
                    <label className="mb-2 fs-5">Password:</label>
                    <input
                        type="password"
                        className="form-control text-muted mb-3"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </input>
                </div>
                <div>
                    <button
                        onClick={submit}
                        className="btn btn-primary btn-lg"
                    >Next
                    </button>
                </div>
                {
                    error &&
                    <div className="text-danger">
                        {error}
                    </div>
                }                    
                <hr/>
            </div>
        </>
    );
}

export default BusinessUserRegistration;
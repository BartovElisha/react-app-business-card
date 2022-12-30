import { useState } from "react";
import Title from "../components/Title";

interface ISignupData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

function SignUp() {
    // States
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    function submit() {

    }

    return (  
        <>
            <Title 
                main="Signup for Real App"
                sub="You can open new account for free."
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
                    >Signup
                    </button>
                </div>
                <hr/>
            </div>
        </>
    );
}

export default SignUp;
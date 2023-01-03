import { useState } from "react";
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
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [biz,setIsAdmin] = useState(false);

    function submit() {

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
                <hr/>
            </div>
        </>
    );
}

export default BusinessUserRegistration;
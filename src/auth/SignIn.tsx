import Joi from "joi";
import { useState } from "react";
import Title from "../components/Title";

interface ISigninData {
    email: string;
    password: string;
}

function SignIn() {
    // States
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    function login() {
        const schema = Joi.object().keys({
            email: Joi.string().required().min(6).max(255).email({ tlds: { allow: false}}),
            password: Joi.string().required().min(6).max(30)
        });

        const { error, value } = schema.validate({
            email,
            password
        });

        if (error) {
            setError(error.message);
            return;
        }

        setError('');
        handler(value);         
    }

    function handler(value: ISigninData) {
        console.log(value);
    }

    return (  
        <>
            <Title 
                main="Signin to Real App"
                sub="You can signin here with your account !"
            />
            <div className="p-3 form-max-w w-50 m-auto">
                <hr/>
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
                        onClick={login}
                        className="btn btn-primary btn-lg"
                    >Login
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

export default SignIn;
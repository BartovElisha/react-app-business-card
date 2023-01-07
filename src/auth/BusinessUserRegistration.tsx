import Joi from "joi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Title from "../components/Title";
import { postRequest } from "../services/apiService";

interface IBusinessUserData {
    name: string
    email: string;
    password: string;
    izBiz: boolean;
}

function BusinessUserRegistration() {
    // States
    const navigate = useNavigate();
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    function submit() {
        const schema = Joi.object().keys({
            name: Joi.string().required().min(2).max(255),
            email: Joi.string().required().min(6).max(255).email({ tlds: { allow: false}}),
            password: Joi.string().required().min(6).max(30),
            isBiz: Joi.boolean().required()
        });

        const { error, value } = schema.validate({
            name,
            email,
            password,
            isBiz: true
        });

        if (error) {
            setError(error.message);
            return;
        }

        setError('');
        register(value);  
    }

    function register(data: IBusinessUserData) {
        const res = postRequest(
            'users/signup',
            data,
            false
        );

        if (!res) {
            return;
        } 

        res
        .then(response => response.json())
        .then(json => {
            if (json.error) {
                toast.error(json.error, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });                   
                return;
            }
            toast.success(`New Business User ${json.name} Added succsessifully`,{
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "colored",
            });              
            navigate('/businesscardregistration');
        });        
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
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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
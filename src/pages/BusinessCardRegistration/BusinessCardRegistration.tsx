import Joi from "joi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../../components/Title";

interface IBusinessCardData {
    businessName: string;
    businessDescription: string;
    businessAddress: string;
    businessPhone: string;
    businessImage: string;
}

function BusinessCardRegistration() {
    // States
    const navigate = useNavigate();
    const [businessName, setBusinessName] = useState<string>('');
    const [businessDescription, setBusinessDescription] = useState<string>('');
    const [businessAddress, setBusinessAddress] = useState<string>('');
    const [businessPhone, setBusinessPhone] = useState<string>('');
    const [error, setError] = useState<string>('');

    function submit() {
        const schema = Joi.object().keys({
            businessName: Joi.string().required().min(2).max(255),
            businessDescription: Joi.string().required().min(2).max(255),
            businessAddress: Joi.string().required().min(2).max(255),
            businessPhone: Joi.string().required().min(10).max(13).pattern(/^[+,0-9]+$/),
            // businessPhone: Joi.string().required().length(13).pattern(/^[+,0-9]+$/),
        });

        const { error, value } = schema.validate({
            businessName,
            businessDescription,
            businessAddress,
            businessPhone
        });

        if (error) {
            setError(error.message);
            return;
        }

        setError('');
        createCard(value); 
    }

    function createCard(data: IBusinessCardData) {
        // 1. Send data to the server Rest API...
        console.log(data);
        
        // 2. If All OK Navigate to Home page
        navigate('/');
    }

    return (  
        <>
            <Title 
                main="Business Registration Form"
                sub="Open business card"
            />
            <div className="p-3 form-max-w w-50 m-auto">
                <hr/>
                <div className="mp-3">
                    <label className="mb-2 fs-5">Business Name:</label>
                    <input
                        type="text"
                        className="form-control text-muted mb-3"
                        placeholder="Business Name"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                    >
                    </input>
                </div>
                <div className="mp-3">
                    <label className="mb-2 fs-5">Business Description:</label>
                    <input
                        type="text"
                        className="form-control text-muted mb-3"
                        placeholder="Business Description"
                        value={businessDescription}
                        onChange={(e) => setBusinessDescription(e.target.value)}
                    >
                    </input>
                </div>
                <div className="mp-3">
                    <label className="mb-2 fs-5">Business Address:</label>
                    <input
                        type="text"
                        className="form-control text-muted mb-3"
                        placeholder="Business Address"
                        value={businessAddress}
                        onChange={(e) => setBusinessAddress(e.target.value)}
                    >
                    </input>
                </div>
                <div className="mp-3">
                    <label className="mb-2 fs-5">Business Phone:</label>
                    <input
                        type="phone"
                        className="form-control text-muted mb-3"
                        placeholder="Example Phone: +972500000000"
                        value={businessPhone}
                        onChange={(e) => setBusinessPhone(e.target.value)}
                    >
                    </input>
                </div>
                <div>
                    <button
                        onClick={submit}
                        className="btn btn-primary btn-lg"
                    >Create Card
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

export default BusinessCardRegistration;
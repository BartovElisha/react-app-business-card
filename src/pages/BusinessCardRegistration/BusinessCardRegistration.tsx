import { useState } from "react";
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
    const [businessName,setBusinessName] = useState('');
    const [businessDescription,setBusinessDescription] = useState('');
    const [businessAddress,setBusinessAddress] = useState('');
    const [businessPhone,setBusinessPhone] = useState('');
    // const [businessImage,setBusinessImage] = useState('');

    function submit() {

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
                        type="text"
                        className="form-control text-muted mb-3"
                        placeholder="Business Phone"
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
                <hr/>
            </div>
        </>
    );
}

export default BusinessCardRegistration;
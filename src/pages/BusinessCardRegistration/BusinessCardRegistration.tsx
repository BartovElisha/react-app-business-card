import Joi from "joi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Title from "../../components/Title";
import { postRequest } from "../../services/apiService";
import { IError } from "../../types/types";

interface IBusinessCardData {
    title: string;
    subTitle: string;
    description: string;
    address: string;
    phone: string;
    image: string;
}

function BusinessCardRegistration() {          
    // States
    const navigate = useNavigate();
    const [title, setTitle] = useState<string>('');
    const [subTitle, setSubTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [image, setImage] = useState<string>('');
    const [error, setError] = useState<IError>({});

    function submit() {
        const schema = Joi.object().keys({
            title: Joi.string().required().min(2).max(255),
            subTitle: Joi.string().required().min(2).max(255),
            description: Joi.string().required().min(2).max(1024),
            address: Joi.string().required().min(2).max(255),
            phone: Joi.string().required().min(9).max(17),
            image: Joi.string().required().min(2).max(1024),
        });

        const { error, value } = schema.validate({
            title,
            subTitle,
            description,
            address,
            phone,
            image
        },{abortEarly: false});

        if (error) {
            const result : IError = {};

            error.details.forEach((item) => {
            if (item.context) {
                    const key = item.context.key + '';
                    result[key] = item.message;
                }
            });

            setError(result);
            return;
        }

        setError({});
        createCard(value); 
    }

    function createCard(data: IBusinessCardData) {
        const res = postRequest(
            'cards',
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
            toast.success(`New Card ${json.title} Added succsessifully`,{
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "colored",
            });              
            navigate('/');
        });
    }

    return (  
        <>
            <Title 
                main="Business Card Registration Form"
                sub="Open business card"
            />
            <div className="p-3 form-max-w w-50 m-auto">
                <hr/>
                <div className="mp-3">
                    <label className="mb-2 fs-5">Business Title:</label>
                    <input
                        type="text"
                        className="form-control text-muted mb-3"
                        placeholder="Business Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    >
                    </input>
                </div>
                {
                    error && error.title && 
                    <div className="text-danger">
                        {error.title}
                    </div>
                }                
                <div className="mp-3">
                    <label className="mb-2 fs-5">Business Sub Title:</label>
                    <input
                        type="text"
                        className="form-control text-muted mb-3"
                        placeholder="Business Sub Title"
                        value={subTitle}
                        onChange={(e) => setSubTitle(e.target.value)}
                    >
                    </input>
                </div>
                {
                    error && error.subTitle && 
                    <div className="text-danger">
                        {error.subTitle}
                    </div>
                }                   
                <div className="mp-3">
                    <label className="mb-2 fs-5">Business Description:</label>
                    <textarea
                        className="form-control text-muted mb-3"
                        placeholder="Business Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    >
                    </textarea>
                </div>
                {
                    error && error.description && 
                    <div className="text-danger">
                        {error.description}
                    </div>
                }                    
                <div className="mp-3">
                    <label className="mb-2 fs-5">Business Address:</label>
                    <input
                        type="text"
                        className="form-control text-muted mb-3"
                        placeholder="Business Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    >
                    </input>
                </div>
                {
                    error && error.address && 
                    <div className="text-danger">
                        {error.address}
                    </div>
                }                     
                <div className="mp-3">
                    <label className="mb-2 fs-5">Business Phone:</label>
                    <input
                        type="tel"
                        className="form-control text-muted mb-3"
                        placeholder="Example Phone: +972500000000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    >
                    </input>
                </div>
                {
                    error && error.phone && 
                    <div className="text-danger">
                        {error.phone}
                    </div>
                }                   
                <div className="mp-3">
                    <label className="mb-2 fs-5">Business Image:</label>
                    <input
                        type="url"
                        className="form-control text-muted mb-3"
                        placeholder="Business Image url"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    >
                    </input>
                </div>                {
                    error && error.image && 
                    <div className="text-danger">
                        {error.image}
                    </div>
                }   
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
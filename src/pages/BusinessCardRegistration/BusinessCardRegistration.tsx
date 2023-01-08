import Joi from "joi";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../../App";
import Title from "../../components/Title";
import { postRequest } from "../../services/apiService";

interface IBusinessCardData {
    title: string;
    subTitle: string;
    description: string;
    address: string;
    phone: string;
    image: {
        url: string;
        alt: string;
    };
}

function BusinessCardRegistration() {
    const context = useContext(AppContext);
          
    // States
    const navigate = useNavigate();
    const [title, setTitle] = useState<string>('');
    const [subTitle, setSubTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [image, setImage] = useState<string>('');
    const [error, setError] = useState<string>('');

    function submit() {
        const schema = Joi.object().keys({
            title: Joi.string().required().min(2).max(255),
            subTitle: Joi.string().required().min(2).max(255),
            description: Joi.string().required().min(2).max(1024),
            address: Joi.string().required().min(2).max(255),
            phone: Joi.string().min(9).max(17).required(),
        });

        const { error, value } = schema.validate({
            title,
            subTitle,
            description,
            address,
            phone
        });

        if (error) {
            setError(error.message);
            return;
        }

        setError('');
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
            navigate('/card');
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
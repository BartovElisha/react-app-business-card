import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AppContext } from "../../App";
import Like from "../../components/Like";
import Title from "../../components/Title";
import { getRequest } from "../../services/apiService";

function BusinessCard() {
    const context = useContext(AppContext);

    const signInUserId = context?.user_id;
    const { id } = useParams();  // Custom Hook "useParams"

    // States
    const [title, setTitle] = useState<string>('');
    const [subTitle, setSubTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [image, setImage] = useState<string>('');
    const [bizNumber, setBizNumber] = useState<string>('');
    const [userId, setUserId] = useState<string>('');
    const [createdAt, setcCreatedAt] = useState<string>();
    const [error, setError] = useState<string>('');

    // Check if this card created by signedin user.
    let isCurrentUser: boolean = false;
    if (userId === signInUserId) {
        isCurrentUser = true;
    }   

    // Hoock runs only one time after loadin page. 
    // Getting current buseness cards data from Database.
    useEffect(() => {
        const res = getRequest(`cards/${id}`);
        if (!res) {
            return;
        }

        res
        .then(res => res.json())
        .then(json => {
            if (json.ok === false) {
                setError('Error get the data');
                return;
            }

            // Update input fields with current card data.
            setTitle(json.title);
            setSubTitle(json.subTitle);
            setDescription(json.description);
            setAddress(json.address);
            setPhone(json.phone);
            setImage(json.image);
            setBizNumber(json.bizNumber);
            setUserId(json.user_id);
            setcCreatedAt(json.createdAt);
        })
    },[id]);   

    return (
        <>
            {
                error.length > 0 &&
                <div className ="alert alert-warning text-center" role="alert">
                    No Business Card Found !!!
                </div>  
            }
            {
                error.length === 0  &&
                <>
                    <Title 
                        main={title}
                        sub={subTitle}                
                    />
                    <div className="container mb-5">
                        <div className="card shadow p-1 mb-3 bg-body-tertiary rounded">
                            <img 
                            src={`${image}`}   
                            className="card-img-top rounded img-fluid img-thumbnail" alt={`Img ${title}`} />  
                            <div className="card-body">
                                <p><strong>Description: </strong>{description}</p>
                                <p><strong>Address: </strong>{address}</p>
                                <p><strong>Phone: </strong>{phone}</p>
                                <p><strong>Card Number: </strong>{bizNumber}</p>
                                <p><strong>Created By: </strong>{userId}</p>
                                <p><strong>Created At: </strong>{createdAt}</p>
                                <hr />
                                <div className="d-flex justify-content-evenly">
                                    {
                                        id && 
                                        <Like 
                                            card_id={+id}
                                        />
                                    }
                                    {
                                        isCurrentUser &&
                                        <>
                                            <Link 
                                                to={`/edit/${id}`}
                                                className="btn btn-default"
                                            >
                                            <i className="bi bi-pen"></i>
                                            </Link>
                                        </>
                                    }
                                    <Link 
                                        to={`/`}
                                        className="btn btn-default"
                                    >
                                    <i className="bi bi-house-door"></i>
                                    </Link>                            
                                </div>  
                            </div>
                        </div>
                    </div>
                </>                
            }
        </>
    );
}

export default BusinessCard;
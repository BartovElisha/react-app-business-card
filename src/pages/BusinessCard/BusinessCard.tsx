import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AppContext } from "../../App";
import Title from "../../components/Title";
import { getRequest } from "../../services/apiService";

function BusinessCard() {
    const context = useContext(AppContext);

    const signInUserId = context?.user_id;
    const delBusinessCard = context?.delBusinessCard || function () {} ;
    // const navigate = useNavigate();
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
                // setError('error get the data');
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
            console.log(json);
            console.log(createdAt);
        })
    },[id]);   

    return (
        <>
            <Title 
                main={title}
                sub={subTitle}                
            />
            <div className="container mb-4">
                <div className="card">
                    <img 
                    src={`${image}`}   
                    className="card-img-top rounded" alt={`Img ${title}`} />  
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
                                isCurrentUser &&
                                <>
                                    <Link 
                                        to={`/edit/${userId}`}
                                        className="btn btn-default"
                                    >
                                    <i className="bi bi-pen"></i>
                                    </Link>
                                    <button 
                                        // onClick={(e) => handleDeleteCard(e)}
                                        className="btn btn-default"
                                    >
                                    <i className="bi bi-trash"></i>
                                    </button>
                                </>
                            }
                            <button 
                                className="btn btn-default"
                            >
                            <i className="bi-hand-thumbs-up"></i>
                            {/* <i className="bi-hand-thumbs-up-fill"></i> */}
                            </button> 
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
    );
}

export default BusinessCard;
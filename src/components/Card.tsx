import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../App";

interface Props {
    _id: number;
    title: string;
    subTitle: string;
    address: string;
    phone: string;
    image: string;
    bizNumber: string;
    user_id: string;
    handleDeleteCard: Function;
}

function Card({
        _id,
        title,
        subTitle,
        address,
        phone,
        image,
        bizNumber,
        user_id,
        handleDeleteCard
    }: Props) {
    
    const context = useContext(AppContext);
    const [like, setLike] = useState<boolean>(false);

    if (!context) {
        return <div>Error</div>;
    }  
    
    const signInUserId = context.user_id;
   
    // Check if this card created by signedin user.
    let isCurrentUser: boolean = false;
    if (user_id === signInUserId) {
        isCurrentUser = true;
    }

    function likeToggle() {
        setLike(!like);    
    }

    return (  
        <div className={context.cardsDisplayMode}>
            <div className="card">
                <img 
                src={`${image}`}   
                className="card-img-top rounded img-fluid img-thumbnail" alt={`Img ${title}`} />  
                <div className="card-body">
                    <h5 className="card-title text-start">{title}</h5>
                    <span className="text-muted">{subTitle}</span>
                    <hr />
                    <p><strong>Address: </strong>{address}</p>
                    <p><strong>Phone: </strong>{phone}</p>
                    <p><strong>Card Number: </strong>{bizNumber}</p>
                    <hr />
                    <div className="d-flex justify-content-evenly">
                        {
                            <Link
                                to={`/card/${_id}`}
                                className="btn btn-default"
                            >
                            <i className="bi bi-ticket-detailed"></i>    
                            </Link>                            
                        }
                        {
                            isCurrentUser &&
                            <>
                                <Link 
                                    to={`/edit/${_id}`}
                                    className="btn btn-default"
                                >
                                <i className="bi bi-pen"></i>
                                </Link>
                                <button 
                                    onClick={(e) => handleDeleteCard(e)}
                                    className="btn btn-default"
                                >
                                <i className="bi bi-trash"></i>
                                </button>
                            </>
                        }
                        <button 
                            onClick={likeToggle}
                            className="btn btn-default"
                        >
                        {
                            like ? 
                                <i className="bi bi-hand-thumbs-up-fill"></i> : 
                                <i className="bi bi-hand-thumbs-up"></i>    
                        }
                        </button>   
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;
import { useContext } from "react";
import { confirmAlert } from "react-confirm-alert";
import { Link } from "react-router-dom";
import { AppContext } from "../App";
import Like from "./Like";

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

    // Confirm Alert Options
    const options = {
        title: 'Please Confirm',
        message: 'Are you sure you want to delete this card ?',
        buttons: [
            {
                label: 'Yes',
                onClick: () => handleDeleteCard()
            },
            {
                label: 'Cancel',
                // onClick: () => alert('Click No')
            }
        ],
        closeOnEscape: true,
        closeOnClickOutside: true,
        keyCodeForClose: [8, 32],
        willUnmount: () => {},
        afterClose: () => {},
        onClickOutside: () => {},
        onKeypress: () => {},
        onKeypressEscape: () => {},
        overlayClassName: "overlay-custom-class-name"
    };

    if (!context) {
        return <div>Error</div>;
    }  
    
    const signInUserId = context.user_id;
   
    // Check if this card created by signedin user.
    let isCurrentUser: boolean = false;
    if (user_id === signInUserId) {
        isCurrentUser = true;
    }

    function confirmAndDeleteCard() {
        confirmAlert(options);    
    }

    return (  
        <div className={context.cardsDisplayMode}>
            <div className="card shadow p-1 mb-3 bg-body-tertiary rounded">
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
                            signInUserId.length === 0 &&
                            <div className="text-info">
                                Signin for details...
                            </div>   
                        }
                        {
                            signInUserId.length > 0 &&
                            <>
                                <Link
                                    to={`/card/${_id}`}
                                    className="btn btn-default"
                                >
                                <i className="bi bi-ticket-detailed"></i>    
                                </Link> 
                                <Like
                                    card_id={_id}
                                />
                            </>
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
                                    onClick={confirmAndDeleteCard}
                                    className="btn btn-default"
                                >
                                <i className="bi bi-trash"></i>
                                </button>
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;
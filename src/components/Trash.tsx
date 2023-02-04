import { useContext } from "react";
import { confirmAlert } from "react-confirm-alert";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../App";
import { deleteRequest } from "../services/apiService";

interface Props {
    card_id: string;
}

function Trash({ card_id }: Props) {
    const navigate = useNavigate();
    const context = useContext(AppContext);

    if (!context) {
        return <div>Error</div>;
    }
    const businessCards = context.businessCards || [];
    const updateBusinessCards = context.updateBusinessCards || function() {};

    // Confirm Alert Options
    const options = {
        title: 'Please Confirm',
        message: 'Are you sure you want to delete this card ?',
        buttons: [
            {
                label: 'Yes',
                onClick: () => delBusinessCard(card_id)
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

    function confirmAndDeleteCard() {
        confirmAlert(options);    
    } 
    
    function delBusinessCard(card_id: string) {
        const res = deleteRequest(
            `cards/${card_id}`            
        );
        if (!res) {
            return;
        }

        res
        .then(response => response.json())
        .then(json => {
            const updated = [...businessCards].filter(
                card => card._id !== card_id
            );
            toast.info(`Business Card ${json.title} was deleted`,{
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "colored",
            }); 
            updateBusinessCards(updated);
            navigate('/');
        });        
    }

    return (
        <button 
            onClick={confirmAndDeleteCard}
            className="btn btn-default"
        >
        <i className="bi bi-trash"></i>
        </button> 
    );
}

export default Trash;
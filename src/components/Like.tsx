import { useContext, useState } from "react";
import { AppContext } from "../App";
import { getRequest } from "../services/apiService";

interface Props {
    card_id: number;
}

function Like({ card_id }: Props) {
    const context = useContext(AppContext);
    // States
    const [like, setLike] = useState<boolean>(false);
    const [usersLikesList, setUsersLikesList] = useState([]); 

    if (!context) {
        return <div>Error</div>;
    }   

    function getUsersLikesList() {
        console.log(`User ${context?.userName} added like to the card ID: ${card_id}`); 

        // Read business card data from database
        const res = getRequest(`cards/${card_id}`);
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
            setUsersLikesList(json.users_likes_id);
        });
    }        

    function updateLikesList() {
        console.log(usersLikesList);
    }

    function likeToggle() {
        getUsersLikesList();
        updateLikesList();
        setLike(!like);    
    }    

    return (
        <>
            <button 
                onClick={likeToggle}
                className="btn btn-default"
            >
            {
                like ? 
                    <i className="bi bi-heart-fill"></i> : 
                    <i className="bi bi-heart"></i>    
            }
            </button>              
        </>
    );
}

export default Like;
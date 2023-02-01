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

    function updateBusinessCardLikesList() {
        console.log(`User ${context?.userName} added like to the card ID: ${card_id}`); 

        // 1. Read business card data from database
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
            // I'am here ...
            // if need add like , need push user_is to array and send to database, 
            // if need remove like, need find user id in array, remove it and send to database.
        });

        // 2. Update users likes list array
        console.log(usersLikesList);

        // 3. Update business card database
        // const res = patchRequest(
        //     `cards/${businessCard._id}`,
        //     data
        // );
        // if (!res) {
        //     return;
        // }
        
        // res
        // .then(response => response.json())
        
    }        

    function likeToggle() {
        updateBusinessCardLikesList();
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
import { useContext, useState } from "react";
import { AppContext } from "../App";
import { getRequest, patchRequest } from "../services/apiService";

interface Props {
    card_id: number;
}

function Like({ card_id }: Props) {
    const context = useContext(AppContext);
    // States
    const [likeStatus, setLikeStatus] = useState<boolean>();
    const [usersLikesList, setUsersLikesList] = useState<string[]>([""]); 

    if (!context) {
        return <div>Error</div>
    }
    const signedInUserId = context.user_id;

    function getUsersLikesList() {
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
        })
    }       
    
    function patchUsersLikesList(data: string[]) {
        const res = patchRequest(
            `cards/updatecardlikeslist/${card_id}`,
            {users_likes_id: data}
        ); 
        
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
        if (usersLikesList.includes(signedInUserId)) {
            let result = [...usersLikesList];
            result = result.filter(function (user_id) {
                return user_id !== signedInUserId;
            })
            patchUsersLikesList(result);
            setUsersLikesList(result); 
            setLikeStatus(false);    
        }
        else {
            const result = [...usersLikesList];
            result.push(signedInUserId);
            patchUsersLikesList(result);
            setUsersLikesList(result);
            setLikeStatus(true);
        }  
    }

    function likeToggle() {
        getUsersLikesList();
        updateLikesList();
    }  

    return (
        <>
            <button 
                onClick={likeToggle}
                className="btn btn-default"
            >
            {
                likeStatus ? 
                    <i className="bi bi-heart-fill"></i> : 
                    <i className="bi bi-heart"></i>    
            }
            </button> 
        </>
    );
}

export default Like;
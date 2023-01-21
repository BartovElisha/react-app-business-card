import { useContext } from "react";
import { AppContext } from "../App";

function MenuBar() {
    const context = useContext(AppContext);
    
    if (!context) {
        return <div>Error</div>
    }

    return (  
        <div className="d-flex p-4">
            <div className="d-flex align-items-center mx-auto w-50">
                <button
                    onClick={(e) => context.handleCardsDisplayMode('col-12 col-md-6 col-lg-4')}
                    className="btn mx-1"
                >
                    <i className="bi-grid-3x3-gap"></i>
                </button>
                <button
                    onClick={(e) => context.handleCardsDisplayMode('list')}
                    className="btn btn-sucess mx-1"
                >
                    <i className="bi-list-task"></i>
                </button>
                <input
                    className="form-control ms-3"
                    placeholder="Enter business name or number"
                ></input>
            </div>
        </div>    
    );
}

export default MenuBar;
import { useContext, useState } from "react";
import { AppContext } from "../App";

function MenuBar() {
    const context = useContext(AppContext);
    // States
    const [searchValue, setSearch] = useState<string>('');
    
    if (!context) {
        return <div>Error</div>
    }

    function handleSearch(value: string) {
        // 1. Update form input Value
        setSearch(value);
        console.log(value);

        // 2. Convert value to lowerCase
        let term = searchValue.toLowerCase();

        // 3. copy businessCards to result array

        // 4. Filter result by term

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
                    onChange={(e) => handleSearch(e.target.value)}
                    type="text"
                    className="form-control ms-3"
                    placeholder="Enter business name or number"
                ></input>
            </div>
        </div>    
    );
}

export default MenuBar;
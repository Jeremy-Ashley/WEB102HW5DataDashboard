import { Link } from "react-router-dom"

function Sidebar() {
    return (
        <div>
            <h2>Recipe App</h2>

            <Link to="/">
                Home 
            </Link>
            <Link to="/charts">
            Charts
            </Link>
        </div>
    );
}

export default Sidebar;
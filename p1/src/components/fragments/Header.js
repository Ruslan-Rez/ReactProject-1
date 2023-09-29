import { Link } from 'react-router-dom'
function Header(){
    return(
        <header className="main-header">
            <h1 className="ss-name">STEAM studio</h1>
            <nav className="nav main-nav" >
                <ul>
                    <li><Link to="/addProduct">Add new</Link></li>
                    <li ><Link to="/products">Products</Link> </li>
                    <li><Link to="/contact" >Contact</Link> </li>
                    <li><Link to="/ourValues">Our Values</Link> </li>
                </ul>
            </nav>
        </header>
    )
}
export default Header
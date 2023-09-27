import { Link } from 'react-router-dom'
function Header(){
    return(
        <header className="main-header">
            <h1 className="ss-name">STEAM studio</h1>
            <nav className="nav main-nav" >
                <ul>
                    <li><Link to="/addPr">Add new</Link></li>
                    <li ><Link to="/products">Products</Link> </li>
                    <li><a href="">Contact</a> </li>
                    <li><a href="">Our Values</a> </li>
                </ul>
            </nav>
        </header>
    )
}
export default Header
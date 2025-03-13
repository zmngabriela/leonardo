import { Link, useLocation } from "react-router-dom"

function Header() {
    const location = useLocation()

    return (
        <header 
            className="fixed-top flex row w-80 m-auto py-1 px-3 text-light"
            style={{ mixBlendMode: 'difference' }}
        >
            <h1 className="col-5 col-md-2 px-0 fs-6 text-uppercase text-nowrap">Leonardo Cadore</h1>
            <ul className="col-5 col-md-2 offset-2 offset-md-5 inline-flex list-unstyled text-end text-md-start">
                <li>
                    <Link to={location.pathname === '/about' ? '/' : '/about'} className="text-light">
                        {location.pathname === '/about' ? 'Home' : 'About'}
                    </Link>
                </li>
                <li>
                    <Link to={location.pathname === '/contact' ? '/' : '/contact'} className="text-light">
                        {location.pathname === '/contact' ? 'Home' : 'Contact'}
                    </Link>
                </li>
            </ul>
            <a href="mailto:leonardo.cadore@gmail.com" className="d-none d-md-block col-1 offset-2 text-end text-light p-0">Email</a>
        </header>
    )
}

export default Header
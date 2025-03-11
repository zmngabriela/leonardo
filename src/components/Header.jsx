function Header() {
    return (
        <header className="fixed-top flex row w-80 m-auto py-1 text-light">
            <p className="col-2">Leonardo Cadore</p>
            <ul className="col-2 offset-5 inline-flex list-unstyled">
                <li>About</li>
                <li>Contact</li>
            </ul>
            <p className="col-1 offset-2 text-end">Email</p>
        </header>
    )
}

export default Header
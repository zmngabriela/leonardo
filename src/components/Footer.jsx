function Footer() {
    const year = new Date().getFullYear()
    
    return (
        <footer className="fixed-bottom flex row w-80 m-auto py-1 text-light">
            <div className="col-2 d-flex flex-column">
                <p className="font-bold m-0">Content Creator</p>
                <p className="m-0">Based in Barcelona</p>
            </div>
            <p className="col-1">&copy; {year}</p>
        </footer>
    )
}

export default Footer
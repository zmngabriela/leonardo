function Footer() {
    const year = new Date().getFullYear()
    
    return (
        <footer 
            className="fixed-bottom gap-5 d-flex pb-4 px-4"
            style={{ mixBlendMode: 'difference' }}
        >
            <div className="w-50 w-md-25 d-flex flex-column">
                <p className="m-0">Brazilian Based in Barcelona</p>
            </div>
            <p>&copy; {year}</p>
        </footer>
    )
}

export default Footer
function Footer() {
    const year = new Date().getFullYear()
    
    return (
        <footer 
            className="fixed-bottom gap-5 d-flex pb-1 px-3 text-light"
            style={{ mixBlendMode: 'difference' }}
        >
            <div className="w-50 w-md-25 d-flex flex-column">
                <p className="m-0">Content producer, videomaker and photographer.</p>
                <p className="m-0">Based in Barcelona</p>
            </div>
            <p>&copy; {year}</p>
        </footer>
    )
}

export default Footer
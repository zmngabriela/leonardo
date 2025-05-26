import { useEffect, useState } from "react";

function Footer() {
    const year = new Date().getFullYear()
    const [isVisible, setIsVisible] = useState(false);
    
    // effect to show the footer after the preloader
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <footer 
            className={`fixed-bottom gap-5 d-flex pb-4 px-4 ${isVisible ? 'preloader-footer' : 'd-none'}`}
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
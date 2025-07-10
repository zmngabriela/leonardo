import { useEffect, useState } from "react";

const Header = () => {
    const [isVisible, setIsVisible] = useState(false);

    // show header after preloader
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <header 
            className={`position-fixed top-0 d-flex justify-content-start justify-content-lg-between align-items-center w-100 py-2 px-4 gap-4 ${isVisible ? 'preloader-header' : 'd-none'}`}
            style={{ mixBlendMode: 'difference' }}
        >
            <nav>
                <ul className="list-unstyled d-flex gap-4 m-0">
                    <li>
                        <a href="https://www.instagram.com/cadoreleo/" className="text-decoration-none">Instagram</a>
                    </li>
                    <li>
                        <a href="https://www.behance.net/leonardocadore" className="text-decoration-none">Behance</a>
                    </li>
                </ul>
            </nav>
            <a 
                href="mailto:leonardo.cadore@gmail.com" 
                className="text-decoration-none cursor-pointer"
            >
                Email
            </a>
        </header>
    );
};

export default Header; 
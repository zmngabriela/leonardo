import { useEffect, useState } from "react";

const Hero = ({ backgroundColor, children }) => {
    const [isVisible, setIsVisible] = useState(false);
        
        // effect to show the footer after the preloader
        useEffect(() => {
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 2500);
            return () => clearTimeout(timer);
        }, []);

    return (
        <section 
            className="hero w-100 d-flex justify-content-center align-items-center"
            style={{ 
                backgroundColor: backgroundColor || 'black',
                transition: 'background-color 0.5s ease-in-out'
            }}
        >
            <div className={`container-title ${isVisible ? 'preloader-main' : 'd-none'}`}>
                <h1 className="d-inline-block justified">
                    Leonardo Cadore. Content producer, videomaker & photographer
                </h1>
            </div>
            <div className="w-100 h-100 overflow-hidden">
                {children}
            </div>
        </section>
    );
};

export default Hero; 
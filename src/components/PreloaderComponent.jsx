import { useEffect, useState } from "react";

const PreloaderComponent = () => {
        const [startPreloader, setStartPreloader] = useState(false);
        const [hidden, setHidden] = useState(false);

        // preloader timers
            useEffect(() => {
                const startTimer = setTimeout(() => {
                    setStartPreloader(true);
                }, 2200);
                const hiddenTimer = setTimeout(() => {
                    setHidden(true);
                }, 3000);
                return () => {
                    clearTimeout(startTimer);
                    clearTimeout(hiddenTimer);
                };
            }, [])

    return (
        <div className={`preloader-component
            ${startPreloader ? 'preloader-start' : ''}
            ${hidden ? 'd-none' : ''}
        `}>
            <h1 className="fs-5">Leonardo Cadore</h1>
            <h1 className="role fs-5 text-end">
                <span className="text-slide preloader-start">
                    Content producer, <br /> 
                    videomaker <br />
                    & photographer
                </span>
            </h1>
        </div>
    )
}

export default PreloaderComponent
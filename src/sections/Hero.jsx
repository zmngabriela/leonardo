import { useEffect, useState } from "react";
import HeroContent from "../components/HeroContent";

const Hero = ({ preloader }) => {
    // active color initialization, which depends on current video selection
    const [activeColor, setActiveColor] = useState(null);
    const [pageAtTop, setPageAtTop] = useState(true);

    useEffect(() => {
        const syncTopState = () => {
            const atTop = window.scrollY <= 0;
            setPageAtTop(atTop);

            // Never keep body locked while page already moved into content.
            if (!atTop) {
                document.body.style.overflow = '';
            }
        };

        window.addEventListener('scroll', syncTopState, { passive: true });
        syncTopState();

        return () => {
            window.removeEventListener('scroll', syncTopState);
            document.body.style.overflow = '';
        };
    }, []);

    // reset background when interacting outside hero videos (touch/mouse)
    useEffect(() => {
        const resetIfOutsideVideo = (event) => {
            const target = event.target;
            if (!(target instanceof Element)) return;

            const isOnHeroVideo = target.closest('.hero-content-container video');
            if (!isOnHeroVideo) {
                setActiveColor(null);
            }
        };

        document.addEventListener('touchstart', resetIfOutsideVideo, { passive: true });
        document.addEventListener('mousedown', resetIfOutsideVideo);

        return () => {
            document.removeEventListener('touchstart', resetIfOutsideVideo);
            document.removeEventListener('mousedown', resetIfOutsideVideo);
        };
    }, []);

    // shrink hero title on scroll
    const handleScroll = (e) => {
        const container = e.target;
        const scrollTop = container.scrollTop;

        // control title shrink
        const shouldShrink = scrollTop > 100 && scrollTop < 4000;
        document.querySelector('.container-title')?.classList.toggle('shrink', shouldShrink);

        // Lock body scroll only while user is at absolute top of page.
        if (pageAtTop && scrollTop < container.clientHeight) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    };

    // handle background color change on project hover
    const handleContentHover = (projectIndex) => {
        setActiveColor(projectIndex ? `var(--project-color-${projectIndex})` : null);
    };

    return (
        <section
            className="hero w-100 d-flex justify-content-center align-items-center"
            style={{
                backgroundColor: activeColor || 'black',
                transition: 'background-color 0.5s ease-in-out',
                pointerEvents: pageAtTop ? 'auto' : 'none'
            }}
            onScroll={handleScroll}
        >
            <div className={`container-title ${preloader ? 'preloader-main' : 'd-none'}`}>
                <h1 className="d-inline-block justified">
                    Leonardo Cadore. Content producer, videomaker & photographer
                </h1>
            </div>
            <div className="w-100 h-100 overflow-hidden">
                <HeroContent onHover={handleContentHover} />
            </div>
        </section>
    );
};

export default Hero;

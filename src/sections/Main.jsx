import { useEffect, useRef, useState, useCallback } from "react";
import Hero from "./Hero";
import HeroContent from "../components/HeroContent";
import Preloader from "../components/Preloader";
import Content from "./Content";

const Main = () => {
    // content preloader state initialized as active (false==showing)
    const [contentPreloader, setContentPreloader] = useState(false);

    // active color initialization, which depends on current video selection
    const [activeColor, setActiveColor] = useState(null);

    // refs array initialization
    const heroVideoRefs = useRef([]);
    const contentRef = useRef();

    // last scroll time ref initialization
    const lastScrollTimeRef = useRef(0);
    
    // scroll vh ref initialization
    const currentScrollVhRef = useRef(0);

    // touch handling for mobile
    const touchStartRef = useRef(null);
    const touchYRef = useRef(0);

    // handle background color change on project hover
    const handleContentHover = (projectIndex) => {
        setActiveColor(projectIndex ? `var(--project-color-${projectIndex})` : null);
    };

    // show content after preloader time
    useEffect(() => {
        const timer = setTimeout(() => {
            setContentPreloader(true);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    // intersection observer for hero content scaler resizing animation
    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('in-view');
                    } else {
                        entry.target.classList.remove('in-view');
                    }
                });
            },
            {
                threshold: [0, 0.5, 1],
            }
        );

        heroVideoRefs.current.forEach(ref => {
            if (ref) observer.observe(ref);
        });

        return () => {
            heroVideoRefs.current.forEach(ref => {
                if (ref) observer.unobserve(ref);
            });
        };
    }, [contentPreloader]);

    // lazy load sections for mobile performance
    useEffect(() => {
        if (!contentPreloader) return;

        // mobile: use intersection observer for performance
        const sectionObserver = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    const section = entry.target;
                    const isNearViewport = entry.isIntersecting || 
                                            entry.boundingClientRect.top < window.innerHeight * 2;
                    
                    if (isNearViewport) {
                        section.classList.add('section-active');
                    } else {
                        section.classList.remove('section-active');
                    }
                });
            },
            {
                rootMargin: '100% 0px', // start loading 100% of viewport height before
                threshold: 0
            }
        );

        // observe all stacked sections
        const sections = document.querySelectorAll('.stacked-section');
        sections.forEach(section => {
            sectionObserver.observe(section);
        });

        return () => {
            sections.forEach(section => {
                sectionObserver.unobserve(section);
            });
        };
    }, [contentPreloader]);

    // desktop scroll handler
    const handleScroll = useCallback(() => {
        const now = Date.now();
        const isMobile = window.innerWidth <= 768;
        const throttleDelay = isMobile ? 32 : 16; // 30fps on mobile, 60fps on desktop
        
        // makes the function only run each x milisecond depending on screen dimension
        if (now - lastScrollTimeRef.current < throttleDelay) {
            return;
        }
        lastScrollTimeRef.current = now; // update moment of last processed scroll
        
        // calculates scroll position in viewport height (vh)
        const html = document.documentElement;
        const scrollVh = html.scrollTop / html.clientHeight;
        currentScrollVhRef.current = scrollVh;

        // updates scroll variable
        html.style.setProperty('--scroll', scrollVh);
    }, []);

    // mobile touch handlers
    const handleTouchStart = useCallback((e) => {
        // where the touch begins
        touchStartRef.current = e.touches[0].clientY;

        // initial scroll
        touchYRef.current = currentScrollVhRef.current;
    }, []);

    const handleTouchMove = useCallback((e) => {
        if (!touchStartRef.current) return;
        
        e.preventDefault();

        // where the touch begins
        const touchY = e.touches[0].clientY;

        // touch difference
        const deltaY = touchStartRef.current - touchY;

        //converts to screen fraction
        const deltaVh = deltaY / window.innerHeight;
        
        // updates new scroll height
        const newScrollVh = Math.max(0, Math.min(7, touchYRef.current + deltaVh));
        currentScrollVhRef.current = newScrollVh;
        
        // updates scroll variable
        const html = document.documentElement;
        html.style.setProperty('--scroll', newScrollVh);
    }, []);

    // resets touch initial position
    const handleTouchEnd = useCallback(() => {
        touchStartRef.current = null;
    }, []);

    // select scroll handle
    useEffect(() => {
        const isMobile = window.innerWidth <= 768;
        
        // use passive listener for better performance
        
        if (isMobile) {
            // Touch events for mobile
            document.addEventListener('touchstart', handleTouchStart, { passive: true });
            document.addEventListener('touchmove', handleTouchMove, { passive: false });
            document.addEventListener('touchend', handleTouchEnd, { passive: true });
            
            // sets initial value
            handleScroll();
            
            return () => {
                document.removeEventListener('touchstart', handleTouchStart);
                document.removeEventListener('touchmove', handleTouchMove);
                document.removeEventListener('touchend', handleTouchEnd);
            };
        } else {
            // normal scroll for desktop
            window.addEventListener('scroll', handleScroll, { passive: true });
            handleScroll(); // sets initial value
            
            return () => window.removeEventListener('scroll', handleScroll);
        }
    }, [handleScroll, handleTouchStart, handleTouchMove, handleTouchEnd]);

    return (
        <main>
            <Preloader />
            <Hero backgroundColor={activeColor}>
                <HeroContent videoRefs={heroVideoRefs} onHover={handleContentHover} />
            </Hero>
            {contentPreloader && <Content ref={contentRef} />}
        </main>
    );
};

export default Main; 
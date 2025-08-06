import { useEffect, useRef, useState, useCallback } from "react";
import Hero from "./Hero";
import Projects from "../components/HeroContent";
import About from "../components/About";
import Preloader from "../components/Preloader";
import Videos from "../components/Videos";
import Photos from "../components/Photos";

const Main = () => {
    const [contentPreloader, setContentPreloader] = useState(false);
    const [activeProject, setActiveProject] = useState(null);
    const videoRefs = useRef([]);
    const mainRef = useRef(null);
    const scrollTimeoutRef = useRef(null);
    const lastScrollTimeRef = useRef(0);

    // handle background color change on project hover
    const handleProjectHover = (projectIndex) => {
        setActiveProject(projectIndex ? `var(--project-color-${projectIndex})` : null);
    };

    // show content after preloader
    useEffect(() => {
        const timer = setTimeout(() => {
            setContentPreloader(true);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    // intersection observer for video animations
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
                threshold: Array.from({ length: 100 }, (_, i) => i / 100),
            }
        );

        videoRefs.current.forEach(ref => {
            if (ref) observer.observe(ref);
        });

        return () => {
            videoRefs.current.forEach(ref => {
                if (ref) observer.unobserve(ref);
            });
        };
    }, [contentPreloader]);

    // throttled scroll handler for better performance
    const handleScroll = useCallback(() => {
        const now = Date.now();
        const isMobile = window.innerWidth <= 768;
        const throttleDelay = isMobile ? 32 : 16; // 30fps on mobile, 60fps on desktop
        
        if (now - lastScrollTimeRef.current < throttleDelay) {
            return;
        }
        
        lastScrollTimeRef.current = now;
        
        const html = document.documentElement;
        const scrollVh = html.scrollTop / html.clientHeight;
        html.style.setProperty('--scroll', scrollVh);
    }, []);

    // scroll event listener with mobile optimizations
    useEffect(() => {
        const isMobile = window.innerWidth <= 768;
        
        // use passive listener for better performance
        const options = { passive: true };
        
        if (isMobile) {
            // aggressive throttling for mobile
            const throttledScroll = () => {
                if (scrollTimeoutRef.current) {
                    return;
                }
                
                scrollTimeoutRef.current = setTimeout(() => {
                    handleScroll();
                    scrollTimeoutRef.current = null;
                }, 32); // ~30fps
            };
            
            window.addEventListener('scroll', throttledScroll, options);
            handleScroll(); // initial call
            
            return () => {
                window.removeEventListener('scroll', throttledScroll, options);
                if (scrollTimeoutRef.current) {
                    clearTimeout(scrollTimeoutRef.current);
                }
            };
        } else {
            // normal throttling for desktop
            window.addEventListener('scroll', handleScroll, options);
            handleScroll(); // initial call
            
            return () => window.removeEventListener('scroll', handleScroll, options);
        }
    }, [handleScroll]);

    // lazy load sections for mobile performance
    useEffect(() => {
        if (!contentPreloader) return;

        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
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
        } else {
            // desktop: activate all sections immediately for best performance
            const sections = document.querySelectorAll('.stacked-section');
            sections.forEach(section => {
                section.classList.add('section-active');
            });
        }
    }, [contentPreloader]);

    return (
        <main ref={mainRef}>
            <Preloader />
            <Hero backgroundColor={activeProject}>
                <Projects videoRefs={videoRefs} onHover={handleProjectHover} />
            </Hero>
            {contentPreloader && (
                <>
                    <Videos className="videos-first" videos={[
                        "FOOOOD.mp4",
                        "croqueta.mp4",
                        "SPLASHES.mp4"
                    ]}/>
                    <Videos className="videos-second" videos={[
                        "ninipakaa.mp4",
                        "nini-paka.mp4",
                        "nini3.mp4"
                    ]}/>
                    <Videos className="videos-third" videos={[
                        "81DE3613-D6D7-47DD-9855-74C74A0B70BF.mp4",
                        "6F58BB04-5F8E-41AA-A05E-B17F5A710D2B.mp4",
                        "7D13DC86-07E2-4ECE-801D-B32E1EE03CBC.mp4"
                    ]}/>
                    <Videos className="videos-fourth" videos={[
                        "nooda-oil-hand.mp4",
                        "03C51E3D-2427-4EF7-A24A-D5D66D1922C9.mp4",
                        "layout-nooda.mp4"
                    ]}/>
                    <Videos className="videos-sixth" videos={[
                        "roxo-dress.mp4",
                        "paka-bintou.mp4",
                        "paka-autumn.mp4"
                    ]}/>
                    <Photos className="photos-first" images={[
                        "noodaoil-40.webp",
                        "noodaoil-51.webp",
                        "noodaoil-55.webp",
                        "noodaoil-70.webp",
                        "noodaoil-15.webp"
                    ]}/>
                    <About />
                    {/* Scroll container for reveal animations */}
                    <div className="scroll-container" />
                </>
            )}
        </main>
    );
};

export default Main; 
import { useEffect, useRef, useState } from "react";
import Hero from "./Hero";
import Projects from "../components/Work";
import About from "../components/About";
import Preloader from "../components/Preloader";
import Videos from "../components/Videos";

const Main = () => {
    const [contentPreloader, setContentPreloader] = useState(false);
    const [activeProject, setActiveProject] = useState(null);
    const videoRefs = useRef([]);
    const mainRef = useRef(null);

    // effect to change the background color when hovering the project
    const handleProjectHover = (projectIndex) => {
        setActiveProject(projectIndex ? `var(--project-color-${projectIndex})` : null);
    };

    // effect to show the content after the preloader
    useEffect(() => {
        const timer = setTimeout(() => {
            setContentPreloader(true);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    // effect to show the content after the preloader
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

    // setting property scroll
    useEffect(() => {
        const handleScroll = () => {
            const html = document.documentElement;
            const scrollVh = html.scrollTop / html.clientHeight;
            html.style.setProperty('--scroll', scrollVh);
        };
        
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <main ref={mainRef}>
            <Preloader />
            <Hero backgroundColor={activeProject}>
                <Projects videoRefs={videoRefs} onHover={handleProjectHover} />
            </Hero>
            {contentPreloader && (
                <>
                    <Videos className="videos-first" videos={[
                        'https://dl.dropbox.com/scl/fi/xaxvcvfu719xwdju6cykq/croqueta-final-narrado.mov?rlkey=pfvxjgjotcaebphkuz855jbsk&raw=1',
                        'https://dl.dropbox.com/scl/fi/6kfccm8ovq72g0ivrgf59/CP-FOOOOD.mov?rlkey=n90eohsiivy9s010ixynhl8za&raw=1',
                        'https://dl.dropbox.com/scl/fi/5i5ahmcuohtjfg6wqzrub/CP-SPLASHES-3.mov?rlkey=eignm8ia9f05v3di28oz3wnyg&raw=1',   
                    ]}/>
                    <Videos className="videos-second" videos={[
                        'https://dl.dropbox.com/scl/fi/8ecx8xorxmzcq7grwrjob/81DE3613-D6D7-47DD-9855-74C74A0B70BF.MOV?rlkey=r27t9pjrhrmonu4934ao5rgra&raw=1',
                        'https://dl.dropbox.com/scl/fi/c7c0h5yf5afdwc1bypnqe/6F58BB04-5F8E-41AA-A05E-B17F5A710D2B.MOV?rlkey=fc9d056xg558oeweb9v9ifexd&raw=1',
                        'https://dl.dropbox.com/scl/fi/9vmal846gmso7jjj5toec/849FB8C9-7C22-4A33-A1E7-020A25E40535.MOV?rlkey=uqonzjooqhwhjpvdzv24x1lp6&raw=1',
                    ]}/>
                    <Videos className="videos-third" videos={[
                        'https://dl.dropbox.com/scl/fi/mymx8v8thu50lad7034d4/ninipakaa.mov?rlkey=ejq28xvde0z07d33nyyaodtdj&raw=1',
                        'https://dl.dropbox.com/scl/fi/su4w22diw0q9fabmok7dw/nini3.mov?rlkey=6mdkl3c2ql33nl5ktj073kwnu&raw=1',
                        'https://dl.dropbox.com/scl/fi/yl5d5xkq0xpjfij36rjo3/nini-x-paka.mov?rlkey=2lj8urdsd3xmtjil6o7k3am6d&raw=1',
                    ]}/>
                    <Videos className="videos-fourth" videos={[
                        'https://dl.dropbox.com/scl/fi/xp0yka8o19s1bkrca94qd/nooda-oil-hand.mov?rlkey=n3fu2pop9bf95frlouta9clwy&raw=1',
                        'https://dl.dropbox.com/scl/fi/cnwvrlvvt7gcvl5nsvcqa/reelll-2.mov?rlkey=jsjnpn3p4nv4tddj2x8a9gwdi&raw=1',
                        'https://dl.dropbox.com/scl/fi/86ngkzxmyuotvmvxqt5zc/03C51E3D-2427-4EF7-A24A-D5D66D1922C9.MOV?rlkey=dwke0636tvf0n6cnbkddbd7rg&raw=1',
                    ]}/>
                    
                    <About />

                    {/* <Photos className="photos-first" images={[
                        'https://www.dropbox.com/scl/fi/3fdi9p630j5c4ru35hot0/noodaoil-99.jpg?rlkey=gpcdotbk4dv678ep7pps2gkn0&raw=1&size=1024x1024&preserve_transparency=0',
                        'https://www.dropbox.com/scl/fi/nc6k669j60km0cu04v79u/noodaoil-70.jpg?rlkey=3zcwpi9a30hi8o0cz8r74z8fu&raw=1&size=1024x1024&preserve_transparency=0'
                    ]}/>
                    <Photos className="photos-second" images={[
                        'https://www.dropbox.com/scl/fi/ek455bav2liti9ab315uo/noodaoil-51.jpg?rlkey=xkoiqxtv6yzw4udexk27br1og&raw=1&size=1024x1024&preserve_transparency=0',
                        'https://www.dropbox.com/scl/fi/f11cccszjkv5y5z4y3lwz/noodaoil-15.jpg?rlkey=yzjj291ix9wbub0pcxczu14nf&raw=1&size=1024x1024&preserve_transparency=0'
                    ]}/> */}

                    <Videos className="videos-sixth" videos={[
                        'https://dl.dropbox.com/scl/fi/rs3588h35drr2mffs7d68/roxo-dress.mov?rlkey=lufu2wo2yxxgsvw4z1y3bguit&raw=1',
                        'https://dl.dropbox.com/scl/fi/yqo9628n6aqqo2xuk4un0/paka-autumn.mov?rlkey=g4j9yzovrna4w8jx7uxindlup&raw=1',
                    ]}/>
                    <Videos className="videos-seventh" videos={[
                        'https://dl.dropbox.com/scl/fi/9r8nmat423nj302ravmvn/christy-meshel-final-video.mov?rlkey=p1yjfcouaahdmicnxlocsxlrb&raw=1',
                        'https://dl.dropbox.com/scl/fi/gmu6nb5dmmpkhmg0pul7o/auto-gentileza-final-version.mp4?rlkey=3y669x6wukfgmaow7rwg0gcc6&raw=1',
                    ]}/>

                    {/* Scroll container for reveal animations */}
                    <div className="scroll-container" />
                </>
            )}
        </main>
    );
};

export default Main; 
import { useEffect, useRef, useState } from "react";

import Projects from "../components/Projects";
import About from "../components/About";
import Preloader from "../components/Preloader";
import Videos from "../components/Videos";

const Home = () => {
    const [contentPreloader, setContentPreloader] = useState(false);
    const [activeProject, setActiveProject] = useState(null);
    const videoRefs = useRef([]);

    const handleProjectHover = (projectIndex) => {
        setActiveProject(projectIndex ? `var(--project-color-${projectIndex})` : null);
    };

    {/* Preloader timer for content */}
    useEffect(() => {
        const contentTimer = setTimeout(() => {
            setContentPreloader(true);
        }, 3000);
        return () => clearInterval(contentTimer);
    }, [])
    
    {/* Observes video project refs to add style in-view */}
    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('in-view');
                    } else {
                        entry.target.classList.remove('in-view');
                    }
                })
            },
            {
                threshold: Array.from({ length: 100 }, (_, i) => i / 100),
            }
        )
        videoRefs.current.forEach(ref => {
            if (ref) observer.observe(ref);
        })
        return () => {
            videoRefs.current.forEach(ref => {
                if (ref) observer.unobserve(ref);
            })
        }
    }, [contentPreloader])

    {/* Scroll progress */}
    useEffect(() => {
        const onScroll = () => {
            const html = document.documentElement;
            const scrollVh = html.scrollTop / html.clientHeight;
            html.style.setProperty('--scroll', scrollVh);
        };
        
        window.addEventListener('scroll', onScroll);
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <div>
            <Preloader />
            <div>
                <section 
                    className="hero w-100 d-flex justify-content-center align-items-center"
                    style={{ 
                        backgroundColor: isHovering ? 'var(--background-color)' : 'black',
                        transition: 'background-color 0.3s ease'
                    }}
                >
                    <div className="container-title ms-5">
                        <h1 className="d-inline-block justified">
                            Leonardo Cadore. Content producer, videomaker & photographer
                        </h1>
                    </div>
                    <div className="w-100 h-100 overflow-hidden">
                        <Projects videoRefs={videoRefs} onHover={setIsHovering} />
                    </div>
                </section>
                {contentPreloader && (
                    <>
                        <Videos className="videos-first" videos={[
                            'https://dl.dropbox.com/scl/fi/xaxvcvfu719xwdju6cykq/croqueta-final-narrado.mov?rlkey=pfvxjgjotcaebphkuz855jbsk&st=3imrfq73&dl=1',
                            'https://dl.dropbox.com/scl/fi/6kfccm8ovq72g0ivrgf59/CP-FOOOOD.mov?rlkey=n90eohsiivy9s010ixynhl8za&st=bonqoigi&dl=1',
                            'https://dl.dropbox.com/scl/fi/5i5ahmcuohtjfg6wqzrub/CP-SPLASHES-3.mov?rlkey=eignm8ia9f05v3di28oz3wnyg&st=4gu7ckqh&dl=1',   
                        ]}/>
                        <Videos className="videos-second" videos={[
                            'https://dl.dropbox.com/scl/fi/8ecx8xorxmzcq7grwrjob/81DE3613-D6D7-47DD-9855-74C74A0B70BF.MOV?rlkey=r27t9pjrhrmonu4934ao5rgra&st=o7mzm553&dl=1',
                            'https://dl.dropbox.com/scl/fi/c7c0h5yf5afdwc1bypnqe/6F58BB04-5F8E-41AA-A05E-B17F5A710D2B.MOV?rlkey=fc9d056xg558oeweb9v9ifexd&st=hcl0ja07&dl=1',
                            'https://dl.dropbox.com/scl/fi/9vmal846gmso7jjj5toec/849FB8C9-7C22-4A33-A1E7-020A25E40535.MOV?rlkey=uqonzjooqhwhjpvdzv24x1lp6&st=t7vtzwkg&dl=1',
                        ]}/>
                        <Videos className="videos-third" videos={[
                            'https://dl.dropbox.com/scl/fi/mymx8v8thu50lad7034d4/ninipakaa.mov?rlkey=ejq28xvde0z07d33nyyaodtdj&st=sgv2lf0y&dl=1',
                            'https://dl.dropbox.com/scl/fi/su4w22diw0q9fabmok7dw/nini3.mov?rlkey=6mdkl3c2ql33nl5ktj073kwnu&st=oee5z0wb&dl=1',
                            'https://dl.dropbox.com/scl/fi/yl5d5xkq0xpjfij36rjo3/nini-x-paka.mov?rlkey=2lj8urdsd3xmtjil6o7k3am6d&st=qq59moz8&dl=1',
                        ]}/>
                        <Videos className="videos-fourth" videos={[
                            'https://dl.dropbox.com/scl/fi/86ngkzxmyuotvmvxqt5zc/03C51E3D-2427-4EF7-A24A-D5D66D1922C9.MOV?rlkey=dwke0636tvf0n6cnbkddbd7rg&st=uiay72ux&dl=1',
                            'https://dl.dropbox.com/scl/fi/xp0yka8o19s1bkrca94qd/nooda-oil-hand.mov?rlkey=n3fu2pop9bf95frlouta9clwy&st=q5vlszgv&dl=1',
                            'https://dl.dropbox.com/scl/fi/cnwvrlvvt7gcvl5nsvcqa/reelll-2.mov?rlkey=jsjnpn3p4nv4tddj2x8a9gwdi&st=2xxxxwvl&dl=1',
                        ]}/>
                        
                        <About />

                        <Videos className="videos-fifth" videos={[
                            'https://dl.dropbox.com/scl/fi/c7c0h5yf5afdwc1bypnqe/6F58BB04-5F8E-41AA-A05E-B17F5A710D2B.MOV?rlkey=fc9d056xg558oeweb9v9ifexd&st=hcl0ja07&dl=1',
                            'https://dl.dropbox.com/scl/fi/9vmal846gmso7jjj5toec/849FB8C9-7C22-4A33-A1E7-020A25E40535.MOV?rlkey=uqonzjooqhwhjpvdzv24x1lp6&st=t7vtzwkg&dl=1',
                        ]}/>
                        <Videos className="videos-sixth" videos={[
                            'https://dl.dropbox.com/scl/fi/rs3588h35drr2mffs7d68/roxo-dress.mov?rlkey=lufu2wo2yxxgsvw4z1y3bguit&st=h5yagbh9&dl=1',
                            'https://dl.dropbox.com/scl/fi/yqo9628n6aqqo2xuk4un0/paka-autumn.mov?rlkey=g4j9yzovrna4w8jx7uxindlup&st=tjv5i9n0&dl=1',
                        ]}/>
                        <Videos className="videos-seventh" videos={[
                            'https://dl.dropbox.com/scl/fi/9r8nmat423nj302ravmvn/christy-meshel-final-video.mov?rlkey=p1yjfcouaahdmicnxlocsxlrb&st=1iimfcuw&dl=1',
                            'https://dl.dropbox.com/scl/fi/gmu6nb5dmmpkhmg0pul7o/auto-gentileza-final-version.mp4?rlkey=3y669x6wukfgmaow7rwg0gcc6&st=m9uur027&dl=1',
                        ]}/>

                        {/* Scroll container for reveal animations */}
                        <div className="scroll-container" />
                    </>
                )}
            </div>
        </div>
    );
};

export default Home;
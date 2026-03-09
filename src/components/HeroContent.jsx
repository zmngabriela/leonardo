import { useEffect, useRef } from "react";

const HeroContent = ({onHover}) => {
    const videos = [
        "reel-leo.mp4",
        "patursia.mp4",
        "paula-paka.mp4",
        "DF321BAD-7B74-43CD-83C8-1E6A4CE50760.mp4",
        "noodav5.mp4",
        "nini-video-2.mp4"
    ];

    // refs array initialization
    const videoRefs = useRef([]);

    const applyOrientationClass = (videoEl) => {
        if (!videoEl) return;

        videoEl.classList.remove('video-vertical', 'video-horizontal');

        if (videoEl.videoHeight > videoEl.videoWidth) {
            videoEl.classList.add('video-vertical');
        } else {
            videoEl.classList.add('video-horizontal');
        }
    };

    // change background color on video hover
    const handleMouseEnter = (index) => {
        onHover(index + 1);
    };

    // 3d rotation effect on mouse move (desktop only)
    const handleMouseMove = (event, element) => {
        if (window.innerWidth <= 768) return;

        const rect = element.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const xPercent = (x / rect.width - 0.5) * 2;
        const yPercent = (y / rect.height - 0.5) * 2;

        const wrapper = element.closest('.hero-content-wrapper');
        if (wrapper) {
            wrapper.style.transform = `
                perspective(1000px)
                rotateX(${yPercent * -10}deg)
                rotateY(${xPercent * 10}deg)
                translateZ(-50px)
            `;
        }
    };

    // reset rotation on mouse leave
    const handleMouseLeave = (element) => {
        if (window.innerWidth <= 768) return;

        const wrapper = element.closest('.hero-content-wrapper');
        if (wrapper) {
            wrapper.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        }

        // reset hover state to change background color
        onHover(null);
    };

    // observe visibility to scale and play only nearby videos
    useEffect(() => {
        const root = document.querySelector('.hero-content-container');
        if (!root) return;

        const refs = videoRefs.current;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('in-view');

                        const maybePlay = entry.target.play();
                        if (maybePlay && typeof maybePlay.catch === 'function') {
                            maybePlay.catch(() => {});
                        }
                    } else {
                        entry.target.classList.remove('in-view');
                        entry.target.pause();
                    }
                });
            },
            {
                root,
                threshold: 0.45,
                rootMargin: '160px 0px 160px 0px',
            }
        );

        refs.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        const onVisibilityChange = () => {
            if (document.hidden) {
                refs.forEach((videoEl) => videoEl?.pause());
            }
        };

        document.addEventListener('visibilitychange', onVisibilityChange);

        return () => {
            refs.forEach((ref) => {
                if (ref) observer.unobserve(ref);
                ref?.pause();
            });
            document.removeEventListener('visibilitychange', onVisibilityChange);
        };
    }, []);

    // classify each video orientation once metadata is available
    useEffect(() => {
        const cleanups = [];

        videoRefs.current.forEach((videoEl) => {
            if (!videoEl) return;

            if (videoEl.readyState >= 1) {
                applyOrientationClass(videoEl);
                return;
            }

            const onLoadedMetadata = () => applyOrientationClass(videoEl);
            videoEl.addEventListener('loadedmetadata', onLoadedMetadata);
            cleanups.push(() => videoEl.removeEventListener('loadedmetadata', onLoadedMetadata));
        });

        return () => {
            cleanups.forEach((cleanup) => cleanup());
        };
    }, []);

    return (
        <div className="hero-content-container">
            <ul className='hero-content-list list-unstyled' style={{ paddingTop: '100vh', paddingBottom: '60vh'}}>
                {videos.map((videoName, i) => (
                    <li key={i} className="hero-content-item">
                        <div className="hero-content-wrapper">
                            <video
                                ref={video => videoRefs.current[i] = video}
                                muted
                                loop
                                playsInline
                                controls={false}
                                preload="none"
                                disablePictureInPicture
                                className="hero-content hero-content-scaler"
                                onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
                                onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
                                onMouseEnter={() => handleMouseEnter(i)}
                            >
                                <source
                                    src={`${process.env.PUBLIC_URL}/optimized-videos/${videoName}`}
                                    type="video/mp4"
                                />
                            </video>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HeroContent;

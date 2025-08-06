const HeroContent = ({videoRefs, onHover}) => {
    const videos = [
        "reel-leo.mp4",
        "patursia.mp4",
        "paula-paka.mp4",
        "DF321BAD-7B74-43CD-83C8-1E6A4CE50760.mp4",
        "noodav5.mp4",
        "nini-video-2.mp4"
    ];

    // 3d rotation effect on mouse move
    const handleMouseMove = (event, element) => {
        const rect = element.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        // calculate mouse position percentage within element
        const xPercent = (x / rect.width - 0.5) * 2; // -1 to 1
        const yPercent = (y / rect.height - 0.5) * 2; // -1 to 1
        
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
        const wrapper = element.closest('.hero-content-wrapper');
        if (wrapper) {
            wrapper.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        }
        // reset hover state to change background color
        onHover(null);
    };

    // change background color on video hover
    const handleMouseEnter = (index) => {
        onHover(index + 1);
    };

    // shrink title on scroll
    const handleScroll = (e) => {
        const container = e.target;
        const scrollTop = container.scrollTop;
        
        // control title shrink
        const shouldShrink = scrollTop > 100 && scrollTop < 4000;
        document.querySelector('.container-title')?.classList.toggle('shrink', shouldShrink);

        if (scrollTop < container.clientHeight) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    };

    return (
        <div 
            className="hero-content-container" 
            onScroll={handleScroll}
        >
            <ul className='row list-unstyled' style={{ paddingTop: '100vh', paddingBottom: '60vh'}}>
                {videos.map((videoName, i) => (
                    <li key={i} className="hero-content-list">
                        <div className="hero-content-wrapper">
                            <video 
                                ref={video => videoRefs.current[i] = video}
                                autoPlay 
                                muted 
                                loop 
                                playsInline 
                                controls={false} 
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
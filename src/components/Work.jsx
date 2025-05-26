const Work = ({videoRefs, onHover}) => {
    const projetos = [
        'https://dl.dropbox.com/scl/fi/7w36r2p0s98evrc8mlfnl/reel-leo.mov?rlkey=rneumy5wq8r6nm5xr340o9j8t&raw=1',
        'https://dl.dropbox.com/scl/fi/3k9v8ymhsg6a4vw51s3jk/patursia.mov?rlkey=lm8548v6b02pawcg3wmbmkai9&raw=1',
        'https://dl.dropbox.com/scl/fi/fg58jgun3zz6ev6u77992/DF321BAD-7B74-43CD-83C8-1E6A4CE50760.MOV?rlkey=gkmdq6wrbnp0n4v9iixe7c8hz&raw=1',
        'https://dl.dropbox.com/scl/fi/5w4ydp2lyxqye1yf29cdl/nini-video-2.mov?rlkey=37b6bfuy6w8n9gcnc3b8j6fgh&raw=1',
        'https://dl.dropbox.com/scl/fi/2iylix62nviogdxe7cr5i/paula-paka.mov?rlkey=hnfepb02l2g9i9ber0okxc33v&raw=1',
        'https://dl.dropbox.com/scl/fi/4g1b59myca5nlzqkcyupc/NOODA-V5-SIN-TEXTOS-VERSAO-FINAL.mp4?rlkey=6w24tjdmojqxusgl73uvwkmhh&raw=1',
    ];

    // effect to rotate the video
    const handleMouseMove = (event, element) => {
        const rect = element.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        // Calculate the percentage of mouse position within the element
        const xPercent = (x / rect.width - 0.5) * 2; // -1 to 1
        const yPercent = (y / rect.height - 0.5) * 2; // -1 to 1
        
        const wrapper = element.closest('.work-wrapper');
        if (wrapper) {
            wrapper.style.transform = `
                perspective(1000px)
                rotateX(${yPercent * -10}deg)
                rotateY(${xPercent * 10}deg)
                translateZ(-50px)
            `;
        }
    };

    // effect to rotate the video
    const handleMouseLeave = (element) => {
        const wrapper = element.closest('.work-wrapper');
        if (wrapper) {
            wrapper.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        }
        // reset the hover state to change the background color
        onHover(null);
    };

    // effect to change the background color when hovering the video
    const handleMouseEnter = (index) => {
        onHover(index + 1);
    };

    // effect to shrink the title when scrolling
    const handleScroll = (e) => {
        const container = e.target;
        const scrollTop = container.scrollTop;
        
        // Controla o shrink do título
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
            className="work-container" 
            onScroll={handleScroll}
        >
            <ul className='row list-unstyled' style={{ paddingTop: '100vh', paddingBottom: '60vh'}}>
                {projetos.map((p, i) => (
                    <li key={i} className="work-list">
                        <div className="work-wrapper">
                            <video 
                                ref={video => videoRefs.current[i] = video}
                                autoPlay 
                                muted 
                                loop 
                                playsInline 
                                controls={false} 
                                className="work work-scaler"
                                onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
                                onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
                                onMouseEnter={() => handleMouseEnter(i)}
                            >
                                <source src={p} type="video/mp4" />
                            </video>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Work;
const Videos = ({ videos, className }) => {
    return (
        <section className={`stacked-section ${className} vh-100 d-flex align-items-center justify-content-center`}>
            <ul className="videos-list">
                {videos.map((video, i) => (
                    <li key={i} className="flex-grow-1 video-item">
                        <video 
                            autoPlay 
                            muted 
                            loop 
                            playsInline 
                            controls={false}
                            className="w-100 h-100 object-fit-cover"
                            loading="lazy"
                            preload="none"
                            poster={`${video}?raw=1`}
                        >
                            <source src={video} type="video/mp4" />
                        </video>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default Videos
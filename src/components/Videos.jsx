const Videos = ({ videos, className }) => {
    return (
        <section className={`stacked-section ${className}`}>
            <ul className="videos-list">
                {videos.map((video, i) => (
                    <li key={i} className="video-item">
                        <video 
                            autoPlay 
                            muted 
                            loop 
                            playsInline 
                            controls={false}
                            loading="lazy"
                            preload="none"
                            poster={video}
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
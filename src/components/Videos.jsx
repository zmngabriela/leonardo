const Videos = ({ videos, className }) => {
    return (
        <section className={`stacked-section ${className}`}>
            <ul className="videos-list">
                {videos.map((videoName, i) => (
                    <li key={i}>
                        <video 
                            autoPlay 
                            muted 
                            loop 
                            playsInline 
                            controls={false}
                            loading="lazy"
                            preload="none"
                        >
                            <source src={`${process.env.PUBLIC_URL}/optimized-videos/${videoName}`} type="video/mp4" />
                        </video>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default Videos
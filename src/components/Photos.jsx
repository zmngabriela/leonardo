const Photos = ({ className, images }) => {
    return (
        <section className={`stacked-section ${className} vh-100 d-flex align-items-center justify-content-center`}>
            <div className="photo-list">
                {images.map((imageName, i) => (
                    <div key={i} className="photo-item">
                        <img 
                            src={`${process.env.PUBLIC_URL}/optimized-images/${imageName}`}
                            alt={`Nooda Oil`}
                            className="photo-item-image"
                            loading="lazy"
                            decoding="async"
                        />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Photos; 
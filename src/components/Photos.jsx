const Photos = ({ className, images }) => {
    return (
        <section className={`stacked-section ${className} vh-100 d-flex align-items-center justify-content-center`}>
            <div className="w-100 h-100 d-flex flex-column flex-lg-row">
                {images.slice(0, 2).map((image, i) => (
                    <div 
                        key={i} 
                        className="flex-grow-1 h-50 h-lg-100"
                        style={{ width: '100%' }}
                    >
                        <img 
                            src={image} 
                            alt={`Gallery item ${i + 1}`}
                            className="w-100 h-100 object-fit-cover"
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
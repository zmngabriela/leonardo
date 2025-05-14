function About() {
    return (
        <section className="stacked-section about">
            <div className="vw-100 vh-100 d-flex justify-content-center align-items-center p-5 m-0">
                <div className="d-flex justify-content-center align-items-center text-light">
                    <p className='font-script about-text justified'>
                        Who I vibe with? Rule-breakers, storytellers, taste-makers. The ones who build their own lane - and don't wait for permission to create.
                    </p>
                </div>
                <div className="position-absolute top-0 vh-100 d-flex justify-content-center align-items-center gap-1 pb-5">
                    <img 
                        src="https://dl.dropbox.com/scl/fi/54wghmpt6ukpaqv6blge6/76CB04BD-EC8A-4BC5-9815-5C2D9F8E230F.JPG?rlkey=j8u5crptxsi8r6h9bje9zyfca&st=w22dbcgb&dl=1" 
                        alt="" 
                        className='about-image object-fit-contain'
                    />
                </div>
            </div>
        </section>
    )
}

export default About
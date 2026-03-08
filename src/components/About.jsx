function About() {
    const aboutCopy = "Who I vibe with? Rule-breakers, storytellers, taste-makers. The ones who build their own lane - and don't wait for permission to create.";

    return (
        <section className="stacked-section about video-light stack-under">
            <div className="about-layout">
                <img
                    src="https://dl.dropbox.com/scl/fi/54wghmpt6ukpaqv6blge6/76CB04BD-EC8A-4BC5-9815-5C2D9F8E230F.JPG?rlkey=j8u5crptxsi8r6h9bje9zyfca&st=w22dbcgb&dl=1"
                    alt=""
                    className="about-portrait"
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                />

                <div className="about-copy-wrap">
                    <p className="font-script about-copy-main">
                        {aboutCopy}
                    </p>
                </div>
            </div>
        </section>
    );
}

export default About;

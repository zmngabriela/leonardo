import { useEffect, useMemo, useRef } from "react";

const Videos = ({ videos, className }) => {
    const videoRefs = useRef([]);
    const videosKey = useMemo(() => videos.join("|"), [videos]);

    useEffect(() => {
        // Desktop/tablet playback is already coordinated elsewhere.
        if (window.innerWidth > 768) return;

        const refs = videoRefs.current.filter(Boolean);
        if (!refs.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const video = entry.target;

                    if (entry.isIntersecting) {
                        if (video.preload !== "metadata") {
                            video.preload = "metadata";
                        }

                        const maybePlay = video.play();
                        if (maybePlay && typeof maybePlay.catch === "function") {
                            maybePlay.catch(() => {});
                        }
                        return;
                    }

                    video.pause();
                });
            },
            {
                threshold: 0.35,
                rootMargin: "180px 0px 180px 0px",
            }
        );

        refs.forEach((video) => {
            video.preload = "none";
            observer.observe(video);
        });

        const onVisibilityChange = () => {
            if (!document.hidden) return;
            refs.forEach((video) => video.pause());
        };

        document.addEventListener("visibilitychange", onVisibilityChange);

        return () => {
            refs.forEach((video) => {
                observer.unobserve(video);
                video.pause();
            });
            document.removeEventListener("visibilitychange", onVisibilityChange);
        };
    }, [videosKey]);

    return (
        <section className={`stacked-section ${className}`}>
            <ul className="videos-list">
                {videos.map((videoName, i) => (
                    <li key={i}>
                        <video
                            ref={(el) => {
                                videoRefs.current[i] = el;
                            }}
                            muted
                            loop
                            playsInline
                            controls={false}
                            preload="none"
                            disablePictureInPicture
                        >
                            <source src={`${process.env.PUBLIC_URL}/optimized-videos/${videoName}`} type="video/mp4" />
                        </video>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default Videos;

import { useEffect, useState } from "react";
import Hero from "./Hero";
import InitialPreloader from "../components/PreloaderComponent";
import Content from "./Content";

const HERO_PRELOADER_MS = 2500;
const CONTENT_PRELOADER_MS = 3000;

const Main = () => {
    const [heroPreloader, setHeroPreloader] = useState(false);
    const [contentPreloader, setContentPreloader] = useState(false);

    useEffect(() => {
        const heroTimer = setTimeout(() => setHeroPreloader(true), HERO_PRELOADER_MS);
        const contentTimer = setTimeout(() => setContentPreloader(true), CONTENT_PRELOADER_MS);

        return () => {
            clearTimeout(heroTimer);
            clearTimeout(contentTimer);
        };
    }, []);

    useEffect(() => {
        if (!contentPreloader) return;

        // Mobile already uses simplified flow in CSS; skip expensive runtime scroll/video manager.
        if (window.matchMedia("(max-width: 768px)").matches) return;

        const overs = Array.from(document.querySelectorAll(".stack-over"));
        const sections = Array.from(document.querySelectorAll(".scroll-area .stacked-section"));
        if (!overs.length || !sections.length) return;

        const sectionVideos = new Map(
            sections.map((section) => [section, Array.from(section.querySelectorAll("video"))])
        );

        const setVideoState = (video, state) => {
            if (state === "playing") {
                if (video.dataset.playState === "playing") return;
                const maybePlay = video.play();
                if (maybePlay && typeof maybePlay.catch === "function") {
                    maybePlay.catch(() => {});
                }
                video.dataset.playState = "playing";
                return;
            }

            if (video.dataset.playState !== "paused") {
                video.pause();
                video.dataset.playState = "paused";
            }
        };

        const isNearViewport = (element, marginPx = 220) => {
            const rect = element.getBoundingClientRect();
            return rect.bottom > -marginPx && rect.top < window.innerHeight + marginPx;
        };

        const pauseAll = () => {
            sectionVideos.forEach((videos) => {
                videos.forEach((video) => setVideoState(video, "paused"));
            });
        };

        sectionVideos.forEach((videos) => {
            videos.forEach((video) => {
                video.preload = "none";
                video.dataset.playState = "paused";
            });
        });

        let rafId = 0;

        const update = () => {
            const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
            const vh = window.innerHeight || 1;

            overs.forEach((section) => {
                const start = section.offsetTop;
                const progress = Math.max(0, Math.min(1, (scrollY - start) / vh)).toFixed(4);

                if (section.dataset.stackProgress !== progress) {
                    section.style.setProperty("--stack-progress", progress);
                    section.dataset.stackProgress = progress;
                }
            });

            sectionVideos.forEach((videos, section) => {
                const sectionShouldBeReady = !document.hidden && isNearViewport(section, 320);

                videos.forEach((video) => {
                    if (sectionShouldBeReady && video.preload !== "metadata") {
                        video.preload = "metadata";
                    }

                    const shouldPlay = !document.hidden && isNearViewport(video, 260);
                    setVideoState(video, shouldPlay ? "playing" : "paused");
                });
            });
        };

        const requestUpdate = () => {
            if (rafId) return;
            rafId = requestAnimationFrame(() => {
                rafId = 0;
                update();
            });
        };

        const onVisibilityChange = () => {
            if (document.hidden) {
                pauseAll();
                return;
            }
            requestUpdate();
        };

        window.addEventListener("scroll", requestUpdate, { passive: true });
        window.addEventListener("resize", requestUpdate);
        document.addEventListener("visibilitychange", onVisibilityChange);
        requestUpdate();

        return () => {
            window.removeEventListener("scroll", requestUpdate);
            window.removeEventListener("resize", requestUpdate);
            document.removeEventListener("visibilitychange", onVisibilityChange);
            if (rafId) cancelAnimationFrame(rafId);
            pauseAll();
        };
    }, [contentPreloader]);

    return (
        <main>
            <InitialPreloader />
            {heroPreloader && <Hero preloader={heroPreloader} />}
            {contentPreloader && <Content />}
        </main>
    );
};

export default Main;

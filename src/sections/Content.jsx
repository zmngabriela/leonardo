import Videos from "../components/Videos";
import Photos from "../components/Photos";
import About from "../components/About";

const Content = () => {
    return (
        <div className="scroll-area">
            <Videos className="videos-first" videos={[
                "FOOOOD.mp4",
                "croqueta.mp4",
                "SPLASHES.mp4"
            ]}/>
            <Videos className="videos-second" videos={[
                "ninipakaa.mp4",
                "nini-paka.mp4",
                "nini3.mp4"
            ]}/>
            <Videos className="videos-third" videos={[
                "81DE3613-D6D7-47DD-9855-74C74A0B70BF.mp4",
                "6F58BB04-5F8E-41AA-A05E-B17F5A710D2B.mp4",
                "7D13DC86-07E2-4ECE-801D-B32E1EE03CBC.mp4"
            ]}/>
            <Videos className="videos-fourth" videos={[
                "nooda-oil-hand.mp4",
                "03C51E3D-2427-4EF7-A24A-D5D66D1922C9.mp4",
                "layout-nooda.mp4"
            ]}/>
            <Videos className="videos-sixth" videos={[
                "roxo-dress.mp4",
                "paka-bintou.mp4",
                "paka-autumn.mp4"
            ]}/>
            <Photos className="photos-first" images={[
                "noodaoil-40.webp",
                "noodaoil-51.webp",
                "noodaoil-55.webp",
                "noodaoil-70.webp",
                "noodaoil-15.webp"
            ]}/>
            <About />
            {/* Scroll container for reveal animations */}
            <div className="scroll-container" />
        </div>
    )
};

export default Content; 
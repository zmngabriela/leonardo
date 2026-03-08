import Videos from "../components/Videos";
import About from "../components/About";

const Content = () => {
    return (
        <div className="scroll-area">
            <Videos className="video-section video-black-a stack-under" videos={[
                "FOOOOD.mp4",
                "croqueta.mp4",
                "SPLASHES.mp4"
            ]}/>
            <Videos className="video-section video-black-b stack-over" videos={[
                "ninipakaa.mp4",
                "nini-paka.mp4",
                "nini3.mp4"
            ]}/>
            <Videos className="video-section video-light stack-under" videos={[
                "81DE3613-D6D7-47DD-9855-74C74A0B70BF.mp4",
                "6F58BB04-5F8E-41AA-A05E-B17F5A710D2B.mp4",
                "7D13DC86-07E2-4ECE-801D-B32E1EE03CBC.mp4"
            ]}/>
            <About />
        </div>
    )
};

export default Content;

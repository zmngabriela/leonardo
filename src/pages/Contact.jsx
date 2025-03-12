import { useState } from "react"
import { Link } from "react-router-dom"

function Contact() {
    const [position, setPosition] = useState({ x: 0, y: 0 })

    const handleMouseMove = (e) => {
        setPosition({ x: e.pageX, y: e.pageY })
    }

    return (
        <section className="vh-100 pt-5 ps-3 d-flex flex-column" onMouseMove={handleMouseMove}>
            <div
                className="position-absolute text-primary pe-none bg-transparent"
                style={{
                    left: position.x + 10 + "px",
                    top: position.y + 10 + "px",
                    transition: "transform 0.1s ease-out"
                }}
            >
                Let's connect :)
            </div>
            <Link to="mailto:leonardo.cadore@gmail.com" className="text-black">Email: leonardo.cadore@gmail.com</Link>
            <Link to="tel:+34697812896" className="text-black">Phone: +34 697 81 28 96</Link>
            <div className="d-flex flex-column mt-5">
                <Link to="https://www.instagram.com/cadoreleo/" className="text-black">Instagram</Link>
                <Link to="https://www.behance.net/leonardocadore" className="text-black">Behance</Link>
            </div>
        </section>
    )
}

export default Contact
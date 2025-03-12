import { useState } from 'react'

const Home = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [content, setContent ] = useState('')

    const handleMouseMove = (e) => {
        setPosition({ x: e.pageX, y: e.pageY })
    }

    const handleHoverEnter = (content) => {
        setContent(content)
    }

    const handleMouseLeave = () => {
        setContent('')
    }

    return (
        <section className='relative' onMouseMove={handleMouseMove}>
            <div
                className="position-absolute text-light pe-none bg-transparent p-2"
                style={{
                    left: position.x + 10 + "px",
                    top: position.y + 10 + "px",
                    transition: "transform 0.1s ease-out"
                }}
            >
                {content}
            </div>
            <div onMouseEnter={() => handleHoverEnter('paka vintage glam')} onMouseLeave={handleMouseLeave}>
                <video autoPlay muted loop className="d-block vh-100 w-100 object-fit-cover">
                    <source src="https://res.cloudinary.com/ddp4eyyfs/video/upload/v1741728113/Screen_Recording_2025-03-11_at_18.24.55_uembky.mov" type="video/mp4" />
                </video>
                <div className='position-absolute end-0 bottom-0 w-50 h-50 bg-transparent p-5 text-light'>
                    <p>About</p>
                </div>
            </div>
            <div className='d-flex' onMouseEnter={() => handleHoverEnter('nooda')} onMouseLeave={handleMouseLeave}>
                <video autoPlay muted loop className="d-block w-50 vh-100 object-fit-cover">
                    <source src="https://res.cloudinary.com/ddp4eyyfs/video/upload/v1741728098/Screen_Recording_2025-03-11_at_18.30.50_o4liry.mov" type="video/mp4" />
                </video>
                <img className='w-50 vh-100 object-fit-cover' src="https://res.cloudinary.com/ddp4eyyfs/image/upload/v1741728087/Screenshot_2025-03-11_at_18.32.27_ggblwm.png" alt="" />
            </div>
            <div className='row p-0 m-0' onMouseEnter={() => handleHoverEnter('nooda')} onMouseLeave={handleMouseLeave}>
                <img src="https://res.cloudinary.com/ddp4eyyfs/image/upload/v1741728091/Screenshot_2025-03-11_at_18.31.40_legjo6.png" alt="" className='col-4 p-0' />
                <img src="https://res.cloudinary.com/ddp4eyyfs/image/upload/v1741728088/Screenshot_2025-03-11_at_18.32.02_qylapa.png" alt="" className='col-4 p-0' />
                <img src="https://res.cloudinary.com/ddp4eyyfs/image/upload/v1741728088/Screenshot_2025-03-11_at_18.31.52_kjvxus.png" alt="" className='col-4 p-0' />
            </div>
            <div onMouseEnter={() => handleHoverEnter('brava sushi')} onMouseLeave={handleMouseLeave}>
                <video autoPlay muted loop className="d-block vh-100 w-100 object-fit-cover">
                    <source src="https://res.cloudinary.com/ddp4eyyfs/video/upload/v1741730288/brava_r2rvkg.mp4" type="video/mp4" />
                </video>
            </div>
        </section>
    )
}

export default Home
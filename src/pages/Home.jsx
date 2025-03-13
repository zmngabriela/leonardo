import { useState } from 'react'
import { Link } from 'react-router-dom'

import cursor from '../assets/plus.png'

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
        <section className='position-relative' onMouseMove={handleMouseMove}>
            <div
                className="position-absolute text-light pe-none bg-transparent"
                style={{
                    left: position.x + 10 + "px",
                    top: position.y + 10 + "px",
                    transition: "transform 0.1s ease-out",
                    mixBlendMode: 'difference'
                }}
            >
                <img src={cursor} style={{ width: '25px' }} className='m-3' alt="" />
                {content}
            </div>
            <Link 
                to='/client/1'
                onMouseEnter={() => handleHoverEnter('paka vintage glam')} 
                onMouseLeave={handleMouseLeave}
                style={{ cursor: 'none'}}
            >
                <video 
                    autoPlay 
                    muted 
                    loop 
                    playsInline 
                    controls={false} 
                    className="d-block pe-none vh-100 w-100 object-fit-cover"
                >
                    <source src="https://res.cloudinary.com/ddp4eyyfs/video/upload/v1741728113/Screen_Recording_2025-03-11_at_18.24.55_uembky.mov" type="video/mp4" />
                </video>
            </Link>
            <Link 
                to='/client/2'
                className='row p-0 m-0' 
                onMouseEnter={() => handleHoverEnter('nooda')} 
                onMouseLeave={handleMouseLeave}
                style={{ cursor: 'none'}}
            >
                <video 
                    autoPlay 
                    muted 
                    loop 
                    playsInline 
                    controls={false} 
                    className="d-block pe-none col-12 col-md-6 vh-100 object-fit-cover p-0"
                >
                    <source src="https://res.cloudinary.com/ddp4eyyfs/video/upload/v1741728098/Screen_Recording_2025-03-11_at_18.30.50_o4liry.mov" type="video/mp4" />
                </video>
                <img className='col-12 col-md-6 vh-100 object-fit-cover p-0' src="https://res.cloudinary.com/ddp4eyyfs/image/upload/v1741728087/Screenshot_2025-03-11_at_18.32.27_ggblwm.png" alt="" />
            </Link>
            <Link 
                to='/client/2'
                className='row p-0 m-0' 
                onMouseEnter={() => handleHoverEnter('nooda')} 
                onMouseLeave={handleMouseLeave}
                style={{ cursor: 'none'}}
            >
                <img className='col-12 col-md-6 vh-100 p-0 object-fit-cover' src="https://res.cloudinary.com/ddp4eyyfs/image/upload/v1741728091/Screenshot_2025-03-11_at_18.31.40_legjo6.png" alt=""/>
                <img className='col-12 col-md-6 vh-100 p-0 object-fit-cover' src="https://res.cloudinary.com/ddp4eyyfs/image/upload/v1741728088/Screenshot_2025-03-11_at_18.32.02_qylapa.png" alt=""/>
            </Link>
            <Link 
                to='/client/3'
                onMouseEnter={() => handleHoverEnter('brava sushi')} 
                onMouseLeave={handleMouseLeave}
                style={{ cursor: 'none'}}
            >
                <video 
                    autoPlay 
                    muted 
                    loop 
                    playsInline 
                    controls={false} 
                    className="d-block pe-none vh-100 w-100 object-fit-cover">
                    <source src="https://res.cloudinary.com/ddp4eyyfs/video/upload/v1741730288/brava_r2rvkg.mp4" type="video/mp4" />
                </video>
            </Link>
        </section>
    )
}

export default Home
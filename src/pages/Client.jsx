import { Link, useParams } from "react-router-dom"

const clients = [
    {
        id: 1,
        title: 'Paka Vintage Glam',
        medias: [
            {
                link: 'https://res.cloudinary.com/ddp4eyyfs/video/upload/v1741728099/Screen_Recording_2025-03-11_at_18.27.01_thbeg8.mov',
                text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut minus itaque atque eaque voluptate alias voluptatem.'
            },
            {
                link: 'https://res.cloudinary.com/ddp4eyyfs/video/upload/v1741728099/Screen_Recording_2025-03-11_at_18.29.37_zbxcoo.mov',
                text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut minus itaque atque eaque voluptate alias voluptatem.'
            },
            {
                link: 'https://res.cloudinary.com/ddp4eyyfs/video/upload/v1741728088/Screen_Recording_2025-03-11_at_18.27.58_fvosvk.mov',
                text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut minus itaque atque eaque voluptate alias voluptatem.'
            }
        ]
    },
    {
        id: 2,
        title: 'Nooda',
        medias: [
            {
                link: 'https://res.cloudinary.com/ddp4eyyfs/video/upload/v1741728107/Screen_Recording_2025-03-11_at_18.35.10_wxbrnz.mov',
                text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut minus itaque atque eaque voluptate alias voluptatem.'
            },
            {
                link: 'https://res.cloudinary.com/ddp4eyyfs/video/upload/v1741728095/Screen_Recording_2025-03-11_at_18.36.20_tblypp.mov',
                text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut minus itaque atque eaque voluptate alias voluptatem.'
            },
            {
                link: 'https://res.cloudinary.com/ddp4eyyfs/image/upload/v1741728088/Screenshot_2025-03-11_at_18.31.52_kjvxus.png',
                text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut minus itaque atque eaque voluptate alias voluptatem.'
            }
        ]
    },
    {
        id: 3,
        title: 'Brava',
        medias: [
            {
                link: 'https://res.cloudinary.com/ddp4eyyfs/video/upload/v1741780455/Screen_Recording_2025-03-12_at_12.49.10_nyo5om.mov',
                text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut minus itaque atque eaque voluptate alias voluptatem.'
            },
            {
                link: 'https://res.cloudinary.com/ddp4eyyfs/video/upload/v1741780451/Screen_Recording_2025-03-12_at_12.50.26_xkehdk.mov',
                text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut minus itaque atque eaque voluptate alias voluptatem.'
            },
            {
                link: 'https://res.cloudinary.com/ddp4eyyfs/video/upload/v1741780449/Screen_Recording_2025-03-12_at_12.47.47_nagq6z.mov',
                text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut minus itaque atque eaque voluptate alias voluptatem.'
            }
        ]
    }
]

function Client() {
    const { id } = useParams()
    const client = clients.find(client => client.id === Number(id))

    return (
        <section>
            <div className="position-fixed top-0 w-100 pt-5 px-4 text-uppercase d-flex justify-content-between" style={{ mixBlendMode: 'difference' }}>
                <Link to="/" className="text-light cursor-pointer" >
                    <div className="arrow-left"></div>
                </Link>
                <h2 className="fs-6 text-white">{client.title}</h2>
            </div>
            {client.medias.map(media => (
                <div className="row align-items-start align-items-md-center gap-5">
                    {media.link.includes('video') ? (
                        <video 
                        autoPlay 
                        muted 
                        loop 
                        playsInline 
                        controls={false} 
                        className="d-block pe-none col-12 col-md-6 vh-100 object-fit-cover p-0"
                    >
                        <source src={media.link} type="video/mp4" />
                    </video>
                    ) :  (
                        <img className="col-12 col-md-6 vh-100 object-fit-cover p-0" src={media.link} alt="" />
                    )}
                    <p className="col-12 col-md-3 py-5 px-3">{media.text}</p>
                </div>
            ))}
        </section>
    )
}

export default Client
import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './slider.css';


function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "#D5D9DB", borderRadius: '10px', }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "#D5D9DB", borderRadius: '10px', zIndex:1 }}
            onClick={onClick}
        />
    );
}

const slidesData = [
    {
        id: 1,
        title: 'repellendus id ullam',
        label: 'Dolorem officiis temporibus.'
    }, {
        id: 2,
        title: 'excepturi consequatur est',
        label: 'Officia non provident dolor esse et neque.'
    }, {
        id: 3,
        title: 'eius doloribus blanditiis',
        label: 'Ut recusandae vel vitae molestiae id soluta.'
    }, {
        id: 4,
        title: 'nihil voluptates delectus',
        label: 'Qui vel consequatur recusandae illo repellendus.'
    }, {
        id: 5,
        title: 'nemo dolorem necessitatibus',
        label: 'Placeat odit velit itaque voluptatem.'
    }, {
        id: 6,
        title: 'dolorem quibusdam quasi',
        label: 'Adipisci officiis repudiandae.'
    },
];
export default function CompanySlider() {
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ],
        autoplaySpeed: 3000,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };
    return (
        <div className="container" style={{padding:'20px'}}>
            <h2> Companies </h2>
            <Slider {...settings}>
                {/* <div style={{justifyContent:'center', alignItems:'center', textAlign:'center'}}> */}
                {/* {slidesData.map((slide) =>

                    <div className="slick-slide" key={slide.id}>
                        <h2 className="slick-slide-title">{slide.title}</h2>
                        <img className="slick-slide-image" src={""} />
                        <label className="slick-slide-label">{slide.label}</label>
                    </div>

                )} */}
                <img className="slick-slide-image" src={"/LOGO(1).PNG"} />
                <img className="slick-slide-image" src={"/LOGO(2).PNG"} />
                <img className="slick-slide-image" src={"/LOGO(3).PNG"} />
                <img className="slick-slide-image" src={"/LOGO(4).PNG"} />
                </Slider>
                </div>
                );
}


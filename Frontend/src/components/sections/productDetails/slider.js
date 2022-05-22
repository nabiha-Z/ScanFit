import React, { useState, useEffect } from 'react';
import { Link, } from 'react-router-dom';
import { useHistory } from 'react-router';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './slider.css';
import { smartAdvisor } from '../../../api/index';

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
            style={{ ...style, display: "block", background: "#D5D9DB", borderRadius: '10px', zIndex: 1 }}
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

const images = {

    width: 200,
    height: 180,
    zIndex: 2,
    padding: 10,
    borderRadius: 40 / 2,
}
export default function ProductSlider(props) {

    const [products, setproducts] = useState([]);
    const [nonfeatured, setnonfeatured] = useState([]);
    const [currentPage, setcurrentPage] = useState(1);
    const [productsPerPage, setproductsPerPage] = useState(6);
    const [loading, setloading] = useState(false);
    const [check, setCheck] = useState(false);
    let routerHistory = useHistory();

    console.log("props: ",props)

    async function fetch() {
        setloading(true);
        //console.log("here");
        await smartAdvisor({ category: props.category, main_category: props.mainCategory, product_color:  props.color })
            .then(function (response) {
                if (response.data.message === true) {
                    setproducts(response.data.products)
                    setloading(false)
                    //console.log("products: ", response.data.products)
                } else {
                }
            })
            .catch(function (error) {

            });
    }

    useEffect(() => {
        fetch();
    }, [check]);


    const settings = {
        dots: true,
        infinite: true,
        className: "center",
        centerMode: true,
        centerPadding: "60px",
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: true,
        cssEase: 'linear',
        swipeToSlide: true,
        
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
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

    const showDetails = (item) => {

        console.log("product item: ", item.title);
        setCheck(!check)
        routerHistory.push({
            pathname: "/details",
            state: { product: item }
        });

    }
    return (
        <div className="container" style={{ padding: '20px' }}>
            <h2> Suggested For You </h2>
           
                <Slider {...settings}>
                    {products.map((item, key) => (
                        <button onClick={() => showDetails(item)} className="image-carousel">
                            <img src={item.picture} style={images} />
                        </button>
                    ))}
                </Slider>
        

        </div>
    );
}

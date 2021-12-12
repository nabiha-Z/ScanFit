import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Dots from "react-activity/dist/Dots";
import "react-activity/dist/Dots.css";
import { useHistory } from 'react-router';
import { fetchCategory } from '../../../api/index';
function Categories() {

    const [categories, setCategories] = useState([]);
    const [isFetchingData, setFetchingData] = useState(false);

    const fetchCategories = async() => {
        setFetchingData(true);
        await fetchCategory()
            .then(function (response) {
                console.log("rresponse=",response.data)
                console.log(response.data.categoryDetail);
                setFetchingData(false);
                setCategories(response.data.categoryDetail);

            })
            .catch(function (error) {

            });

    }
    useEffect(() => {
        fetchCategories();
    }, []);


    const LoadingData = () => {
        return (
            <>
                <div className="container" style={{ marginLeft: "50%", color: "#59B0CD", fontSize: "40" }}>
                    <Dots size='20' />
                </div>
            </>
        );
    };

    const Categories = () => {
        return (
            <>
                {categories.map((item, i) => (
                    <div key={i} className="col-lg-4 col-md-6">
                        <div className="acr-category">
                            <div className="acr-category-thumb">

                                <Link to={`/categories/${item.name}`} >
                                    <>
                                        <img src={item.img} alt="category" style={{ width: 400, height: 250 }} />
                                        <div className="acr-category-body">
                                            <h5>{item.name}</h5>
                                            <span>{item.count} listings</span>
                                        </div>
                                    </>
                                </Link>
                            </div>
                        </div>
                    </div>

                ))}
            </>
        );
    };




    return (
        <div className="section section-padding">
            <div className="container">
                <div className="section-title-wrap section-header">

                    <h2 className="title" style={{ marginTop: '20px' }}>Browse By Category</h2>
                </div>
                <div className="row">
                    {isFetchingData ? <LoadingData /> : <Categories />}

                </div>
            </div>
        </div>
    );

}

export default Categories;
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';
import dropDown from './drop-down.css';
import { fetchCategory, fetchLocations, searchLists } from '../../../api';

const units = ["acre", "sqft", "marla", "canal", "sqyd"];
const pricelist = ["60-90", "90-120", "120-150", "150-200", "600-800", "1000-1200"]

function Banner() {

    const routerHistory = useHistory();
    const [locations, setlocations] = useState([]);
    const [categories, setcategories] = useState([]);
    const [categ, setcateg] = useState();
    const [price, setprice] = useState("60-90");

    const [area, setarea] = useState(70);
    const [loc, setloc] = useState();
    const [unit, setunit] = useState("acre");
    const [address, setAddress] = useState("");
    const [searched, setsearched] = useState([]);



    async function getLocations() {

        await fetchLocations()
            .then(function (response) {
                setlocations(response.data.locationDetail);
            })
            .catch(function (error) {

            });

    }

    async function getCategories() {

        await fetchCategory()
            .then(function (response) {
                setcategories(response.data.categoryDetail);
            })
            .catch(function (error) {

            });

    }

    useEffect(() => {
        getLocations();
        getCategories();
    }, [])



    const searchListing = () => {
        const temp = price.split("-");
        const price1 = parseInt(temp[0]);
        const price2 = parseInt(temp[1]);



       searchLists({
            loc, area, categ, price1, price2, unit
        })
            .then(function (response) {
                console.log("response = ", response.data.featuredList);
                const featured = response.data.featuredList;

                const nonfeatured = response.data.nonfeaturedList;

                //const nonFeaturedList = response.data.nonfeaturedList;
                // console.log("featured= ", featured);
                // console.log("nonfeatured= ", nonfeatured);

                routerHistory.push({
                    pathname: "/filterList",
                    state: { featured: featured, nonFeature: nonfeatured }
                });



            })
            .catch(function (error) {

            });


    }


    return (
        <div className="banner banner-1 banner-3 dark-overlay bg-cover bg-center" style={{ backgroundImage: "url(/img1.png)" }}>
            <div className="container">
                <div className="banner-item">
                    <div className="banner-inner">
                        <div className="banner-text">
                            <h1 className="title text-white">Don't Fear It <br/> Just Wear It</h1>
                            <p className="subtitle text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
                        </div>
                        {/* <div className="acr-filter-form" style={{ width: '90%' }}>
                           
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Banner;
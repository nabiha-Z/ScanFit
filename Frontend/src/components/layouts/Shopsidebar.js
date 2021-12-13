import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import dropDown from './drop-down.css';
import { fetchCategory, fetchLocations, searchLists } from '../../api';
import { Collapse } from 'react-bootstrap';


const colors = ["green", "blue", "red", "brown", "purple"];
const pricelist = ["500-1000", "1000-2000", "2000-3000", "3000-5000"]
const categories = ["women", "men", "shirts", "jeans", "kurti", "dress"]
function Shopsidebar() {

    const [open, setopen] = useState(true);
    const routerHistory = useHistory();
    const [color, setcolor] = useState([]);
    const [categ, setcateg] = useState();
    const [price, setprice] = useState("60-90");

    const searchListing = () => {
        const temp = price.split("-");
        const price1 = parseInt(temp[0]);
        const price2 = parseInt(temp[1]);



        searchLists({
            color, categ, price
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
    return(
        <div className="sidebar sidebar-left">
            <div className="sidebar-widget">
                <div className="acr-collapse-trigger acr-custom-chevron-wrapper" onClick={() => setopen(!open)}>
                    <h5>Filter Products</h5>
                    <div className="acr-custom-chevron">
                        <span />
                        <span />
                    </div>
                </div>
                <Collapse in={open}>
                    <div className="acr-collapsable">
                        <div className="acr-filter-form">
                            <form onSubmit= {(e)=> e.preventDefault()}>
                               

                                <div className="drop-down">
                                    <label>Category: </label>
                                    <select className="form-control" name="location" value={categ} onChange={(e) => setcateg(e.target.value)} required>

                                        {categories.map((item, i) => {

                                            return <option key={i} value={item}>{item}</option>
                                        })}

                                    </select>
                                </div>

                                <div className="drop-down">
                                    <label>Color: </label>
                                    <select className="form-control" name="location" value={color} onChange={(e) => setcolor(e.target.value)} required>

                                        {colors.map((item, i) => {

                                            return <option key={i} value={item}>{item}</option>
                                        })}

                                    </select>
                                </div>
                                <div className="drop-down">
                                    <label>Price: </label>
                                    <select className="form-control" name="location" value={price} onChange={(e) => setprice(e.target.value)} required>

                                        {pricelist.map((item, i) => {

                                            return <option key={i} value={item}>{item}</option>
                                        })}

                                    </select>
                                </div>


                                
                                <button className="btn-custom secondary btn-block" name="button" onClick={() => searchListing()}>Search listings</button>
                            </form>
                        </div>
                    </div>
                </Collapse>
            </div>
            </div>
    );
           
}


export default Shopsidebar;
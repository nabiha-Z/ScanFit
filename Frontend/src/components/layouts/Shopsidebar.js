import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import dropDown from './drop-down.css';
import { fetchCategory, fetchLocations, searchLists } from '../../api';
import { Collapse } from 'react-bootstrap';


const units = ["acre", "sqft", "marla", "canal", "sqyd"];
const pricelist = ["60-90", "90-120", "120-150", "150-200", "600-800", "1000-1200"]
function Shopsidebar() {

    const [open, setopen] = useState(true);
    const routerHistory = useHistory();
    const [locations, setlocations] = useState([]);
    const [categories, setcategories] = useState([]);
    const [categ, setcateg] = useState();
    const [price, setprice] = useState("60-90");

    const [area, setarea] = useState(70);
    const [loc, setloc] = useState();
    const [unit, setunit] = useState("acre");
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
    // const { open } = this.state;
    // const { open2 } = this.state;
    // const { open3 } = this.state;
    return (
        <div className="sidebar sidebar-left">
            <div className="sidebar-widget">
                <div className="acr-collapse-trigger acr-custom-chevron-wrapper" onClick={() => setopen(!open)}>
                    <h5>Filter Listings</h5>
                    <div className="acr-custom-chevron">
                        <span />
                        <span />
                    </div>
                </div>
                <Collapse in={open}>
                    <div className="acr-collapsable">
                        <div className="acr-filter-form">
                            <form onSubmit= {(e)=> e.preventDefault()}>
                                <div className="drop-down" >
                                    <label>Location: </label>


                                    <select className="form-control" name="location" value={loc} onChange={(e) => setloc(e.target.value)} required>

                                        {locations.map((item, i) => {

                                            return <option key={i} value={item.location}>{item.location}</option>

                                        })}

                                    </select>
                                </div>

                                <div className="drop-down">
                                    <label>Category: </label>
                                    <select className="form-control" name="location" value={categ} onChange={(e) => setcateg(e.target.value)} required>

                                        {categories.map((item, i) => {

                                            return <option key={i} value={item.name}>{item.name}</option>
                                        })}

                                    </select>
                                </div>


                                <div className="drop-down" >
                                    <label>Area: </label>
                                    <div style={{ marginLeft: '8px', justifyContent: "space-between", position: "relative", marginTop: '-10px' }}>
                                        <input className="form-control" name="area" value={area} onChange={(e) => setarea(e.target.value)} required style={{ width: "60%" }} />
                                        <select className="form-control" name="unit" value={unit} onChange={(e) => setunit(e.target.value)} required style={{ width: "50%", marginTop: "2px", marginLeft: '50px' }}>

                                            {units.map((item, i) => {

                                                return <option key={i} value={item}>{item}</option>
                                            })}

                                        </select>

                                    </div>
                                </div>

                                <div className="drop-down">
                                    <label>Price: </label>
                                    <select className="form-control" name="location" value={price} onChange={(e) => setprice(e.target.value)} required>

                                        {pricelist.map((item, i) => {

                                            return <option key={i} value={item}>${item} </option>
                                        })}

                                    </select>

                                </div>
                                {/* <div className="acr-custom-select form-group">
                                    <label>Bathrooms: </label>
                                    <Select2 data={bathroomslist} options={{
                                        placeholder: 'Any amount',
                                    }} />
                                </div>
                                <div className="acr-custom-select form-group">
                                    <label>Type: </label>
                                    <Select2 data={typelist} options={{
                                        placeholder: 'Any Type',
                                    }} />
                                </div> */}
                                <button className="btn-custom secondary btn-block" name="button" onClick={() => searchListing()}>Search listings</button>
                            </form>
                        </div>
                    </div>
                </Collapse>
            </div>
            <div className="sidebar-widget">
                {/* <div className="acr-collapse-trigger acr-custom-chevron-wrapper" onClick={() => this.setState({ open2: !open2 })}>
                        <h5>Recent Listing</h5>
                        <div className="acr-custom-chevron">
                            <span />
                            <span />
                        </div>
                    </div> */}
                {/* <Collapse in={this.state.open2}>
                        <div className="acr-collapsable"> */}
                {/* Listing Start */}
                {/* {listing.filter(function (item) { return item.recent === true }).slice(0, 4).map((item, i) => (
                                <div key={i} className="listing listing-list">
                                    <div className="listing-thumbnail">
                                        <Link to="/listing-details-v1"><img src={process.env.PUBLIC_URL + "/" + item.gridimg} alt="listing" /></Link>
                                    </div>
                                    <div className="listing-body">
                                        <h6 className="listing-title"> <Link to="/listing-details-v1" title={item.title}>{item.title}</Link> </h6>
                                        <span className="listing-price">{new Intl.NumberFormat().format((item.monthlyprice).toFixed(2))}$ <span>/month</span> </span>
                                    </div>
                                </div>
                            ))} */}
                {/* Listing End */}
                {/* </div>
                    </Collapse> */}
            </div>
            {/* <div className="sidebar-widget">
                    <div className="acr-collapse-trigger acr-custom-chevron-wrapper" onClick={() => this.setState({ open3: !open3 })}>
                        <h5>Mortgage Calculator</h5>
                        <div className="acr-custom-chevron">
                            <span />
                            <span />
                        </div>
                    </div>
                    <Collapse in={this.state.open3}>
                        <div className="acr-collapsable">
                            <Calculator />
                        </div>
                    </Collapse>
                </div> */}
        </div>
    );
}


export default Shopsidebar;
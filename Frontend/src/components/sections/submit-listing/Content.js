import Cookies from 'js-cookie';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Tab, Nav } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import FileBase64 from 'react-file-base64';
import { useHistory } from 'react-router';
import MultiImageInput from 'react-multiple-image-input';
import { fetchCategory, fetchLocations, loginuser, createListing, decLimit } from '../../../api';
import 'antd/dist/antd.css';
import { message, Space } from 'antd';

// Features
const features = [
    { id: 1, icon: 'bone', title: 'Pet Friendly' },
    { id: 2, icon: 'chair', title: 'Furnished' },
    { id: 3, icon: 'fan', title: 'Cooling' },
    { id: 4, icon: 'garage', title: 'Parking' },
    { id: 5, icon: 'mailbox', title: 'Mailbox' },
    { id: 6, icon: 'eye', title: 'City View' },
];

const units = ["acre", "sqft", "marla", "canal", "sqyd"];
const types = ["Sale", "Rent",];

function Content(props) {
    const routerHistory = useHistory();
    const [title, settitle] = useState("");
    const [type, settype] = useState(types[0]);
    const [description, setdescription] = useState("");
    const [area, setarea] = useState("");
    const [year, setyear] = useState("");
    const [category, setCategory] = useState(null);
    const [price, setprice] = useState("");
    const [feature, setfeature] = useState([]);
    const [location, setlocation] = useState("");
    const [imagePath, setImagePath] = useState([]);
    const usermail = Cookies.get('mail');
    const [unit, setunit] = useState("acre");
    const [categories, setCategories] = useState([]);
    const [locations, setlocations] = useState([]);
    const [user, setuser] = useState({});
    const crop = {
        unit: '%',
        aspect: 4 / 3,
        width: '100'
    };


    async function getLocations() {
        //setuser(userdata);
        await fetchLocations()
            .then(function (response) {
                setlocations(response.data.locationDetail);
            })
            .catch(function (error) {

            });

    }
    const fetchCategories = async () => {
        await fetchCategory()
            .then(function (response) {
                // if(response.data.message===true){
                console.log("categories", response.data.categoryDetail);
                setCategories(response.data.categoryDetail);
                // }
            })
            .catch(function (error) {

            });
    }

    const userdata = () => {
        loginuser({
            token: Cookies.get('token')
        })
            .then(function (response) {
                if (response.data.message === "true") {
                    try {
                        setuser(response.data.user);
                        console.log("user loged in=", user);
                    } catch (e) {
                        return null;
                    }
                } else if (response.data.message === "false") {

                }

            })
            .catch(function (error) {

            });
    }


    useEffect(() => {

        fetchCategories();
        getLocations();
        userdata();

    }, []);
    const API = () => {
        // alert("aayay");
        //console.log(imagePath);
        console.log("category == ", category);
        console.log("images Combined=", imagePath);
        if (category === null) {
            message.error('Please select category');
        }
        else {
            createListing({
                title, description, area, category, price, location, usermail, features: feature, type, picture: imagePath[0], images: imagePath, unit, year

            })
                .then(function (response) {
                    if (response.data.message === true) {
                        console.log("response returened!");
                        routerHistory.push('./profile-listings');
                    }
                })
                .catch(function (error) {

                });

            //if(user.type === 'property-dealer'){
            const user_id = user._id;
            console.log(user_id);
            decLimit({
                user_id
            })
                .then(function (response) {
                    console.log(response.data.updated);
                })
                .catch(function (error) {

                });
            //}

        }
    }




    const uploadImages = async () => {
        //console.log("images=", imagePath);



    }


    // const [files, setFiles] = useState([]);
    // const { getRootProps, getInputProps } = useDropzone({
    //     accept: 'image/*',
    //     onDrop: acceptedFiles => {
    //         setFiles(acceptedFiles.map(file => Object.assign(file, {
    //             preview: URL.createObjectURL(file)
    //         })));
    //     }
    // });

    // const thumbs = files.map(file => (
    //     <div className="thumb" key={file.name}>
    //         <div className="thumbInner">
    //             <img
    //                 src={file.preview}
    //                 alt="img"
    //             />
    //         </div>
    //     </div>
    // ));

    // useEffect(() => () => {
    //     // Make sure to revoke the data uris to avoid memory leaks
    //     files.forEach(file => URL.revokeObjectURL(file.preview));
    // }, [files]);



    return (
        <div className="section">
            <div className="container">
                <div className="row">
                    <Tab.Container defaultActiveKey="tab1">
                        {/* Tabs Start */}
                        <div className="col-md-4">
                            <Nav variant="tabs" className="nav nav-tabs tab-cards">
                                <Nav.Item>
                                    <Nav.Link eventKey="tab1"><span>01</span> Basic Information</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="tab2"><span>02</span> Gallery</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="tab3"><span>03</span> Location</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="tab4"><span>04</span> Features</Nav.Link>
                                </Nav.Item>
                                {/* <Nav.Item>
                                    <Nav.Link eventKey="tab5"><span>05</span> Details</Nav.Link>
                                </Nav.Item> */}
                            </Nav>
                        </div>
                        {/* Tabs End */}
                        {/* Tab Content Start */}
                        <div className="col-md-8">
                            <form onSubmit={(e) => { e.preventDefault() }}>
                                <Tab.Content className="m-0">
                                    <Tab.Pane eventKey="tab1">
                                        <div className="row">
                                            <div className="col-md-12 form-group">
                                                <label>Property Description</label>
                                                <textarea name="content" rows={4} className="form-control" placeholder="Property Description" value={description} onChange={(e) => setdescription(e.target.value)} required />
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label>Property Title</label>
                                                <input type="text" className="form-control" placeholder="Property Name" name="name" value={title} onChange={(e) => settitle(e.target.value)} required />
                                            </div>
                                            {/* <div className="col-md-6 form-group">
                                                <label>Property Status</label>
                                                <select className="form-control" name="status">
                                                    <option value="For Rent">For Rent</option>
                                                    <option value="Featured">Featured</option>
                                                    <option value="For Sale">For Sale</option>
                                                    <option value="Leased">Leased</option>
                                                    <option value="New Addition">New Addition</option>
                                                    <option value="Sold">Sold</option>
                                                    <option value="Rental">Rental</option>
                                                    <option value="Reduced">Reduced</option>
                                                    <option value="Special Offer">Special Offer</option>
                                                </select>
                                            </div> */}
                                            {/* <div className="col-md-6">
                                                <label>Property Type</label>
                                                <select className="form-control" name="type" value={type} onChange={(e) => settype(e.target.value)} >
                                                    <option value="House">House</option>
                                                    <option value="Apartment">Apartment</option>
                                                    <option value="Condo">Condo</option>
                                                    <option value="Townhome">Townhome</option>
                                                    <option value="Villa">Villa</option>
                                                    <option value="Duplex">Duplex</option>
                                                </select>
                                            </div> */}
                                            <div className="col-md-6 form-group">
                                                <label>Property Price</label>
                                                <div className="input-group">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text">$</span>
                                                    </div>
                                                    <input type="text" className="form-control" name="price" value={price} placeholder="Property Price" onChange={(e) => setprice(e.target.value)} required />
                                                </div>
                                            </div>
                                            {/* <div className="col-md-6">
                                                <label>Rental Period</label>
                                                <select className="form-control" name="period">
                                                    <option value="Monthly">Monthly</option>
                                                    <option value="Yearly">Yearly</option>
                                                </select>
                                            </div> */}
                                            <div className="col-md-6 form-group">

                                                <label>Area: </label>
                                                <div style={{ display: 'flex', flexDirection: "row", marginLeft: '8px', justifyContent: "space-between", position: "relative", marginTop: '-10px' }}>
                                                    <input className="form-control" name="area" placeholder={"Enter area"} value={area} onChange={(e) => setarea(e.target.value)} required style={{ width: "50%" }} />
                                                    <select className="form-control" name="unit" value={unit} onChange={(e) => setunit(e.target.value)} required style={{ width: "40%", marginTop: "2px" }}>

                                                        {units.map((item, i) => {

                                                            return <option key={i} value={item}>{item}</option>
                                                        })}

                                                    </select>
                                                </div>

                                            </div>

                                            <div className="col-md-6">
                                                <label>Property Category</label>
                                                <select className="form-control" name="Category" value={category} onChange={(e) => setCategory(e.target.value)} >
                                                    {categories.map((item, i) => {
                                                        // { console.log("Category", category) };
                                                        return <option key={i} value={item.name}>{item.name}</option>


                                                    })}

                                                </select>

                                            </div>
                                            <div className="col-md-6 form-group">

                                                <label>Type: </label>


                                                <select className="form-control" name="unit" value={type} onChange={(e) => settype(e.target.value)} required>

                                                    {types.map((item, i) => {

                                                        return <option key={i} value={item}>For {item}</option>
                                                    })}

                                                </select>


                                            </div>
                                            <div className="col-md-6 form-group">

                                                <label>Year of construction: </label>

                                                <input type="text" className="form-control" placeholder="20xx" name="year" value={year} onChange={(e) => setyear(e.target.value)} required />

                                            </div>
                                            {/* <div className="col-md-12 form-group">
                                                <label>Property Video</label>
                                                <input type="text" className="form-control" placeholder="Property Video URL" name="video" />
                                            </div> */}
                                        </div>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="tab2">
                                        <div className="form-group">
                                            <label>Property Thumbnail</label>
                                            <div className="custom-file">
                                                {/* <input type="file" className="custom-file-input" id="propertyThumbnail"  onChange={(e)=> selectedFile(e)}/> */}
                                                <MultiImageInput
                                                    images={imagePath}
                                                    setImages={setImagePath}
                                                    max={6}
                                                    cropConfig={{ crop, ruleOfThirds: true }}

                                                />
                                                <p style={{ color: 'white' }}>Image</p>
                                                {/* <img src={imagePath[1]} alt="listing" style={{ width: 300, height: 250 }} /> */}

                                                {/* <button onClick={() => uploadImages()}> Upload </button> */}


                                                {/* <label className="custom-file-label" htmlFor="propertyThumbnail">{imagePath==null?"Choose a File":imagePath.name}</label> */}
                                            </div>
                                        </div>
                                        {/* <div className="form-group">
                                            <label>Property Gallery</label>
                                            <div {...getRootProps({ className: 'dropzone' })}>
                                                <input {...getInputProps()} />
                                                <div className="dropzone-msg dz-message needsclick">
                                                    <i className="fas fa-cloud-upload-alt" />
                                                    <h5 className="dropzone-msg-title">Drop files here or click to upload.</h5>
                                                    <span className="dropzone-msg-desc">This is just a demo dropzone. Selected files are <strong>not</strong> actually uploaded.</span>
                                                </div>
                                            </div>
                                            <aside className="thumbsContainer">
                                                {thumbs}
                                            </aside>
                                            <span className="acr-form-notice">*You can upload up to 5 images for your listing</span>
                                            <span className="acr-form-notice">*Listing images should be atleast 620x480 in dimensions</span>
                                        </div> */}
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="tab3">
                                        <div className="row">
                                            <div className="col-md-12 form-group">
                                                <label>Full Address</label>
                                                <select className="form-control" name="location" value={location} onChange={(e) => setlocation(e.target.value)} required>

                                                    {locations.map((item, i) => {

                                                        return <option key={i} value={item.location}>{item.location}</option>
                                                    })}

                                                </select>
                                            </div>
                                            {/* <div className="col-md-12 form-group">
                                                <label>Region</label>
                                                <select className="form-control" name="region">
                                                    <option value="Connecticut">Connecticut</option>
                                                    <option value="Washington DC">Washington DC</option>
                                                    <option value="Los Angelas">Los Angelas</option>
                                                    <option value="Missouri">Missouri</option>
                                                </select>
                                            </div> */}
                                            <div className="col-md-6 form-group">
                                                <label>Longitude</label>
                                                <input type="text" name="lng" id="lngVal" className="form-control" placeholder="Longitude" />
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label>Latitude</label>
                                                <input type="text" name="lat" id="latVal" className="form-control" placeholder="Latitude" />
                                            </div>
                                        </div>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="tab4">
                                        <div className="row">
                                            {features.map((item, i) => (
                                                <div key={i} className="col-lg-4 col-md-6 col-sm-6">
                                                    <label className="acr-listing-feature">
                                                        <input type="checkbox" name={"feature" + item.id + ""} value={item.title} onChange={(e) => {
                                                            if (e.target.checked) {
                                                                setfeature([...feature, e.target.value]);
                                                                console.log('feature', feature);
                                                            }
                                                        }} />
                                                        <i className="acr-feature-check fas fa-check" />
                                                        <i className={"acr-listing-feature-icon flaticon-" + item.icon + ""} />
                                                        {item.title}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                        <button type="submit" className="btn-custom" onClick={() => API()} >Submit Listing</button>

                                    </Tab.Pane>
                                    <Tab.Pane eventKey="tab5">
                                        <div className="row">
                                            <div className="col-md-6 form-group">
                                                <label>Property ID</label>
                                                <input type="text" className="form-control" placeholder="Property ID" name="id" />
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label>Beds</label>
                                                <input type="text" className="form-control" placeholder="Number of Beds" name="beds" />
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label>Bathrooms</label>
                                                <input type="text" className="form-control" placeholder="Number of Bathrooms" name="baths" />
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label>Condition</label>
                                                <input type="text" className="form-control" placeholder="Property Condition" name="condition" />
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label>Year Built</label>
                                                <input type="text" className="form-control" placeholder="Property Year Built" name="built" />
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label>Neighborhood</label>
                                                <input type="text" className="form-control" placeholder="Property Neighborhood" name="neighborhood" />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input" id="termsAndConditions" />
                                                <label className="custom-control-label" htmlFor="termsAndConditions">I Agree to the terms &amp; Conditions of Property Submission</label>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn-custom" onClick={() => alert("fsdf")} >Submit Listing</button>
                                    </Tab.Pane>
                                </Tab.Content>
                            </form>
                        </div>
                    </Tab.Container>
                    {/* Tab Content End */}
                </div>
            </div >
        </div >
    );
}

export default Content;
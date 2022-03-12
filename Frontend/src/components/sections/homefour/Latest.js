import React , {useState, useEffect} from 'react';
import { fetchProducts, favourite } from '../../../api';
import { Link, } from 'react-router-dom';
import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";
import { FaHeart } from 'react-icons/fa';


export default function LatestProducts() {
    
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    useEffect(async () => {
        await fetchProducts()
        .then((response)=>{
            if(response.data.message === true){
                setProducts(response.data.products)
            }
        })
        
    }, [])

    const onFav = async(item, e) => {
        e.preventDefault();
        console.log("onFav");
        if (Cookies.get("token") != undefined) {
            const token = Cookies.get("token");

            const user = jwt_decode(token);
            const user_id = user.id;
            console.log(user_id);

            await favourite({ item, user_id })

                .then(function (response) {
                    console.log("onFav= ", response.data)
                    if (response.data.message === true) {
                        alert("Saved");
                    } else {
                        alert("Already in saved products");
                    }


                })
                .catch(function (error) {

                });
        } else {
            alert("You need to login first!");
        }
    }
    return (
        <div className="container" style={{ padding: '20px' }}>
            <h2 className='heading'> LATEST  PRODUCTS </h2>
            {products.map((item,key)=>(
        
               <div key={key} className="col-md-4 col-sm-8" style={{ justifyContent: 'center' }}>
                    <div className="listing">
                        <div className="listing-thumbnail">
                            <Link to="/listing-details-v1"><img src={item.picture} alt="listing" style={{ width: 300, height: 250 }} /></Link>
                            {/* <div className="listing-badges">
                                {
                                    item.subscribed === "featured" ? <span className="listing-badge featured"> <i className="fas fa-star" style={{ backgroundColor: "#F3C13C" }} /> </span> : ''
                                }
                                {
                                    item.type === "Sale" ? <span className="listing-badge sale">On Sale</span> : ''
                                }
                                {
                                    item.pending === true ? <span className="listing-badge pending"> Pending</span> : ''
                                }
                                {
                                    item.type === "Rent" ? <span className="listing-badge rent"> Rental</span> : ''
                                }
                            </div> */}
                            <div className="listing-controls">
                                <Link to="#" className="favorite"><FaHeart onClick={(e) => onFav(item, e)} /></Link>
                            </div>
                        </div>
                        <div className="listing-body">
                            {/* <div className="listing-author">
                            <img src={process.env.PUBLIC_URL + "/" + item.authorimg} alt="author" />
                            <div className="listing-author-body">
                                <p> <Link to="#">{item.authorname}</Link> </p>
                                <span className="listing-date">{item.postdate}</span>
                            </div>
                            <Dropdown className="options-dropdown">
                                <Dropdown.Toggle as={NavLink}><i className="fas fa-ellipsis-v" /></Dropdown.Toggle>
                                <Dropdown.Menu className="dropdown-menu-right">
                                    <ul>
                                        <li> <Link to="tel:+123456789"> <i className="fas fa-phone" /> Call Agent</Link> </li>
                                        <li> <Link to="mailto:+123456789"> <i className="fas fa-envelope" /> Send Message</Link> </li>
                                        <li> <Link to="/listing-details-v1"> <i className="fas fa-bookmark" /> Book Tour</Link> </li>
                                    </ul>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div> */}
                            <h5 className="listing-title"> <Link to="/listing-details-v1" title={item.title}>{item.title}</Link> </h5>
                           
                            <span className="listing-price">{item.price} RS/-</span>
                            {/* <p className="listing-text">{item.description}</p> */}
                            <div className="listing-gallery-wrapper">

                                <button className="btn-custom btn-sm secondary">View Details</button>
                                {/* <OverlayTrigger overlay={gallerytip}>
                            <Link to="#" className="listing-gallery"> <i className="fas fa-camera" /> </Link>
                        </OverlayTrigger> */}
                            </div>
                        </div>
                    </div>
                    </div>
      
            ))}
            </div>
            
         
    );
}


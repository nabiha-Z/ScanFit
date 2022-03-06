import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './category.css';
import Dots from "react-activity/dist/Dots";
import "react-activity/dist/Dots.css";
import { useHistory } from 'react-router';
import { FiSearch } from 'react-icons/fi';
import { fetchCategory } from '../../../api/index';
function Categories() {

    const [categories, setCategories] = useState([]);
    const [searchField, setSeacrhField] = useState();
    const [isFetchingData, setFetchingData] = useState(false);

    const CategoryConatiner = (props) => {
        var path = "/images/" + props.img + ".png";
        return (
            <>
                <div className='category-block'>
                    <div className='category-circle'>
                        <img src={path} className='image-icon' />
                    </div>
                    <p>{props.title}</p>
                </div></>
        )
    }




    return (
        <div className="section section-padding">
            <div className="container">
                <div className="section-title-wrap section-header">

                    <h2 className="title" style={{ marginTop: '20px' }}>SHOP CATEGORIES</h2>
                </div>
                <div className="row" style={{ flexWrap: 'wrap', justifyContent: 'center' }}>

                    <div className='searchbar'>
                        <div className='searchfield'>
                            <input type='text' className='searchinput' value={searchField} onChange={(e) => setSeacrhField(e.target.value)} />
                            {/* <img src="/images/search.png" className='searchicon'/> */}
                            <FiSearch className='searchicon'/>
                        </div>
                    </div>
                    <div className='categories'>

                        <CategoryConatiner title="Dress" img="dress" />
                        <CategoryConatiner title="Shirts" img="shirt" />
                        <CategoryConatiner title="Jeans" img="jeans" />
                        <CategoryConatiner title="Suits" img="suit" />
                        <CategoryConatiner title="Accessories" img="accessory" />

                    </div>
                   

                </div>
            </div>
        </div>
    );

}

export default Categories;
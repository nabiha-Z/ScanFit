import React, {  useEffect, useState} from 'react';
import axios from 'axios';
import * as ReactBootStrap from 'react-bootstrap';
import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";
import { deletesubuser, fetchsubuser } from '../../../api';
function Subusertable(){

    const [subusers, setsubusers] = useState();
    const [loading, setloading] = useState(false);


    // useEffect(() => {
        //     const fetchdata = async () =>{
            //         const {subusers} = await axios("http://localhost:5000/user/fetchsubuser" , {user_id});
            
            //         setdata({users: subusers});
            //         console.log(data);
            //     }
            //     fetchdata()
            // }, [setdata])
     const  fetchusers= async ()=> {

        const token = Cookies.get("token");
        const user = jwt_decode(token);
        const user_id = user.id;
        console.log("Company ID:",user_id);
        console.log("here");
        await fetchsubuser({user_id})
        .then(function (response) {      
               
                setsubusers(response.data.subusers);
                console.log(response.data.subusers);
            })
            .catch(function (error) {
                console.log(error.message);
            });

    }
    const  onsubmit = async (item,e)=>{
        e.preventDefault();
        await deletesubuser({item} )
        .then(function (response) {      
            console.log(response.data.users);
            window.location.reload(false);
        })
        .catch(function (error) {
            console.log(error.message);
        });

        console.log(item);
    }

    useEffect(() => {
        fetchusers();   
    }, []);

    return(
        <div>
<ReactBootStrap.Table responsive="sm">
  <thead>
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Phone Number</th>
    </tr>
  </thead>
  <tbody>
  {
    subusers != undefined? 
    subusers.map((item,i)=>(
    <tr key={i}>
      <td>{item.name}</td>
      <td>{item.email}</td>
      <td>{item.phonenumber}</td>
      <td>{<ReactBootStrap.Button as="input" type="submit" value="Delete" onClick = {(e)=>onsubmit(item,e)} />}</td>
    </tr>
    ))
    // <tr >
    //   <td>d</td>
    //   <td>d</td>
    //   <td>d</td>
    // </tr>
  :(null)
  }
    
  </tbody>
</ReactBootStrap.Table>
        </div>
    );
}
export default Subusertable;
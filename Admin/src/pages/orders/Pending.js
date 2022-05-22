
import React, { useState, useEffect } from "react";
import {
    CalendarToday,
    LocationSearching,
    MailOutline,
    PermIdentity,
    PhoneAndroid,
    Publish,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import "./style.css";
import { FaBars } from 'react-icons/fa'
import { BsListTask } from 'react-icons/bs'
import 'antd/dist/antd.css';
import { message } from 'antd';
import { useLocation } from 'react-router-dom';

export default function Pending({ setShow, handleToggleSidebar, orders}) {
    setShow(true);
    let location = useLocation();
    const { innerWidth: width, innerHeight: height } = window;
    
    return (
        <main>

            <div className="userTitleContainer">
                <div
                    style={{
                        width: 35,
                        height: 35,
                        height: 35,
                        color: '#353535',
                        textAlign: 'center',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 20,
                        cursor: 'pointer'
                    }}
                    onClick={() => handleToggleSidebar(true)}>
                    <FaBars />
                </div>
                <h1 className="userTitle">Pending Orders</h1>
                <p style={{color:'white'}}>jkjkjky</p>

            </div>
            <div className="userContainer" >
                <table id="table" className="table v-middle">
                    <thead>
                        <tr className="bg-light">
                            <th scope="col">OrderNo</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Payment</th>
                            <th scope="col">Status</th>
                            <th scope="col">User</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((item) => (
                            <>
                                <tr>
                                    <td>{item.orderNo}</td>
                                    <td>Rs.{item.totalamount}</td>
                                    <td>{item.paymentmethod}</td>
                                    <td>{item.status}</td>
                                    <td>{item.user}</td>
                                </tr>
                            </>

                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
}

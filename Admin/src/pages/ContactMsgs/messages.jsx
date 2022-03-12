import "./messages.css";
import { DataGrid } from "@material-ui/data-grid";

import { FaUserShield, FaBars } from 'react-icons/fa';

import { DeleteOutline } from "@material-ui/icons";
import { messages } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';

export default function UserList({ handleToggleSidebar }) {
    const [data, setData] = useState(messages);
    const { innerWidth: width, innerHeight: height } = window;
    const handleDelete = (id) => {
        setData(data.filter((item) => item.id !== id));
    };
    useEffect(() => {

        axios.get('https://api-kearekisa.herokuapp.com/admin/contactmessage')
          .then(res => {
            const cat = res.data;
            const userData = cat.map((item) => {
              item.id = item._id;
              return {
                ...item
              }
            })
            // console.log("newData:", userData[0])
            setData(userData)
    
          })
          .catch(err => {
            alert(err);
          })
      }, []);

    const columns = [
        {
            field: "Sender",
            headerName: "Sender",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="UserListItem">
                        
                        {params.row.sendername}
                    </div>
                );
            },
        },
        {
            field: "Email",
            headerName: "Email",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="UserListItem">
                       
                        {params.row.senderemail}
                    </div>
                );
            },
        },
        {
            field: "Message",
            headerName: "Message",
            width: 300,
            renderCell: (params) => {
                return (
                    <div className="UserListItem">
                        {params.row.messbody}
                    </div>
                );
            },
        },
      
        {
            field: "Send Time",
            headerName: "Send Time",
            width: 150,
            renderCell: (params) => {
                return (
                    <div className="UserListItem">
                    {params.row.createdAt}
                </div>
                );
            },
        },
    ];

    return (
        <div className="UserList">
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
            <h1 className="userTitle" style={{ textAlign: 'center', margin: 5 }}>Messages</h1>
            <DataGrid
                rows={data}
                disableSelectionOnClick
                columns={columns}
                pageSize={5}
                style={{height:height*0.5}}
                
            />
        </div>
    );
}

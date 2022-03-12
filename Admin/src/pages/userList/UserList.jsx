import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";

import { FaUserShield, FaBars } from 'react-icons/fa'
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';

export default function UserList({ handleToggleSidebar }) {
  const [data, setData] = useState([]);
  const { innerWidth: width, innerHeight: height } = window;

  useEffect(() => {

    axios.get('https://api-kearekisa.herokuapp.com/admin/users')
      .then(res => {
        const cat = res.data;
        // console.log(cat[0])

        const userData = cat.map((item) => {
          item.id = item._id;
          console.log("item:", item)
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

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    {
      field: "User",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="UserListItem">
            <img className="UserListImg" src={params.row.profileimg} alt="" />
            {params.row.name}
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

            {params.row.email}
          </div>
        );
      },
    },
    {
      field: "Contact",
      headerName: "Contact",

      width: 200,
      renderCell: (params) => {
        return (
          <div className="UserListItem">
            {params.row.phonenumber}
          </div>
        );
      },
    },
    {
      field: "Address",
      headerName: "Address",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="UserListItem">
            {params.row.address}
          </div>
        );
      },
    },

    {
      field: "Location",
      headerName: "Location",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="UserListItem">
            {params.row.location}
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
      <h1 className="userTitle" style={{ textAlign: 'center', margin: 5 }}>Users</h1>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={8}
      />
    </div>
  );
}

import React, { useState, useEffect } from 'react'
import "./sidebar.css";
import { Link } from "react-router-dom";
import { useIntl } from 'react-intl';
import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from 'react-pro-sidebar';
import { FaUserShield, FaRegLaughWink } from 'react-icons/fa';
import { FiMessageSquare } from 'react-icons/fi';
import { BsListTask, BsCardChecklist } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { MdPendingActions, MdOutlineFormatListBulleted } from 'react-icons/md';
import { BiLogOut, BiMenuAltLeft } from 'react-icons/bi';
import { AiOutlineDollarCircle } from 'react-icons/ai';
import sidebarBg from '../../assests/bg3.jpg';
import '../../styles/app.scss';

export default function Sidebar({ image, collapsed, toggled, handleToggleSidebar, handleCollapsedChange, setCollapsed }) {

    const intl = useIntl();
    const { innerWidth: width, innerHeight: height } = window;
    useEffect(() => {

        const { innerWidth: width, innerHeight: height } = window;
    }, []);

    return (
        <ProSidebar
            image={image ? sidebarBg : false}
            collapsed={collapsed}
            toggled={toggled}
            breakPoint="md"
            onToggle={handleToggleSidebar}
            style={{ height: height }}
        >
            <SidebarHeader>
                <div
                    style={{
                        display: 'flex',
                        padding: '24px',
                        textTransform: 'uppercase',
                        fontWeight: 'bold',
                        fontSize: 16,
                        letterSpacing: '1px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        color: 'white',
                        letterSpacing: 2,
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between'
                    }}
                >
                    <p>Dashboard</p>
                    <BiMenuAltLeft color='white' style={{ fontSize: 30, backgroundColor: 'rgba(139, 139, 140,0.6)', cursor: 'pointer', borderRadius: 50, padding: 5 }} onClick={() => {
                        handleCollapsedChange(!collapsed)
                        setCollapsed(!collapsed)
                    }}></BiMenuAltLeft>
                </div>
            </SidebarHeader>

            <SidebarContent>
                <Menu iconShape="circle">
                  
                </Menu>
                <Link to="/allorders">
                    <Menu iconShape="circle">
                        <MenuItem icon={<BsListTask style={{ fontSize: 20 }} />} style={{ color: '#BEBEC2', textDecoration: 'none' }}> {intl.formatMessage({ id: 'All Orders' })}</MenuItem>
                    </Menu>
                </Link>
                <Link to="/completed">
                    <Menu iconShape="circle">
                        <MenuItem icon={<BsCardChecklist style={{ fontSize: 20 }} />} style={{ color: '#BEBEC2', textDecoration: 'none' }}> Completed</MenuItem>
                    </Menu>
                </Link>
                <Link to="/pending">
                    <Menu iconShape="circle">
                        <MenuItem icon={<MdPendingActions style={{ fontSize: 20 }} />} style={{ color: '#BEBEC2', textDecoration: 'none' }}> {intl.formatMessage({ id: 'Pending' })}</MenuItem>
                    </Menu>
                </Link>
               
                <Link to="/home">
                    <Menu iconShape="circle">

                        <MenuItem icon={<BsListTask style={{ fontSize: 20 }} />} style={{ color: '#BEBEC2', textDecoration: 'none' }}> {intl.formatMessage({ id: 'Products' })}</MenuItem>
                    </Menu>
                </Link>
                <Link to="/users">
                    <Menu iconShape="circle">
                        <MenuItem icon={<FaUserShield style={{ fontSize: 20 }} />} style={{ color: '#BEBEC2', textDecoration: 'none' }}> {intl.formatMessage({ id: 'Users' })}</MenuItem>
                    </Menu>
                </Link>


                {/* <Link to="/payment">
                    <Menu iconShape="circle">
                        <MenuItem icon={<AiOutlineDollarCircle style={{ fontSize: 20 }} />} style={{ color: '#BEBEC2', textDecoration: 'none' }}> {intl.formatMessage({ id: 'Payments' })}</MenuItem>
                    </Menu>
                </Link>

                <Link to="/messages">
                    <Menu iconShape="circle">
                        <MenuItem icon={<FiMessageSquare style={{ fontSize: 20 }} />} style={{ color: '#BEBEC2', textDecoration: 'none' }}> {intl.formatMessage({ id: 'Contact Messages' })}</MenuItem>
                    </Menu>
                </Link>
                <Link to="/profile">
                    <Menu iconShape="circle">
                        <MenuItem icon={<CgProfile style={{ fontSize: 20 }} />} style={{ color: '#BEBEC2', textDecoration: 'none' }}> {intl.formatMessage({ id: 'Profile' })}</MenuItem>
                    </Menu>
                </Link> */}


            </SidebarContent>

            <SidebarFooter style={{ textAlign: 'center' }}>
                <div
                    className="sidebar-btn-wrapper"
                    style={{
                        padding: '20px 24px',
                    }}
                >
                    <Link to="/">
                        <Menu iconShape="circle">
                            <MenuItem icon={<BiLogOut style={{ fontSize: 20 }} />} style={{ color: '#BEBEC2', textDecoration: 'none', }}> {intl.formatMessage({ id: 'Logout' })}</MenuItem>
                        </Menu>
                    </Link>
                </div>
            </SidebarFooter>
        </ProSidebar >
    );
}

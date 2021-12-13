import React from 'react';
import { Menu } from 'antd';
import { NavLink, useRouteMatch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ReactSVG } from 'react-svg';
import FeatherIcon from 'feather-icons-react';
import propTypes from 'prop-types';
import versions from '../demoData/changelog.json';
import { logOut } from '../redux/authentication/actionCreator';

const { SubMenu } = Menu;

const MenuItems = ({ darkMode, toggleCollapsed, topMenu, events }) => {
  const { path } = useRouteMatch();
  const dispatch = useDispatch();

  const pathName = window.location.pathname;
  const pathArray = pathName.split(path);
  const mainPath = pathArray[1];
  const mainPathSplit = mainPath.split('/');

  const { onRtlChange, onLtrChange, modeChangeDark, modeChangeLight, modeChangeTopNav, modeChangeSideNav } = events;
  const [openKeys, setOpenKeys] = React.useState(
    !topMenu ? [`${mainPathSplit.length > 2 ? mainPathSplit[1] : 'dashboard'}`] : [],
  );

  const onOpenChange = keys => {
    setOpenKeys(keys[keys.length - 1] !== 'recharts' ? [keys.length && keys[keys.length - 1]] : keys);
  };

  const onClick = item => {
    if (item.keyPath.length === 1) setOpenKeys([]);
  };

  const SignOut = e => {
    e.preventDefault();
    dispatch(logOut());
  };

  return (
    <Menu
      onOpenChange={onOpenChange}
      onClick={onClick}
      mode={!topMenu || window.innerWidth <= 991 ? 'inline' : 'horizontal'}
      theme={darkMode && 'dark'}
      // // eslint-disable-next-line no-nested-ternary
      defaultSelectedKeys={
        !topMenu
          ? [
              `${
                mainPathSplit.length === 1 ? 'home' : mainPathSplit.length === 2 ? mainPathSplit[1] : mainPathSplit[2]
              }`,
            ]
          : []
      }
      defaultOpenKeys={!topMenu ? [`${mainPathSplit.length > 2 ? mainPathSplit[1] : 'dashboard'}`] : []}
      overflowedIndicator={<FeatherIcon icon="more-vertical" />}
      openKeys={openKeys}
    >
      <SubMenu key="listings" icon={!topMenu && <FeatherIcon icon="list" />} title="Property Listings">
        <Menu.Item key="approved">
          <NavLink onClick={toggleCollapsed} to={`${path}/listings/approved`}>
            Approved
          </NavLink>
        </Menu.Item>
        <Menu.Item key="pending">
          <NavLink onClick={toggleCollapsed} to={`${path}/listings/pending`}>
            Pending
          </NavLink>
        </Menu.Item>
        <Menu.Item key="rejected">
          <NavLink onClick={toggleCollapsed} to={`${path}/listings/rejected`}>
            Rejected
          </NavLink>
        </Menu.Item>
      </SubMenu>
      <SubMenu key="users" icon={!topMenu && <FeatherIcon icon="users" />} title="Users">
        <Menu.Item key="list">
          <NavLink onClick={toggleCollapsed} to={`${path}/userlisting`}>
            User Listing
          </NavLink>
        </Menu.Item>
        <Menu.Item key="team">
          <NavLink onClick={toggleCollapsed} to={`${path}/propertydealers`}>
            Property Dealers
          </NavLink>
        </Menu.Item>
        <Menu.Item key="non approved">
          <NavLink onClick={toggleCollapsed} to={`${path}/nonapprovedusers`}>
            Non Approved Users
          </NavLink>
        </Menu.Item>
      </SubMenu>
      <SubMenu key="data" icon={!topMenu && <FeatherIcon icon="list" />} title="Add Data">
      <Menu.Item >
      <NavLink onClick={toggleCollapsed} to={`${path}/category`} >
          Add Category
        </NavLink>
      </Menu.Item>
      
      <Menu.Item >
      <NavLink onClick={toggleCollapsed} to={`${path}/location`} icon={!topMenu && <FeatherIcon icon="users" />}>
          Add Location
        </NavLink>
      </Menu.Item>
        </SubMenu>

        <SubMenu key="projects" icon={!topMenu && <FeatherIcon icon="list" />} title="Projects">
        <Menu.Item key="create">
          <NavLink onClick={toggleCollapsed} to={`${path}/projects/create`}>
            Create Project
          </NavLink>
        </Menu.Item>
        </SubMenu>
      

      <SubMenu key="featuresitem" icon={!topMenu && <FeatherIcon icon="list" />} title=" Feature Items">
        <Menu.Item key="update">
          <NavLink onClick={toggleCollapsed} to={`${path}/updatefeatures`}>
            Requested
          </NavLink>
        </Menu.Item>
        </SubMenu>

      

      {/*       
      {!topMenu && <p className="sidebar-nav-title">Settings</p>}
      <SubMenu key="settings" icon={
          !topMenu && (
            <NavLink className="menuItem-iocn" to={`${path}/settings`}>
              <FeatherIcon icon="settings" />
            </NavLink>
          )
        } title="Settings">
        </SubMenu> */}

      {/* <Menu.Item key="settings"
      >
        <NavLink onClick={toggleCollapsed} to={`${path}/settings`}>
          Settings
        </NavLink>
      </Menu.Item> */}
      {/* <Menu.Item key = "log-out">
      <NavLink to="#">
        <FeatherIcon size={16} icon="log-out" />
        <span>log out</span>
        </NavLink>
      </Menu.Item> */}
      {/* <Menu.Item
        icon={
          !topMenu && (
            <NavLink className="menuItem-iocn" to={`${path}/settings`}>
              <FeatherIcon icon="settings" />
            </NavLink>
          )
        }
        key="settings"
      >
        <NavLink onClick={toggleCollapsed} to={`${path}/settings`}>
          Settings
        </NavLink>
      </Menu.Item> */}
      {/* {!topMenu && <p className="sidebar-nav-title">Pages</p>} */}

      {!topMenu && <p className="sidebar-nav-title">Settings</p>}
      <Menu.Item
        icon={
          !topMenu && (
            <NavLink className="menuItem-iocn" to={`${path}/settings`}>
              <FeatherIcon icon="settings" />
            </NavLink>
          )
        }
        key="settings"
      >
        <NavLink onClick={toggleCollapsed} to={`${path}/settings`}>
          Settings
        </NavLink>
      </Menu.Item>
      <Menu.Item
        icon={
          !topMenu && (
            <NavLink className="menuItem-iocn" to={`${path}/adduser`}>
              <FeatherIcon icon="settings" />
            </NavLink>
          )
        }
        key="adduser"
      >
        <NavLink onClick={toggleCollapsed} to={`${path}/adduser`}>
          Add Company
        </NavLink>
      </Menu.Item>

      <Menu.Item
        icon={
          !topMenu && (
            <NavLink className="menuItem-iocn" onClick={SignOut} to="#">
              <FeatherIcon icon="log-out" />
            </NavLink>
          )
        }
        key="log-out"
      >
        Sign Out
      </Menu.Item>
    </Menu>
  );
};

MenuItems.propTypes = {
  darkMode: propTypes.bool,
  topMenu: propTypes.bool,
  toggleCollapsed: propTypes.func,
  events: propTypes.object,
};

export default MenuItems;

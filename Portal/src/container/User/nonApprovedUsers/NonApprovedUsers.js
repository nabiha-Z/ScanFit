

import React, { useEffect,useState } from 'react';
// import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';

import UserListTable from '../../pages/overview/UserListTable';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Main, CardToolbox } from '../../styled';
import { AutoComplete } from '../../../components/autoComplete/autoComplete';
import { Button } from '../../../components/buttons/buttons'
import { useDispatch, useSelector } from 'react-redux';
import { fetchunapproved} from '../../../redux/users/actionCreator';


const Userlisting = () => {
  const { searchData, users } = useSelector(state => {
    return {
      searchData: state.headerSearchData,
      users: state.users,
    };
  });

  const [state, setState] = useState({
    notData: searchData,
    selectedRowKeys: 0,
    selectedRows: 0,
  });
  
  const userlistings = useSelector(state =>state.userlisting );
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchunapproved());
   }, [dispatch]);
   console.log(userlistings);


  const { notData } = state;

    const handleSearch = searchText => {
    const data = searchData.filter(item => item.title.toUpperCase().startsWith(searchText.toUpperCase()));
    setState({
      ...state,
      notData: data,
    });
  };



  return (
    <>
      <CardToolbox>
        <PageHeader
          ghost
          title="Non Approved Users"
          subTitle={
            <>
              <span className="title-counter">274 Users </span>
              <AutoComplete
                onSearch={handleSearch}
                dataSource={notData}
                placeholder="Search by Name"
                width="100%"
                patterns
              />
            </>
          }
          buttons={[
            <Button className="btn-add_new" size="default" type="primary" key="1">
              <Link to="/admin/users/add-user/info">+ Add New User</Link>
            </Button>,
          ]}
        />
      </CardToolbox>

      <Main>
        <Row gutter={15}>
          <Col md={24}>
            <UserListTable approval = 'approval' />
          </Col>
        </Row>
      </Main>
      </>
  );
};

export default Userlisting;
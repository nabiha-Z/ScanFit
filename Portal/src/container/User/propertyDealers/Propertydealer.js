import React, { useEffect,useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import UserListTable from '../../pages/overview/PropertyDealerTable';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Main, CardToolbox } from '../../styled';
import { AutoComplete } from '../../../components/autoComplete/autoComplete';
import { Button } from '../../../components/buttons/buttons'
import { fetchpropertydealers } from '../../../redux/users/actionCreator';

const Propertydealer = () => {
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

  const { notData } = state;

  const handleSearch = searchText => {
    const data = searchData.filter(item => item.title.toUpperCase().startsWith(searchText.toUpperCase()));
    setState({
      ...state,
      notData: data,
    });
  };

  const user = useSelector(state =>state.listings );
  const dispatch = useDispatch();

   useEffect(() => {
    dispatch(fetchpropertydealers());
   }, [dispatch]);
   console.log(user);


  return (
    <>
      <CardToolbox>
        <PageHeader
          ghost
          title="Property Dealers"
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
            <UserListTable />
          </Col>
        </Row>
      </Main>
    </>
  );
};

export default Propertydealer;

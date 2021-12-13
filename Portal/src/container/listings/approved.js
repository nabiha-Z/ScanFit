import React, { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { Row, Col } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { AutoComplete } from '../../components/autoComplete/autoComplete';
import { fetchApproved } from '../../redux/listings/actionCreator';
import PendingTable from './pendingTable';


const approved = () =>{
  const listings = useSelector(state =>state.listings );
  const dispatch = useDispatch();

   useEffect(() => {
    dispatch(fetchApproved());
   }, [dispatch]);
   console.log(listings);

    return(
        <>
        <PageHeader
          ghost
          title="Approved Property List"
          subTitle={
            <>
              {/* <span className="title-counter">274 Users </span> */}
              <AutoComplete
                // onSearch={handleSearch}
                // dataSource={notData}
                placeholder="Search by Name"
                width="100%"
                patterns
              />
            </>
          }
        />
        <Main>
        <Row gutter={15}>
          <Col xs={24}>
            <PendingTable listType='approved' color='green'/>
          </Col>
        </Row>
        </Main>
        </>
    )

}
export default approved;
import React, { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { Row, Col } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { AutoComplete } from '../../components/autoComplete/autoComplete';
import PendingTable from './pendingTable';
import { fetchRejected } from '../../redux/listings/actionCreator';


const rejected=()=>{

  const listings = useSelector(state =>state.listings );
  const dispatch = useDispatch();

   useEffect(() => {
    dispatch(fetchRejected());
   }, [dispatch]);

   console.log(listings);
    return(
        <>
        <PageHeader
          ghost
          title="Rejected Property List"
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
            <PendingTable listType='rejected' color='red'/>
          </Col>
        </Row>
        </Main>
        </>
    )

}
export default rejected;
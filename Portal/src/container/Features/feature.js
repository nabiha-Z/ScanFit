import React, { useEffect} from 'react';
import { Row, Col } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main} from '../styled';
import { AutoComplete } from '../../components/autoComplete/autoComplete';
import { useDispatch, useSelector } from 'react-redux';
import {getApprovedRequested} from '../../redux/listings/actionCreator';
import FeaturesTable from './featuresTable';


const feature =()=>{

  const listings = useSelector(state =>state.listings );
  const dispatch = useDispatch();

   useEffect(() => {
    dispatch(getApprovedRequested());
    
   }, [dispatch]);
  

   console.log(listings);

    return(
        <>
        <PageHeader
          ghost
          title="Pending Property List"
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
            <FeaturesTable  color='blue'/>
          </Col>
        </Row>
        </Main>
        </>
    )
}
export default feature;
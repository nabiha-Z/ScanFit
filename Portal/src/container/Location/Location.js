import React, { useState } from 'react';
import { Row, Col, Form, Input, Select } from 'antd';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import Dots from "react-activity/dist/Dots";
import "react-activity/dist/Dots.css";
import { BasicFormWrapper } from '../styled';
import Heading from '../../components/heading/heading';
import axios from 'axios';

//import useSelection from 'antd/lib/table/hooks/useSelection';

const Location = () => {


  const [location, setlocation] = useState("");
  const [error, seterror] = useState([]);
  const [loading, setloading] = useState(false);


  const onSubmit = () => {
    setloading(true);
    axios.post('http://localhost:5000/location/create-location', {
      location

    }).then(function (response) {
      //   console.log(response);
      setloading(false);
      if (response.data.message === true) {
          seterror("");
          setlocation("");
          alert("Location Added.");

      } else {
        seterror("Location already existed.");
      }

    })
      .catch(function (error) {

      });
  }

  const AddBtn = () =>{
    return(
      <Button size="default" htmlType="submit" onClick={() => onSubmit()} type="primary">
      Add
    </Button>

    );
  }

  const Loader = () =>{
    return(
      <Button size="default" htmlType="submit" onClick={() => onSubmit()} type="primary">
      <Dots/> loading ...
    </Button>

    );
  }



  return (
    <Cards
      title={
        <div className="setting-card-title">
          <Heading as="h4">Add Location</Heading>
          <span>Add a Location</span>
        </div>
      }
    >
      <Row justify="center">
        <Col xl={12} lg={16} xs={24}>
          <h4 style={{ color: '#C72C2C', fontWeight: 20, fontSize: 20 }}>{error}</h4>
          <BasicFormWrapper>
            <Form onSubmit={(e) => { e.preventDefault() }}>
              <Form.Item label="Location">
                <Input type="text" className="form-control" placeholder="Add Location" location="location" value={location} onChange={(e) => setlocation(e.target.value)} required />
              </Form.Item>
              <div className="setting-form-actions">
               {loading? <Loader/>: <AddBtn/>}
              </div>
            </Form>
          </BasicFormWrapper>
        </Col>
      </Row>
    </Cards>
  )
};

export default Location;
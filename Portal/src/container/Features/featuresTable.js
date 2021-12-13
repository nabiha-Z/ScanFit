import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tag } from '../../components/tags/tags';
import { Row, Col, Table, Progress, Pagination } from 'antd';
import { Link } from 'react-router-dom';
import Heading from '../../components/heading/heading';
import { Cards } from '../../components/cards/frame/cards-frame';
import { ProjectPagination, ProjectListTitle, ProjectListAssignees, ProjectList } from '../project/style';
import { BtnGroup, Button } from '../../components/buttons/buttons';
import { approveFeatured } from '../../redux/listings/actionCreator';

const featuresTable = props => {
  const listings = useSelector(state => state.listings);
  const dispatch = useDispatch();

  const [state, setState] = useState({
    lists: listings,
    current: 0,
    pageSize: 0,
  });

  const { lists } = state;

  useEffect(() => {
    if (listings) {
      setState({
        lists: listings,
      });
    }
  }, [listings]);

  console.log(listings);
  const Types 
  = props.Types;
  const color = props.color;

  const onShowSizeChange = (current, pageSize) => {
    setState({ ...state, current, pageSize });
  };

  const onHandleChange = (current, pageSize) => {
    // You can create pagination in here
    setState({ ...state, current, pageSize });
  };

  const onApprove = list => {
    const { _id } = list;
    dispatch(approveFeatured(_id, { ...list, subscribed: 'featured' }));
  };


  const dataSource = [];

  if (lists.length)
    lists.map(value => {
      const { _id, title, description, area, location, features, picture, price, type, status, subscribed } = value;
      console.log(subscribed);
      return dataSource.push({
        key: _id,
        ID: <span>{_id}</span>,
        Title: (
          <ProjectListTitle>
            <Heading as="h4">
              <Link>{title}</Link>
            </Heading>
          </ProjectListTitle>
        ),
        Description: (
          <span>
            <p>{description}</p>
          </span>
        ),
        Area: (
          <span>
            <p>{area}</p>
          </span>
        ),
        Location: (
          <span>
            <p>{location}</p>
          </span>
        ),
        Features: (
          <span>
            <p>{features}</p>
          </span>
        ),
        Price: <span>{price}</span>,
        Type: (
          <span>
            <p>{type}</p>
          </span>
        ),
        Status: (
          <Tag color={color}>
            <span style={{ color: color }}>{status}</span>
          </Tag>
        ),
        Subscribed: (
              <span><p>{subscribed}</p></span>
            
          ),
        Actions: (
            <Button size="small" type="primary" onClick={() => onApprove(value)}>
              Feature
            </Button>
            
        ),
      });
    });

  const columns = [
    {
      title: 'ID',
      dataIndex: 'ID',
      key: 'ID',
    },
    {
      title: 'Title',
      dataIndex: 'Title',
      key: 'Title',
    },
    {
      title: 'Description',
      dataIndex: 'Description',
      key: 'Description',
    },
    {
      title: 'Area',
      dataIndex: 'Area',
      key: 'Area',
    },
    {
      title: 'Location',
      dataIndex: 'Location',
      key: 'Location',
    },
    {
      title: 'Features',
      dataIndex: 'Features',
      key: 'Features',
    },
    {
      title: 'Picture',
      dataIndex: 'Picture',
      key: 'Picture',
    },
    {
      title: 'Price',
      dataIndex: 'Price',
      key: 'Price',
    },
    {
      title: 'Status',
      dataIndex: 'Status',
      key: 'Status',
    },
    {
        title: 'Subscribed',
        dataIndex: 'Subscribed',
        key: 'Subscribed',
    },
    {
      title: '',
      dataIndex: 'Actions',
      key: 'Actions',
    },
  ];
  return (
    <Row gutter={25}>
      <Col xs={24}>
        <Cards headless>
          <ProjectList>
            <div className="table-responsive">
              
                <>
                  <Table pagination={false} dataSource={dataSource} columns={columns} />
                </>
              
            </div>
          </ProjectList>
        </Cards>
      </Col>
      <Col xs={24} className="pb-30">
        <ProjectPagination>
          {lists.lengt ? (
            <Pagination
              onChange={onHandleChange}
              showSizeChanger
              onShowSizeChange={onShowSizeChange}
              pageSize={10}
              defaultCurrent={1}
              total={40}
            />
          ) : null}
        </ProjectPagination>
      </Col>
    </Row>
  );
};
export default featuresTable;

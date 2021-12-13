import React from 'react';
import { useSelector } from 'react-redux';
import { Table,Row } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { UserTableStyleWrapper } from '../style';
import { TableWrapper } from '../../styled';
import Heading from '../../../components/heading/heading';
import { Button,BtnGroup } from '../../../components/buttons/buttons';
import { Cards } from '../../../components/cards/frame/cards-frame';
import {ButtonsGroupWrapper} from '../../../container/styled';
import { Approveuser } from '../../../redux/users/actionCreator';
import { useDispatch } from 'react-redux';

const UserListTable = (props) => {
  const { users } = useSelector(state => {
    return {
      users: state.userlisting,
    };
  });
const dispatch = useDispatch();
  const onsubmit=(user) =>{
    const { _id} = user;
    dispatch(Approveuser(_id,{...user,status:"approved"}));
    
    console.log(user);

  }
  const approve = props.approval;

  const usersTableData = [];

  users.map(user => {
    const { id, name, email, phonenumber,type,status } = user;

    return usersTableData.push({
      key: id,
      user: (
        <div className="user-info">
            <Heading className="user-name" as="h6">
              {name}
            </Heading>          
        </div>
      ),
      email: (<Heading className="user-name" as="h6">{email}</Heading>),

      phonenumber: (<Heading className="user-name" as="h6">{phonenumber}</Heading>),

      type:(<Heading className="user-name" as="h6">{type}</Heading>
      ),
      views:(<Heading className="views" as="h6"> </Heading>
      ),

      approval:(<ButtonsGroupWrapper>
        <div className="button-group-single">
          <Row>
            <BtnGroup>
              <Button size="small" type="primary" onClick={()=>onsubmit(user)}>
                Verify
              </Button>
              </BtnGroup>
                </Row>
                </div>
              </ButtonsGroupWrapper>

              ),

    });
  });

  const usersTableColumns = [
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phonenumber',
      key: 'phonenumber',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Views',
      dataIndex: 'views',
      key: 'views',
    },
    {
      title: '',
      dataIndex: '',
      key: '',
    },
    {
      title: '',
      dataIndex: 'approval',
      key: 'approval',
    },
    
];

  const rowSelection = {
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };

  return (
    <Cards headless>
      <UserTableStyleWrapper>
        <TableWrapper className="table-responsive">
        {approve=== 'approval'?(
            <Table
            rowSelection={rowSelection}
            dataSource={usersTableData}
            columns={usersTableColumns}
            pagination={{
              defaultPageSize: 5,
              total: usersTableData.length,
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
            }}
          />
        ):(
            <Table
            rowSelection={rowSelection}
            dataSource={usersTableData}
            columns={usersTableColumns.slice(0,-1)}
            pagination={{
              defaultPageSize: 5,
              total: usersTableData.length,
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
            }}
          />
        )}
          
        </TableWrapper>
      </UserTableStyleWrapper>
    </Cards>
  );
};

export default UserListTable;
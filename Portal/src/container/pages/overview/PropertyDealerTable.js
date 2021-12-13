import  React,{ useState,useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { Table,Form,InputNumber} from 'antd';
import { UserTableStyleWrapper } from '../style';
import { TableWrapper } from '../../styled';
import Heading from '../../../components/heading/heading';
import { Button } from '../../../components/buttons/buttons';
import {updatelimit} from '../../../redux/users/actionCreator';
import { Cards } from '../../../components/cards/frame/cards-frame';


const PropertyDealerTable = (props) => {
  const [data, setData] = useState(null);
  const dispatch = useDispatch();

  const onChange = (event) => {
    setData(event);
  };

  
  const { users } = useSelector(state => {
    return {
      users: state.userlisting,
    };
  });
  
  
  const onsubmit=(user,data)=>{
    console.log(user);
    const { _id } = user;
    dispatch(updatelimit(_id, { ...user, limit:data}));
      
    
    
   
    

  }
  const usersTableData = [];

  users.map(user => {
    const { id, name, email, phonenumber,type,limit} = user;

    return usersTableData.push({
      key: id,
      user: (
        

            <Heading className="user-name" as="h6">
              {name}
            </Heading>          
        
      ),
      email: (
    
      <Heading className="user-name" as="h6">
          {email}
      </Heading>
   
    ),
    
      phonenumber: (
        
        <Heading className="user-name" as="h6">
            {phonenumber}
        </Heading>
       
    ),
    
      type: (
     
      <Heading className="user-name" as="h6">
          {type}
      </Heading>
      
      ),
      limit:(
        <Form name="limit-update" layout="inline" >
      <Form.Item name = 'limit'  label="" rules={[{ type: 'number', min: 0, max: 99 }]}>
      <InputNumber  onChange={onChange}   />
      </Form.Item>
      <Button  type="primary" htmlType="submit" onClick={()=>onsubmit(user,data)}  >
                Submit
        </Button>
      </Form>

      )
      
      
    
      

            

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
      title: 'Limit',
      dataIndex: 'limit',
      key: 'limit',
  },
    {
        title: '',
        dataIndex: '',
        key: '',
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
        </TableWrapper>
      </UserTableStyleWrapper>
    </Cards>
  );
};

export default PropertyDealerTable;
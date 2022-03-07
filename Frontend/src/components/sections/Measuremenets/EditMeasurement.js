import React, { useState, useEffect } from 'react';
import styles from './style.css';
import 'antd/dist/antd.css';
import { message } from  'antd';
import { useHistory } from 'react-router';
import { BsCameraFill, BsArrowRightShort, BsPencil, BsTrash } from 'react-icons/bs';

const Form = (props) => {
  const history = useHistory();
  const [kneeLength, setkneeLength] = useState(props.knee);
  const [fullLength, setfullLength] = useState(props.full);
  const [armLength, setarmLength] = useState(props.arm);
  const [shoulders, setShoulders] = useState(props.shoulder);
  const [chestLength, setchestLength] = useState(props.chest);


  const saveChanges = () => {

    message.success("Changes Saved")
    history.push('./measurements')
  }
  return (
    <div className="container">
      <form onSubmit={(e)=>e.preventDefault()}>
        <input type="text" value={shoulders} onChange={(e) => setShoulders(e.target.value)} />
        <input type="text" value={armLength} onChange={(e) => setarmLength(e.target.value)} />
        <input type="text" value={fullLength} onChange={(e) => setfullLength(e.target.value)} />
        <input type="text" value={chestLength} onChange={(e) => setchestLength(e.target.value)} />
        <input type="text" value={kneeLength} onChange={(e) => setkneeLength(e.target.value)} />
        <button onClick={()=>saveChanges()}>Save Changes</button>
      </form>
    </div>
  );
};


export default Form;
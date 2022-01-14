/*
元件用法
<Dialog say={['放字串陣列','非常簡陋的元件']} />
也可以
let temp=['放字串陣列','非常簡陋的元件']
<Dialog say={temp} />
*/
import { useState } from 'react'
import Modal  from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
export default function Dialog(props) {
 
  const [show, setShow] = useState(false);
  const [now, setNow] = useState(0);

  const handleClose = () => setShow(false);
  const handleShow = () => {setShow(true);
    props.onClick()
  }
  const nextSay = () => {
    if(now<props.say.length-1)
    setNow(now+1)
    
  };
  
  const gerObj=()=>{
    // let temp=[]
    // temp.push(<h1>aaaa</h1>)
    // temp.push(<h1>bbbb</h1>)
    // temp.push(<h1>cccc</h1>)
    // temp[1]=null
    // console.log(temp.length)
    // return temp
  }
  // setNow(0)
  return (
    <>
      <Button variant="primary"disabled={!props.disabled} onClick={handleShow} >
       {props.title}
      </Button>
      {/* {gerObj()} */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.say[now]}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            跳過
          </Button>
          {now==props.say.length-1?<Button variant="primary" onClick={handleClose} href='/Play'>
            結束
          </Button>:<Button variant="primary" onClick={nextSay}>
            繼續</Button>}
        </Modal.Footer>
      </Modal>
    </>
  );
}


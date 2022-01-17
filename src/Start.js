import React, { Component } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Jay from './static/character/Jay.png';
class Start extends Component{
    constructor(props){
        super(props)
    }
    choose(character){
      localStorage.setItem('character', character);
    }
    makeCharacter(img,name,descr,power,no,lock=false){
      return <div class="col-sm">
      <Card style={{ width: '18rem' }}>
       <Card.Img style={lock?{filter: "blur(" + `8` + "px) brightness(0.7)",height:'200px'}:{height:'200px'}} variant="top" src={
       require('./static/character/'+img).default
      } />
       <Card.Body>
         <Card.Title>{!lock?name:"尚未解鎖"}</Card.Title>
         <Card.Text>
           {!lock?descr:"未知"}
         </Card.Text>
       </Card.Body>
       <ListGroup className="list-group-flush">
         <ListGroupItem>{!lock?power[0]:"等待解鎖"}</ListGroupItem>
         <ListGroupItem>{!lock?power[1]:"等待解鎖"}</ListGroupItem>
       </ListGroup>
       {/* <Card.Body>
         <Card.Link href="#">Card Link</Card.Link>
         <Card.Link href="#">Another Link</Card.Link>
       </Card.Body> */}
       <Button disabled={lock} onClick={()=>this.choose(no)}>選擇他</Button>
     </Card>
      </div>

    }
render(props){
    return  [<div class="container">
    <div class="row">
      {this.makeCharacter('Jay.png','阿傑','傑哥不要!!',['知男而上','讓我看看'],0)}
      {this.makeCharacter('Wang.jpg','王世堅','傑哥不要!!',['Over my dead body','前後為難'],1)}
      {this.makeCharacter('KP.jpg','柯文哲','傑哥不要!!',['知難而上','前後為難'],2)}
      {this.makeCharacter('Han.png','韓國瑜','傑哥不要!!',['高雄發大財','烙跑市長'],3,true)}
      
      </div>
      </div>
      
    
   
     
     
    ]
    
        
    
       
}
}
export default Start
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
render(props){
    return  [<div class="container">
    <div class="row">
      <div class="col-sm">
      <Card style={{ width: '18rem' }}>
       
      
       <Card.Img variant="top" src={require('./static/character/Jay.png').default} />
       <Card.Body>
         <Card.Title>阿傑</Card.Title>
         <Card.Text>
           Some quick example text to build on the card title and make up the bulk of
           the card's content.
         </Card.Text>
       </Card.Body>
       <ListGroup className="list-group-flush">
         <ListGroupItem>能力一</ListGroupItem>
         <ListGroupItem>能力二</ListGroupItem>
         <ListGroupItem>能力三</ListGroupItem>
       </ListGroup>
       {/* <Card.Body>
         <Card.Link href="#">Card Link</Card.Link>
         <Card.Link href="#">Another Link</Card.Link>
       </Card.Body> */}
       <Button onClick={()=>this.choose(0)}>選擇他</Button>
     </Card>
      </div>
      <div class="col-sm">
      <Card style={{ width: '18rem' }}>
       
      
       <Card.Img variant="top" src={require('./static/character/Wang.jpg').default} />
       <Card.Body>
         <Card.Title>王世堅</Card.Title>
         <Card.Text>
           Some quick example text to build on the card title and make up the bulk of
           the card's content.
         </Card.Text>
       </Card.Body>
       
       <Button onClick={()=>this.choose(1)}>選擇他</Button>
     </Card>
      </div>
      <div class="col-sm">
      <Card style={{ width: '18rem' }}>
       
      
       <Card.Img variant="top" src={require('./static/character/KP.jpg').default} />
       <Card.Body>
         <Card.Title>柯文哲</Card.Title>
         <Card.Text>
           Some quick example text to build on the card title and make up the bulk of
           the card's content.
         </Card.Text>
       </Card.Body>
       
       <Button onClick={()=>this.choose(2)}>選擇他</Button>
     </Card>
      </div>
    </div>
  </div>,
     
     
    ]
    
        
    
       
}
}
export default Start
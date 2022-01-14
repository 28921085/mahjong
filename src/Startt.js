import React, { Component } from 'react';
import Stack from 'react-bootstrap/Stack';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
class Start extends Component{
     style={
        textAlign:'center'
    }
    render(){
      return  <Stack gap={5} className="col-md-5 mx-auto" style={this.style}>
          <h1>麻將<Badge pill bg="success" >
        RPG
        </Badge></h1>
        <Button variant="secondary"href="/Level">開始遊戲</Button>
        <Button variant="outline-secondary"href="/CharacterShop">選擇角色</Button>
        <Button variant="outline-secondary"href="/Dialog">新手教學 <Badge pill bg="warning" >
        new
        </Badge>
        </Button>
        
        </Stack>
    }
    
}
export default Start
import React, { Component } from 'react';
import Stack from 'react-bootstrap/Stack';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
class Start extends Component{
     style={
        textAlign:'center'
    }
    constructor(){
      super()
      if(localStorage.getItem("lock")==null){
          localStorage.setItem("lock",0)
      }
      this.lock=localStorage.getItem("lock")

      if(localStorage.getItem("bonusHp")==null){
        localStorage.setItem("bonusHp",0)
    }
    this.bonusHp=localStorage.getItem("bonusHp")
  

    if(localStorage.getItem("money")==null){
      localStorage.setItem("money",0)
  }
  this.money=localStorage.getItem("money")

    if(localStorage.getItem("bonusAtk")==null){
      localStorage.setItem("bonusAtk",0)
  }
  this.bonusAtk=localStorage.getItem("bonusAtk")

      if(localStorage.getItem("character")==null){
        localStorage.setItem("character",0)
    }
      this.now=localStorage.getItem("character")
    }
    
    render(){
      return  <Stack gap={5} className="col-md-5 mx-auto" style={this.style}>
          <h1>麻將<Badge pill bg="success" >
        RPG
        </Badge></h1>
        <Button variant="secondary"href="/Level">開始遊戲</Button>
        <Button variant="outline-secondary"href="/CharacterShop">選擇角色</Button>
        <Button variant="outline-secondary"href="/Teach">新手教學 <Badge pill bg="warning" >
        new
        </Badge>
        </Button>
        
        </Stack>
    }
    
}
export default Start
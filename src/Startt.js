import React, { Component } from 'react';
import Stack from 'react-bootstrap/Stack';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

import bg from './home.jpg'

import { Container } from 'react-bootstrap';

class Start extends Component{
     style={
        textAlign:'center',
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        height:"100vmin",
        // width:"100vmin",
        marginLeft:"1px",
        marginRight:"0",
        backgroundColor:"green",
        // backgroundAttachment:'fixed',
        // borderTop:"15%",
        // margin:"0",
       
backgroundPosition: 'center'

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
      return <Container className="mx-auto" style={this.style}> 
      <div style={{height:"15%"}}></div>
      <Stack gap={5} className="col-md-5 mx-auto">
          <h1>麻將<Badge pill bg="success" >
        RPG
        </Badge></h1>
        <Button variant="secondary"href="/Level">開始遊戲</Button>
        <Button variant="outline-secondary"href="/CharacterShop">選擇角色</Button>
        <Button variant="outline-secondary"href="/Teach"> 新手教學&nbsp;&nbsp; <Badge pill bg="info" >
        Teach!
        </Badge>
        </Button>
        <Button  target="_blank" variant="outline-secondary" href='https://docs.google.com/presentation/d/1NOcYmlnZvNXC_tV-i2ovAZ0hMZVa5e_lhATn5aAdB6Q/edit?usp=sharing'>查看我們的文件</Button>
        <Button target="_blank" variant="outline-secondary" href='https://github.com/28921085/mahjong'>Github</Button>
        </Stack>
        </Container> 
    }
    
}
export default Start
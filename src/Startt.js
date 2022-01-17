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
        <Button variant="outline-secondary"href="/Teach"> 新手教學&nbsp;&nbsp; <Badge pill bg="info" >
        Teach!
        </Badge>
        </Button>
        <Button  variant="outline-secondary" href='https://docs.google.com/presentation/d/1NOcYmlnZvNXC_tV-i2ovAZ0hMZVa5e_lhATn5aAdB6Q/edit?usp=sharing'>查看我們的文件</Button>
        <Button variant="outline-secondary" href='https://github.com/28921085/mahjong/commits/React/src'>Github</Button>
        </Stack>
    }
    
}
export default Start
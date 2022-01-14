import React, { Component,useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
class CharacterShop extends Component{
    constructor(props){
        super(props)
        this.state={
          change:true,
          
      }
      
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

    choose(character){
      localStorage.setItem('character', character);
      console.log(character)
      this.now=character
      this.forceUpdate()
    }
    makeCharacter(img,name,descr,power,no,lock=false){
      
      return <div class="">
      <Card style={{ width: '18rem' }}className="text-center">
       <Card.Img style={!lock?{filter: "blur(" + `8` + "px) brightness(0.7)",height:'200px'}:{height:'200px'}} variant="top" src={
       require('./static/character/'+img).default
      } />
       <Card.Body>
         <Card.Title>{lock?name:"尚未解鎖"}</Card.Title>
         <Card.Text>
           {lock?descr:"未知"}
         </Card.Text>
       </Card.Body>
       <ListGroup className="list-group-flush">
         <ListGroupItem>{lock?power[0]:"等待解鎖"}</ListGroupItem>
         <ListGroupItem>{lock?power[1]:"等待解鎖"}</ListGroupItem>
       </ListGroup>
       {/* <Card.Body>
         <Card.Link href="#">Card Link</Card.Link>
         <Card.Link href="#">Another Link</Card.Link>
       </Card.Body> */}
       <Button key={Math.random()} disabled={!lock} onClick={()=>this.choose(no)}>{this.now==no?'正在使用':'選擇他'}</Button>
     </Card>
      </div>

    }
    makeMyself(img,name,descr){
      
      return      <Card style={{ width: '18rem' }}className="text-center">
        
       <Card.Img style={{height:'200px'}} variant="top" src={
       require('./static/character/'+img).default
      } />
       <Card.Body>
         <Card.Title>{"當前使用角色"}</Card.Title>
         <Card.Text>
           {name}
         </Card.Text>
       </Card.Body>
       <ListGroup className="list-group-flush" >
       <ListGroupItem>你的金錢: {this.money} <Button variant='outline-primary'onClick={()=>this.getMoney()}>點我信仰充值</Button></ListGroupItem>
         <ListGroupItem>額外生命值: {this.bonusHp} <Button variant='outline-primary'onClick={()=>this.buyHp()}>購買</Button></ListGroupItem>
         <ListGroupItem>額外攻擊力: {String(Number(this.bonusAtk)*2)+'底/'+this.bonusAtk+'台'} <Button variant='outline-primary'onClick={()=>this.buyAtk()}>購買</Button></ListGroupItem>
       </ListGroup>
       {/* <Card.Body>
         <Card.Link href="#">Card Link</Card.Link>
         <Card.Link href="#">Another Link</Card.Link>
       </Card.Body> */}
       
     </Card>
      

    }
    getMoney(){
      localStorage.setItem("money", Number(localStorage.getItem("money"))+100)
      this.money=localStorage.getItem("money")
      this.forceUpdate()
    }
    buyHp(){
      localStorage.setItem("bonusHp", Number(localStorage.getItem("bonusHp"))+100)
      this.bonusHp=localStorage.getItem("bonusHp")
      localStorage.setItem("money", Number(localStorage.getItem("money"))-100)
      this.money=localStorage.getItem("money")
      this.forceUpdate()
    }
    buyAtk(){
      localStorage.setItem("bonusAtk", Number(localStorage.getItem("bonusAtk"))+10)
      this.bonusAtk=localStorage.getItem("bonusAtk")
      localStorage.setItem("money", Number(localStorage.getItem("money"))-100)
      this.money=localStorage.getItem("money")
      this.forceUpdate()
    }
render(props){
  console.log("rerender")
  let chrname=['Jay.png','Wang.jpg','KP.jpg','Han.png']
  let name=['阿傑', '王世堅' , '柯文哲' , '韓國瑜']  
  let tmpstyle={width:"18rem"}
    return  [<div class="container">
      
      <div class="row ">
    <div class="col-sm-4">
    <Row xs={1} md={2} className="g-4">
    
      {this.makeMyself(chrname[this.now],name[this.now],'傑哥不要!!')}
      <Button style={tmpstyle} href="/">回首頁</Button>
      </Row>
      </div>
      
      <div class="col-sm-8 float-left ">
        
        <Row xs={1} md={2} className="g-4">
        {this.makeCharacter(chrname[0],name[0],'傑哥不要!!',['知男而上','讓我看看'],0,true)}
      {this.makeCharacter(chrname[1],name[1],'傑哥不要!!',['Over my dead body','前後為難'],1,this.lock>=1)}
      {this.makeCharacter(chrname[2],name[2],'傑哥不要!!',['知難而上','前後為難'],2,this.lock>=2)}
      {this.makeCharacter(chrname[3],name[3],'傑哥不要!!',['高雄發大財','烙跑市長'],3,this.lock>=3)}
      </Row>
      </div>
      
      </div>
      </div>
      
     
    
   
     
     
    ]
    
        
    
       
}
}
export default CharacterShop
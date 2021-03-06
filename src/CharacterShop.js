import React, { Component,useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import database from './firebase';
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
      
      return          <Card style={{ width: '18rem' }}className="text-center">
        
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
      if( Number(localStorage.getItem("money")-100)<0){
        alert("餘額不足請信仰充值")
      }else{
        localStorage.setItem("bonusHp", Number(localStorage.getItem("bonusHp"))+100)
        this.bonusHp=localStorage.getItem("bonusHp")
        localStorage.setItem("money", Number(localStorage.getItem("money"))-100)
        this.money=localStorage.getItem("money")
        this.forceUpdate()
      }
     
    }
    buyAtk(){
      if( Number(localStorage.getItem("money")-100)<0){
        alert("餘額不足請信仰充值")
      }else{
      localStorage.setItem("bonusAtk", Number(localStorage.getItem("bonusAtk"))+10)
      this.bonusAtk=localStorage.getItem("bonusAtk")
      localStorage.setItem("money", Number(localStorage.getItem("money"))-100)
      this.money=localStorage.getItem("money")
      this.forceUpdate()
      }
    }
    save(){
      console.log("in")
      let code='test'
      code=window.prompt("請輸入代號")
      database.ref(code).set({
        'money':localStorage.getItem("money"),
        'lock':localStorage.getItem("lock"),
        'bonusHp':localStorage.getItem("bonusHp"),
        "bonusAtk":localStorage.getItem("bonusAtk"),
        "character":localStorage.getItem("character")
      })

    }
    load(){
      let code=window.prompt("請輸入代號")
      
      fetch( "https://majohn-18fe6-default-rtdb.firebaseio.com/"+code+".json", { /*設定request內容*/})
    .then(res => res.json()) /*把request json化*/
    .then(data => {
      if(data==null){
        alert("查無此代號")
      }else{
        this.lock=data.lock
        this.bonusHp=data.bonusHp
        this.bonusAtk=data.bonusAtk
        this.money=data.money
        
        localStorage.setItem("money",data.money)
        localStorage.setItem("lock",data.lock)
        localStorage.setItem("bonusHp",data.bonusHp)
        localStorage.setItem("bonusAtk",data.bonusAtk)
        localStorage.setItem("character",data.character)
        this.forceUpdate()
      }
      console.log(JSON.stringify(data))
          /*接到request data後要做的事情*/
    })
    .catch(e => {
        /*發生錯誤時要做的事情*/
    })
    }
render(props){
  console.log("rerender")
  let chrname=['Jay.png','Wang.jpg','KP.jpg','Han.png']
  let name=['阿傑', '王世堅' , '柯文哲' , '韓國瑜']  
  let tmpstyle={width:"18rem"}
  let half={width:"9rem"}
    return  [<div class="container">
      <h1>選擇角色</h1> 
      <div class="row ">
    <div class="col-sm-4">
    <Row xs={1} md={2} className="g-4">
    
      {this.makeMyself(chrname[this.now],name[this.now],'傑哥不要!!')}
      <Button style={tmpstyle} href="/">回首頁</Button>
      </Row>
      <Row xs={1} md={2} className="g-12">
      <Button style={half} onClick={()=>this.save()}>存檔</Button>
      <Button style={half} onClick={()=>this.load()}>載入</Button>
      </Row>
      </div>
      
      <div class="col-sm-8 float-left ">
        
        <Row xs={1} md={2} className="g-4">
      {this.makeCharacter(chrname[0],name[0],'傑哥不要!!',['知男而上：對男生腳色的傷害x2','讓我看看：一回合內可以看到敵人的牌冷卻:1場'],0,true)}
      {this.makeCharacter(chrname[1],name[1],'台北市議員',['over my dead body：當自身HP<=0時隊友攻擊力X2','睜眼說瞎話：胡牌時直接加5台'],1,this.lock>=1)}
      {this.makeCharacter(chrname[2],name[2],'台北市市長',['垃圾不分藍綠：摸到索牌及萬牌的機會減少(減少70%)','歪頭燦笑:：胡牌時，施以燦爛的笑容來躲過傷害'],2,this.lock>=2)}
      {this.makeCharacter(chrname[3],name[3],'前高雄市市長',['高雄發大財：摸到索牌及發財的機率增加70%','國瑜發大財：結算的時候金錢一律兩倍'],3,this.lock>=3)}
      </Row>
      </div>
      
      </div>
      </div>
      
     
    
   
     
     
    ]
    
        
    
       
}
}
export default CharacterShop
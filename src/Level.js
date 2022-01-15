import React, { Component } from 'react';
import Stack from 'react-bootstrap/Stack';
import Dialog from './Dialog';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
// import Background1 from './static/level/taipei1.jpg';
// import Background2 from './static/level/taipei2.jpg';
// import Background3 from './static/level/kao.jpg';
import Background1 from "./static/level/level1.jpg"
import Background2 from "./static/level/level2.jpg"
import Background3 from "./static/level/level3.jpg"
class Level extends Component{
    constructor(props){
        super(props)
        if(localStorage.getItem("lock")==null){
            localStorage.setItem("lock",0)
        }
        this.lock=localStorage.getItem("lock")
        if(localStorage.getItem("character")==null){
          localStorage.setItem("character",0)
      }
        this.now=localStorage.getItem("character")
    }

    getStyle(level){
       let tmp={}
       tmp.height="100vmin"
       switch(level){
        case 0: tmp.backgroundImage=`url(${Background1})`
        break
        case 1: tmp.backgroundImage=`url(${Background2})`
        break
        case 2: tmp.backgroundImage=`url(${Background3})`
        break
       }
       tmp.backgroundRepeat='no-repeat'
       if(this.lock<level){
        tmp.filter="blur(" + `8` + "px) brightness(0.7)"
       }
    return tmp
    

    }
    textStyle={
        textAlign:'justify'
    }
    render(){
        return <Container  style={this.style}>
            <Row className="text-justify">
                <h1 class="text-center" style={this.textStyle}>
                <Button variant='outline-primary' href='/'>回首頁</Button><Button variant='outline-primary' href='/CharacterShop'>選擇腳色</Button>
                <span >選擇關卡</span>
                </h1></Row>
            <Row className="justify-content-md-center">
            <Col style={this.getStyle(0)}>
            <Dialog say={["安安","2","3"]} title='第一關'disabled={true} onClick={()=>this.play(0)}></Dialog>
            </Col>
            <Col style={this.getStyle(1)}>
            <Dialog say={["安安","2","3"]} title='第二關' disabled={this.lock>=1}onClick={()=>this.play(1)}></Dialog>
            </Col>
            <Col style={this.getStyle(2)}>
            <Dialog say={["安安","2","3"]} title='第三關' disabled={this.lock>=2}onClick={()=>this.play(2)}></Dialog>
            </Col >
            </Row>
           
            </Container>;
    }
    play(level){
        localStorage.setItem("level",level)
        let playercharacterlist=['傑哥','王世堅','柯文哲','韓國瑜']
        let enemylist=['王世堅','柯文哲','韓國瑜']
        let chr=['','小弟1','','小弟2']
        let hplist=[200,50,400,450]
        let atklist=[[50,20],[50,30],[30,20],[40,40]]
        let skill=[1,0,2,0]
        let HP=[200,200,200,200]
        let ATK=[[50,20],[50,20],[50,20],[50,20]]
        chr[0]=playercharacterlist[Number(localStorage.getItem("character"))]
       
        if(level==0){
            console.log("level 0")
            chr[2]=enemylist[0]
            ATK[2]=atklist[1]
            HP[2]=hplist[1]
            skill[2]=2
            localStorage.setItem("characterName",JSON.stringify(chr))
            localStorage.setItem("skill",JSON.stringify(skill))
            localStorage.setItem("HP",JSON.stringify(HP))
            localStorage.setItem("ATK",JSON.stringify(ATK))
            //TODO
        }else if(level==1){
            console.log("level 1")
            chr[2]=enemylist[1]
            ATK[2]=atklist[2]
            HP[2]=hplist[2]
            skill[2]=3
            localStorage.setItem("characterName",JSON.stringify(chr))
            localStorage.setItem("skill",JSON.stringify(skill))
            localStorage.setItem("HP",JSON.stringify(HP))
            localStorage.setItem("ATK",JSON.stringify(ATK))
        }else if (level==2){
            console.log("level 2")
            chr[2]=enemylist[2]
            ATK[2]=atklist[3]
            HP[2]=hplist[3]
            skill[2]=4
            localStorage.setItem("characterName",JSON.stringify(chr))
            localStorage.setItem("skill",JSON.stringify(skill))
            localStorage.setItem("HP",JSON.stringify(HP))
            localStorage.setItem("ATK",JSON.stringify(ATK))
        }
    }
}
export default Level
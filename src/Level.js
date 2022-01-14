import React, { Component } from 'react';
import Stack from 'react-bootstrap/Stack';
import Dialog from './Dialog';
import Button from 'react-bootstrap/Button';
class Level extends Component{
    constructor(props){
        super(props)
        if(localStorage.getItem("lock")==null){
            localStorage.setItem("lock",0)
        }
        this.lock=localStorage.getItem("lock")
    }
    render(){
        return <div>
            <Dialog say={["安安","2","3"]} title='第一關' onClick={()=>this.play(0)}></Dialog>
            <Dialog say={["安安","2","3"]} title='第二關' disabled={this.lock>=1}onClick={()=>this.play(1)}></Dialog>
            <Dialog say={["安安","2","3"]} title='第三關' disabled={this.lock>=2}onClick={()=>this.play(2)}></Dialog>
            </div>;
    }
    play(level){
        localStorage.setItem("level",level)
        let playercharacterlist=['傑哥','王世堅','柯文哲','韓國瑜']
        let enemylist=['王世堅','柯文哲','韓國瑜']
        let chr=['','','小弟1','小弟2']
        let hplist=[200,50,400,450]
        let atklist=[[50,20],[50,30],[30,20],[40,40]]
        let skill=[0,0,0,0]
        let HP=[200,200,200,200]
        let ATK=[[50,20],[50,20],[50,20],[50,20]]
        chr[0]=playercharacterlist[Number(localStorage.getItem("character"))]
       
        if(level==0){
            console.log("level 0")
            chr[1]=enemylist[0]
            ATK[1]=atklist[1]
            HP[1]=hplist[1]
            skill[1]=1
            localStorage.setItem("characterName",JSON.stringify(chr))
            localStorage.setItem("skill",JSON.stringify(skill))
            localStorage.setItem("HP",JSON.stringify(HP))
            localStorage.setItem("ATK",JSON.stringify(ATK))
            //TODO
        }else if(level==1){
            console.log("level 1")
            chr[1]=enemylist[1]
            ATK[1]=atklist[2]
            HP[1]=hplist[2]
            skill[1]=2
            localStorage.setItem("characterName",JSON.stringify(chr))
            localStorage.setItem("skill",JSON.stringify(skill))
            localStorage.setItem("HP",JSON.stringify(HP))
            localStorage.setItem("ATK",JSON.stringify(ATK))
        }else if (level==2){
            console.log("level 2")
            chr[1]=enemylist[2]
            ATK[1]=atklist[3]
            HP[1]=hplist[3]
            skill[1]=3
            localStorage.setItem("characterName",JSON.stringify(chr))
            localStorage.setItem("skill",JSON.stringify(skill))
            localStorage.setItem("HP",JSON.stringify(HP))
            localStorage.setItem("ATK",JSON.stringify(ATK))
        }
    }
}
export default Level
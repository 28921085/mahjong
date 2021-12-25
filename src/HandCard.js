import React, { Component } from 'react';
import Card from './Card'
import ReactDOM from 'react-dom';
class HandCard extends Component{
    state = {
        have: this.have
      }
     
    constructor(top,props){
        super(props)
        console.log(props)
        this.dictionary=["1W","2W","3W","4W","5W","6W","7W","8W","9W","1T","2T","3T","4T","5T","6T","7T","8T","9T","1S","2S","3S","4S","5S","6S","7S","8S","9S","DONG","NAN","XI","BEI","ZHONG","FA","BAI","space"];
        this.list=[]//display
        this.have=[]//old card
        this.haveID=[]//no use
        this.num=[]//count card
        this.showlist=[]//亮搭
        this.listenList=[]//聽牌名單
        this.alone=[]//孤張指數 電腦打牌用
        for(let i=0;i<34;i++){
            this.num.push(0);
            this.alone.push(0);
        }
        this.playernum=props//who 打牌
        this.top=top
        this.state={
            have: this.have,
            key:this.playernum
        }
        console.log('player='+this.playernum)
    }
    
    setHave(input){
        this.have.push(input)
    }
   remove(card){//card!=index     is distionary id
        console.log("打出"+this.dictionary[card])
    //    console.log(this.have)
        this.num[card]--
       this.have.splice(this.have.indexOf(card),1)
       console.log(this.have)
       this.setState({
        have: this.have,
        key:this.playernum
    })
    // this.forceUpdate()
    }
    generate_listenlist(){
        let al=[]
        for(let i=0;i<34;i++)
            al.push(0)
        let has=0
        let num=this.num;
        let mxlen=(this.have.length-1)/3
        console.log("mxlen="+mxlen)
        function ifwin(n) {//第幾個對子
            //一次取一個順子或刻子
            if (n == mxlen)
                has = 1;
            if (has)
                return;
            for (let i = 0; i < 9; i++) {
                if (num[i] > 2) {
                    num[i] -= 3;
                    al[i]-=3
                    ifwin(n + 1);
                    num[i] += 3;
                }
                else if (num[i] > 1)
                    al[i] -= 1;
                if (i < 7 && num[i] && num[i + 1] && num[i + 2]) {
                    num[i]--;
                    num[i + 1]--;
                    num[i + 2]--;
                    al[i]--
                    al[i+1]--
                    al[i+2]--
                    ifwin(n + 1);
                    num[i]++;
                    num[i + 1]++;
                    num[i + 2]++;
                }
                else if (i < 8 && num[i] && num[i + 1]) {
                    al[i]--;
                    al[i + 1]--;
                }
            }
            if (has)
                return;
            for (let i = 9; i < 18; i++) {
                if (num[i] > 2) {
                    num[i] -= 3;
                    al[i]-=3
                    ifwin(n + 1);
                    num[i] += 3;
                }
                else if (num[i] > 1)
                    al[i] -= 1;
                if (i < 16 && num[i] && num[i + 1] && num[i + 2]) {
                    num[i]--;
                    num[i + 1]--;
                    num[i + 2]--;
                    al[i]--
                    al[i+1]--
                    al[i+2]--
                    ifwin(n + 1);
                    num[i]++;
                    num[i + 1]++;
                    num[i + 2]++;
                }
                else if (i < 17 && num[i] && num[i + 1]) {
                    al[i]--;
                    al[i + 1]--;
                }
            }
            if (has)
                return;
            for (let i = 18; i < 27; i++) {
                if (num[i] > 2) {
                    num[i] -= 3;
                    al[i]-=3;
                    ifwin(n + 1);
                    num[i] += 3;
                }
                else if (num[i] > 1)
                    al[i] -= 1;
                if (i < 25 && num[i] && num[i + 1] && num[i + 2]) {
                    num[i]--;
                    num[i + 1]--;
                    num[i + 2]--;
                    al[i]--
                    al[i+1]--
                    al[i+2]--
                    ifwin(n + 1);
                    num[i]++;
                    num[i + 1]++;
                    num[i + 2]++;
                }
                else if (i < 26 && num[i] && num[i + 1]) {
                    al[i]--;
                    al[i + 1]--;
                }
            }
            if (has)
                return;
            for (let i = 27; i < 34; i++) {
                if (num[i] >= 3) {
                    num[i] -= 3;
                    al[i]-=3
                    ifwin(n + 1);
                    num[i] += 3;
                }
                else if (num[i] > 1)
                    al[i] -= 1;
            }
            for (let i = 0; i < 34; i++)
                 al[i] += num[i];
        }
        function solve(dat){
            //init
            num=dat;
            has=0
            //generate listen list
            let listen=[];//聽牌
            for(let i=0;i<34;i++){//每種牌都放一次
                if(num[i]==4)
                    continue;
                num[i]++;
                for (let j = 0; j < 34; j++) {//拔掉眼睛
                    if (num[j] > 1) {
                        num[j] -= 2;
                        ifwin(0);
                        num[j] += 2;
                    }
                }
                num[i]--;
                if (has) {//如果能湊成5個順子或刻子
                    has = 0;
                    listen.push(i);
                }
            }
            return listen;//把聽牌名單傳回去
        }
        this.alone=al
        this.listenList=solve(num);
    }   
    AI_remove(){
        let mx=0;
        for(let i=0;i<34;i++)
            if(this.alone[i]>this.alone[mx])
                mx=i;
        console.log(this.alone)
        console.log("打出"+this.mx)
        return mx;
    }
//    transform: rotate(45deg);
    
    render(now){
        
        this.list=[]
        this.list.push(<div/>);
        for(let i=0;i<this.showlist.length;i++){
            this.list.push(<Card id={"player"+this.playernum} disable={true} key={i+Math.random() }card={this.showlist[i]} playernum={this.playernum}  top={this.top}/>)
             
         }
         this.list.push(<br/>)
         for(let i=0;i<this.have.length;i++){
            //  console.log(<Card  key={this.have[i] }card={this.have[i]} playernum={this.playernum}  top={this.top}/>)
             this.list.push(<Card id={"player"+this.playernum} disable={!(now==this.playernum)} key={i+Math.random() }card={this.have[i]} playernum={this.playernum}  top={this.top}/>)
             
         }
         this.list.push(<br/>)
         this.list.push(<br/>)
         
         this.setState({
             have: null
         })
           return [this.list ];
        
    }

}
export default HandCard;
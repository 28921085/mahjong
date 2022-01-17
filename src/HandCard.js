import React, { Component } from 'react';
import Card from './Card'
import ReactDOM from 'react-dom';
class HandCard extends Component{
    state = {
        have: this.have
      }
     
    constructor(top,props,ID){
        super(props)
        console.log(props)
        this.dictionary=["1W","2W","3W","4W","5W","6W","7W","8W","9W","1T","2T","3T","4T","5T","6T","7T","8T","9T","1S","2S","3S","4S","5S","6S","7S","8S","9S","DONG","NAN","XI","BEI","ZHONG","FA","BAI","space"];
        this.list=[]//display
        this.have=[]//old card
        this.haveID=[]//no use
        this.num=[]//count card
        this.skillID=ID
        this.cover=[]
        this.show=false
        //this.skillID=4//韓國榆
        this.showlist=[]//亮搭
        this.cover=[]//判斷要不要蓋
        this.listenList=[]//聽牌名單
        this.alone=[]//孤張指數 電腦打牌用
        this.ker=[]//幾個刻子 判斷聽牌用 (手牌)
        this.canATK=0//可以攻擊
        this.beATK=0//會被攻擊
        for(let i=0;i<34;i++)
            this.ker.push(0)
        this.dark_ker=0//因暗槓產生的刻子
        this.ming_ker=0//因碰 名槓產生的刻子
        this.playername="AI"
        for(let i=0;i<34;i++){
            this.num.push(0);
            this.alone.push(0);
        }
        this.ATK_base=0;//底
        this.ATK_add=0;//台
        this.HP=0;//攻擊力and 血量
        this.playernum=props//who 打牌
        this.top=top
        this.dsiable=top.disable
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
        /*console.log("打出前")
        console.log(this.num)
        console.log(this.have)*/
        this.num[card]--
        //console.log("打出後")
       // console.log(this.num)
       this.have.splice(this.have.indexOf(card),1)
       //console.log(this.have)
       this.setState({
        have: this.have,
        key:this.playernum
    })
    // this.forceUpdate()
    }
    generate_listenlist(){
        let has=0
        let num=this.num;
        let kkker=[]
        for(let i=0;i<34;i++)
            kkker.push(0)
        let mxlen=(this.have.length-1)/3
        let nowcard=0;
        console.log("mxlen="+mxlen)
        function ifwin(n,kker) {//第幾個對子 有幾個刻子
            //一次取一個順子或刻子
            if (n == mxlen){
                has = 1;
                kkker[nowcard]=Math.max(kker,kkker[nowcard])
            }
            if (has)
                return;
            for (let i = 0; i < 9; i++) {
                if (num[i] > 2) {
                    num[i] -= 3;
                    ifwin(n + 1,kker+1);
                    num[i] += 3;
                }
                if (i < 7 && num[i] && num[i + 1] && num[i + 2]) {
                    num[i]--;
                    num[i + 1]--;
                    num[i + 2]--;
                    ifwin(n + 1,kker);
                    num[i]++;
                    num[i + 1]++;
                    num[i + 2]++;
                }
            }
            if (has)
                return;
            for (let i = 9; i < 18; i++) {
                if (num[i] > 2) {
                    num[i] -= 3;
                    ifwin(n + 1,kker+1);
                    num[i] += 3;
                }
                if (i < 16 && num[i] && num[i + 1] && num[i + 2]) {
                    num[i]--;
                    num[i + 1]--;
                    num[i + 2]--;
                    ifwin(n + 1,kker);
                    num[i]++;
                    num[i + 1]++;
                    num[i + 2]++;
                }
            }
            if (has)
                return;
            for (let i = 18; i < 27; i++) {
                if (num[i] > 2) {
                    num[i] -= 3;
                    ifwin(n + 1,kker+1);
                    num[i] += 3;
                }
                if (i < 25 && num[i] && num[i + 1] && num[i + 2]) {
                    num[i]--;
                    num[i + 1]--;
                    num[i + 2]--;
                    ifwin(n + 1,kker);
                    num[i]++;
                    num[i + 1]++;
                    num[i + 2]++;
                }
            }
            if (has)
                return;
            for (let i = 27; i < 34; i++) {
                if (num[i] >= 3) {
                    num[i] -= 3;
                    ifwin(n + 1,kker+1);
                    num[i] += 3;
                }
            }
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
                nowcard=i;
                for (let j = 0; j < 34; j++) {//拔掉眼睛
                    if (num[j] > 1) {
                        num[j] -= 2;
                        ifwin(0,0);
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
        this.ker=kkker
        this.listenList=solve(num);
    }   
    generate_alone(){
        let al=[]
        for(let i=0;i<34;i++)
            al.push(0)
        let has=0
        let num=this.num;
        let mxlen=(this.have.length-2)/3
        console.log("mxlen="+mxlen)
        function ifwin(n) {//第幾個對子
            //一次取一個順子或刻子
            if (n == mxlen){
                has = 1;
                for(let i=0;i<34;i++)
                    if(num[i])
                        al[i]++;
            }
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
            for(let i=0;i<34;i++){//每種牌都放一次
                num[i]++;
                for (let j = 0; j < 34; j++) {//拔掉眼睛
                    if (num[j] > 1) {
                        num[j] -= 2;
                        ifwin(0);
                        num[j] += 2;
                    }
                }
                num[i]--;
            }
        }
        solve(num);
        this.alone=al
    }
    AI_remove(){
        this.generate_alone()
        for(let i=27;i<34;i++)
            this.alone[i]+=2;//大字加權
        for(let i=0;i<3;i++){
            this.alone[i*9]++;
            this.alone[i*9+8]++;//1 9(邊張) 加權
        }
        let mx=0;
        for(let i=0;i<34;i++)
            if(this.alone[i]>this.alone[mx])
                mx=i;
        console.log(this.alone)
        //console.log("打出"+this.mx)
        return mx;
    }
//    transform: rotate(45deg);
    
    render(now,playernum,disable=false){
        
        this.list=[]
        this.list.push(<div/>);
        for(let i=0;i<this.showlist.length;i++){
            if(this.cover[i]==1)
            this.list.push(<Card show={true}id={"player"+this.playernum} disable={true} key={i+Math.random() }card={this.showlist[i]} playernum={this.playernum}  top={this.top}/>)
             else{
                this.list.push(<Card show={false||this.show}id={"player"+this.playernum} disable={true} key={i+Math.random() }card={this.showlist[i]} playernum={this.playernum}  top={this.top}/>)
             
             }
         }
         this.list.push(<br/>)
         for(let i=0;i<this.have.length;i++){
            //  console.log(<Card  key={this.have[i] }card={this.have[i]} playernum={this.playernum}  top={this.top}/>)
             this.list.push(<Card show={this.show} id={"player"+this.playernum} disable={!(now==this.playernum)||disable} key={i+Math.random() }card={this.have[i]} playernum={this.playernum}  top={this.top}/>)
             
         }
         if(now==0&&playernum==0){
             this.list.push(<p class="log">輪到你瞜</p>)
         }
         else if(now==playernum){
            this.list.push(<p class="log">換他打牌</p>)
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
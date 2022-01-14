import React, { Component } from 'react';
import HandCard from './HandCard'
import Card from './Card'
import mp3 from './sleep.mp3'
import bgm from './進關.mp3'
import bgm_listen from './聽牌.mp3'
import AutoScroll from './AutoScroll'
import FuncMenu from './FuncMenu';
import Container from 'react-bootstrap/Container';
import Background from './battle-background.png';
//import $ from 'jquery';
import Button from 'react-bootstrap/Button';
import { findRenderedDOMComponentWithClass } from 'react-dom/cjs/react-dom-test-utils.production.min';
import ScrollToBottom from 'react-scroll-to-bottom';
import { ButtonGroup } from 'react-bootstrap';
import Jay from './static/character/Jay.png';
import Wang from './static/character/Wang.jpg';
import KP from './static/character/KP.jpg';
import Han from './static/character/Han.png';
import Tsai from './static/character/Tsai.jpg';

class Game extends Component{
    constructor(props){
        super(props)
        this.dictionary=["1W","2W","3W","4W","5W","6W","7W","8W","9W","1T","2T","3T","4T","5T","6T","7T","8T","9T","1S","2S","3S","4S","5S","6S","7S","8S","9S","DONG","NAN","XI","BEI","ZHONG","FA","BAI","space"];
        this.storeNow=0;//保存現在輪到誰
        this.canDo=[];
        this.player=[new HandCard(this,0,0),new HandCard(this,1,0),new HandCard(this,2,0),new HandCard(this,3,0)]
        this.allCard=[]
        this.playernum=props.playernum
        this.current=0;
        this.now=0;
        this.game_end=0;
        this.kan=-1
        this._kan=-1//暗槓
        this.pon=-1
        this.eat=-1
        this.win=-1
        this.show=0;
        this.showEat=0;
        this.tempNow=0;
        this.showKan=0;
        this.playerKan=[]
        this.whoIsListen=[0,0,0,0]
        this.hasKaned=[]
        this.music_switch=1
        this.MIGI=1
        this.disable=false
        this.result=[]//結算畫面
        
        this.lastcard=34//上一個人打的牌
        this.game_record="遊戲開始\n"
        for(let i=0;i<34;i++)
            this.hasKaned.push(0)
        this.state={
            change:true,
            showFuncMenu:false
        }
        this.ended=true
        this.allCard=[]
        this.dropedCard=[]
        //設定牌
        this.music_bgm=new Audio(bgm)
        this.music_bgm.loop=true
        this.music_bgm.play()



        for(let j=0;j<4;j++){
            for(let i=0;i<34;i++){
                this.allCard[i*4+j]=i;
            }
        }
         for(let i=0;i<136;i++){//洗牌
             let idx=Math.floor(Math.random()*136);
             [this.allCard[i],this.allCard[idx]]=[this.allCard[idx],this.allCard[i]];//swap
         }
           /*this.allCard=[27,27,27,28,28,28,29,29,29,30,30,30,31,31,7,32,
            1,2,3,4,5,6,7,7,9,1,2,3,4,5,6,31,
            1,1,2,3,8,8,8,8,0,1,2,3,4,5,31,9,
            32,11,12,13,14,15,16,17,10,11,12,13,14,15,16,17,
            33,27,28,29,30,32,22,21,20,21,23,32,24,15,15]//測試case用*/
  //   this.player[0].skillID=4//韓國瑜
  //  this.player[1].skillID=3//柯文哲
        let allHP=[250,200,50,400,450,1000]
        let allATK_base=[50,50,50,30,40,100] 
        let allATK_add=[10,20,30,20,40,50]
        let characterName=JSON.parse(localStorage.getItem("characterName"))
        console.log("charaname"+characterName)
        let skill=JSON.parse(localStorage.getItem("skill"))
        console.log("skill"+skill)
        for(let setLocal=0;setLocal<4;setLocal++){
            this.player[setLocal].playername=characterName[setLocal]
            this.player[setLocal].skillID=skill[setLocal]
            this.player[setLocal].HP=allHP[skill[setLocal]]
            this.player[setLocal].ATK_base=allATK_base[skill[setLocal]]
            this.player[setLocal].ATK_add=allATK_add[skill[setLocal]]
            console.log("skillID="+this.player[setLocal].skillID)
        }
        
        
        this.headpic=[]
        
       this.headpic.push(Jay)
       this.headpic.push(Jay)//ID=0暫時是結哥
       this.headpic.push(Wang)
       this.headpic.push(KP)
       this.headpic.push(Han)
       this.headpic.push(Tsai)
        
        
        for(let j=0;j<4;j++){
            for(let i=0;i<16;i++){
                //純換牌操作
                if(this.player[j].skillID==4){//國榆
                    let skill=Math.floor(Math.random()*10)
                    let target=[18,19,20,21,22,23,24,25,26,32]//1S-9S FA
                    let index=this.find_these_card(target)
                    if(skill<7&&index!=-1){
                        console.log("高雄發大財技能發動")
                        this.switch_card(index)
                    }
                    else
                        console.log("高雄發大財發動失敗")

                }
                else if(this.player[j].skillID==3){//柯文哲
                    let skill=Math.floor(Math.random()*10)

                    let target=[9,10,11,12,13,14,15,16,17,27,28,29,30,31,33]//1T-9T 發以外字牌
                    let index=this.find_these_card(target)
                    if(skill<7&&index!=-1){
                        console.log("垃圾不分藍綠技能發動")
                        this.switch_card(index)
                    }
                    else
                        console.log("垃圾不分藍綠發動失敗")

                }
                //抽牌
                this.player[j].haveID.push(this.current)
                this.player[j].num[this.allCard[ this.current]]++
                this.player[j].have.push(this.allCard[ this.current++])
            }
            this.player[j].have.sort(function(a,b){
                return a-b;
            })
            this.player[j].generate_listenlist()
        }
        //抽牌




        this.draw()

    }
    refresh(str){
        //let tar=document.getElementById("gamelog")

        this.game_record+=str
        //tar.scrollTop = tar.scrollHeight;
    }
    printAll(){
        let all=[]
        let now=64;
        for(let j=0;j<4;j++){

            all.push(this.player[j].render())

            all.push(<br/>)
        }
        for(let k=now;k<this.allCard.length;k++){
            all.push(<Card card={this.allCard[k]}/>)
        }
        return all
    }
    printArrayCard(array,start=0,who=0){
        let all=[]
        for(let k= start;k<array.length;k++){
            all.push(<Card key={Math.random()}show={0} playernum={who} card={array[k]}/>)
        }
        return all
    }
    //ex:碰7萬之後 自己在摸到一張7萬
    light_kan(){//明槓

        let kanlist=[];//可能一回合槓很多次
        //找亮搭的堆 如果手牌中有一張牌已經碰過
        let tmp=this.player[this.now].showlist
        let tmp2=this.player[this.now].have
        for(let i=2;i<tmp.length;i++){
            if(tmp[i]==tmp[i-1]&&tmp[i]==tmp[i-2]){
                for(let j=0;j<tmp2.length;j++){
                    if(tmp2[j]==tmp[i]){
                        kanlist.push(tmp[i])
                        break;
                    }
                }
            }
        }
        if(kanlist.length==0)
            return -1;
        if(this.now==0){
            for(let i=0;i<kanlist.length;i++){
                let tmp=[]
                if(this.hasKaned[kanlist[i]]==0){
                    console.log("++++++++")
                    this.hasKaned[kanlist[i]]=1
                    tmp[0]=kanlist[i]
                    tmp[1]=1
                    this.playerKan.push(tmp)
                }
            }
            return 0;
        }
        else
            return kanlist[0];
    }
    dark_kan(){//暗槓
        let kanlist=[];//一回合可能槓很多次 選擇要槓哪張

        for(let i=0;i<34;i++){
            if(this.player[this.now].num[i]==4)
                kanlist.push(i);
        }
        if(kanlist.length==0)//無牌可槓
            return -1;
        if(this.now==0){
            for(let i=0;i<kanlist.length;i++){
                let tmp=[]
                if(this.hasKaned[kanlist[i]]==0){
                    console.log("-------")
                    this.hasKaned[kanlist[i]]=1
                    tmp[0]=kanlist[i]
                    tmp[1]=0
                    this.playerKan.push(tmp)
                }
            }
            return 0;
        }
        else
            return kanlist[0]; //槓哪一張
    }

    find_these_card(card){//card 為陣列
        for(let i=this.current+1;i<this.allCard.length;i++){
            for(let j=0;j<card.length;j++){
                if(this.allCard[i]==card[j])
                    return i;
            }
        }
        return -1
    }
    switch_card(index){
        [this.allCard[this.current],this.allCard[index]]=[this.allCard[index],this.allCard[this.current]]
        console.log(this.dictionary[this.allCard[this.current]]+"被換到了前面")
    }
    draw(){
        this.refresh(this.player[this.now].playername+"抽牌\n")
        this.player[this.now].generate_listenlist()
        if(this.now==0){
            if(this.player[0].listenList.length&&this.music_switch){
                this.music_switch=0
                this.music_bgm.pause()
                this.music_bgm=new Audio(bgm_listen)
                this.music_bgm.loop=true
                this.music_bgm.play()
            }
        }
        this.setState({
            change:true
        })
        if(this.allCard.length-this.current==16){//16
            window.alert("流局 遊戲結束")
            this.refresh("流局 遊戲結束")
            this.game_end=1;
            //結算
            this.setState({
                change:false
             })
            return;
        }
        if(this.player[this.now].skillID==4){//國榆
            let skill=Math.floor(Math.random()*10)
            let target=[18,19,20,21,22,23,24,25,26,32]//1S-9S FA
            let index=this.find_these_card(target)
            if(skill<7&&index!=-1){
                console.log("高雄發大財技能發動")
                this.refresh("高雄發大財技能發動\n")
                this.switch_card(index)
            }
            else
                console.log("高雄發大財發動失敗")

        }
        else if(this.player[this.now].skillID==3){//柯文哲
            let skill=Math.floor(Math.random()*10)

            let target=[9,10,11,12,13,14,15,16,17,27,28,29,30,31,33]//1T-9T 發以外字牌
            let index=this.find_these_card(target)
            if(skill<7&&index!=-1){
                console.log("垃圾不分藍綠技能發動")
                this.refresh("垃圾不分藍綠技能發動\n")
                this.switch_card(index)
            }
            else
                console.log("垃圾不分藍綠發動失敗")

        }
        console.log("剩"+(this.allCard.length-this.current).toString()+"張牌")
        console.log("玩家"+this.now.toString()+"抽")
        let card=this.allCard[this.current]
        this.player[this.now].num[card]++//num++
        this.player[this.now].have.push(this.allCard[this.current++])
        //judge kan win
        this.win=this.self_win(card)
        this.kan=this.light_kan()
        this._kan=this.dark_kan()
        console.log(this.win+"545")
        this.doPlayerCanDo(card,()=>{
            console.log(this.win)
            if(this.win!=-1){
                //window.alert("玩家"+this.now.toString()+"自摸 遊戲結束")
                this.refresh("玩家"+this.now.toString()+"胡牌 遊戲結束"+"\n")
                let loglist=this.calculate_reward(card,this.now)

                for(let i=0;i<loglist.length;i++)
                    this.refresh(loglist[i]+"\n")
                this.game_end=1
                this.show_result(loglist)
                this.setState({
                    change:false
                 })
                
                //結算畫面
            }
            else if(this.kan!=-1){
                this.player[this.now].remove(this.kan)
                this.player[this.now].showlist.push(this.kan)
                this.player[this.now].cover.push(1)
                this.refresh(this.player[0].playername+"明槓\n")
                this.MIGI=0
                this.player[this.now].generate_listenlist()
                console.log("玩家聽"+this.player[this.now].listenList)
                this.draw()
            }
            else if(this._kan!=-1){
                for(let i=0;i<4;i++){
                    this.player[this.now].remove(this._kan)
                    this.player[this.now].showlist.push(this._kan)
                    this.player[this.now].cover.push(0)
                }
                this.player[this.now].dark_ker++;
                this.player[this.now].generate_listenlist()
                this.refresh(this.player[this.now].playername+"暗槓\n")
                this.MIGI=0
                console.log("玩家聽"+this.player[this.now].listenList)
                this.draw()
            }

        })

    }


    someone_can_pon(card){//碰

        let n=this.now;
         let ans=-1;//無人能碰
         for(let i=0;i<4;i++)
             if(n!=i&&this.player[i].num[card]>=2)//不能碰自己&該牌>=2
                 ans=i;
         /*if(ans==0){//玩家決定要不要碰
            if(this.kan!=-1)
                return -1;
            //  let reply=window.prompt("要碰嗎?(0=不碰 else=碰)","0");


         }*/
         return ans;
    }

    someone_can_kan(card){//槓

        let n=this.now
        let next=(n+1)%4;
        let ans=-1;
        for(let i=0;i<4;i++)
            if(i!=n&&i!=next&&this.player[i].num[card]==3)//不能槓自己跟上家
                ans= i;
        // if(ans==0){
        //     // let reply=window.prompt("要槓嗎?(0=不槓 else=槓)","0");

        // }
        return ans;//哪一家槓牌
    }

    next_can_eat(card){//吃

        let n=this.now
        let i=(n+1)%4;//下家
        let type=-1 // eat n return 0 = n-1 n-2  1 = n-1 n+1  2 = n+1 n+2
        this.k=[];
        let str=[]
        let tmp=this.player[i].num
        this.k[0]=0
        this.k[1]=0
        this.k[2]=0
        this.eatCard=[]
        str[0]="不吃 "
        str[1]="不吃 "
        str[2]="不吃 "
        //字牌不處理 n 吃 n-1 n-2
        if(card<27&&card%9>1&&tmp[card-2]>0&&tmp[card-1]>0){
            this.k[0]=1
            this.eatCard[0]=[card-2,card-1]
            str[0]=this.dictionary[card-2]+this.dictionary[card-1]
            console.log("can eat type = 0")
            console.log(str[0])
        }
        // n 吃 n-1 n+1
        if(card<27&&card%9>0&&card%9<8&&tmp[card+1]>0&&tmp[card-1]>0){
            this.k[1]=1;
            this.eatCard[1]=[card-1,card+1]
            str[1]=this.dictionary[card-1]+this.dictionary[card+1]
            console.log("can eat type = 1")
        }
        // n 吃 n+1 n+2
        if(card<27&&card%9<7&&tmp[card+1]>0&&tmp[card+2]>0){
            this.k[2]=1
            this.eatCard[2]=[card+1,card+2]
            str[2]=this.dictionary[card+1]+this.dictionary[card+2]
            console.log("can eat type = 2")
        }
        if(i==0&&(this.k[0]||this.k[1]||this.k[2])){
            return 0;
            // let reply=window.prompt("要吃哪一種?(1: "+str[0]+" 2: "+str[1]+" 3: "+str[2] +" else=不吃)","0");
            // console.log(reply)
            // if(reply=="0")
            //     type=-1;
            // else if(reply=="1"&&str[0]!="不吃 ")
            //     type=0
            // else if(reply=="2"&&str[1]!="不吃 ")
            //     type=1
            // else if(reply=="3"&&str[2]!="不吃 ")
            //     type=2
            // else
            //     type=-1
        }
        else{
            for(let j=0;j<3;j++)
                if(this.k[j])
                    type=j
        }
        return type
    }
    someone_can_win(card){//放槍 目前沒一砲多響 會自動胡牌 搶槓還沒寫
        for(let i=1;i<4;i++){
            let n=(this.now+i)%4
            for(let j=0;j<this.player[n].listenList.length;j++){
                if(card==this.player[n].listenList[j])
                    return n
            }
        }
        return -1
    }
    self_win(card){//自摸 無過水
        for(let i=0;i<this.player[this.now].listenList.length;i++){
            if(card==this.player[this.now].listenList[i])
                return this.now
        }
        return -1
    }
    showFuncMenu(canDo,card){
        // canDo,doEat,doPon,doKan,doWin
        console.log(canDo)
        this.canDo=canDo
        this.show=1
        this.disable=true
        this.setState({
            change:Math.random(),
            showFuncMenu:true,
            card:card
         })
    }
    playerCan(card){//偵測玩家是否可以吃碰槓胡
        let canDo=[0,0,0,0];//分別代表 吃 碰 槓 胡
        /*if(this.next_can_eat(card)==0&&this.now==3){//TODO
            canDo[0]=1;
        }
        if(this.someone_can_pon(card)==0){
            canDo[1]=1;
        }
        if(this.someone_can_kan(card)==0){
            canDo[2]=1;
        }
        if(this.someone_can_win(card)==0){
            canDo[3]=1;
        }*/
        if(this.eat!=-1&&this.now==3){//TODO
            canDo[0]=1;
        }
        console.log("this.pon"+this.pon)
        if(this.pon==0){
            canDo[1]=1;
        }
        if(this.kan==0){//ming_kan
            canDo[2]=1;
            //console.log("this.kan="+this.kan)
        }
        else if(this.now==0&&this.playerKan.length){//dark kan
            //console.log("this.playerkan="+this.playerKan)
            canDo[2]=1;

        }
        if(this.win==0){
            canDo[3]=1;
        }
        this.setState({
            change:true
        })
        console.log(canDo)
        if(canDo[0]==0&&canDo[1]==0&&canDo[2]==0&&canDo[3]==0)
        return null
        else
        return canDo;
    }
    doPlayerCanDo(card,func){//看看玩家能不能吃碰槓胡，不能的話繼續流程
        
        this.tempNow=this.now;
        let canDo=this.playerCan(card)//偵測玩家能不能吃碰槓胡
        console.log("show="+this.show)
        if(canDo){//如果可以
            console.log("玩家可以"+canDo)
            this.showFuncMenu(canDo,card,this,func);//叫出選單供玩家選擇
            this.player[0].generate_listenlist()
            if(this.now==0){
                if(this.player[0].listenList.length&&this.music_switch){
                    this.music_switch=0
                    this.music_bgm.pause()
                    this.music_bgm=new Audio(bgm_listen)
                    this.music_bgm.loop=true
                    this.music_bgm.play()
                }
            }
        }else{
            console.log("玩家不行"+canDo)
            func();//不行的話往下執行
        }
    }

    showChooseEat(){
        this.showEat=1
        this.setState({
            change:true
        })
    }

     doEat(){

        console.log("玩家選擇吃");
        this.showChooseEat();

        //TODO
    }
    Eat(){
        if(this.showEat==1){
            return  [this.k[0]?[<Card playernum={0} show={true} disable={false} func={()=>this.doEatCard(0)} card={this.eatCard[0][0]}/>,<Card playernum={0} show={true} disable={false} func={()=>this.doEatCard(0)} card={this.eatCard[0][1]}/>]:"",
            this.k[1]?[<Card playernum={0} show={true} disable={false} func={()=>this.doEatCard(1)} card={this.eatCard[1][0]}/>,<Card playernum={0} show={true} disable={false} func={()=>this.doEatCard(1)} card={this.eatCard[1][1]}/>]:"",
            this.k[2]?[<Card playernum={0} show={true} disable={false} func={()=>this.doEatCard(2)} card={this.eatCard[2][0]}/>,<Card playernum={0} show={true} disable={false} func={()=>this.doEatCard(2)} card={this.eatCard[2][1]}/>]:""
        ]
        }else{
            return <div></div>
        }
    }
    doEatCard(choice){
        let discard=this.state.card
                    if(choice==0){
                        this.player[0].remove(discard-2)
                        this.player[0].showlist.push(discard-2)
                        this.player[0].cover.push(1)
                        //this.player[this.now].remove(discard)
                        this.player[0].showlist.push(discard)
                        this.player[0].cover.push(1)
                        this.player[0].remove(discard-1)
                        this.player[0].showlist.push(discard-1)
                        this.player[0].cover.push(1)
                    }
                    else if(choice==1){
                        this.player[0].remove(discard-1)
                        this.player[0].showlist.push(discard-1)
                        this.player[0].cover.push(1)
                        //this.player[this.now].remove(discard)
                        this.player[0].showlist.push(discard)
                        this.player[0].cover.push(1)
                        this.player[0].remove(discard+1)
                        this.player[0].showlist.push(discard+1)
                        this.player[0].cover.push(1)
                    }
                    else if(choice==2){
                        this.player[0].remove(discard+1)
                        this.player[0].showlist.push(discard+1)
                        this.player[0].cover.push(1)
                       //this.player[this.now].remove(discard)
                        this.player[0].showlist.push(discard)
                        this.player[0].cover.push(1)
                        this.player[0].remove(discard+2)
                        this.player[0].showlist.push(discard+2)
                        this.player[0].cover.push(1)
                    }
                    this.refresh(this.player[this.now].playername+"吃\n")
                    this.MIGI=0
                    this.canDo=[0,0,0,0]
        this.showEat=false
        this.show=false
        this.now=0
        this.disable=false
        this.setState({
            change:true
        })
    }
    Kan(){
        if(this.showKan==1){
            console.log("in Kan()")
            let temp=[]

            for(let i=0;i<this.playerKan.length;i++){
                //
                for(let j=0;j<4;j++){
                    temp.push(<Card playernum={0} key={Math.random()} show={true} disable={false} func={()=>this.doChooseKan(this.playerKan[i][0],this.playerKan[i][1])} card={this.playerKan[i][0]}/>)

                }

             }


        if(temp!=[])
            return temp
        return  <div></div>

        }else{
            return <div></div>
        }
    }
    doPon(){
        console.log("玩家選擇碰");
        for(let i=0;i<3;i++){//刪兩張，顯示三張
            if(i!=0)
                this.player[0].remove(this.state.card);
            this.player[0].showlist.push(this.state.card)
            this.player[0].cover.push(1)
        }

        this.player[0].ming_ker++;
        this.refresh(this.player[0].playername+"碰\n")
        this.MIGI=0
        this.canDo=[0,0,0,0]
        this.disable=false
        this.show=false
        this.now=0

        this.setState({
            change:true
        })
    }
    doChooseKan(card,type){
        console.log(card)

        if(type==0){//暗槓
            for(let i=0;i<4;i++){
                this.player[0].remove(card)
                this.player[0].showlist.push(card)
                this.player[0].cover.push(0)
            }
        }
        else{
            this.player[0].remove(card)
            this.player[0].showlist.push(card)
            this.player[0].cover.push(1)
        }
        this.pon=-1
        this.eat=-1
        this.player[0].dark_ker++;
        if(type==0)
            this.refresh(this.player[this.now].playername+"暗槓\n")
        else
            this.refresh(this.player[this.now].playername+"明槓\n")
        this.MIGI=0
        console.log(this.playerKan)
        let tmpnew=[]
        for(let i=0;i<this.playerKan.length;i++)
            if(card!=this.playerKan[i][0])
                tmpnew.push(this.playerKan[i])
        this.playerKan=tmpnew
        //this.playerKan.splice(this.playerKan.indexOf(card),1)
        this.canDo=[0,0,0,0]
        this.show=0
        this.disable=false
        console.log(this.playerKan)
        console.log( this.player[0])
        if(this.playerKan.length!=0){

        }else{
            this.showKan=0
        }
        this.now=0
        
        this.draw();

        

        this.setState({
            change:true
        })
    }
    doKan(){
        this.setState({
            change:true
        })
        if(this.playerKan.length!=0){
            console.log("按下槓")
            this.showKan=1;
            this.setState({
                change:true
            })

        }else if(this.kan!=-1){
            let discard=this.state.card
            console.log("玩家選擇槓");
            for(let i=0;i<4;i++){//刪三張，顯示四張
                if(i!=0)
                    this.player[0].remove(discard)
                this.player[0].showlist.push(discard)
                this.player[0].cover.push(1)
            }
            console.log(this.player[0].num)
            this.showKan=0
            this.refresh(this.player[0].playername+"槓\n")
            this.MIGI=0
            this.player[0].ming_ker++;
            this.canDo=[0,0,0,0]
            this.show=false
            this.now=0
            this.disable=false
            this.draw()
            this.setState({
                change:true
            })

            if(this.game_end)
                return;
        }



    }
    doWin(){
        this.canDo=[0,0,0,0]
        this.show=false
        console.log("玩家選擇胡");
        this.refresh(this.player[0].playername+"胡牌 遊戲結束\n")
        let loglist=this.calculate_reward(this.state.card,0)
            for(let i=0;i<loglist.length;i++)
                console.log(loglist[i])
        this.game_end=1
        this.show_result(loglist)
        //window.alert("玩家"+this.win.toString()+"胡牌 遊戲結束")
        this.setState({
            change:false
         })

        //TODO
    }
    doCancel(){
        this.canDo=[0,0,0,0]
        this.show=false
        this.now=(this.tempNow+1)%4
        console.log("玩家選擇取消");
        this.showEat=false
        this.disable=false
        if(this.now){
            this.draw()
            this.botsent()
        }
        else {
            this.eat=-1
            this.pon=-1
            this.draw()
        }

        this.showKan=false
        this.setState({
            change:false
        })
    }
    //算台
    calculate_reward(card,who){//胡的那張牌 誰放槍
        let total=0,show=[],win=this.win;//win=誰胡牌
        let self=0,clear=0
        //自摸
        if(who==win){
            total++;
            show.push("自摸 1台")
            self=1
        }
        //門清
        console.log(win);
        if(this.player[win].showlist.length==0){
            total++;
            show.push("門清 1台")
            clear=1
        }
        //不求人
        if(self&&clear){
            total++;
            show.push("不求人 1台")
        }
        //單吊/獨聽  (邊張 中洞我懶得寫)
        if(this.player[win].listenList.length==1){
            total++
            show.push("獨聽 1台")
        }
        //*搶槓
        //*槓上開花
        //海底
        if(136-this.current==60){
            total++
            show.push("海底撈月 1台")
        }
        //全求人
        if(this.player[win].have.length==1&&win!=who){
            total+=2
            show.push("全求人 2台")
        }
        let all_ker=this.player[win].ming_ker+this.player[win].dark_ker+this.player[win].ker[card];
        let all_dark_ker=all_ker-this.player[win].ming_ker;
        //三四五案刻
        if(all_dark_ker==5){
            total+=8
            show.push("五暗刻 8台")
        }
        else if(all_dark_ker==4){
            total+=5
            show.push("四暗刻 5台")
        }
        else if(all_dark_ker==3){
            total+=2
            show.push("三暗刻 2台")
        }
        //碰碰胡
        if(all_ker==5){
            total+=4
            show.push("碰碰胡 4台")
        }


        let word=0,wan=0,sol=0,ton=0
        //混一色
        for(let i=27;i<34;i++)
            word+=this.player[win].num[i];
        if(card>=27&&card<34)
            word++
        for(let i=0;i<9;i++)
            wan+=this.player[win].num[i];
        if(card>=0&&card<9)
            wan++
        for(let i=9;i<18;i++)
            ton+=this.player[win].num[i];
        if(card>=9&&card<18)
            ton++
        for(let i=18;i<27;i++)
            sol+=this.player[win].num[i];
        if(card>=18&&card<27)
            sol++
        for(let i=0;i<this.player[win].showlist.length;i++){
            if(this.player[win].showlist[i]<9)
                wan++
            else if(this.player[win].showlist[i]<18)
                ton++
            else if(this.player[win].showlist[i]<27)
                sol++
            else
                word++;
        }
        //要有字 然後其餘的牌為萬桶條其中一個
        if(word&&((wan&&!sol&&!ton)||(!wan&&sol&&!ton)||(!wan&&!sol&&ton))){
            total+=4
            show.push("混一色 4台")
        }
        //清一色
        if(!word&&((wan&&!sol&&!ton)||(!wan&&sol&&!ton)||(!wan&&!sol&&ton))){
            total+=8
            show.push("清一色 8台")
        }
        //大小三元
        let zhong=0,fa=0,bai=0,dont=0
        if(card==31)
            zhong++
        zhong+=this.player[win].num[31]
        for(let i=0;i<this.player[win].showlist.length;i++)
            if(this.player[win].showlist[i]==31)
                zhong++
        if(card==32)
            fa++
        fa+=this.player[win].num[32]
        for(let i=0;i<this.player[win].showlist.length;i++)
            if(this.player[win].showlist[i]==32)
                fa++;
        if(card==33)
            bai++
        bai+=this.player[win].num[33]
        for(let i=0;i<this.player[win].showlist.length;i++)
            if(this.player[win].showlist[i]==33)
                bai++;

        if(zhong>=3&&fa>=3&&bai>=3){
            total+=8
            show.push("大三元 8台")
            dont=1
        }
        else if(zhong>=2&&fa>=2&&bai>=2){//因為如果有兩個為2不會糊牌，故這樣判斷就好
            total+=4
            show.push("小三元 4台")
            dont=1
        }
        //中發白 大小三元後不用判斷
        if(!dont){
            if(zhong>=3){
                total++
                show.push("紅中 1台")
            }
            if(fa>=3){
                total++
                show.push("發財 1台")
            }
            if(bai>=3){
                total++
                show.push("白板 1台")
            }
        }
        //平胡
        if(all_ker==0&&this.player[win].listenList.length==2&&word==0){//無字無刻聽兩面
            total+=2
            show.push("平胡 2台")
        }
        //地聽

        //天聽

        //大小四喜
        let dong=0,nan=0,xi=0,bei=0,donot=0;//27 28 29 30
        if(card==27)
            dong++
        dong+=this.player[win].num[27]
        for(let i=0;i<this.player[win].showlist.length;i++)
            if(this.player[win].showlist[i]==27)
                dong++
        if(card==28)
            nan++
        nan+=this.player[win].num[28]
        for(let i=0;i<this.player[win].showlist.length;i++)
            if(this.player[win].showlist[i]==28)
                nan++;
        if(card==29)
            xi++
        xi+=this.player[win].num[29]
        for(let i=0;i<this.player[win].showlist.length;i++)
            if(this.player[win].showlist[i]==29)
                xi++;
        if(card==30)
            bei++
        bei+=this.player[win].num[30]
        for(let i=0;i<this.player[win].showlist.length;i++)
            if(this.player[win].showlist[i]==30)
                bei++;
        if(dong>=3&&nan>=3&&xi>=3&&bei>=3){
            total+=16
            show.push("大四喜 16台")
            donot=1
        }
        else if(dong>=2&&nan>=2&&xi>=2&&bei>=2){//因為如果有兩個為2不會糊牌，故這樣判斷就好
            total+=8
            show.push("小四喜 8台")
            donot=1
        }
        //東南西北 見字 大小四喜後不用判斷
        if(!donot){
            if(dong>=3){
                total++
                show.push("東風 1台")
            }
            if(xi>=3){
                total++
                show.push("西風 1台")
            }
            if(nan>=3){
                total++
                show.push("南風 1台")
            }
            if(bei>=3){
                total++
                show.push("北風 1台")
            }
        }


        //自一色
        if(word&&!wan&&!sol&&!ton){
            total+=16
            show.push("字一色 16台")
        }
        //天地人胡
        if(136-this.current==71&&this.MIGI){
            if(who==win){//自摸天胡 非自摸人胡
                total+=16
                show.push("天胡 16台")
            }
            else{
                total+=16
                show.push("人胡 16台")
            }
        }
        else if(136-this.current>=68&&this.MIGI){
            if(who==win){//自摸地胡 非自摸人胡
                total+=16
                show.push("地胡 16台")
            }
            else{
                total+=16
                show.push("人胡 16台")
            }
        }
        if(total==0)
            show.push("屁胡 0台")
        for(let i=0;i<show.length;i++){
            this.refresh(show[i]+"\n")

        }
        this.refresh("總共 "+total+"台\n")
        show.push("總共 "+total+"台")

        return show;
    }
    show_result(show){
        let cnt=0
        this.showTotal=true
        for(let i=0;i<4;i++){
            this.player[i].show=true
        }
        this.result.push(<p class="title">統計結果</p>)
        //let showResult=setInterval(function(){
            console.log(this.result)
        for(let i=0;i<show.length;i++){
            this.setState({
                change:false
            })
            this.result.push(<p class="result">{show[i]}</p>)

            cnt++
            console.log(this.result)
            this.setState({
                change:false
            })
        }
        //    if(cnt==show.length)
        //        clearInterval(showResult)
        //},800)

    }

    botsent(){

        if(this.now==0)
        return
        else{
         //console.log("playMusic")
         const music=new Audio(mp3);


         // console.log("sent reveive"+card)
            // this.player[playernum].have[this.player[playernum].have.indexOf(card),1]=1
            this.setState({
               change:false
            })
         music.play();
         music.onended=(e)=>{
             //電腦打牌
             let discard //要丟掉的牌
             if(this.player[this.now].listenList.length==0){//如果還沒聽牌的話
                discard=this.player[this.now].AI_remove()

            }
            else{//如果聽牌的話，只看拿到的牌有沒有在聽牌名單中
                discard=this.player[this.now].have[this.player[this.now].have.length-1]
            }
            this.lastcard=discard
            this.refresh(this.player[this.now].playername+"打出"+this.dictionary[discard]+"\n")
            this.dropedCard.push(discard)
            this.player[this.now].remove(discard)

            this.player[this.now].generate_listenlist()
            for(let m=0;m<4;m++){
                if(this.player[m].listenList.length!=0){
                    this.whoIsListen[m]=1;
                    this.setState({
                        change:true
                    })
                }
            }
            console.log("玩家"+this.now.toString()+"聽:")
            console.log(this.player[this.now].listenList)

            this.player[this.now].have.sort(function(a,b){return a-b;})//將牌排序
            console.log(this.player[this.now].num)
            console.log(this.player[this.now].showlist)
            console.log(this.dictionary[discard])
            this.win=this.someone_can_win(discard)
            this.kan=this.someone_can_kan(discard)
            this.pon=this.someone_can_pon(discard)
            this.eat=this.next_can_eat(discard)
            this.doPlayerCanDo(discard,()=>{ //利用 call back 達成
                this.win=this.someone_can_win(discard)
                this.kan=this.someone_can_kan(discard)
                this.pon=this.someone_can_pon(discard)
                this.eat=this.next_can_eat(discard)
                if(this.win!=-1){
                    //window.alert("玩家"+this.now.toString()+"自摸 遊戲結束")
                    this.refresh("玩家"+this.now.toString()+"胡牌 遊戲結束"+"\n")
                    let loglist=this.calculate_reward(discard,this.now)
                    for(let i=0;i<loglist.length;i++)
                        this.refresh(loglist[i]+"\n")
                    this.game_end=1
                    this.show_result(loglist)
                    this.setState({
                        change:false
                     })
                    
                    //結算畫面
                }
                else if(this.kan!=-1){
                    for(let i=0;i<4;i++){//刪三張，顯示四張
                        if(i!=0)
                            this.player[this.kan].remove(discard)
                        this.player[this.kan].showlist.push(discard)
                        this.player[this.kan].cover.push(1)
                    }
                    this.now=this.kan
                    this.refresh(this.player[this.now].playername+"明槓\n")
                    this.MIGI=0
                    this.draw()
                    if(this.game_end)
                        return;
                    this.botsent()
                }
                else if(this.pon!=-1){//remove num[discard]-- undo
                    for(let i=0;i<3;i++){//刪兩張，顯示三張
                        if(i!=0)
                            this.player[this.pon].remove(discard)
                        this.player[this.pon].showlist.push(discard)
                        this.player[this.pon].cover.push(1)
                    }
                    this.now=this.pon
                    this.refresh(this.player[this.now].playername+"碰\n")
                    this.MIGI=0
                    this.botsent()
                }
                else if(this.eat!=-1){
                    this.now=(this.now+1)%4
                    if(this.eat==0){
                        this.player[this.now].remove(discard-2)
                        this.player[this.now].showlist.push(discard-2)
                        this.player[this.now].cover.push(1)
                        //this.player[this.now].remove(discard)
                        this.player[this.now].showlist.push(discard)
                        this.player[this.now].cover.push(1)
                        this.player[this.now].remove(discard-1)
                        this.player[this.now].showlist.push(discard-1)
                        this.player[this.now].cover.push(1)
                    }
                    else if(this.eat==1){
                        this.player[this.now].remove(discard-1)
                        this.player[this.now].showlist.push(discard-1)
                        this.player[this.now].cover.push(1)
                        //this.player[this.now].remove(discard)
                        this.player[this.now].showlist.push(discard)
                        this.player[this.now].cover.push(1)
                        this.player[this.now].remove(discard+1)
                        this.player[this.now].showlist.push(discard+1)
                        this.player[this.now].cover.push(1)
                    }
                    else if(this.eat==2){
                        this.player[this.now].remove(discard+1)
                        this.player[this.now].showlist.push(discard+1)
                        this.player[this.now].cover.push(1)
                       //this.player[this.now].remove(discard)
                        this.player[this.now].showlist.push(discard)
                        this.player[this.now].cover.push(1)
                        this.player[this.now].remove(discard+2)
                        this.player[this.now].showlist.push(discard+2)
                        this.player[this.now].cover.push(1)
                    }
                    this.refresh(this.player[this.now].playername+"吃\n")
                    this.MIGI=0
                    this.botsent()
                }
                else{
                    this.now=(this.now+1)%4;
                    this.draw()
                    if(this.game_end)
                        return;
                    this.botsent()
                }
                this.setState({
                    change:false
                 })
            })
        }
    }
}

    sent(card,playernum){
        this.disable=true
        this.lastcard=card
        const music=new Audio(mp3);
        music.play();
        this.player[playernum].remove(card)
        this.setState({
            change:false
         })
        music.onended=(e)=>{
        this.player[playernum]=this.player[playernum]

           // this.player[playernum].have[this.player[playernum].have.indexOf(card),1]=1
        let discard=card
        this.refresh(this.player[this.now].playername+"打出"+ this.dictionary[discard]+"\n")
        this.dropedCard.push(card)
        this.player[this.now].generate_listenlist()
        if(this.now==0){
            if(this.player[0].listenList.length&&this.music_switch){
                this.music_switch=0
                this.music_bgm.pause()
                this.music_bgm=new Audio(bgm_listen)
                this.music_bgm.loop=true
                this.music_bgm.play()
            }
        }
        console.log("玩家"+this.now.toString()+"聽:")
        console.log(this.player[this.now].listenList)
       //this.forceUpdate()
       this.player[this.now].have.sort(function(a,b){
        return a-b;
        })
        console.log(this.player[this.now].num)
        console.log(this.player[this.now].showlist)
        this.win=this.someone_can_win(discard)
        this.kan=this.someone_can_kan(discard)
        this.pon=this.someone_can_pon(discard)
        this.eat=this.next_can_eat(discard)
        console.log("電腦碰"+this.pon)
        console.log(discard)
        //------------------切割成 按鈕後動作---------------------------------------
        if(this.win!=-1){
            //window.alert("玩家"+this.now.toString()+"自摸 遊戲結束")
            this.refresh("玩家"+this.win.toString()+"胡牌 遊戲結束"+"\n")
            let loglist=this.calculate_reward(card,this.now)
            for(let i=0;i<loglist.length;i++)
                this.refresh(loglist[i]+"\n")
            this.game_end=1
            this.show_result(loglist)
            this.setState({
                change:false
             })
            
            //結算畫面
        }
        else if(this.pon!=-1){
            for(let i=0;i<3;i++){//刪二張，顯示三張
                if(i!=0)
                    this.player[this.pon].remove(discard)
                this.player[this.pon].showlist.push(discard)
                this.player[this.pon].cover.push(1)
            }
            this.now=this.pon
            this.MIGI=0
            this.refresh(this.player[this.pon].playername+"碰\n")
            this.botsent()
            this.setState({
                change:false
                })
            
            //結算畫面
          
        }
            else if(this.kan!=-1){
                for(let i=0;i<4;i++){//刪三張，顯示四張
                    if(i!=0)
                        this.player[this.kan].remove(discard)
                    this.player[this.kan].showlist.push(discard)
                    this.player[this.kan].cover.push(1)
                }
                this.now=this.kan
                this.refresh(this.player[this.kan].playername+"明槓\n")
                this.MIGI=0
                this.draw()
                if(this.game_end)
                    return;
                this.botsent()
            }
            else if(this.eat!=-1){
                this.now=(this.now+1)%4
                if(this.eat==0){
                    this.player[this.now].remove(discard-2)
                    this.player[this.now].showlist.push(discard-2)
                    this.player[this.now].cover.push(1)
                    //this.player[this.now].remove(discard) 這張根本沒進手牌 不能移
                    this.player[this.now].showlist.push(discard)
                    this.player[this.now].cover.push(1)
                    this.player[this.now].remove(discard-1)
                    this.player[this.now].showlist.push(discard-1)
                    this.player[this.now].cover.push(1)
                }
                else if(this.eat==1){
                    this.player[this.now].remove(discard-1)
                    this.player[this.now].showlist.push(discard-1)
                    this.player[this.now].cover.push(1)
                    //this.player[this.now].remove(discard)
                    this.player[this.now].showlist.push(discard)
                    this.player[this.now].cover.push(1)
                    this.player[this.now].remove(discard+1)
                    this.player[this.now].showlist.push(discard+1)
                    this.player[this.now].cover.push(1)
                }
                else if(this.eat==2){
                    this.player[this.now].remove(discard+1)
                    this.player[this.now].showlist.push(discard+1)
                    this.player[this.now].cover.push(1)
                    //this.player[this.now].remove(discard)
                    this.player[this.now].showlist.push(discard)
                    this.player[this.now].cover.push(1)
                    this.player[this.now].remove(discard+2)
                    this.player[this.now].showlist.push(discard+2)
                    this.player[this.now].cover.push(1)
                }
                this.refresh(this.player[this.now].playername+"吃\n")
                this.MIGI=0
                this.botsent()
            }
            else{//完全沒事發生
                this.now=(this.now+1)%4;
                //this.game_record+=this.player[this.now].playername+"抽牌<br>"
                this.draw()
                if(this.game_end)
                    return;
                this.botsent()
            }
            this.disable=false
         }


   }
//    btn_pon(){
//     if(this.pon!=-1){
//         for(let i=0;i<3;i++){//刪兩張，顯示三張
//             if(i!=0)
//                 this.player[this.pon].remove(discard)
//             this.player[this.pon].showlist.push(discard)
//         }
//         this.now=this.pon
//         console.log(this.pon+"碰")
//         this.botsent()
//     }

// }
    render(props){
            // for(let i=0;i<4;i++)
            // console.log("player"+i+"="+this.player[i].have)
            //
            //console.log("render game")
            //this.now=this.now%4
        
            
                return [
                /*<h1>{(this.now)}</h1>,*/
                //<th class="tg-0pky"></th>
                //<td class="tg-0pky"></td>
                //<td class="tg-0pky" colspan="2" rowspan="2"></td>
                [<table class="tg" >
                <thead>

                </thead>
                <tbody>
                <tr>

                    <td class="tg-0pky" colspan="2" align = "center" ><div id="player2">{this.player[2].render(this.now)}
                    <div>{this.whoIsListen[2]?<Button key={Math.random()} variant="dark" >聽</Button>:""}</div>
                    </div></td>
                    <td class="tg-0pky"></td>
                </tr>
                <tr>
                <td>.</td>
                    </tr>
                <tr>
                <td>.</td>
                    </tr>
                    <tr>
                <td>.</td>
                    </tr>
                    <tr>
                <td>.</td>
                    </tr>
                <tr>
                    <td align='right' class="log">當前打出:
                    {<Card id={"player0"} disable={true} key={Math.random() }card={this.lastcard} playernum={0}  />}
                    </td>
                </tr>
                <tr>
                <td class="tg-0pky" rowspan="2" width="50%"align="center"><div id="player1">{this.player[3].render(this.now)}
                <div>{this.whoIsListen[3]?<Button key={Math.random()} variant="dark" >聽</Button>:""}</div></div></td>

                    <td class="tg-0pky" rowspan="2" width="50%" align="center"><div id="player3">{this.player[1].render(this.now)}
                    <div>{this.whoIsListen[1]?<Button key={Math.random()} variant="dark" >聽</Button>:""}</div>
                    </div></td>

                </tr>
                <tr >
                    <td width="100%" rowspan="2">.</td>
                </tr>
                <tr>
                <td>.</td>
                </tr>
                <tr>
                <td>.</td>
                </tr>
                <tr>
                <td>.</td>
                </tr>
                <tr>
                <td>.</td>
                </tr>
                <tr>
                <td>.</td>
                </tr>
                <tr>

                    <td class="tg-0pky" colspan="2" align = "center">

                    <div key={Math.random()}>{this.Kan()}</div><div key={Math.random()}>{this.Eat()}</div>{this.show?
            <div><Button key={Math.random()} variant="primary"   onClick={()=>this.doEat()} disabled={!this.canDo[0]}>吃</Button>
                <Button key={Math.random()} variant="secondary" onClick={()=>this.doPon()} disabled={!this.canDo[1]}>碰</Button>
                <Button key={Math.random()}variant="success"  onClick={()=>this.doKan()} disabled={!this.canDo[2]}>槓</Button>

                <Button key={Math.random()}variant="danger"    onClick={()=>this.doWin()} disabled={!this.canDo[3]}>胡</Button>
                <Button key={Math.random()}variant="info"    onClick={()=>this.doCancel()}>取消</Button>
                :<div></div></div>:''}
                        <div id="player0">{this.player[0].render(this.now,this.disable)}
                    <div>{this.whoIsListen[0]?<Button key={Math.random()} variant="dark" >聽</Button>:""}</div>
                    </div></td>
                    <td class="tg-0pky"></td>
                </tr>
                <tr>
                    <td align="left" class="log">
                        <div>

                            </div>

                        

                    </td>
                </tr>
                </tbody>
                </table>,
                <div class="log">
                    <p class="gamelog" id="gamelog" >
                        <AutoScroll sa={this.game_record}/>
                    </p>          
                </div>,
                <div>
                    <Container className="winlog" key={Math.random()}>{this.result}</Container>
                </div>
                ,<div class="player">
                    <img class="head" src={this.headpic[this.player[0].skillID] }></img>,
                    <div class="blood" width={this.player[0].HP.toString()+'px'}>{this.player[0].HP}</div>
                </div>
                ,<div class="enemy1">
                    <img class="head" src={this.headpic[this.player[1].skillID] }></img>,
                    <div class="blood" width={this.player[1].HP.toString()+'px'}>{this.player[1].HP}</div>
                </div>
                ,<div class="enemy2">
                    <img class="head" src={this.headpic[this.player[2].skillID] }></img>,
                    <div class="blood" width={this.player[2].HP.toString()+'px'}>{this.player[2].HP}</div>
                </div>
                ,<div class="enemy3">
                    <img class="head" src={this.headpic[this.player[3].skillID] }></img>,
                    <div class="blood" width={this.player[3].HP.toString()+'px'}>{this.player[3].HP}</div>
                </div>
                ,<h1 align="center"></h1>
                ,,<br/>
                ,,<br/>
                ,,<br/>
                ,,<hr></hr>
            ],[/*this.printArrayCard(this.allCard,this.current),*/<br/>,<hr/>
                ,this.printArrayCard(this.dropedCard)]

            ]
        }
    

}
export default Game

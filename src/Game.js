import React, { Component } from 'react';
import HandCard from './HandCard'
import Card from './Card'
import mp3 from './sleep.mp3'
import FuncMenu from './FuncMenu';
import $ from 'jquery';
import Button from 'react-bootstrap/Button';
class Game extends Component{
    constructor(props){
        super(props)
        this.dictionary=["1W","2W","3W","4W","5W","6W","7W","8W","9W","1T","2T","3T","4T","5T","6T","7T","8T","9T","1S","2S","3S","4S","5S","6S","7S","8S","9S","DONG","NAN","XI","BEI","ZHONG","FA","BAI","space"];
        this.storeNow=0;//保存現在輪到誰
        this.canDo=[];
        this.player=[new HandCard(this,0),new HandCard(this,1),new HandCard(this,2),new HandCard(this,3)]
        this.allCard=[]
        this.playernum=props.playernum
        this.current=0;
        this.now=0;

        this.kan=-1
        this._kan=-1//暗槓
        this.pon=-1
        this.eat=-1
        this.win=-1
        this.show=0;
        this.state={
            change:true,
            showFuncMenu:false
        }
        this.ended=true
        this.allCard=[]
        this.dropedCard=[]
            for(let j=0;j<4;j++){
                for(let i=0;i<34;i++){
                this.allCard[i*4+j]=i;
            }
        }
         for(let i=0;i<136;i++){//洗牌
             let idx=Math.floor(Math.random()*136);
             [this.allCard[i],this.allCard[idx]]=[this.allCard[idx],this.allCard[i]];//swap
         }
        for(let j=0;j<4;j++){
            for(let i=0;i<16;i++){
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
        
        console.log("把功能列藏起來")
        this.first_draw()

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
        if(this.win!=-1)
            return
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
                let reply=window.prompt("要明槓"+this.dictionary[kanlist[i]]+"嗎?(0=不槓 else=明槓)","0");
                if(reply=="0")
                    continue;
                return kanlist[i];
            }
            return -1;
        }   
        else
            return kanlist[0]; 
    }
    dark_kan(){//暗槓
        let kanlist=[];//一回合可能槓很多次 選擇要槓哪張
        if(this.win!=-1||this.kan!=-1)
            return
        for(let i=0;i<34;i++){
            if(this.player[this.now].num[i]==4)
                kanlist.push(i);
        }
        if(kanlist.length==0)//無牌可槓
            return -1;
        if(this.now==0){
            for(let i=0;i<kanlist.length;i++){
                let reply=window.prompt("要暗槓"+this.dictionary[kanlist[i]]+"嗎?(0=不槓 else=暗槓)","0");
                if(reply=="0")
                    continue;
                return kanlist[i];//槓哪一張
            }
            return -1;
        }   
        else
            return kanlist[0]; //槓哪一張
    }
    first_draw(){//先假設抽第一張牌不能槓不然會出大事
        console.log("玩家"+this.now.toString()+"抽")
        let card=this.allCard[this.current]
        this.player[this.now].num[card]++//num++
        this.player[this.now].have.push(this.allCard[this.current++])
    }
    draw(){
        
        console.log("玩家"+this.now.toString()+"抽")
        let card=this.allCard[this.current]
        this.player[this.now].num[card]++//num++
        this.player[this.now].have.push(this.allCard[this.current++])
        //judge kan win
        this.win=this.self_win(card)
        this.kan=this.light_kan()
        this._kan=this.dark_kan()
        if(this.win!=-1){
            window.alert("玩家"+this.now.toString()+"自摸 遊戲結束")
            return
            //結算畫面
        }
        else if(this.kan!=-1){
            this.player[this.now].remove(this.kan)
            this.player[this.now].showlist.push(this.kan)
            console.log(this.now.toString()+"明槓")
            this.draw()
        }
        else if(this._kan!=-1){
            for(let i=0;i<4;i++){
                this.player[this.now].remove(this._kan)
                this.player[this.now].showlist.push(this._kan)
            }
            console.log(this.now.toString()+"暗槓")
            this.draw()
        }
    
    }
    
       
    someone_can_pon(card){//碰
         if(this.win!=-1||this.kan!=-1)//如果選擇槓，則不能碰
             return -1;
        let n=this.now;
         let ans=-1;//無人能碰
         for(let i=0;i<4;i++)
             if(n!=i&&this.player[i].num[card]>=2)//不能碰自己&該牌>=2
                 ans=i;
         if(ans==0){//玩家決定要不要碰
            if(this.kan!=-1)
                return -1;
            //  let reply=window.prompt("要碰嗎?(0=不碰 else=碰)","0");

           
         }
         return ans;
    }
//     someone_can_pon(card){//碰
//         if(this.win!=-1||this.kan!=-1)//如果選擇槓，則不能碰
//             return -1;
//        let n=this.now;
//         let ans=-1;//無人能碰
//         for(let i=0;i<4;i++)
//             if(n!=i&&this.player[i].num[card]>=2)//不能碰自己&該牌>=2
//                 ans=i;
//         if(ans==0){//玩家決定要不要碰
//            if(this.kan!=-1)
//                return -1;
//             let reply=window.prompt("要碰嗎?(0=不碰 else=碰)","0");
//             if(reply=="0")
//                 ans=-1;
//         }
//         return ans;
//    }
    someone_can_kan(card){//槓
        if(this.win!=-1)
            return -1
        let n=this.now
        let next=(n+1)%4;
        let ans=-1;
        for(let i=0;i<4;i++)
            if(i!=n&&i!=next&&this.player[i].num[card]==3)//不能槓自己跟上家
                ans= i;
        if(ans==0){
            // let reply=window.prompt("要槓嗎?(0=不槓 else=槓)","0");
           
        }
        return ans;//哪一家槓牌
    }
 
    next_can_eat(card){//吃
        if(this.win!=-1||this.kan!=-1||this.pon!=-1)
            return -1
        let n=this.now
        let i=(n+1)%4;//下家
        let type=-1 // eat n return 0 = n-1 n-2  1 = n-1 n+1  2 = n+1 n+2
        let k=[];
        let str=[]
        let tmp=this.player[i].num
        k[0]=0
        k[1]=0
        k[2]=0
        str[0]="不吃 "
        str[1]="不吃 "
        str[2]="不吃 "
        //字牌不處理 n 吃 n-1 n-2
        if(card<27&&card%9>1&&tmp[card-2]&&tmp[card-1]){
            k[0]=1
            str[0]=this.dictionary[card-2]+this.dictionary[card-1]
            console.log("can eat type = "+0)
        }
        // n 吃 n-1 n+1
        if(card<27&&card%9>0&&card%9<8&&tmp[card+1]&&tmp[card-1]){
            k[1]=1;  
            str[1]=this.dictionary[card-1]+this.dictionary[card+1]
            console.log("can eat type = "+1)
        }
        // n 吃 n+1 n+2
        if(card<27&&card%9<7&&tmp[card+1]&&tmp[card+2]){
            k[2]=1
            str[0]=this.dictionary[card+1]+this.dictionary[card+2] 
            console.log("can eat type = "+2)
        }
        if(i==0&&(k[0]||k[1]||k[2])){
            let reply=window.prompt("要吃哪一種?(1: "+str[0]+" 2: "+str[1]+" 3: "+str[2] +" else=不吃)","0");
            console.log(reply)
            if(reply=="0")
                type=-1;   
            else if(reply=="1"&&str[0]!="不吃 ")
                type=0
            else if(reply=="2"&&str[0]!="不吃 ")
                type=1
            else if(reply=="3"&&str[0]!="不吃 ")
                type=2
            else
                type=-1
        }
        else{
            for(let j=0;j<3;j++)
                if(k[j])
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
                return 1
        }
        return -1
    }
    showFuncMenu(canDo,card){
        // canDo,doEat,doPon,doKan,doWin
        this.canDo=canDo
        this.show=1
        this.setState({
            change:Math.random(),
            showFuncMenu:true,
            card:card
         })
    }
    playerCan(card){//偵測玩家是否可以吃碰槓胡
        let canDo=[0,0,0,0];//分別代表 吃 碰 槓 胡
        // if(this.next_can_eat(card)==0){//TODO
        //     cando[0]=1;
        // }
        if(this.someone_can_pon(card)==0){
            canDo[1]=1;
        }
        if(this.someone_can_kan(card)==0){
            canDo[2]=1;
        }
        if(this.someone_can_win(card)==0){
            canDo[3]=1;
        }
        if(canDo[0]==0&&canDo[1]==0&&canDo[2]==0&&canDo[3]==0)
        return null
        else
        return canDo;
    }
    doPlayerCanDo(card,func){//看看玩家能不能吃碰槓胡，不能的話繼續流程
        let canDo=this.playerCan(card)//偵測玩家能不能吃碰槓胡
        
        if(canDo){//如果可以
            console.log("玩家可以"+canDo)
            this.showFuncMenu(canDo,card,this);//叫出選單供玩家選擇
        }else{
            console.log("玩家不行"+canDo)
            func();//不行的話往下執行
        }
    }
    
    
     doEat(){
    //     let discard=this.state.card
    //     console.log("玩家選擇吃");
    //     this.now=(this.now+1)%4
    //                 if(this.eat==0){
    //                     this.player[0].remove(discard-2)
    //                     this.player[0].showlist.push(discard-2)
    //                     //this.player[this.now].remove(discard)
    //                     this.player[0].showlist.push(discard)
    //                     this.player[0].remove(discard-1)
    //                     this.player[0].showlist.push(discard-1)
    //                 }
    //                 else if(this.eat==1){
    //                     this.player[0].remove(discard-1)
    //                     this.player[0].showlist.push(discard-1)
    //                     //this.player[this.now].remove(discard)
    //                     this.player[0].showlist.push(discard)
    //                     this.player[0].remove(discard+1)
    //                     this.player[0].showlist.push(discard+1)
    //                 }
    //                 else if(this.eat==2){
    //                     this.player[0].remove(discard+1)
    //                     this.player[0].showlist.push(discard+1)
    //                    //this.player[this.now].remove(discard)
    //                     this.player[0].showlist.push(discard)
    //                     this.player[0].remove(discard+2)
    //                     this.player[0].showlist.push(discard+2)
    //                 }
    //                 console.log(this.now+"吃 type = "+this.eat.toString())
    //                 this.botsent() 
        //TODO
    }
    doPon(){
        console.log("玩家選擇碰");
        for(let i=0;i<3;i++){//刪兩張，顯示三張
            if(i!=0)
            this.player[0].remove(this.state.card)
            this.player[0].showlist.push(this.state.card)
        }
        this.now=1
        console.log(this.pon+"碰")
        this.canDo=[0,0,0,0]
        this.show=false
        this.botsent()
        
    }
    doKan(){
        let discard=this.state.card
        console.log("玩家選擇槓");
        for(let i=0;i<4;i++){//刪三張，顯示四張
            if(i!=0)
                this.player[0].remove(discard)
            this.player[0].showlist.push(discard)
        }
        this.now=1
        console.log(0+"明槓")
        this.canDo=[0,0,0,0]
        this.show=false
        this.draw()
        this.botsent()
        
    }
    doWin(){
        this.canDo=[0,0,0,0]
        this.show=false
        console.log("玩家選擇胡");
        window.alert("玩家"+this.win.toString()+"胡牌 遊戲結束")
        //TODO
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
            this.dropedCard.push(discard)   
            this.player[this.now].remove(discard)
        
            this.player[this.now].generate_listenlist()
            console.log("玩家"+this.now.toString()+"聽:")
            console.log(this.player[this.now].listenList)
            
            this.player[this.now].have.sort(function(a,b){return a-b;})//將牌排序
            console.log(this.player[this.now].num)
            console.log(this.player[this.now].showlist)
            console.log(this.dictionary[discard])
            this.doPlayerCanDo(discard,()=>{ //利用 call back 達成
                this.win=this.someone_can_win(discard)
                this.kan=this.someone_can_kan(discard)
                this.pon=this.someone_can_pon(discard)
                this.eat=this.next_can_eat(discard)
                if(this.win!=-1){
                    window.alert("玩家"+this.win.toString()+"胡牌 遊戲結束")
                    return
                    //結算畫面
                }
                else if(this.kan!=-1){
                    for(let i=0;i<4;i++){//刪三張，顯示四張
                        if(i!=0)
                            this.player[this.kan].remove(discard)
                        this.player[this.kan].showlist.push(discard)
                    }
                    this.now=this.kan
                    console.log(this.kan+"明槓")
                    this.draw()
                    this.botsent()
                }
                else if(this.pon!=-1){//remove num[discard]-- undo
                    for(let i=0;i<3;i++){//刪兩張，顯示三張
                        if(i!=0)
                            this.player[this.pon].remove(discard)
                        this.player[this.pon].showlist.push(discard)
                    }
                    this.now=this.pon
                    console.log(this.pon+"碰")
                    this.botsent()
                }
                else if(this.eat!=-1){
                    this.now=(this.now+1)%4
                    if(this.eat==0){
                        this.player[this.now].remove(discard-2)
                        this.player[this.now].showlist.push(discard-2)
                        //this.player[this.now].remove(discard)
                        this.player[this.now].showlist.push(discard)
                        this.player[this.now].remove(discard-1)
                        this.player[this.now].showlist.push(discard-1)
                    }
                    else if(this.eat==1){
                        this.player[this.now].remove(discard-1)
                        this.player[this.now].showlist.push(discard-1)
                        //this.player[this.now].remove(discard)
                        this.player[this.now].showlist.push(discard)
                        this.player[this.now].remove(discard+1)
                        this.player[this.now].showlist.push(discard+1)
                    }
                    else if(this.eat==2){
                        this.player[this.now].remove(discard+1)
                        this.player[this.now].showlist.push(discard+1)
                       //this.player[this.now].remove(discard)
                        this.player[this.now].showlist.push(discard)
                        this.player[this.now].remove(discard+2)
                        this.player[this.now].showlist.push(discard+2)
                    }
                    console.log(this.now+"吃 type = "+this.eat.toString())
                    this.botsent()
                }
                else{
                    this.now=(this.now+1)%4; 
                    this.draw()
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
        this.dropedCard.push(card)
        this.player[this.now].generate_listenlist()
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
        this.someone_can_pon(discard)
        this.eat=this.next_can_eat(discard)
        console.log(discard)
        //------------------切割成 按鈕後動作---------------------------------------
            if(this.win!=-1){
                window.alert("玩家"+this.win.toString()+"胡牌 遊戲結束")
                return
                //結算畫面
            }
            else if(this.kan!=-1){
                for(let i=0;i<4;i++){//刪三張，顯示四張
                    if(i!=0)
                        this.player[this.kan].remove(discard)
                    this.player[this.kan].showlist.push(discard)
                }
                this.now=this.kan
                console.log(this.kan+"明槓")
                this.draw()
                this.botsent()
            }
            else if(this.eat!=-1){
                this.now=(this.now+1)%4
                if(this.eat==0){
                    this.player[this.now].remove(discard-2)
                    this.player[this.now].showlist.push(discard-2)
                    //this.player[this.now].remove(discard) 這張根本沒進手牌 不能移 
                    this.player[this.now].showlist.push(discard)
                    this.player[this.now].remove(discard-1)
                    this.player[this.now].showlist.push(discard-1)
                }
                else if(this.eat==1){
                    this.player[this.now].remove(discard-1)
                    this.player[this.now].showlist.push(discard-1)
                    //this.player[this.now].remove(discard)
                    this.player[this.now].showlist.push(discard)
                    this.player[this.now].remove(discard+1)
                    this.player[this.now].showlist.push(discard+1)
                }
                else if(this.eat==2){
                    this.player[this.now].remove(discard+1)
                    this.player[this.now].showlist.push(discard+1)
                    //this.player[this.now].remove(discard)
                    this.player[this.now].showlist.push(discard)
                    this.player[this.now].remove(discard+2)
                    this.player[this.now].showlist.push(discard+2)
                }
                console.log(this.now+"吃 type = "+this.eat.toString())
                this.botsent()
            }
            else{//完全沒事發生
                this.now=(this.now+1)%4;
                
                this.draw()
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
            
            //console.log("render game")
            //this.now=this.now%4
            return [<h1>{(this.now)}</h1>,[<table class="tg">
            <thead>
              <tr>
                <th class="tg-0pky"></th>
                <th class="tg-0pky" colspan="2"><div id="player2">{this.player[2].render(this.now)}</div></th>
                <th class="tg-0pky"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="tg-0pky" rowspan="2"><div id="player1">{this.player[3].render(this.now)}</div></td>
                <td class="tg-0pky" colspan="2" rowspan="2"></td>
                <td class="tg-0pky" rowspan="2"><div id="player3">{this.player[1].render(this.now)}</div></td>
              </tr>
              <tr>
              </tr>
              <tr>
                <td class="tg-0pky"></td>
                <td class="tg-0pky" colspan="2"><div id="player0">{this.player[0].render(this.now,this.disable)}</div></td>
                <td class="tg-0pky"></td>
              </tr>
            </tbody>
            </table>,,<br/>
            ,,<br/>
            ,,<br/>
            ,,<hr></hr>
        ],[this.printArrayCard(this.allCard,this.current),<br/>,<hr/>
            ,this.printArrayCard(this.dropedCard)],
            this.show?
            [<Button key={Math.random()} variant="outline-primary"   onClick={()=>this.doEat()} disabled={!this.canDo[0]}>吃</Button>,
            <Button key={Math.random()} variant="outline-secondary" onClick={()=>this.doPon()} disabled={!this.canDo[1]}>碰</Button>,
            <Button key={Math.random()}variant="outline-success"  onClick={()=>this.doKan()} disabled={!this.canDo[2]}>槓</Button>,
            // <Button variant="outline-warning">聽</Button>,
            <Button key={Math.random()}variant="outline-danger"    onClick={()=>this.doWin()} disabled={!this.canDo[3]}>胡</Button>]
            :<div></div>
        
        ]
    }
     
}
export default Game
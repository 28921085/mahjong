import React, { Component } from 'react';
import HandCard from './HandCard'
import Card from './Card'
import mp3 from './sleep.mp3'
class Game extends Component{
    constructor(props){
        super(props)
        this.dictionary=["1W","2W","3W","4W","5W","6W","7W","8W","9W","1T","2T","3T","4T","5T","6T","7T","8T","9T","1S","2S","3S","4S","5S","6S","7S","8S","9S","DONG","NAN","XI","BEI","ZHONG","FA","BAI","space"];
        
        this.player=[new HandCard(this,0),new HandCard(this,1),new HandCard(this,2),new HandCard(this,3)]
        this.allCard=[]
        this.playernum=props.playernum
        this.current=0;
        this.now=0;
        this.state={
            change:true
        }
        this.ended=true
        this.allCard=[]
        this.dropedCard=[]
            for(let j=0;j<4;j++){
                for(let i=0;i<34;i++){
                this.allCard[i*4+j]=i;
            }
        }
        // for(let i=0;i<136;i++){//洗牌
        //     let idx=Math.floor(Math.random()*136);
        //     [this.allCard[i],this.allCard[idx]]=[this.allCard[idx],this.allCard[i]];//swap
        // }
        for(let j=0;j<4;j++){
            for(let i=0;i<16;i++){
                this.player[j].haveID.push(this.current)
                this.player[j].have.push(this.allCard[ this.current++])
                
            }   
        }
        //抽牌
        this.player[this.now%4].have.push(this.allCard[this.current++])
    
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
    draw(){
    this.player[this.now%4].have.push(this.allCard[this.current++])
    
    }
     syncDelay(milliseconds){
        var start = new Date().getTime();
        var end=0;
        while( (end-start) < milliseconds){
            end = new Date().getTime();
        }
       }
 
    botsent(){
        if(this.now==0)
        return
        else{
         console.log("playMusic")
         const music=new Audio(mp3);
         
        //  this.syncDelay(1000)
         // console.log("sent reveive"+card)
     //    let dictionary=["1W","2W","3W","4W","5W","6W","7W","8W","9W","1T","2T","3T","4T","5T","6T","7T","8T","9T","1S","2S","3S","4S","5S","6S","7S","8S","9S","DONG","NAN","XI","BEI","ZHONG","FA","BAI","space"];
     //    this.player[playernum]=this.player[playernum]
     
            // this.player[playernum].have[this.player[playernum].have.indexOf(card),1]=1
            this.setState({
               change:false
            })
        //  window.alert("打牌")
         music.play();
        //this.forceUpdate()
        
             
         
         
         console.log("playMusicEnd"+this.now)
         // this.now=(this.now+1)%4
         // setTimeout(this.botsent,1000)
         music.onended=(e)=>{
            // this.now++
            this.dropedCard.push(this.player[this.now%4].have[0])   
            this.player[this.now%4].remove( this.player[this.now%4].have[0])
            console.log(this.now)
            this.now=(this.now+1)%4;
            this.draw()
            this.botsent()
            this.setState({
                change:false
             })
         }

         }
        //  function(e){
        //     console.log('ya')

        //  }
        }
      
     
   
    sent(card,playernum){
        const music=new Audio(mp3);
        music.play();
        this.player[playernum].remove(card)
        this.setState({
            change:false
         })
        music.onended=(e)=>{
            // this.now++
          console.log("sent reveive"+card)
       let dictionary=["1W","2W","3W","4W","5W","6W","7W","8W","9W","1T","2T","3T","4T","5T","6T","7T","8T","9T","1S","2S","3S","4S","5S","6S","7S","8S","9S","DONG","NAN","XI","BEI","ZHONG","FA","BAI","space"];
       this.player[playernum]=this.player[playernum]
      
           // this.player[playernum].have[this.player[playernum].have.indexOf(card),1]=1
          
        this.dropedCard.push(card)
       //this.forceUpdate()
       this.now++;
       this.draw()
       this.botsent()
         }
        
   }
    render(props){
            // for(let i=0;i<4;i++)
            // console.log("player"+i+"="+this.player[i].have)
            
            console.log("render game")
            this.now=this.now%4
            return [<h1>{(this.now)}</h1>,[this.player[0].render(this.now),<br/>
            ,this.player[1].render(this.now),<br/>
            ,this.player[2].render(this.now),<br/>
            ,this.player[3].render(this.now),<hr></hr>
        ],[this.printArrayCard(this.allCard,this.current),<br/>,<hr/>
            ,this.printArrayCard(this.dropedCard)]]
    }
     
}
export default Game
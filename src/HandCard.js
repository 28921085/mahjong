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
        this.list=[]
        this.have=[]
        this.haveID=[]
        this.playernum=props
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
   remove(card){
    //    console.log("in test"+card)
    //    console.log(this.have)
       this.have.splice(this.have.indexOf(card),1)
       console.log(this.have)
       this.setState({
        have: this.have,
        key:this.playernum
    })
    // this.forceUpdate()
    }
       
       
   
    
    render(now){
        
        this.list=[]
      
         for(let i=0;i<this.have.length;i++){
            //  console.log(<Card  key={this.have[i] }card={this.have[i]} playernum={this.playernum}  top={this.top}/>)
             this.list.push(<Card disable={!(now==this.playernum)} key={i+Math.random() }card={this.have[i]} playernum={this.playernum}  top={this.top}/>)
             
         }
         this.setState({
             have: null
         })
           return [this.list ];
        
    }

}
export default HandCard;
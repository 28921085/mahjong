import React, { Component } from 'react';
import Game  from './Game';

class Card extends Component{
    constructor(props){
        super(props)
        this.disable=props.disable
        
        this.playernum=props.playernum
        this.card=props.card
        this.top =props.top
        this.show=props.show
        this.func=props.func
        this.dictionary=["1W","2W","3W","4W","5W","6W","7W","8W","9W","1T","2T","3T","4T","5T","6T","7T","8T","9T","1S","2S","3S","4S","5S","6S","7S","8S","9S","DONG","NAN","XI","BEI","ZHONG","FA","BAI","space"];
        this.state={
            card:props.card,
            playernum:props.playernum
        }
        // this.img=require('./static/card/'+this.dictionary[parseInt(this.card)]+'.png').default
        this.now=1
        
    }

render(props){
    // console.log(this.card)
    let k=1
    // console.log(this.card+" vs "+'./static/card/'+this.dictionary[parseInt(this.card)]+'.png')
   
    // console.log(this.card+" vs "+'./static/card/'+this.dictionary[parseInt(this.card)]+'.png')
    
    return (
        <button key={Math.random()} disabled={this.disable||this.playernum!=0||this.show==0} onClick={this.func?this.func:()=> {
            // console.log("render"+this.playernum)
            // console.log(this.card+" vs "+'./static/card/'+this.dictionary[parseInt(this.card)]+'.png')
            // // this.card=0
            this.disable=false
            this.top.sent(this.card,this.playernum,this);
            this.setState({
                card:this.card,
            playernum:this.playernum
            })
        //    this.now++
        //    console.log("now="+this.now)
    }
//}><img  key={Math.random()}  width='30px'height='39px'src={this.playernum==0||this.show?require('./static/card/'+this.dictionary[parseInt(this.card)]+'.png').default:require('./static/card/space.png').default} alt='prop.name'></img></button>
}><img  key={Math.random()}  width='30px'height='39px'src={this.playernum==0||this.show?require('./static/card/'+this.dictionary[parseInt(this.card)]+'.png').default:require('./static/card/'+'space'+'.png').default} alt='prop.name'></img></button>

    )
}

}
export default Card;

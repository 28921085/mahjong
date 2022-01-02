import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
class FuncMenu extends Component{
    constructor(props){
        super(props)
        this.doPon=props.doPon
        this.doEat=props.doEat
        this.doKan=props.doKan
        this.doWin=props.doWin
        this.show=props.show
        this.game=props.game
        if(props.cando!=null){
            this.cando=props.cando
        }else{
            this.cando=[1,1,1,1]
        }
        
        
    }
    render(props){
        return <div></div>;
    }
}
export default FuncMenu
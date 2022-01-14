import React, { Component } from 'react';
import Stack from 'react-bootstrap/Stack';
import Badge from 'react-bootstrap/Badge';
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
            <Button href='/Play'onClick={()=>this.play(0)} >第一關</Button>
            <Button href='/Play'onClick={()=>this.play(1)}disabled={(this.lock>=1)?0:1}>第二關</Button>
            <Button href='/Play'onClick={()=>this.play(2)}disabled={(this.lock>=2)?0:1}>第三關</Button>
            </div>;
    }
    play(level){
        localStorage.setItem("level",level)
    }
}
export default Level
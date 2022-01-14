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
            <Dialog say={["安安","2","3"]} title='第二關' onClick={()=>this.play(1)}></Dialog>
            <Dialog say={["安安","2","3"]} title='第三關' onClick={()=>this.play(2)}></Dialog>
            </div>;
    }
    play(level){
        localStorage.setItem("level",level)
        if(level==0){
            //TODO
        }else if(level==1){

        }else if (level==2){
            
        }
    }
}
export default Level
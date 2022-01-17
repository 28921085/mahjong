import React, { Component ,useState} from 'react';
import AutoScroll from './AutoScroll'
class TestScroll extends Component{
    constructor(prop){
        super(prop)
        this.check=""
        this.state={
            change:true,
            showFuncMenu:false
        }
    }
    add(){
        this.check+="adsadadasdasdasdsadasdadsadadasdasdasdsadasdadsadadasdasdasdsadasdadsadadasdasdasdsadasdadsadadasdasdasdsadasdadsadadasdasdasdsadasdadsadadasdasdasdsadasdadsadadasdasdasdsadasd\n"
        this.setState({
            change:true
        })
    }
    render(){
       return <div>
        <button onClick={()=>this.add()}>加加加</button>
        
        </div>
    }
}
export default TestScroll
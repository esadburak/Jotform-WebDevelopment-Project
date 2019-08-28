import React from 'react'
import { connect } from 'react-redux';
import { changeInput } from './reduxSrc/actions';
import {Input} from 'antd';
import 'antd/dist/antd.css';

class InputPlace extends React.Component {


    constructor(props){
        super(props)
        this.handleChange=this.handleChange.bind(this)
    }
    handleChange(event) {
        this.props.change(event.target.value)
    }
    f1(event){
        console.log(1)
    }
    f2(event){
        if(event.keyCode == 13 || event.charCode ==13)
        console.log(event.target.value)
        console.log(event)
    }
    render() {
        return (
            <div>     
            <Input placeholder="Basic usage" onChange={this.handleChange} onKeyPress={this.f1}/>
            <Input placeholder="Basic usage" onChange={this.handleChange} onKeyPress={this.f2}/>
            </div>
        )
    }
}




const mapDispatchToProps = ({
 //   change : changeInput
})


export default connect(null, mapDispatchToProps)(InputPlace);
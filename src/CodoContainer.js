import React from 'react';
import { connect } from 'react-redux';
import { removeAction } from './reduxSrc/actions';

class CodoContainer extends React.Component {

    constructor(props){
        super(props)
        this.handleclick= this.handleclick.bind(this)
    }
    handleclick(){
        console.log(this.props.name)
        this.props.removeAc(this.props.name)
    }
    render(){
        return(
            <div>
           <h2>{this.props.name}</h2>
            </div>
        )
    }
}


const mapDispatchToProps = ({
 //   removeAc : removeAction
})
const ConnectedCodoContainer = connect(null,mapDispatchToProps)(CodoContainer);
export default ConnectedCodoContainer;



/*
this.state.result.map(pokes=>
    <PokeCard key={pokes.name} name={pokes.name}> </PokeCard>
)
*/

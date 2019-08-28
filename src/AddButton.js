import React from 'react'
import { connect } from 'react-redux';
import { addAction } from './reduxSrc/actions';

class AddButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
 
    handleClick() {
        this.props.add()
    }

    render() {
        return (
            <button
                onClick={this.handleClick}>
                ADD
            </button>
        )
    }
}




const mapDispatchToProps = ({
    add: addAction
})


export default connect(null, mapDispatchToProps)(AddButton);




/*
this.state.result.map(pokes=>
    <PokeCard key={pokes.name} name={pokes.name}> </PokeCard>
)
*/


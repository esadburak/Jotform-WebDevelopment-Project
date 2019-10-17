import React from 'react';
import { connect } from 'react-redux';
import { addAction, changeList } from './reduxSrc/actions';
import 'antd/dist/antd.css';
import SortableList  from './SortableList.js';

class StoreViewer extends React.Component {
    constructor(props) {
        super(props)
    }



    componentDidMount() {

        this.props.add()
        setInterval(this.props.add, 1000);

    }



    render() {

        return (<div>

            <SortableList>
            </SortableList>

        </div>
        )
    }
}



const mapDispatchToProps = ({
    add: addAction
})
const ConnectedStoreViewer = connect(null, mapDispatchToProps)(StoreViewer);
export default ConnectedStoreViewer;



/*
this.state.result.map(pokes=>
    <PokeCard key={pokes.name} name={pokes.name}> </PokeCard>
)

            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <MyTable type='table' tableName={'To Do'} dataSource={this.props.listToDo} columns={columns} />
                <MyTable type='table' tableName={'Doing'} dataSource={this.props.listDoing} columns={columns} />
                <MyTable type='table' tableName={'Done'} dataSource={this.props.listDone} columns={columns} />
            </div>
*/

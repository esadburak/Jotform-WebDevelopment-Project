import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import CodoContainer from './CodoContainer.js';
import { addAction } from './reduxSrc/actions';
import { Table } from 'antd';
import 'antd/dist/antd.css';

class StoreViewer extends React.Component {
    constructor(props) {
        super(props)

        axios.get('https://api.jotform.com/form/92382295350964/submissions?apikey=a253771ef3dcbe5c953f78dc816f3a67&orderby=id').then(response => {

            this.props.add(response.data.content)
        })

    }






    render() {


        const columns = [
            {
                title: 'Description',
                dataIndex: 'Desc',
                key: 'Desc',
            },
            {
                title: 'Title',
                dataIndex: 'Title',
                key: 'Title',
            },
        ];
        console.log(columns)
        let id = 0;

        return (
            <div>
                <h2>To Do</h2>
                <Table dataSource={this.props.listToDo} columns={columns} />
                
            
                <h2>Doing</h2>
                <Table dataSource={this.props.listDoing} columns={columns} />
               
               
                <h2>Done</h2>
                <Table dataSource={this.props.listDone} columns={columns} />
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    //  console.log('asd', state.data, state.data.listToDo)
    return {
        listToDo: [] && state.data.listToDo,
        listDoing: [] && state.data.listDoing,
        listDone: [] && state.data.listDone
    }
}

const mapDispatchToProps = ({
    add: addAction
})
const ConnectedStoreViewer = connect(mapStateToProps, mapDispatchToProps)(StoreViewer);
export default ConnectedStoreViewer;



/*
this.state.result.map(pokes=>
    <PokeCard key={pokes.name} name={pokes.name}> </PokeCard>
)
*/

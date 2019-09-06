import uniqueId from 'lodash/uniqueId';
import React from 'react';
import Sortable from 'react-sortablejs';
import { connect } from 'react-redux';
import { addAction } from './reduxSrc/actions';
import { changeList } from './reduxSrc/actions';

class SortableList extends React.Component {



    render() {
        const Header =(str) =>{
            return <div style={{ display: 'flex', justifyContent: 'space-around' }} className="title">{str}</div>
        }
        const groupLeft = this.props.listToDo.map((val, key) => (
            <div key={uniqueId()} data-id={val}>{val}</div>
        ));
        const groupMid = this.props.listDoing.map((val, key) => (
            <div key={uniqueId()} data-id={val}>{val}</div>
        ));
        const groupRight = this.props.listDone.map((val, key) => (
            <div key={uniqueId()} data-id={val}>{val}</div>
        ));

        return (
            <div>



                <div>

                    <div className="row" style={{ display: 'flex', justifyContent: 'space-around' }}>
                        <div className="col-sm-6">{Header("To Do")}
                            <Sortable
                                options={{
                                    sort: false,
                                    animation: 150,
                                    group: {
                                        name: 'shared',
                                        pull: true,
                                        put: true
                                    },
                                    onAdd: (e) => {
                                        console.log(e)
                                        this.props.change(e.item.textContent,"To Do",this.props.add)
                                    }
                                }}
                                className="block-list"
                                onChange={(items) => {
                                    this.setState({ groupLeft: items });
                                }}


                            >
                                {groupLeft}
                            </Sortable>
                        </div>
                        <div className="col-sm-6">{Header("Doing")}
                            <Sortable
                                options={{
                                    sort: false,
                                    animation: 150,
                                    group: {
                                        name: 'shared',
                                        pull: true,
                                        put: true
                                    },
                                    onAdd: (e) => {
                                        this.props.change(e.item.textContent,"Doing",this.props.add)
                                    }
                                }}
                                className="block-list"
                                onChange={(items) => {
                                    this.setState({ groupMid: items });
                                }}
                            >
                                {groupMid}
                            </Sortable>
                        </div>

                        <div className="col-sm-6">{Header("Done")}
                            <Sortable
                                options={{
                                    sort: false,
                                    animation: 150,
                                    group: {
                                        name: 'shared',
                                        pull: true,
                                        put: true
                                    },
                                    onAdd: (e) => {
                                        this.props.change(e.item.textContent,"Done",this.props.add)
                                    }
                                }}
                                className="block-list"
                                onChange={(items) => {
                                    this.setState({ groupRight: items });
                                }}
                            >
                                {groupRight}
                            </Sortable>
                        </div>
                    </div>
                </div>





            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        listToDo: [] && state.data.listToDo,
        listDoing: [] && state.data.listDoing,
        listDone: [] && state.data.listDone
    }
}

const mapDispatchToProps = ({
    add: addAction,
    
    change:changeList
})
const ConnectedSortableList = connect(mapStateToProps, mapDispatchToProps)(SortableList);
export default ConnectedSortableList;



import uniqueId from 'lodash/uniqueId';
import React from 'react';
import Sortable from 'react-sortablejs';
import { connect } from 'react-redux';
import { addAction, dragAction, dropAction, editAction } from './reduxSrc/actions';
import { deleteAction } from './reduxSrc/actions';
import { changeList } from './reduxSrc/actions';
import { orderAction } from './reduxSrc/actions';
import { Card, Icon } from 'antd';
import { Form, Input, Button, Radio } from 'antd';
import Modal from 'react-modal';
import Disqus from './Disqus';


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};



class SortableList extends React.Component {






    constructor(props) {
        super(props)




        this.state = {
            formLayout: 'horizontal',
            modalIsOpen: false,
            formID: -1
        };

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    handleSubmit(e) {
        console.log(this.state.formID)
        console.log(e.target.parentNode.parentNode.parentNode.parentNode.parentNode[0].value)
        console.log(e.target.parentNode.parentNode.parentNode.parentNode.parentNode[1].value)
        this.props.edit({
            sel: this.state.formID,
            title: e.target.parentNode.parentNode.parentNode.parentNode.parentNode[0].value,
            desc: e.target.parentNode.parentNode.parentNode.parentNode.parentNode[1].value

        }, this.props.add)
        this.closeModal()


    }

    openModal(e) {
        this.setState({
            modalIsOpen: true,
            formID: e
        });

    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        this.subtitle.style.color = '#f00';
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }



    handleFormLayoutChange = e => {
        this.setState({ formLayout: e.target.value });
    };
    render() {
        const { formLayout } = this.state;
        const formItemLayout =
            formLayout === 'horizontal'
                ? {
                    labelCol: { span: 4 },
                    wrapperCol: { span: 14 },
                }
                : null;
        const buttonItemLayout =
            formLayout === 'horizontal'
                ? {
                    wrapperCol: { span: 14, offset: 4 },
                }
                : null;

        const deleteSub = e => {
            //   console.log(e.target.parentNode.parentNode.parentNode.parentNode.dataset['id'])
            this.state.formID = -1
            this.props.deleteSubmission(e.target.parentNode.parentNode.parentNode.parentNode.dataset['id'], this.props.add)
        }






        const Header = (str) => {
            return <div style={{ display: 'flex', justifyContent: 'space-around' }} className="title"><font size='8'>{str}</font></div>
        }




        const groupLeft = this.props.listToDo.map((val, key) => (
            <div key={uniqueId()} data-id={val}>
                <Card title={this.props.data[val].answers[4].answer} bordered={true} style={{ width: 300 }}>
                    <p>{this.props.data[val].answers[3].answer}</p>
                    <Icon type="delete" key="delete" onClick={deleteSub} />
                    <Icon formID={val} type="edit" key="edit" onClick={e => { this.openModal(val) }} />
                </Card>
            </div>
        ));
        const groupMid = this.props.listDoing.map((val, key) => (
            <div key={uniqueId()} data-id={val}>
                <Card title={this.props.data[val].answers[4].answer} bordered={true} style={{ width: 300 }}>
                    <p>{this.props.data[val].answers[3].answer}</p>
                    <Icon type="delete" key="delete" onClick={deleteSub} />
                    <Icon formID={val} type="edit" key="edit" onClick={e => { this.openModal(val) }} />
                </Card>
            </div>
        ));
        const groupRight = this.props.listDone.map((val, key) => (
            <div key={uniqueId()} data-id={val}>
                <Card title={this.props.data[val].answers[4].answer} bordered={true} style={{ width: 300 }}>
                    <p>{this.props.data[val].answers[3].answer}</p>
                    <Icon type="delete" key="delete" onClick={deleteSub} />
                    <Icon formID={val} type="edit" key="edit" onClick={e => { this.openModal(val) }} />
                </Card>
            </div>
        ));



        const FormEdit = () => {
            if (this.state.formID != -1) {

                return <div><h2 ref={subtitle => this.subtitle = subtitle}>{this.props.data[this.state.formID].answers[4].answer}</h2>
                    {this.props.data[this.state.formID].answers[3].answer}
                    <Form layout={formLayout}>
                        <Form.Item label="" {...formItemLayout}>

                        </Form.Item>
                        <Form.Item style={{ width: 500 }} label="Title" {...formItemLayout}>
                            <Input placeholder={this.props.data[this.state.formID].answers[4].answer} />
                        </Form.Item>
                        <Form.Item label="Description" {...formItemLayout}>
                            <Input placeholder={this.props.data[this.state.formID].answers[3].answer} />
                        </Form.Item>
                        <Form.Item {...buttonItemLayout}>
                            <Button onClick={this.handleSubmit} type="primary">Submit</Button>
                        </Form.Item>
                    </Form>
                    <Disqus/>
                </div>

            }
            return <div>asd</div>
        }

        return (
            <div>

                

                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    {FormEdit()}
                    <button onClick={this.closeModal}>close</button>
                    

                </Modal>


                <div>

                    <div className="row" style={{ display: 'flex', justifyContent: 'space-around' }} >
                        <div className="col-sm-6">{Header("To Do")}
                            <Sortable
                                options={{
                                    sort: true,
                                    animation: 150,
                                    group: {
                                        name: 'shared',
                                        pull: true,
                                        put: true
                                    },
                                    onAdd: (e) => {

                                        this.props.change(e.item.attributes[0].value, "To Do", this.props.add)
                                    },
                                    onChoose: (e) => { this.props.drag() },
                                    onUnchoose: (e) => { this.props.drop() }
                                }}
                                className="block-list"
                                onChange={(items, sortable, evt) => {
                                    console.log('ITEMs', items)
                                    this.props.order(items, items.map((e, n) =>
                                        this.props.data[e].answers[7].answer != n ? e : 0
                                    ), this.props.add, 'To Do')
                                    console.log('SORT', items, sortable, evt)
                                    this.setState({ groupRight: items });
                                }}


                            >
                                {groupLeft}
                            </Sortable>
                        </div>
                        <div className="col-sm-6">{Header("Doing")}
                            <Sortable
                                options={{
                                    sort: true,
                                    animation: 150,
                                    group: {
                                        name: 'shared',
                                        pull: true,
                                        put: true
                                    },
                                    onAdd: (e) => {
                                        console.log('asdasdda', this.props.data)
                                        this.props.change(e.item.attributes[0].value, "Doing", this.props.add)
                                    },
                                    onChoose: (e) => { this.props.drag() },
                                    onUnchoose: (e) => { this.props.drop() }
                                }}
                                className="block-list"
                                onChange={(items, sortable, evt) => {
                                    console.log('ITEMs', items)
                                    this.props.order(items, items.map((e, n) =>
                                        this.props.data[e].answers[7].answer != n ? e : 0
                                    ), this.props.add, 'Doing')
                                    console.log('SORT', items, sortable, evt)
                                    this.setState({ groupRight: items });
                                }}
                            >
                                {groupMid}
                            </Sortable>
                        </div>

                        <div className="col-sm-6">{Header("Done")}
                            <Sortable
                                options={{
                                    sort: true,
                                    animation: 150,
                                    group: {
                                        name: 'shared',
                                        pull: true,
                                        put: true
                                    },
                                    onAdd: (e) => {
                                        this.props.change(e.item.attributes[0].value, "Done", this.props.add)
                                    },
                                    onChoose: (e) => { this.props.drag() },
                                    onUnchoose: (e) => { this.props.drop() }
                                }}
                                className="block-list"
                                onChange={(items, sortable, evt) => {
                                    console.log('ITEMs', items)
                                    this.props.order(items, items.map((e, n) =>
                                        this.props.data[e].answers[7].answer != n ? e : 0
                                    ), this.props.add, 'Done')
                                    console.log('SORT', items, sortable, evt)
                                    this.setState({ groupRight: items });
                                }}
                            >
                                {groupRight}
                            </Sortable>
                        </div>
                    </div>

                </div>





            </div >
        );
    }
}
const mapStateToProps = (state) => {
    return {
        listToDo: [] && state.data.listToDo,
        listDoing: [] && state.data.listDoing,
        listDone: [] && state.data.listDone,
        data: [] && state.data.alldata
    }
}

const mapDispatchToProps = ({
    add: addAction,
    deleteSubmission: deleteAction,
    order: orderAction,
    drag: dragAction,
    drop: dropAction,
    edit: editAction,

    change: changeList
})
const ConnectedSortableList = connect(mapStateToProps, mapDispatchToProps)(SortableList);
export default ConnectedSortableList;



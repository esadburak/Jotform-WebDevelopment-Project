import React from 'react';
import StoreViewer from './StoreViewer.js';

export default class App extends React.Component {
  render() {
    return (
      <div >
        <header style={{
          background: '#444444',
          color: 'white',
          display: 'flex',
          
        }} ><img height={'95'} src={"https://cdn.jotfor.ms/assets/img/logo/min/logo-new@4x.png"} />
          <h2 style={{ color: 'white', fontSize: '50px', marginLeft: '210px' }}>KANBAN BOARD</h2></header>
        <div style={{width:'100%',height:'10px',background:'#F09819'}}></div>
        <StoreViewer />

      </div>
    );
  }
}
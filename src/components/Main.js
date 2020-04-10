import React, { Component } from 'react';
import UsersCount from './users/Count';
import UsersAdd from './users/Add';
import UsersEdit from './users/Edit';
import UsersList from './users/List';
import Alert from '../Alert';


class Main extends Component {
 

  state = {
    addUser: null,
    editUser: null,
    alert: ''
  }
  componentDidMount(){
    var token=localStorage.getItem('token');
    if(token=="undefined" || token==""){
        this.props.history.push('/login');
    }
  }

  addUser = () => {
    this.setState({
      addUser: {
        title: '',
        description: '',
        url:''
      }
    });
  }
logout=()=>{
  localStorage.setItem('token',"");
  this.props.history.push('/login');
}
  editUser = (user) => {
    this.setState({
      editUser: user
    });
  }

  close = () => {
    this.setState({
      addUser: null,
      editUser: null
    });
  }

  alert = (msg) => {
    this.setState({
      alert: {
        type: Object.keys(msg)[0],
        message: Object.values(msg)[0]
      }
    });
  }

  render() {
    return (

      <div className="container" style={{marginTop:"24px"}}>
     
    
        <button class="ui basic button red active" style={{float:'right',marginRight:'10%'}} onClick={this.logout}>Logout</button>
          <h1 class="ui center aligned icon header">
            <i class="circular address book icon"></i>
            WORKCLUB CONTACTS

          </h1>
       
        <Alert alert={this.state.alert} />
        <div className="d-flex justify-content-between align-items-center" style={{padding:"0% 10%"}}>
        <button class="ui basic button black active" onClick={this.addUser} style={{margin:"20px"}}><i class="icon user" ></i>Add Contact</button>

          <UsersCount />
        </div>
        <UsersList
          editUser={this.editUser}
          alert={this.alert} />
        <UsersAdd
          user={this.state.addUser}
          close={this.close}
          alert={this.alert} />
        <UsersEdit
          user={this.state.editUser}
          close={this.close}
          alert={this.alert} />
      </div>
    );
  }
}

export default Main;
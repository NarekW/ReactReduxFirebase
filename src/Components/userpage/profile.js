import React from 'react';

import { connect } from 'react-redux';


class UserAvatar extends React.Component{
    constructor(props){
        super(props);
        console.log(this.props.userAvt, 'hahahaha');
        this.state = {
            'changeAvatar': false,
             AVATAR_URL:this.props.userAvt,
        }
        this.avatarClickhandler = this.avatarClickhandler.bind(this);
        this.handlerAvatarChnage = this.handlerAvatarChnage.bind(this);
    }
    avatarClickhandler(e){
        this.setState({
            changeAvatar: !this.state.changeAvatar,
        })
    }
    handlerAvatarChnage(e){
        this.setState({
            AVATAR_URL:this.avatarUrl.value
        })

        const db = this.props.firebase.database();

        let regex = /\d+/g;
        let string = window.location.pathname;
        let id = string.match(regex);

        const avatar = db.ref().child('Users').child(`User_${id}`);

        avatar.update({
            'AVATAR':this.avatarUrl.value
        })
    }
    render(){
        return(
            
            <div className="avatar">
                <img src={this.state.AVATAR_URL} alt="photo1" onClick={this.avatarClickhandler} />
                {this.state.changeAvatar?<div><input placeholder="Введите url картинки" ref={(c) => this.avatarUrl = c}/>
                <button onClick={this.handlerAvatarChnage}>Сменить</button></div>:null} 
           </div>
        );
    }
}

class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state={}
    }
    UNSAFE_componentWillMount(){
        let regex = /\d+/g;
        let string = window.location.pathname;
        let matches = string.match(regex);
        

        const db = this.props.firebase.database().ref().child('Users').child(`User_${matches[0]}`);

        db.on('value', (snap) => {
               this.props.SetData(snap.val());
        });
        require('./css/styles.css');
    }
    render(){
        const userData = this.props.userProfileStore.ProfileInfo;   
        console.log('render', userData, 'status');
        return(
            <React.Fragment>
                {
                userData.AVATAR !== undefined
                ? 
                <div className="user_leftpanel">
                <UserAvatar userAvt={userData.AVATAR} firebase={this.props.firebase}/>
                <div className="user_infob">
                <p> id: {userData.id}</p>
                <p> name: {userData.name}</p>
                <p> lastname: {userData.lastname}</p>
                <p> Email: {userData.email}</p>
                <p> Gnder: {userData.gender}</p>
             </div>
             <div className="photos">
                 <h3>Фото</h3>
                 <div className="Photos_blocks">
                  <div className="myphoto">
                    <img src={userData.AVATAR} alt="photo1" />
                  </div>     
                 </div>
             </div>
            </div>
            :
            <div className="user_leftpanel">
                <img src="https://inducol.com.co/skin/frontend/base/default/images/amshopby-overlay.gif" alt="loading"/>
            </div> 
            }
            </React.Fragment>
            
        );
    }
}

export default connect(
    (state, ownProps)=>({
        userProfileStore:state,
    }),
    dispatch=>({
        SetData: (data) => {
            dispatch({ type: 'DATA', data: data});
        },
    })
)(Profile);
import React from 'react';
import './css/regformStyle.css';
//
import { connect } from 'react-redux';


function Input(props) {
    return(
        <React.Fragment>
            <label id="icon" className={props.Labelclass} htmlFor={props.name}>{props.labelValue}<i className={props.icon}></i></label>
            <input type="text" name={props.name} id={props.id} placeholder={props.placeholder} onChange={props.onchange} required/><br/>
        </React.Fragment>
    );
}

function Radio(props) {
    return(
        <React.Fragment>
            <input type="radio" value={props.value} id={props.id} name={props.name} defaultChecked={props.checked} onChange={props.onchange}/>
            <label htmlFor={props.id} className="radio" defaultChecked={props.checked}>{props.value} </label>
        </React.Fragment>
    );
}


class RegistrationForm extends React.Component{
    constructor(){
        super()
        this.state={}

        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleChange = this.toggleChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleLastnameChange = this.handleLastnameChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }
    handleNameChange(e){
        this.props.nameInputValue(e.target.value);
    }
    handleLastnameChange(e){
        this.props.LastNameInputValue(e.target.value);
    }
    handleEmailChange(e){
        this.props.EmailInputValue(e.target.value);
    }
    handlePasswordChange(e){
        this.props.PasswordInputValue(e.target.value);
    }
    toggleChange(e){
        let gender = this.props.registrationStore.regImputsVal.gender;
        this.props.UserGender(gender);
    }
    handleSubmit(e){
        e.preventDefault();
        console.log('asdasd');
        const db = this.props.firebase.database();
        const cutomers = db.ref().child('Users');
        const id = Math.floor(Math.random() * 110);
        const primaKey = 'User_'+id;
        
        cutomers.child(primaKey).set({
            "id":id,
            "name":this.props.registrationStore.regImputsVal.name,
            "lastname": this.props.registrationStore.regImputsVal.lastname,
            "email": this.props.registrationStore.regImputsVal.email,
            "password":this.props.registrationStore.regImputsVal.password,
            "gender": this.props.registrationStore.regImputsVal.gender?'Male':'Female',
            "gallery":'',
            "AVATAR":"https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823__340.jpg"// аватарка по умолчанию
        })
    }
    render(){
        console.log('render');
        const genderStatus = this.props.registrationStore.regImputsVal.gender;
        return(
        <div className="testbox">
            <form className="regForm" onSubmit={this.handleSubmit}>
              <h1>Nbook</h1>
              <hr/>
                <Input placeholder="Имя"     id="Name"     type="text" name="Name"      icon="icon-envelope" onchange={this.handleNameChange}/>
                <Input placeholder="Фамилия"    id="LastName"    type="text" name="LastName"  icon="icon-user" onchange={this.handleLastnameChange}/>
                <Input placeholder="Эл.Адрес"    id="Email"    type="text" name="Email"     icon="icon-user" onchange={this.handleEmailChange}/>
                <Input placeholder="Пароль" id="password" type="text" name="password"  icon="icon-shield" onchange={this.handlePasswordChange}/>
               <div className="gender">
                <Radio value="Женщина" id="male" name="gender" checked={genderStatus}  onchange={this.toggleChange} required/>
                <Radio value="Мужчина" id="female" name="gender" checked={!genderStatus} onchange={this.toggleChange} required/>
            </div>
                <span><input type="checkbox" required/> Я принимаю условия <a href="#lic">лицензионного соглашения</a></span> 
                <button type="submit" value="Submit">Регистрация</button>
            </form>
        </div>    
        );
    }
}

export default connect(
    (state, ownProps)=>({
        registrationStore:state,
        ownProps
    }),
    dispatch=>({
        nameInputValue: (userName) => {
            dispatch({ type: 'REG_USERNAME', inputvalue: userName});
        },
        LastNameInputValue: (userLastName) => {
            dispatch({ type: 'REG_LASTNAME', inputvalue: userLastName});
        },
        EmailInputValue: (userEmail) => {
            dispatch({ type: 'REG_EMAIL', inputvalue: userEmail});
        },
        PasswordInputValue: (userPassword) => {
            dispatch({ type: 'REG_PASSWORD', inputvalue: userPassword});
        },
        UserGender: (userGender) =>{
            dispatch({ type:'REG_GENDER', inputvalue: !userGender })
        }
    })
)(RegistrationForm);
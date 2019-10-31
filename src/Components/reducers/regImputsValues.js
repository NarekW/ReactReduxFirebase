let UserRegInfo = {
    "id":'',
    "name":'',
    "lastname":'',
    "email":'',
    "gender":true,
    "password":'',
  };

export default function ImputsValues(state=UserRegInfo, action) {
    if(action.type === 'REG_USERNAME'){
        state.name = action.inputvalue;
    }
    else if(action.type === 'REG_LASTNAME'){
        state.lastname = action.inputvalue;
    }
    else if(action.type === 'REG_EMAIL'){
        state.email = action.inputvalue;
    }
    else if(action.type === 'REG_GENDER'){
        state.gender = action.inputvalue;
    }
    else if(action.type === 'REG_PASSWORD'){
        state.password = action.inputvalue;
    }
    return state;
  }
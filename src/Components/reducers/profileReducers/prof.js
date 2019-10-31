let UserInfo = {};

export default function ProfileInfo(state=UserInfo, action) {
    if(action.type === 'DATA'){
        state = action.data;
    }
    return state;
  }
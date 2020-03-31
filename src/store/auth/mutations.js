import { LocalStorage } from 'quasar'
export function USER_LOGIN(state, payload) {
    state.AppActiveUser.uid         = payload.user.id;
    state.AppActiveUser.displayName = payload.user.name; // From Auth
    state.AppActiveUser.about       = "I love this app.";
    state.AppActiveUser.photoURL    = payload.user.profile; // From Auth
    state.AppActiveUser.status      = "online";
    state.AppActiveUser.userRole    = payload.user.role;
    LocalStorage.set("userInfo", {user_info:state.AppActiveUser,access_token:payload.access_token})
}
export function UPDATE_USER_LOGIN(state, payload) {
    state.AppActiveUser = payload.user_info
}
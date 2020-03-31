import { LocalStorage } from 'quasar'
const userDefaults = {
  uid: 0,          // From Auth
  displayName: "John Doe", // From Auth
  about: "Dessert chocolate cake lemon drops.",
  photoURL: '', // From Auth
  status: "online",
  userRole: "admin",
};
export default function () {
  return {
    AppActiveUser: userDefaults,
    token: LocalStorage.getItem("userInfo") || ''
  }
}

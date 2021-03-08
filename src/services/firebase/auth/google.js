import firebase from "../init";

const login = () => {
  console.log("login");
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      var credential = result.credential;

      var token = credential.accessToken;
      var user = result.user;
      console.log({ token, user });
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
    });
};

export default { login };

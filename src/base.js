import Rebase from 're-base';
import firebase from 'firebase';
import secret from './secret';

const firebaseApp = firebase.initializeApp(secret.firebase);

const base = Rebase.createClass(firebaseApp.database());

// named export
export { firebaseApp };

// default export
export default base;

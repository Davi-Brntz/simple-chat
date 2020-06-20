import firebase, { app } from 'firebase'

class Fire {
    constructor() {
        this.init()
        this.checkAuth()
    }

    init = () => {
        if(!firebase.apps.length){
            firebase.initializeApp({
                apiKey: "AIzaSyDuAA9FRmOxN73Vm1M29vXBICu38N7snvk",
                authDomain: "chat-5309f.firebaseapp.com",
                databaseURL: "https://chat-5309f.firebaseio.com",
                projectId: "chat-5309f",
                storageBucket: "chat-5309f.appspot.com",
                messagingSenderId: "1096846524778",
                appId: "1:1096846524778:web:7ec0102241ba74c6e2e513"
            });
              
        }
    };
    

    checkAuth = () => {
        firebase.auth().onAuthStateChanged(user=>{
            if(!user){
                firebase.auth().signInAnonymously();
            }
        })
    };

    send = messages => {
        messages .forEach(item => {
            const message = {
                text: item.text,
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                user: item.user
            }
            this.db.push(message)
        });
    };

    parse = message => {
        const {user, text, timestamp} = message.val()
        const {key:_id} = message
        const createdAt = new Date(timestamp)
        
        return{
            _id,
            createdAt,
            text,
            user
        };
    };

    get = callback => {
        this.db.on('child_added', snapshot => callback(this.parse(snapshot)));

    };

    off(){
        this.db.off();
    }

    get db(){
        return firebase.database().ref("messages");
    }

    get uid(){
        return (firebase.auth().currentUser || {}).uid
    }

}

export default new Fire();
import React from 'react';
import firebase from '../firebase';
import './Chatbox.css';

class Chatbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chats: []
        }
    }
    componentDidMount(){
        const chatRef = firebase.database().ref('general');
        chatRef.on('value', snapshot => {
            const getChats = snapshot.val();
            let ascChats = []
            for(let chat in getChats){
                if(getChats[chat].message !== ''){
                    ascChats.push({
                        id: chat,
                        message: getChats[chat].message,
                        user: getChats[chat].user,
                        date: getChats[chat].timestamp
                    });
                }
            }
            const chats = ascChats.reverse();
            this.setState({chats});
        });
    }
    render() {
        return(
            <div className="chatbox">
                <ul className="chat-list">
                    {this.state.chats.map(chat => {
                        const postDate = new Date(chat.date);
                        return(
                            <li className="d-flex justify-content-start" key={chat.id}>
                                <em className="m-1">{postDate.getDate() + '/' + (postDate.getMonth()+1)}</em>
                                <strong className="m-1">{chat.user}:</strong>
                                <div className="m-1">{chat.message}</div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        );
    }
}

export default Chatbox;
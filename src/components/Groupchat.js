import React from "react";
import { Redirect } from "react-router-dom";
import chat from "../lib/chat";
import config from "../config";
import { CometChat } from '@cometchat-pro/chat';
import '../index.css';

var usersRequest = new CometChat.UsersRequestBuilder().setLimit(10).build();

class Groupchat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      receiverID: "",
      messageText: null,
      groupMessage: [],
      user: {},
      isAuthenticated: true,
      presence: [],
      userList: []
    };
    this.GUID = config.GUID;

  }
  sendMessage = () => {
    chat.sendGroupMessage(this.GUID, this.state.messageText).then(
      message => {
        console.log("Message sent successfully:", message);
        this.setState(
          prevState => ({
            groupMessage: [...prevState.groupMessage, message],
            messageText: null,
          }),
          () => {
            this.scrollToBottom();
          }
        );
      },
      error => {
        if (error.code === "ERR_NOT_A_MEMBER") {
          chat.joinGroup(this.GUID).then(response => {
            this.sendMessage();
          });
        }
      }
    );
  };
  scrollToBottom = () => {
    const chat = document.getElementById("chatList");
    chat.scrollTop = chat.scrollHeight;
  };
  handleSubmit = event => {
    event.preventDefault();
    this.sendMessage();
    event.target.reset();
  };
  handleChange = event => {
    this.setState({ messageText: event.target.value });
  };
  getUser = () => {
    chat
      .getLoggedinUser()
      .then(
        user => {this.setState({user})},
        error => {
          console.log(error)
          this.setState({
            isAuthenticated: false
          });
          this.props.history.push('./login')

        })

  };

  messageListener = () => {
    chat.addMessageListener((data, error) => {
      if (error) return console.log(`error: ${error}`);
      this.setState(
        prevState => ({
          groupMessage: [...prevState.groupMessage, data]
        }),
        () => {
          this.scrollToBottom();
        }
      );
    });
  };

  getUserStatus = (state) => {
    usersRequest.fetchNext().then(
      userList => {
        state["userList"] = userList
      },
      error => {
        console.log("User list fetching failed with error:", error);
      }
    );
  }

  userListener = () => {
    chat.addUserListener((data, error) => {
      if (error) console.log(`error: ${error}`);
      this.setState(
        prevState => ({
          presence: [...prevState.presence, data]
        })
      )
    });
  }

  chatSetup =() =>{
    const state = {};
    this.messageListener();
    this.getUserStatus(state);
    this.userListener();
    console.log("Get USer",state)
    this.getUser();
    console.log(this.state.user)
  }



  render() {
    console.log("ReRender");
    const { isAuthenticated } = this.state;
    if (!isAuthenticated) {
      return <Redirect to="/" />;
    }
    return (
      /*<div className="conatiner">
        <div className="row">
          <div className="col-md-3">
            <div className="user-list">
              <ul className="nav nav-pills nav-stacked">
                {this.state.userList.map(u => (
                  u.status === "online" ?
                    (<li key={u.uid}>
                      <img src={u.avatar} className="img-circle" alt="Cinque Terre" width="40" height="40"/>
                      <span style={{marginLeft: 20,textDecoration: false }}><span style={{ color: "green" }} >{u.uid}</span></span>
                    </li>):
                    (<li key={u.uid}>
                        <img src={u.avatar} className="img-circle" alt="Cinque Terre" width="40" height="40"/>
                        <span style={{marginLeft: 20,textDecoration: false }}><span  style={{ color: "red" }} >{u.uid}</span></span>
                    </li>)
                ))}
              </ul>
            </div>
            </div>
            <div className="col-md-9">
              <div className="chatWindow">
                <ul className="chat" id="chatList">
                  {this.state.groupMessage.map(data => (
                    <div key={data.id}>
                      {this.state.user.uid === data.sender.uid ? (
                        <li className="self">
                          <div className="msg">
                            <p>{data.sender.uid}</p>
                            <div className="message"> {data.data.text}</div>
                          </div>
                        </li>
                      ) : (
                          <li className="other">
                            <div className="msg">
                              <p>{data.sender.uid}</p>
                              <div className="message"> {data.data.text} </div>
                            </div>
                          </li>
                        )}
                    </div>
                  ))}
                </ul>
                <div className="chatInputWrapper">
                  <form onSubmit={this.handleSubmit}>
                    <input
                      className="textarea input"
                      type="text"
                      placeholder="Enter your message..."
                      onChange={this.handleChange}
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>*/
        <div></div>
    );
  }
}
export default Groupchat;
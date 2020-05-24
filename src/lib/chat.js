import {CometChat} from '@cometchat-pro/chat';
import config from '../config';
export default class CCManager {
    static LISTENER_KEY_MESSAGE = "msglistener";
    static appId = config.appId;
    static apiKey = config.apiKey;
    static  LISTENER_KEY_GROUP = "grouplistener";
    static appSetting = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion("us").build();

    static init(){
        console.log("calling init");
        console.log(CCManager.appId);
        return CometChat.init(CCManager.appId,CCManager.appSetting);
    }

    static getTextMessage(uid, text, msgType) {
        console.log(uid);
        if (msgType === "user") {
          return new CometChat.TextMessage(
            uid,
            text,
            CometChat.RECEIVER_TYPE.USER
          );
        } else {
          return new CometChat.TextMessage(
            uid,
            text,
            CometChat.RECEIVER_TYPE.GROUP
          );
        }
      }
      static getLoggedinUser() {
        return CometChat.getLoggedinUser();
      }
      static login(UID) {
        return CometChat.login(UID, this.apiKey);
      }
      static getGroupMessages(GUID, callback, limit = 30) {
        const messagesRequest = new CometChat.MessagesRequestBuilder()
          .setGUID(GUID)
          .setLimit(limit)
          .build();
        callback();
        return messagesRequest.fetchPrevious();
      }
      static sendGroupMessage(UID, message) {
        const textMessage = this.getTextMessage(UID, message, CometChat.RECEIVER_TYPE.GROUP);
        console.log(textMessage);
        CometChat.sendMessage(textMessage).then(
            message => {
              console.log("Message sent successfully:", message);
            },
            error => {
              console.log("Message sending failed with error:", error);
        });
      }
      static joinGroup(GUID) {
        return CometChat.joinGroup(GUID, CometChat.GROUP_TYPE.PUBLIC, "");
      }
      static addMessageListener(callback) {
        CometChat.addMessageListener(
          this.LISTENER_KEY_MESSAGE,
          new CometChat.MessageListener({
            onTextMessageReceived: textMessage => {
              callback(textMessage);
            }
          })
        );
      }
    }
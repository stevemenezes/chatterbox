import {CometChat} from '@cometchat-pro/chat';
import config from '../config';
export default class CCManager {
    static LISTENER_KEY_MESSAGE = "msglistener";
    static appId = config.appId;
    static apiKey = config.apiKey;
    static  LISTENER_KEY_GROUP = "grouplistener";
    static appSetting = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion("us").build();

    static init(){
        return CometChat.init(CCManager.appId,CCManager.appSetting);
    }

    static getTextMessage(uid, text, msgType) {
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
        return CometChat.sendMessage(textMessage);
      }
      static joinGroup(GUID) {
        return CometChat.joinGroup(GUID, CometChat.GROUP_TYPE.PUBLIC, "");
      }
      static addMessageListener(callback) {
        CometChat.addMessageListener(
          this.LISTENER_KEY_MESSAGE,
          new CometChat.MessageListener({
            onTextMessageReceived: textMessage => {
              console.log(textMessage);
              callback(textMessage);
            }
          })
        );
      }

      static addUserListener(callback){
        CometChat.addUserListener(
          this.LISTENER_KEY_GROUP,
          new CometChat.UserListener({
            onUserOnline: onlineUser => {
              /* when someuser/friend comes online, user will be received here */
            console.log("On User Online:", { onlineUser });
            },
            onUserOffline: offlineUser => {
              /* when someuser/friend went offline, user will be received here */
              console.log("On User Offline:", { offlineUser });
            }
          })
        )
      }

    }
import React, { useState } from "react";
import { Drawer, Button } from "antd";
import { Label } from "semantic-ui-react";
import { getMessages, sendMessage } from "../../Service/User";
import styles from "./Messages.module.css";
import { Input } from "antd";
const { TextArea } = Input;
export default function MessageDrawer(props) {
   const [visible, setVisible] = useState(false);
   const [message, setMessages] = useState([]);
   const [messageToSend, setMessageToSend] = useState("");

   const showDrawer = async () => {
      const messages = await getMessages(props.input);
      setMessages(messages);
      console.log(message);
      setVisible(true);
   };

   const onClose = () => {
      setVisible(false);
   };

   const sendMessageToFriend = async () => {
      console.log("YO");
      console.log(messageToSend);
      await sendMessage(props.input, messageToSend);
      setMessageToSend("");
      setMessages(await getMessages(props.input));
   };

   return (
      <>
         <div>
            <Label image onClick={showDrawer} size="huge">
               <img src={props.pic} />
               {props.input}
            </Label>
         </div>
         <Drawer
            title={props.input}
            placement="right"
            closable={false}
            width="30vw"
            onClose={onClose}
            visible={visible}>
            {message.map((item, index) => {
               return item.name === props.input ? (
                  <div key={index} className={`${styles.container} ${styles.darker}`}>
                     <p style={{ color: "black", fontWeight: "bold", fontSize: "medium" }}>
                        {item.content}
                     </p>
                  </div>
               ) : (
                  <div key={index} className={styles.container}>
                     <p style={{ color: "black", fontWeight: "bold", fontSize: "medium" }}>
                        {item.content}
                     </p>
                  </div>
               );
            })}
            <div>
               <TextArea
                  className="m-2"
                  rows={4}
                  value={messageToSend}
                  placeholder="Input a message"
                  showCount
                  onChange={(value) => setMessageToSend(value.currentTarget.value)}
               />
               <Button className="m-2" type="primary" onClick={sendMessageToFriend}>
                  Send
               </Button>
            </div>
         </Drawer>
      </>
   );
}

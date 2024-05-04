import React, { useEffect, useState } from "react";
import InputField from "./InputField";
import { useDispatch, useSelector } from "react-redux";
import Messages from "./Messages";
import axios from "axios";
import { setMessages } from "../slices/messagesSlice";
import { io } from 'socket.io-client';

const Field = () => {
  const currentChannel = useSelector((state) => state.currentChannel.currentChannel)
  const userName = useSelector((state) => state.user.userName);
  const messages = useSelector(state => state.messages.messages)
  const token = useSelector((state) => state.user.token);

  const dispatch = useDispatch();
  const [messagesLocal, setMessagesLocal] = useState(null)

  useEffect(() => {
    const socket = io();
    socket.on('newMessage', (payload) => {
    setMessagesLocal(payload)
    });
  
    return (next) => (action) => next(action);
}, [])

  useEffect(() => {
    if (messagesLocal) {
      dispatch(setMessages(messagesLocal))
    }
  },[messagesLocal])

  return (
    <>
      <div className="col p-0 h-100">
        <div className="d-flex flex-column h-100">
          <div className="bg-light mb-4 p-3 shadow-sm small">
            <p className="m-0">
              <b># {currentChannel && currentChannel.name}</b>
            </p>
            <span className="text-muted">0 сообщений</span>
          </div>
          <div
            id="messages-box"
            className="chat-messages overflow-auto px-5"
          >
            { messages.flat().length > 0 && (
              messages.flat().map((el) => {
                return (
                <Messages username={el.username} message={el.body} key={el.id}/> 
              )
            })
            )}
          </div>
          <InputField channelId={currentChannel && currentChannel.id} />
        </div>
      </div>
    </>
  );
};

export default Field;

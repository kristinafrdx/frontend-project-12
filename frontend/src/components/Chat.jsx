import react, { useEffect, useState, useSyncExternalStore } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setChannels } from "../slices/channelsSlice";
import Header from "./Header";
import FieldMessage from "./FieldMessages";
import Channels from "./Channels";
import { setMessages } from '../slices/messagesSlice';

const Chat = () => {
  const token = useSelector((state) => state.user.token);
  const userName = useSelector((state) => state.user.userName);

  const dispatch = useDispatch();

  const getChannels = async (token) => {
    await axios.get("/api/v1/channels", {
      headers: {
        Authorization: `Bearer ${token}`,
      }})
    .then((response) => {
      dispatch(setChannels(response.data));
      // console.log(response.data); // =>[{ id: '1', name: 'general', removable: false }, ...]
    })
    .catch((e) => {
      console.log(e)
    })
  }

  const getMessages = async (token) => {
    await axios.get('/api/v1/messages', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      }).then((response) => {
        dispatch(setMessages(response.data))
        // console.log(response.data); // =>[{ id: '1', body: 'text message', channelId: '1', username: 'admin }, ...]
      })
      .catch((e) => {
        console.log(e)
      })
  }

  useEffect(() => {
    getChannels(token);
    getMessages(token)
  }, [token]);

  return (
    <div className="h-100" id="chat">
      <div className="d-flex flex-column h-100">
        <Header />
        <div className="container h-100 my-4 overflow-hidden rounded shadow">
          <div className="row h-100 bg-white flex-md-row">
            <Channels />
            <FieldMessage />
          </div>
        </div>
      </div>
      <div className="Toastify"></div>
    </div>
  );
};

export default Chat;

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { setChannels } from '../slices/channelsSlice';
import Header from './Header.jsx';
import Field from './Field';
import Channels from './Channels';
import { setMessages } from '../slices/messagesSlice';
import 'react-toastify/dist/ReactToastify.css';

const Chat = () => {
  const token = localStorage.getItem('token');

  const dispatch = useDispatch();

  const getChannels = async () => {
    await axios
      .get('/api/v1/channels', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        dispatch(setChannels(response.data));
        // console.log(response.data); // =>[{ id: '1', name: 'general', removable: false }, ...]
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getMessages = async () => {
    await axios
      .get('/api/v1/messages', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        dispatch(setMessages(response.data));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  /* eslint-disable */
  useEffect(() => {
    getChannels();
    getMessages();
  }, [token]);
  /* eslint-enable */

  return (
    <>
      <Header />
      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100">
          <div className="container h-100 my-4 overflow-hidden rounded shadow">
            <div className="row h-100 bg-white flex-md-row">
              <Channels />
              <Field />
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Chat;

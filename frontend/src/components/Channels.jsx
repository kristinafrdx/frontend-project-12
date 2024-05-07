import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentChannel } from "../slices/currentChannelSlice";
import CreateChannel from "./CreateChannel";
import { Dropdown, ButtonGroup, Button } from "react-bootstrap";
import DeleteChannel from "./DeleteChannel";
import { addChanel } from "../slices/channelsSlice";
import { io } from "socket.io-client";
import RenameChannel from "./RenameChannel";
import { useTranslation } from "react-i18next";
import leo from "leo-profanity";
import { init } from "rollbar";

const Channels = () => {
  const { t } = useTranslation();

  const initChannel = useSelector(
    (state) => state.currentChannel.currentChannel
  );
  const [activeChannel, setActiveChannel] = useState(initChannel);
  const [showDeleteWindow, setShowDeleteWindow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [updateChannel, setUpdateChannel] = useState(null);
  const [showRenameWindow, setShowRenameWindow] = useState(false);

  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels.channels);

  const handleChannel = (channel) => {
    setActiveChannel(channel);
    dispatch(setCurrentChannel(channel));
  };

  const handleClick = () => {
    setShowModal(true);
  };

  const handleDelete = () => {
    setActiveChannel(activeChannel)
    setShowDeleteWindow(true);
  };

  const handleRename = () => {
    setShowRenameWindow(true);
    setActiveChannel(activeChannel)
  };

  useEffect(() => {
    const socket = io();
    socket.on("newChannel", (payload) => {
      setUpdateChannel(payload);
    });
    return (next) => (action) => next(action);
  }, []);

  /* eslint-disable */
  useEffect(() => {
    if (updateChannel) {
      dispatch(addChanel(updateChannel));
    }
  }, [updateChannel]);
  /* eslint-enable */

  return (
    <>
      <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
        <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
          <b>{t("chat.channels")}</b>
          <button
            type="button"
            className="p-0 text-primary btn btn-group-vertical"
            onClick={handleClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              width="20"
              height="20"
              fill="currentColor"
            >
              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"></path>
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"></path>
            </svg>
            <span className="visually-hidden">{t("signs.plus")}</span>
          </button>
        </div>
        <ul
          id="channels-box"
          className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
        >
          {channels.map((channel) =>
            !channel.removable ? (
              <li className="nav-item w-100" key={channel.id}>
                <button
                  type="button"
                  className={`w-100 rounded-0 text-truncate btn-text-start btn 
                ${
                  Number(initChannel.id) === Number(channel.id) &&
                  "btn-secondary"
                }
                `}
                  onClick={() => handleChannel(channel)}
                >
                  <span className="me-1">{t("signs.sharp")}</span>
                  {channel.name}
                </button>
              </li>
            ) : (
              <li className="nav-item w-100" key={channel.id}>
                <Dropdown as={ButtonGroup} className="d-flex btn-group">
                  <button
                    className={`w-100 rounded-0 text-truncate btn-text-start btn ${
                      Number(initChannel.id) === Number(channel.id) &&
                      "btn-secondary"
                    }`}
                    style={{boxShadow: "none"}}
                    onClick={() => handleChannel(channel)}
                  >
                    <span className="me-1">{t("signs.sharp")}</span>
                    {leo.clean(channel.name)}
                  </button>
                  <Dropdown.Toggle
                    variant="text-start"
                    className={`rounded-0 text-start ${
                      Number(initChannel.id) === Number(channel.id) &&
                      "btn-secondary"
                    }
                    `}
                  >
                    <span className="visually-hidden">Управление каналом</span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu onClick={() => setActiveChannel(channel)}>
                    <Dropdown.Item onClick={() => handleDelete()}>
                      {t("chat.remove")}
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleRename()}>
                      {t("chat.rename")}
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
            )
          )}
        </ul>
      </div>
      {showModal && (
        <CreateChannel
          channel={activeChannel}
          setShowModal={setShowModal}
          setActiveChannel={setActiveChannel}
          title="Добавить канал"
        />
      )}
      {showDeleteWindow && (
        <DeleteChannel
          channel={activeChannel}
          setShowDeleteWindow={setShowDeleteWindow}
          handleChannel={handleChannel}
        />
      )}
      {showRenameWindow && (
        <RenameChannel
          channel={activeChannel}
          setShowModal={setShowRenameWindow}
        />
      )}
    </>
  );
};

export default Channels;

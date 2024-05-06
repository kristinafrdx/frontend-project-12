import React, { useEffect, useRef } from "react";
import { Modal, Form } from "react-bootstrap";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import axios from "axios";
import { setChannels } from "../slices/channelsSlice";
import { setCurrentChannel } from "../slices/currentChannelSlice";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRollbar } from "@rollbar/react";

const RenameChannel = ({ setShowModal, channel }) => {
  const { t } = useTranslation();
  const channels = useSelector((state) => state.channels.channels);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const rollbar = useRollbar();
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current && inputRef.current.focus();
    inputRef.current && inputRef.current.select();
  }, []);

  const channelsNames = () => {
    return channels.map((el) => el.name);
  };
  const names = channelsNames();

  const close = () => {
    setShowModal(false);
  };

  const getSchema = () =>
    yup.object().shape({
      name: yup
        .string()
        .trim()
        .required(t("errors.required"))
        .min(3, t("errors.minMax"))
        .max(20, t("errors.minMax"))
        .notOneOf(names, t("errors.uniq")),
    });

  const formik = useFormik({
    initialValues: {
      name: "" || channel.name,
    },
    validationSchema: getSchema(),
    onSubmit: async (values) => {
      try {
        const editedChannel = { name: values.name };
        await axios
          .patch(`/api/v1/channels/${channel.id}`, editedChannel, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            setShowModal(false);
            const update = channels.map((el) =>
              el.id === response.data.id ? response.data : el
            );
            dispatch(setChannels(update));
            dispatch(setCurrentChannel(response.data));
            toast.success(t("toasts.successRename"));
          });
      } catch (e) {
        console.log(e);
        toast.error(t("toasts.errorRename"));
        rollbar.error("Rename channel", e);
      }
    },
  });

  return (
    <>
      <Modal show onHide={(e) => close(e)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{t("chat.renameChannel")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group controlId="name">
              <Form.Control
                onChange={formik.handleChange}
                ref={inputRef}
                value={formik.values.name}
                isInvalid={formik.errors.name && formik.touched.name}
                className="mb-2"
                name="name"
                disabled={formik.isSubmitting}
              />
              <Form.Label visuallyHidden />
              <Form.Control.Feedback type="invalid">
                {formik.errors.name}
              </Form.Control.Feedback>
              <div className="d-flex justify-content-end">
                <button
                  type="button"
                  onClick={close}
                  className="me-2 btn btn-secondary"
                >
                  {t("chat.cancel")}
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={formik.isSubmitting}
                >
                  {t("chat.send")}
                </button>
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default RenameChannel;

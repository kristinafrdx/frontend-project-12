import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Modal, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useRollbar } from '@rollbar/react';
import { setCurrentChannel } from '../slices/currentChannelSlice';
import { useToken } from './context/authContext';

const CreateChannel = ({ setShowModal, setActiveChannel, handleScroll }) => {
  const { t } = useTranslation();
  const channels = useSelector((state) => state.channels.channels);
  const rollbar = useRollbar();
  const dispatch = useDispatch();
  const { token } = useToken();

  const channelsNames = () => channels.map((el) => el.name);
  const names = channelsNames();

  const close = () => {
    setShowModal(false);
  };

  const getSchema = () => yup.object().shape({
    name: yup
      .string()
      .trim()
      .required(t('errors.required'))
      .min(3, t('errors.minMax'))
      .max(20, t('errors.minMax'))
      .notOneOf(names, t('errors.uniq')),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: getSchema(),
    onSubmit: async (values) => {
      try {
        const newChannel = { name: values.name };
        axios
          .post('/api/v1/channels', newChannel, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            setShowModal(false);
            setActiveChannel(response.data);
            dispatch(setCurrentChannel(response.data));
            toast.success(t('toasts.successCreate'));
            setTimeout(() => {
              handleScroll();
            }, 0);
          });
      } catch (e) {
        console.error(e);
        toast.error(t('toasts.errorCreate'));
        rollbar.error('Create channel', e);
      }
    },
  });

  return (
    <Modal show onHide={(e) => close(e)} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('chat.addChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group controlId="name">
            <Form.Control
              onChange={formik.handleChange}
              value={formik.values.name}
              isInvalid={formik.errors.name && formik.touched.name}
              autoFocus
              className="mb-2"
              name="name"
              disabled={formik.isSubmitting}
            />
            <Form.Label visuallyHidden>{t('chat.nameChannel')}</Form.Label>
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <button
                type="button"
                onClick={close}
                className="me-2 btn btn-secondary"
              >
                {t('chat.cancel')}
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={formik.isSubmitting}
              >
                {t('chat.send')}
              </button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateChannel;

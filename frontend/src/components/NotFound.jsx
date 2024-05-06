import React from "react";
import { useTranslation } from 'react-i18next';
import Header from './Header';
import imageNotfount from '../images/404-error.png';

const NotFoundPage = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Header />
      <div className="text-center">
        <h1 className="h4 text-muted mt-3">{t('notfound.notfoundPage')}</h1>
        <p className="text-muted">{t('notfound.canGo')} <a href="/">{t('notfound.linkToPage')}</a></p>
        <img alt="Страница не найдена" className="img-fluid" src={imageNotfount} />
      </div>
    </div>
  );
};

export default NotFoundPage;

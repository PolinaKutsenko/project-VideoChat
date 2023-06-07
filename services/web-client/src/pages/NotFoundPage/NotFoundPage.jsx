import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import routes from '../../const/routes.js';
import './NotFoundPage.css';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div id="not-found-page">
      <h1 className="text">{t('notFoundPage.pageNotFound')}</h1>
      <p className="text">
        {t('notFoundPage.butYouCanGo')}
        <Link id="not-found-url" to={routes.chatPagePath()}>
          {` ${t('notFoundPage.toHomePage')}`}
        </Link>
      </p>
    </div>
  );
};

export default NotFoundPage;

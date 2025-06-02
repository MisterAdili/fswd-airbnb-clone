import React from 'react';
import ReactDOM from 'react-dom';
import Layout from '@src/layout';
import Success from './success';

document.addEventListener('DOMContentLoaded', () => {

  ReactDOM.render(
    <Layout>
      <Success />,
      document.body.appendChild(document.createElement('div')),
    </Layout>
  )
})
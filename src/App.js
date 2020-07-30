import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import MainPage from './Main/MainPage';

import { ContactsProvider } from './Main/Context';

function App() {
  return (
    <ContactsProvider>
      <MainPage />
    </ContactsProvider>
  );
}

export default App;

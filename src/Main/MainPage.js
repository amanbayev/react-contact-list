import React, { useState, useEffect } from 'react';
import { Layout, PageHeader, Space, Switch } from 'antd';
import styled from 'styled-components';
import ContactList from './ContactList';
import CreateContact from './CreateContact';

import { useThemeSwitcher } from 'react-css-theme-switcher';

const MainLayout = styled(Layout)`
  width: 100vw;
  height: 100vh;
  align-items: center;
`;

const InsideLayout = styled(Layout)`
  width: 700px;
`;

function MainPage() {
  const [display, setDisplay] = useState('default'); // default, create
  const [isEditing, setIsEditing] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null); // trigger modes for create contact component
  const [isDarkMode, setIsDarkMode] = useState();
  const { switcher, currentTheme, status, themes } = useThemeSwitcher();

  const toggleTheme = (isChecked) => {
    setIsDarkMode(isChecked);
    switcher({ theme: isChecked ? themes.dark : themes.light });
  };

  useEffect(() => {
    if (isEditing) setDisplay('create');
  }, [isEditing]);

  if (status === 'loading') {
    return null;
  }

  const onAddNewClick = () => {
    setDisplay('create');
  };

  const onCancelClick = () => {
    setDisplay('default');
    if (isEditing) setIsEditing(false);
  };

  return (
    <MainLayout>
      <InsideLayout>
        <PageHeader title="My Contacts" subTitle="React application" />
        <Space style={{ marginBottom: '28px' }}>
          Dark Mode? <Switch checked={isDarkMode} onChange={toggleTheme} />
        </Space>
        {display === 'default' && (
          <ContactList
            editingTrigger={setIsEditing}
            setCurrentRecord={setCurrentRecord}
            onAddNewClick={onAddNewClick}
          />
        )}
        {display === 'create' && (
          <CreateContact
            onCancelClick={onCancelClick}
            isEditing={isEditing}
            currentRecord={currentRecord}
          />
        )}
      </InsideLayout>
    </MainLayout>
  );
}

export default MainPage;

import React, { useState, useEffect } from 'react';
import { Layout, PageHeader } from 'antd';
import styled from 'styled-components';
import ContactList from './ContactList';
import CreateContact from './CreateContact';

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

  const onAddNewClick = () => {
    setDisplay('create');
  };

  const onCancelClick = () => {
    setDisplay('default');
    if (isEditing) setIsEditing(false);
  };

  useEffect(() => {
    if (isEditing) setDisplay('create');
  }, [isEditing]);

  return (
    <MainLayout>
      <InsideLayout>
        <PageHeader title="My Contacts" subTitle="React application" />
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

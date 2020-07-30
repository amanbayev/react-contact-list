import React, { useState, useContext, useEffect } from 'react';
import { Table, Space, Button, Divider } from 'antd';
import { ContactsContext } from './Context';
import { useContacts } from './useContacts';
import moment from 'moment';

const dateFormat = 'DD/MM/YYYY';

const ContactList = ({ onAddNewClick, editingTrigger, setCurrentRecord }) => {
  const [contacts, setContacts] = useContext(ContactsContext);
  // const [currentContact, setCurrentContact] = useState(null);
  // editingTrigger={setIsEditing}
  // setCurrentRecord={setCurrentRecord}
  const { deleteContact } = useContacts();

  useEffect(() => {
    let savedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (savedContacts) {
      savedContacts.birthday = moment(savedContacts.birthday).format(
        dateFormat,
      );
      setContacts(savedContacts);
    }
  }, []);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone',
      key: 'phone',
    },
    { title: 'Birthday', dataIndex: 'birthday', key: 'birthday' },
    { title: 'Gender', dataIndex: 'gender', key: 'gender' },
    { title: 'Relative?', dataIndex: 'isRelative', key: 'isRelative' },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a
            style={{ color: '#ffc069' }}
            onClick={(e) => {
              e.preventDefault();
              setCurrentRecord(record);
              editingTrigger(true);
            }}
          >
            Update
          </a>
          <a
            style={{ color: '#ff4d4f' }}
            onClick={(e) => {
              e.preventDefault();
              deleteContact(record);
            }}
          >
            Delete
          </a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Space>
        <Button type="primary" onClick={onAddNewClick}>
          Add new contact
        </Button>
      </Space>
      <Divider />
      <Table dataSource={contacts} columns={columns} />
    </>
  );
};

export default ContactList;

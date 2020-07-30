import React, { useContext } from 'react';
import { ContactsContext } from './Context';
import { message } from 'antd';

const dateFormat = 'DD/MM/YYYY';

export const useContacts = () => {
  const [contacts, setContacts] = useContext(ContactsContext);

  // basic CRUD with local storage

  const createContact = (values) => {
    values.birthday = values.birthday.format(dateFormat);
    setContacts((currentList) => {
      localStorage.setItem(
        'contacts',
        JSON.stringify([...currentList, values]),
      );
      return [...currentList, values];
    });
  };

  const updateContact = (values, rec) => {
    const currentContacts = [...contacts];
    const position = currentContacts.findIndex((item) => item.key === rec.key);
    values.birthday = values.birthday.format(dateFormat);
    currentContacts[position] = values;
    localStorage.setItem('contacts', JSON.stringify(currentContacts));
    setContacts(currentContacts);
  };

  const deleteContact = (rec) => {
    let currentContacts = [...contacts];
    const position = currentContacts.findIndex((item) => item.key === rec.key);
    currentContacts.splice(position, 1);
    localStorage.setItem('contacts', JSON.stringify(currentContacts));
    setContacts(currentContacts);
    message.success('Contact has been deleted!');
  };

  return { createContact, updateContact, deleteContact };
};

import React, { useContext } from 'react';
import {
  Form,
  Input,
  Button,
  Space,
  DatePicker,
  Select,
  Switch,
  message,
} from 'antd';
import { ContactsContext } from './Context';
import { useContacts } from './useContacts';

import moment from 'moment';

const { Option } = Select;
const dateFormat = 'DD/MM/YYYY';

const CreateContact = ({ onCancelClick, currentRecord, isEditing }) => {
  const [form] = Form.useForm();
  const { createContact, updateContact } = useContacts();
  const [contacts] = useContext(ContactsContext);

  const onFormFinish = (values) => {
    values.key = contacts.length + 1;
    isEditing ? updateContact(values, currentRecord) : createContact(values);
    onCancelClick();
    !isEditing
      ? message.success('Contact added!')
      : message.success('Contact saved!');
  };

  let defaultValues = {
    name: null,
    phone: null,
    birthday: null,
    gender: 'male',
    isRelative: false,
  };
  if (isEditing && currentRecord) {
    defaultValues = currentRecord;
  }

  return (
    <Form form={form} onFinish={onFormFinish}>
      <Form.Item
        name="name"
        label="Name"
        rules={[
          {
            required: true,
            message: 'Please input contact name',
          },
        ]}
        initialValue={defaultValues.name}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="birthday"
        label="Birthday"
        rules={[
          {
            required: true,
            message: 'Please pick birth date',
          },
        ]}
        initialValue={
          isEditing ? moment(defaultValues.birthday, dateFormat) : null
        }
      >
        <DatePicker format={dateFormat} />
      </Form.Item>
      <Form.Item
        name="gender"
        label="Gender"
        rules={[{ required: true }]}
        initialValue={defaultValues.gender}
      >
        <Select>
          <Option value="male">Male</Option>
          <Option value="female">Female</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="isRelative"
        label="Relative?"
        // initialValue={defaultValues.isRelative}
      >
        <Switch defaultChecked={defaultValues.isRelative} />
      </Form.Item>
      <Form.Item
        name="phone"
        initialValue={defaultValues.phone}
        label="Phone Number"
        rules={[
          {
            required: true,
            message: 'Please input phone number',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit">
            {isEditing ? 'Save Contact' : 'Add Contact'}
          </Button>
          <Button type="primary" danger onClick={onCancelClick}>
            Cancel
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default CreateContact;

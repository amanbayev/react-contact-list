import React from 'react';
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
import Context from './Context';

const { Option } = Select;

const CreateContact = ({ onCancelClick }) => {
  const [form] = Form.useForm();
  const { addNewContact } = React.useContext(Context);

  const onFormFinish = (values) => {
    values.isRelative = values.isRelative ? 'Yes' : 'No';
    values.birthday = values.birthday.format(dateFormat);
    values.gender = values.gender ? values.gender : 'male';
    addNewContact(values);
    onCancelClick();
    message.success('Contact added!');
  };

  const dateFormat = 'DD/MM/YYYY';

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
      >
        <Input />
      </Form.Item>
      <Form.Item name="birthday" label="Birthday">
        <DatePicker format={dateFormat} />
      </Form.Item>
      <Form.Item name="gender" label="Gender">
        <Select defaultValue="male">
          <Option value="male">Male</Option>
          <Option value="female">Female</Option>
        </Select>
      </Form.Item>
      <Form.Item name="isRelative" label="Relative?">
        <Switch defaultChecked={false} />
      </Form.Item>
      <Form.Item
        name="phone"
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
            Add Contact
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

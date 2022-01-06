import React from 'react';
import {useDispatch} from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../state';
import { Form, Input, Button, DatePicker, message } from 'antd';
import { IBook } from '../../types';
import {useNavigate} from 'react-router-dom';
import './BookForm.scss';

import BookInputs from "../../components/BookInputs/BookInputs";

const BookForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {addBook} = bindActionCreators(actionCreators, dispatch);

    const onFinish = (values: IBook): void => {
        addBook(
            values.name,
            values.author, 
            values.publishDate,
            values.publisher
        );
        message.success('Book added successfully');
        navigate('/');
    };
    
      const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
      <div className='book-form'>
        <h1>ADD NEW BOOK</h1>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <BookInputs/>
          <div className={'form-buttons-bottom'}>
            <Form.Item>
              <Button type="text" onClick={() => navigate('/')}>
                GO BACK
              </Button>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                ADD BOOK
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
      );
}

export default BookForm;
import {Form, Input, DatePicker} from 'antd'
import moment from 'moment';

interface IProps{
    name?: string;
    author?: string;
    publisher?: string;
    publishDate?: moment.Moment;
}

const BookInputs: React.FC<IProps> = ({name, author, publisher, publishDate}) => {
    return (
        <>
            <Form.Item
            label="Book Name"
            name="name"
            rules={[{ required: true, message: 'Please input the name of the book' }]}
          >
            <Input defaultValue={name ? name : ''}/>
          </Form.Item>

          <Form.Item
            label="Book Author"
            name="author"
            rules={[{ required: true, message: 'Please input the name of the books author' }]}
          >
            <Input defaultValue={author}/>
          </Form.Item>

          <Form.Item
            label="Publisher"
            name="publisher"
            rules={[{ required: true, message: 'Please input the publisher of the book' }]}
          >
            <Input  defaultValue={publisher}/>
          </Form.Item>

          <Form.Item
            label="Publish Date"
            name="publishDate"
            rules={[{ required: true, message: 'Please input the publish date of the book' }]}
          >
            <DatePicker defaultValue={publishDate} format={"YYYY-MM-DD"}/>
          </Form.Item>
        </>
    )
}

export default BookInputs;
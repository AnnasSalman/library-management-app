import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RootState } from '../../state/reducers';
import { actionCreators } from '../../state';
import { Button, Table, Modal, Drawer, Form, message } from 'antd';
import './Home.scss';
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { IBook } from '../../types';
import BookInputs from '../../components/BookInputs/BookInputs';

const Home = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {purgeLibrary, editBook, deleteBook} = bindActionCreators(actionCreators, dispatch);
    const [form] = Form.useForm();

    const books = useSelector((state: RootState) => state.books);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditBookVisible, setEditBookVisible] = useState(false);

    const [editBookIndex, setEditBookIndex] = useState<null | number>(null);

    const columns = [
        {
            title: 'BOOK#',
            dataIndex: 'bookNumber',
            key: 'bookNumber',
        },
        {
            title: 'BOOK TITLE',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'AUTHOR',
            dataIndex: 'author',
            key: 'author',
        },
        {
            title: 'PUBLISHER',
            dataIndex: 'publisher',
            key: 'publisher',
        },
        {
            title: 'PUBLISH DATE',
            dataIndex: 'publishDate',
            key: 'publishDate',
        },
        {
            title: 'ACTIONS',
            dataIndex: 'actions',
            key: 'actions',
            render: (text: string, record: any) => (
                <>
                    <Button 
                        type="link" 
                        onClick={() => showEditBookModal(record.name, record.author, record.publisher, moment(record.publishDate), record.bookNumber - 1)}
                    >
                        Edit
                    </Button>
                    <Button type="link" onClick={()=>handleDeleteBook(record.bookNumber - 1)}>Delete</Button>
                </>
            )
        },
      ];


    // Show modal for purge library
    const showModal = () => {
        setIsModalVisible(true);
    };

    // Show modal for edit book 
    const showEditBookModal = (name: string, author: string, publisher: string, publishDate: moment.Moment, editBookIndex: number) => {
        form.setFieldsValue({ name, author, publisher, publishDate });
        setEditBookIndex(editBookIndex);
        setEditBookVisible(true);
    }

    // On ok press on purge library modal
    const handleOk = () => {
        onPurgeLibraryClick();
        setIsModalVisible(false);
    };

    // On save changes on edit drawer
    const handleEditBookSuccess = (name: string, author: string, publisher: string, publishDate: moment.Moment, editBookIndex: number | null): void => {
        editBook(name, author, publishDate, publisher, editBookIndex ? editBookIndex : 0);
        message.success('Record edited successfully');
        setEditBookVisible(false);
    }

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleEditBookCancel = () => {
        setEditBookVisible(false);
    }

    const handleDeleteBook = (deleteIndex : number) => {
        deleteBook(deleteIndex);
        message.success('Record deleted successfully');
    }
    
    const onAddClick = (): void => {
        navigate('/add');
    }

    const onPurgeLibraryClick = (): void => {
        purgeLibrary();
        message.success('Library purged successfully');
    }

    const onAuthorOrPublisherClick = (sortType: string) => {
        navigate(`/${sortType}`);
    }
    
    const BooksTable = (props: {books: IBook[]}): JSX.Element => (
        <div>
            <div className="table-actions">
                <div>
                    <Button
                        type="primary"
                        className="table-action-btn"
                        onClick={() => onAuthorOrPublisherClick('author')}
                    >
                        AUTHORS
                    </Button>
                    <Button 
                        type="primary"
                        className="table-action-btn"
                        onClick={() => onAuthorOrPublisherClick('publisher')}
                    >
                        PUBLISHERS
                    </Button>
                </div>
                <div>
                    <Button 
                        type="primary"
                        className="table-action-btn"
                        onClick={onAddClick}
                    >
                        ADD BOOK
                    </Button>
                    <Button 
                        type="primary"
                        className="table-action-btn"
                        onClick={showModal}
                    >
                        PURGE LIBRARY
                    </Button>
                </div>
            </div>
            <Table 
                dataSource={
                    props.books.map((book, index)=>{
                        return {
                            key: Math.random(),
                            bookNumber: index + 1,
                            ...book,
                            publishDate: moment(book.publishDate.toString()).format("YYYY-MM-DD"),
                        }
                    })
                } 
                columns={columns}
                pagination={false} 
            />
        </div>
    )

    return(
        <div className="home">
            {
                books.length 
                ? <BooksTable books={books}/>
                : <div className="home-title-message">
                    <h1>Not much of a book reader eh?</h1>
                    <Button 
                        size='large' 
                        type="primary"
                        className="btn"
                        onClick={onAddClick}
                    >
                        ADD BOOK
                    </Button>
                  </div> 
            }
            <Modal 
                title="Purge Library" 
                visible={isModalVisible} 
                onOk={handleOk} 
                onCancel={handleCancel}
            >
                <p>This will delete all your books. Are you sure you want to continue?</p>
            </Modal>
            <Drawer 
                title="Edit Book" 
                placement="right" 
                onClose={handleEditBookCancel} 
                visible={isEditBookVisible}
                extra={
                    <Button onClick={() => {
                        form
                          .validateFields()
                          .then(values => {
                              handleEditBookSuccess(values.name, values.author, values.publisher, values.publishDate, editBookIndex);
                          })
                          .catch(info => {
                            console.log('Validate Failed:', info);
                          });
                      }} htmlType={'submit'}>
                        SAVE CHANGES
                    </Button>
                  }
                >
                <Form
                    name={'edit'}
                    form={form}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    onFinish={() => console.log('finished')}
                    onFinishFailed={handleEditBookCancel}
                    autoComplete="off"
                >
                    <BookInputs />
                </Form>
            </Drawer>
        </div>
    )
}

export default Home;
import React from 'react';
import './BooksByAuthorOrPublisher.scss'
import {Button, Table, Tag, Popover} from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/reducers';
import {useParams, useNavigate} from 'react-router-dom'

import {IBook} from '../../types';

interface IBooksByPublisherOrAuthor{
    [key: string]: IBook[];
}

const getBooksByPublisherOrAuthorData = (type: 'publisher' | 'author', books: IBook[]) => {
    const booksByPublisherOrAuthor: IBooksByPublisherOrAuthor = {}

    books.forEach((book)=>{
        // If author is new and doesn't already exist, add it.
        if(!(book[type] in booksByPublisherOrAuthor)){
            booksByPublisherOrAuthor[book[type]] = []
        }
        // add book to the relevant author/publisher.
        booksByPublisherOrAuthor[book[type]].push(book);
    })

    return Object.keys(booksByPublisherOrAuthor).map((authorOrPublisher)=>{
        return{
            [type]: authorOrPublisher,
            books: booksByPublisherOrAuthor[authorOrPublisher] 
        }
    });
}

const BooksByAuthorOrPublisher = () => {
    const books = useSelector((state: RootState) => state.books);
    const {sortType} = useParams();
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    }

    const columns = [
        {
            title: sortType?.toUpperCase(),
            dataIndex: sortType,
            key: sortType,
        },
        {
            title: 'BOOK TITLES',
            dataIndex: 'books',
            key: 'books',
            render: (books: IBook[]) => {
                return(
                    <div>
                        {books.slice(0, 3).map((book: IBook, index) => (book.name + (index === 2 || books.length === 1 ? ' ' : ', ')))}
                        {books.length > 3 ?
                        <Popover content={
                            books.slice(3, books.length).map((book) => <div>{book.name}</div>)
                        }>
                            <Tag>{`+${books.length - 3} more`}</Tag>
                        </Popover>
                         : ''}
                    </div>
                )
            }
        },
        {
            title: '# OF BOOKS',
            dataIndex: 'books',
            key: 'books',
            render: (books: IBook[]) => (books.length)
        },
    ];

    console.log(getBooksByPublisherOrAuthorData(sortType === 'author' ? 'author' : 'publisher', books));

    return (
        <div className="books-by-publisher-or-author-container">
            <Button type="text" className="btn-go-back" onClick={handleGoBack}>
                GO BACK
            </Button>
            <Table 
                dataSource={getBooksByPublisherOrAuthorData(sortType === 'author' ? 'author' : 'publisher', books)} 
                columns={columns}
                pagination={false} 
            />
        </div>
    )
}

export default BooksByAuthorOrPublisher;
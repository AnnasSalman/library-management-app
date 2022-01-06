import {ActionType} from '../action-types/index';
import {IBook} from '../../types';

export interface AddBook {
    type: typeof ActionType.ADD_BOOK;
    payload: IBook;
}

export interface PurgeLibrary {
    type: typeof ActionType.PURGE_LIBRARY;
}

export interface EditBook {
    type: typeof ActionType.EDIT_BOOK;
    payload: {book: IBook, editBookIndex: number};
}

export interface DeleteBook {
    type: typeof ActionType.DELETE_BOOK;
    payload: {deleteBookIndex: number};
}


export type BookDispatchTypes = AddBook | PurgeLibrary | EditBook | DeleteBook;
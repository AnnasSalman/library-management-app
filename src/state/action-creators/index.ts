import {ActionType} from "../action-types";
import { AddBook, EditBook, DeleteBook, PurgeLibrary } from "../actions";

export const addBook = (
    name: string,
    author: string,
    publishDate: {},
    publisher: string,
): AddBook => {
    return{
        type: ActionType.ADD_BOOK,
        payload: {
            name,
            author,
            publishDate,
            publisher,
        }
    }
}

export const editBook = (
    name: string,
    author: string,
    publishDate: {},
    publisher: string,
    editBookIndex: number,
): EditBook => {
    return{
        type: ActionType.EDIT_BOOK,
        payload: {
            book: {
                name,
                author,
                publishDate,
                publisher,
            },
            editBookIndex,
        }
    } 
}

export const deleteBook = (bookIndex: number): DeleteBook => {
    return{
        type: ActionType.DELETE_BOOK,
        payload: {deleteBookIndex: bookIndex},
    }
}

export const purgeLibrary = (): PurgeLibrary => {
    return{
        type: ActionType.PURGE_LIBRARY,
    }
}
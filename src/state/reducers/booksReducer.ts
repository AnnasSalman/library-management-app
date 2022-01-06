import { ActionType } from "../action-types/index";
import { BookDispatchTypes } from "../actions";
import {IBook} from '../../types'

const initialState: IBook[] = [];

const reducer = (state: IBook[] = initialState, action: BookDispatchTypes) => {
    switch(action.type) {
        case ActionType.ADD_BOOK:
            return [
                ...state,
                action.payload,
            ]
        case ActionType.EDIT_BOOK:
            const tempBooks = state;
            tempBooks[action.payload.editBookIndex] = action.payload.book;
            return [
                ...tempBooks
            ]
        case ActionType.DELETE_BOOK:
            const tempBooksToDeleteFrom = state;
            tempBooksToDeleteFrom.splice(action.payload.deleteBookIndex, 1)
            return [
                ...tempBooksToDeleteFrom
            ]
        case ActionType.PURGE_LIBRARY:
            return []
        default: 
            return state
    }
}

export default reducer;
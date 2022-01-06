import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Header from "../components/Header/Header";
import Home from "../pages/Home/Home";
import BookForm from "../pages/BookForm/BookForm";
import BooksByAuthorOrPublisher from "../pages/BooksByAuthorOrPublisher/BooksByAuthorOrPublisher";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Header />}>
                    <Route index element={<Home />} />
                    <Route path="/add" element={<BookForm />} />
                    <Route path="/:sortType" element={<BooksByAuthorOrPublisher/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;


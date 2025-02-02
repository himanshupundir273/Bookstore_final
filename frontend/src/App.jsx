import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AppBook from "./pages/AppBook";
import EditBook from "./pages/EditBook";
import DeleteBook from "./pages/DeleteBook";
import ShowBook from "./pages/ShowBook";
// import Button from "./pages/Button";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/book/create" element={<AppBook />} />
      <Route path="/book/edit/:id" element={<EditBook />} />
      <Route path="/book/delete/:id" element={<DeleteBook />} />
      <Route path="/book/:id" element={<ShowBook />} />
      {/* <Route path="/book/button" element={<Button/>}/> */}
    </Routes>
  );
};

export default App;

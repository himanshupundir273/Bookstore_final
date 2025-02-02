import React, { useState } from "react";
import axios from "axios";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const AppBook = () => {
  const [loading, setLoading] = useState(false);
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const navigate = useNavigate();
  const backendDomain = import.meta.env.VITE_BACKEND_URL;
  const submitHandler = async () => {
    try {
      const data = { title, author, year };
      setLoading(true);
      const resp = await axios.post(`${backendDomain}/pagedata`,{
        withCredentials: true,
        credentials: "include", 

      }, data);
      setLoading(false);
      console.log(data);
      enqueueSnackbar("Book Added Successfully", { variant: "success" });
      navigate("/");
    } catch (error) {
      enqueueSnackbar("Error", { variant: "error" });
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-4xl bg-sky-700 font-medium text-white p-4 text-center">
        Add New Book
      </h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-md w-[600px] p-4 mx-auto my-4">
        <div className="py-4">
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <input
            type="text"
            value={title}
            className="border-2 border-gray-400 px-4 py-2 w-full"
            onChange={(e) => setTitle(e.target.value)}
          ></input>
        </div>
        <div className="py-4">
          <label className="text-xl mr-4 text-gray-500">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-gray-400 px-4 py-2 w-full"
          ></input>
        </div>
        <div className="py-4">
          <label className="text-xl mr-4 text-gray-500">Year</label>
          <input
            type="text"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="border-2 border-gray-400 px-4 py-2 w-full"
          ></input>
        </div>
        <div className="py-4">
          <button
            onClick={submitHandler}
            className="bg-sky-800 px-4 py-2 w-full text-white"
          >
            Submit
          </button>
        </div>
        <BackButton />
      </div>
    </>
  );
};

export default AppBook;

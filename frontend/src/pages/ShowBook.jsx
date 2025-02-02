import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const ShowBook = () => {
  const [loading, setLoading] = useState(false);
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const backendDomain = import.meta.env.VITE_BACKEND_URL;

  const fetchbook = async () => {
    try {
      setLoading(true);
      console.log(id);

      const resp = await axios.get(`${backendDomain}/bookfinder/${id}`);
      console.log(resp.data);
      setTitle(resp.data.data.title);
      setAuthor(resp.data.data.author);
      setYear(resp.data.data.year);
      console.log("data");

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleClick = () => {
    navigate("/");
  };

  useEffect(() => {
    fetchbook();
  }, []);
  return (
    <>
      <h1 className="text-4xl bg-sky-700 font-medium text-white p-4 text-center">
        Book Details
      </h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-md w-[600px] p-4 mx-auto my-4">
        <div className="py-4">
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <input
            type="text"
            readOnly
            value={title}
            className="border-2 border-gray-400 px-4 py-2 w-full"
            onChange={(e) => setTitle(e.target.value)}
          ></input>
        </div>
        <div className="py-4">
          <label className="text-xl mr-4 text-gray-500">Author</label>
          <input
            type="text"
            readOnly
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-gray-400 px-4 py-2 w-full"
          ></input>
        </div>
        <div className="py-4">
          <label className="text-xl mr-4 text-gray-500">Year</label>
          <input
            type="text"
            readOnly
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="border-2 border-gray-400 px-4 py-2 w-full"
          ></input>
        </div>
        <div className="py-4">
          <button
            onClick={handleClick}
            className="bg-sky-800 px-4 py-2 w-full text-white"
          >
            Back To Home
          </button>
        </div>
        <BackButton />
      </div>
    </>
  );
};

export default ShowBook;

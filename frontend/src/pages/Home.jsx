import React, { useState, useEffect } from "react"; //to render the component/page/data
import axios from "axios"; //to hit api of backend
import { BsFillInfoSquareFill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { RiAddBoxLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";

//Home is a component
const Home = () => {
  const [books, setBooks] = useState([]); //can store array objects
  const [loading, setLoading] = useState(false); //to show leading of page
  const backendDomain = import.meta.env.VITE_BACKEND_URL;

  const fetchbook = async () => {
    try {
      setLoading(true);
      // const resp = await axios.get("http://localhost:3000/showallbooks");
      const resp = await axios.get(`${backendDomain}/showallbooks`);
      console.log(resp.data);
      setBooks(resp.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchbook();
  }, []);
  return (
    <>
      <h1 className="text-4xl bg-sky-700 font-medium text-white p-4 text-center">
        Book Store
      </h1>
      <div className="p-4">
        <Link to="/book/create">
          <RiAddBoxLine className="text-4xl text-blue-500" />
        </Link>
        <div className="flex justify-between items-center">
          {loading ? (
            <Spinner />
          ) : (
            <table className="w-full border-separate border-spacing-2 text-xl">
              <thead>
                <tr>
                  <th className="border border-slate-500 rounded-md">Sno</th>
                  <th className="border border-slate-500 rounded-md">Title</th>
                  <th className="border border-slate-500 rounded-md">Author</th>
                  <th className="border border-slate-500 rounded-md">Year</th>
                  <th className="border border-slate-500 rounded-md">
                    Options
                  </th>
                </tr>
              </thead>
              <tbody>
                {books.map((book, index) => {
                  return (
                    <tr key={book._id}>
                      <td className="border border-slate-500 rounded-md text-center">
                        {index + 1}
                      </td>
                      <td className="border border-slate-500 rounded-md text-center">
                        {book.title}
                      </td>
                      <td className="border border-slate-500 rounded-md text-center">
                        {book.author}
                      </td>
                      <td className="border border-slate-500 rounded-md text-center">
                        {book.year}
                      </td>
                      <td className="border border-slate-500 rounded-md text-center flex justify-around p-4">
                        <Link to={`/book/${book._id}`}>
                          <BsFillInfoSquareFill className="text-2xl text-green-500" />
                        </Link>
                        <Link to={`/book/edit/${book._id}`}>
                          <FaEdit className="text-2xl text-yellow-500" />
                        </Link>

                        <Link to={`/book/delete/${book._id}`}>
                          <AiFillDelete className="text-2xl text-red-500" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "flowbite-react";
import {
  Loader2,
  Search,
  Plus,
  Edit,
  Trash,
  Calendar,
  MoonIcon,
} from "lucide-react";
import DatePicker from "react-datepicker";
import { movieAPI } from "../../../services/movieAPI";
import { MovieForm } from "./MovieForm";
import { Notification } from "../../Notifications/Notification";
import { formatDate } from "../../../Utils/dateFormat";
import debounce from "lodash.debounce";
import {
  setMovies,
  setLoading,
  setError,
  setCurrentPage,
  setNotification,
} from "../../../Redux/movieSlice";

export const MovieManagement = () => {
  const dispatch = useDispatch();
  const {
    movies,
    isLoading,
    error,
    currentPage,
    pageSize,
    totalCount,
    notification,
  } = useSelector((state) => state.movies);

  const [maNhom, setMaNhom] = useState("GP01");
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const [formData, setFormData] = useState({
    tenPhim: "",
    trailer: "",
    moTa: "",
    maNhom: "GP01",
    ngayKhoiChieu: new Date(),
    sapChieu: false,
    dangChieu: false,
    hot: false,
    danhGia: 0,
    hinhAnh: null,
  });

  const debouncedFetchMovies = React.useCallback(
    debounce((groupCode) => {
      if (groupCode?.length >= 4) {
        fetchMovies();
      }
    }, 500),
    []
  );

  const handleGroupCodeChange = (e) => {
    const value = e.target.value;
    setMaNhom(value);
    if (value?.length >= 4) {
      debouncedFetchMovies(value);
    }
  };

  useEffect(() => {
    let timeoutId;
    if (notification) {
      timeoutId = setTimeout(() => {
        dispatch(setNotification(null));
      }, 3000);
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [notification, dispatch]);

  const fetchMovies = async () => {
    try {
      dispatch(setLoading(true));
      const response = await movieAPI.getPaginatedMovies(
        currentPage,
        pageSize,
        maNhom
      );
      dispatch(setMovies(response.content));
    } catch (error) {
      dispatch(setError(error.message));
      dispatch(setNotification({ type: "error", message: error.message }));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const fetchMoviesByDate = async () => {
    if (startDate && endDate) {
      try {
        dispatch(setLoading(true));
        const formattedStartDate = formatDateToAPI(startDate);
        const formattedEndDate = formatDateToAPI(endDate);

        const response = await movieAPI.getMoviesByDate(
          formattedStartDate,
          formattedEndDate,
          maNhom
        );
        dispatch(setMovies(response));
      } catch (error) {
        dispatch(setError(error.message));
      } finally {
        dispatch(setLoading(false));
      }
    }
  };

  useEffect(() => {
    if (startDate && endDate) {
      fetchMoviesByDate();
    } else {
      fetchMovies();
    }
  }, [currentPage, pageSize, maNhom, startDate, endDate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formDataToSend = new FormData();

    if (formData.hinhAnh instanceof File) {
      formDataToSend.append("File", formData.hinhAnh);
    }

    // Then append other fields
    formDataToSend.append("tenPhim", formData.tenPhim);
    formDataToSend.append("moTa", formData.moTa);
    formDataToSend.append("maNhom", formData.maNhom);
    formDataToSend.append("ngayKhoiChieu", formatDate(formData.ngayKhoiChieu));
    formDataToSend.append("sapChieu", formData.sapChieu);
    formDataToSend.append("dangChieu", formData.dangChieu);
    formDataToSend.append("hot", formData.hot);
    formDataToSend.append("danhGia", formData.danhGia.toString());
    formDataToSend.append("trailer", formData.trailer);

    // Add maPhim only for updates
    if (selectedMovie?.maPhim) {
      formDataToSend.append("maPhim", selectedMovie.maPhim.toString());
    }

    try {
      dispatch(setLoading(true));

      if (selectedMovie) {
        await movieAPI.updateMovie(formDataToSend);
        dispatch(
          setNotification({
            type: "success",
            message: "Movie updated successfully!",
          })
        );
      } else {
        await movieAPI.createMovie(formDataToSend);
        dispatch(
          setNotification({
            type: "success",
            message: "Movie created successfully!",
          })
        );
      }
      setShowModal(false);
      fetchMovies();
    } catch (error) {
      console.error("Error submitting form:", error);
      dispatch(
        setNotification({
          type: "error",
          message: error.response?.data?.content || error.message,
        })
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    return () => {
      dispatch(setNotification(null));
    };
  }, [dispatch]);

  const handleAddMovie = () => {
    setSelectedMovie(null);
    setFormData({
      tenPhim: "",
      trailer: "",
      moTa: "",
      maNhom: "GP01",
      ngayKhoiChieu: new Date(),
      sapChieu: "false",
      dangChieu: "false",
      hot: "false",
      danhGia: 0,
      hinhAnh: null,
    });
    setShowModal(true);
  };

  const handleEditMovie = (movie) => {
    setSelectedMovie(movie);
    setFormData({
      ...movie,
      ngayKhoiChieu: new Date(movie.ngayKhoiChieu),
      sapChieu: String(movie.sapChieu),
      dangChieu: String(movie.dangChieu),
      hot: String(movie.hot),
    });
    setShowModal(true);
  };

  const handleDelete = async (maPhim) => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      try {
        dispatch(setLoading(true));
        await movieAPI.deleteMovie(maPhim);
        dispatch(
          setNotification({
            type: "success",
            message: "Movie deleted successfully!",
          })
        );
        fetchMovies();
      } catch (error) {
        dispatch(setError(error.message));
        dispatch(setNotification({ type: "error", message: error.message }));
      } finally {
        dispatch(setLoading(false));
      }
    }
  };

  return (
    <div className="overflow-x-auto p-6">
      {notification && (
        <Notification type={notification.type} message={notification.message} />
      )}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold dark:text-white">Movie Management</h1>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="w-64">
          <input
            type="text"
            value={maNhom}
            onChange={handleGroupCodeChange}
            placeholder="Enter group code (GP01-GP10)"
            className="w-full px-3 py-2 border rounded-md dark:bg-gray-700"
          />
        </div>

        <div className="flex-1">
          <DatePicker
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            onChange={(update) => setDateRange(update)}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select date range"
            className="w-full px-3 py-2 border rounded-md dark:bg-gray-700"
            isClearable={true} // Add this to allow clearing the dates
          />
        </div>

        <button
          onClick={handleAddMovie}
          className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center gap-2"
        >
          <Plus size={20} /> Add Movie
        </button>
      </div>

      {!isLoading && movies?.length > 0 ? (
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Movie ID</Table.HeadCell>
            <Table.HeadCell>Poster</Table.HeadCell>
            <Table.HeadCell>Title</Table.HeadCell>
            <Table.HeadCell>Release Date</Table.HeadCell>
            <Table.HeadCell>Description</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>Rating</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {movies.map((movie) => (
              <Table.Row
                key={movie.maPhim}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="font-medium">{movie.maPhim}</Table.Cell>
                <Table.Cell>
                  <img
                    src={movie.hinhAnh}
                    alt={movie.tenPhim}
                    className="h-20 w-16 object-cover rounded"
                  />
                </Table.Cell>
                <Table.Cell className="font-medium">{movie.tenPhim}</Table.Cell>
                <Table.Cell className="font-medium">
                  {formatDate(movie.ngayKhoiChieu)}
                </Table.Cell>
                <Table.Cell className="max-w-xs truncate">
                  {movie.moTa}
                </Table.Cell>
                <Table.Cell>
                  {movie.dangChieu
                    ? "Now Showing"
                    : movie.sapChieu
                    ? "Coming Soon"
                    : "-"}
                </Table.Cell>
                <Table.Cell>{movie.danhGia}/10</Table.Cell>
                <Table.Cell>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditMovie(movie)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(movie.maPhim)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash size={18} />
                    </button>
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      ) : (
        <div className="text-center py-4">
          {isLoading ? (
            <Loader2 className="animate-spin h-8 w-8 text-blue-600 mx-auto" />
          ) : (
            <p>No movies found</p>
          )}
        </div>
      )}

      {/* Pagination */}
      <div className="mt-6 flex justify-center gap-2">
        {Array.from({ length: Math.ceil(totalCount / pageSize) || 1 }).map(
          (_, index) => (
            <button
              key={index}
              onClick={() => dispatch(setCurrentPage(index + 1))}
              className={`px-4 py-2 rounded ${
                currentPage === index + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
              }`}
            >
              {index + 1}
            </button>
          )
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {selectedMovie ? "Edit Movie" : "Add New Movie"}
            </h2>
            <MovieForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmit}
              onClose={() => setShowModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

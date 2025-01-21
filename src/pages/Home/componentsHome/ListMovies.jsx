import { isAction } from "@reduxjs/toolkit";
import { Button, Card, Pagination, Rating } from "flowbite-react";
// import { Button } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { aixiosMoviveAction } from "../../../Redux/Actions/homeAction";
import { Tooltip } from "antd";
import { NavLink } from "react-router-dom";
import { changTagMovie } from "../../../Redux/homeReducer";
import { Play } from "lucide-react";

const ListMovies = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const { listProduct, totalCount, tagMovie, pageSize } = useSelector(
    (state) => state.home
  );
  const onPageChange = (page) => {
    setCurrentPage(page); // Cập nhật currentPage khi người dùng chuyển trang
  };
  const handleChangeTagMovie = (tag) => {
    if (tag !== tagMovie) {
      dispatch(changTagMovie(tag));
      setCurrentPage(1); // sau khi đổi tag set currentPage về trang đầu
    }
  };

  // Tính tổng số trang
  const totalPages = Math.ceil(totalCount / pageSize);

  useEffect(() => {
    dispatch(aixiosMoviveAction(currentPage, pageSize, tagMovie));
  }, [currentPage, tagMovie]);

  return (
    <div className="container p-5 mx-auto ">
      <div className="grid lg:grid-cols-12 sm:grid-cols-6 gap-5">
        <Button
          className={`col-span-2 w-full md:text-base focus:ring-0`}
          size="sm"
          color={tagMovie === "hot" ? "dark" : "light"}
          onClick={() => {
            handleChangeTagMovie("hot");
          }}
        >
          Hot
        </Button>
        <Button
          className={`col-span-2 w-full md:text-base focus:ring-0`}
          size="sm"
          color={tagMovie === "dangChieu" ? "dark" : "light"}
          onClick={() => {
            handleChangeTagMovie("dangChieu");
          }}
        >
          Now Showing
        </Button>

        <Button
          className="col-span-2 w-full md:text-base focus:ring-0"
          size="sm"
          color={tagMovie === "sapChieu" ? "dark" : "light"}
          onClick={() => {
            handleChangeTagMovie("sapChieu");
          }}
        >
          Comming Soon
        </Button>
      </div>
      {/* List */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 my-6">
        {listProduct &&
          listProduct.map((item) => {
            return (
              <div
                className="max-w-sm mx-auto sm:mx-0 p-0 rounded-lg overflow-hidden shadow-lg bg-gray-100 dark:bg-[#2c3847]"
                key={item.maPhim}
              >
                <div className="overflow-hidden relative group">
                  <NavLink to={`/detail/${item.maPhim}`}>
                    <img
                      className="w-full h-[400px] group-hover:scale-110 group-hover:filter group-hover:blur-[1px] group-hover:brightness-50 transition duration-500"
                      src={item.hinhAnh}
                    />
                  </NavLink>
                  <div className="icon__play absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  opacity-0 group-hover:opacity-100 transition duration-500">
                    <Play className="w-10 h-10 text-white" />
                  </div>
                </div>
                <div className="p-4">
                  <NavLink to={`/detail/${item.maPhim}`}>
                    <Tooltip placement="topLeft" title={item.tenPhim}>
                      <h5 className="text-lg lg:text-xl my-2 font-semibold text-gray-900 dark:text-white truncate dark:hover:text-orange-400 hover:text-orange-400 transition duration-200">
                        {item.tenPhim}
                      </h5>
                    </Tooltip>
                  </NavLink>

                  <div className="flex items-center">
                    <p className="text-base lg:text-lg font-normal dark:text-white">
                      Rating:{"  "}
                    </p>
                    <Rating className="ml-3">
                      <Rating.Star />
                      <Rating.Star />
                      <Rating.Star />
                      <Rating.Star />
                      <Rating.Star filled={false} />
                    </Rating>
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      {/* Pagination */}
      <div className="flex overflow-x-auto sm:justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default ListMovies;

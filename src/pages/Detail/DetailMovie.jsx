import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { axiosGetDetailMovie } from "../../Redux/Actions/homeAction";
import { Calendar, Clock, Star } from "lucide-react";
import { formatDate } from "../../Utils/dateFormat";
import { Button, List } from "flowbite-react";
import { Tooltip } from "antd";
import ShowTime from "./ShowTime";
import { reset } from "../../Redux/detailReducer";

const DetailMovie = () => {
  const dispatch = useDispatch();
  const param = useParams();
  const { detailMovie } = useSelector((state) => state.detail);

  useEffect(() => {
    dispatch(reset());
    dispatch(axiosGetDetailMovie(param.id));
  }, [param.id]);
  return (
    <div className="container">
      <div className="py-6 px-10 grid grid-cols-1 lg:grid-cols-3 bg-gradient-to-l from-slate-100 to-gray-700/100 ">
        <div className="col-span-1 overflow-hidden h-[500px]">
          <img
            src={detailMovie?.hinhAnh}
            className="lg:w-auto h-full object-cover rounded-lg mx-auto"
            alt=""
          />
        </div>
        <div className="col-span-2 mt-7 lg:mt-0 text-lg flex flex-col justify-between">
          <div className="space-y-7">
            <div>
              <h1 className="text-gray-900 text-3xl font-bold font-inter tracking-tighter">
                {detailMovie?.tenPhim}
              </h1>
              <div className="flex items-center mt-2">
                <p>
                  <Clock color="orange" fill="white" strokeWidth={2} />
                </p>
                <span className="ml-2">120 phút</span>
                <span className="ml-10 mr-2">
                  {" "}
                  <Calendar fill="white" color="orange" strokeWidth={2} />{" "}
                </span>
                <span>{formatDate(detailMovie?.ngayKhoiChieu)}</span>
              </div>
            </div>
            <p className="flex items-center">
              <Star fill="orange" color="orange" className="mr-2 " />{" "}
              {detailMovie?.danhGia}.0
            </p>
            <p className="text-gray-700 text-base font-medium font-inter">
              {detailMovie?.moTa
                ? detailMovie.moTa
                : ` Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt,
            laboriosam ut? Asperiores voluptas atque natus velit numquam eum
            dolorum ex assumenda? Distinctio, modi? Cum, aliquam. Non labore
            iusto rerum doloremque temporibus error aspernatur, quaerat vitae
            necessitatibus eligendi ipsam cupiditate libero quis totam doloribus
            maxime voluptas earum cumque sunt nemo. Quae.`}
            </p>
            <p>Movie Code: {detailMovie?.maPhim}</p>
            <div>
              <p>Cinema Systems</p>
              <div className="flex gap-9">
                {detailMovie?.heThongRapChieu?.length > 0 ? (
                  detailMovie.heThongRapChieu.map((item) => {
                    return (
                      <div className="my-4">
                        <img
                          src={item.logo}
                          alt=""
                          className="w-16 h-16 border border-gray-400 rounded-full"
                        />
                      </div>
                    );
                  })
                ) : (
                  <p></p>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button color="dark">Trailer</Button>
            <Button color="dark">Book Tickets</Button>
          </div>
        </div>
      </div>
      {/* </div> */}
      <div>
        <ShowTime />
      </div>
    </div>
  );
};

export default DetailMovie;

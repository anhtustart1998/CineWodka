import { Tooltip } from "antd";
import { Button, List } from "flowbite-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMaHeThongRap } from "../../Redux/detailReducer";
import { formatTime } from "../../Utils/dateFormat";

const ShowTime = () => {
  const dispatch = useDispatch();
  const { detailMovie, maRap, listShowTime } = useSelector(
    (state) => state.detail
  );

  const onClickSetMaHeThongRap = (maHeThongRap) => {
    dispatch(setMaHeThongRap(maHeThongRap));
  };

  return (
    <div className=" py-6 px-10 grid grid-cols-1 lg:grid-cols-12 gap-5">
      <div className="col-span-12">
        {detailMovie?.heThongRapChieu?.length > 0 ? (
          <List
            unstyled
            className="flex gap-4 dark:divide-gray-700 justify-center items-center"
          >
            {detailMovie?.heThongRapChieu?.map((item) => {
              return (
                <List.Item
                  onClick={() => {
                    onClickSetMaHeThongRap(item.maHeThongRap);
                  }}
                  key={item.maHeThongRap}
                >
                  <Tooltip
                    color="#505050"
                    placement="topRight"
                    title={item.tenHeThongRap}
                  >
                    <img
                      className={`
                      ${
                        item.maHeThongRap === maRap
                          ? "border-4 border-orange-300"
                          : "border border-gray-500"
                      }
                     cursor-pointer rounded-full h-16 w-16 mx-auto hover:opacity-70`}
                      src={item.logo}
                      alt=""
                    />
                  </Tooltip>
                </List.Item>
              );
            })}
          </List>
        ) : (
          <p className="dark:text-white">Chưa có lịch chiếu</p>
        )}
      </div>
      <div className="col-span-12">
        <List unstyled className="dark:divide-gray-700 space-y-4">
          {listShowTime?.map((item) => {
            return (
              <List.Item
                className="bg-white shadow-md list-none py-2 flex items-center space-x-2 rounded-md border-b border-gray-400 transition duration-200 dark:bg-gray-800 dark:border-gray-700"
                key={item.maCumRap}
              >
                <img
                  src={item.hinhAnh}
                  className="h-24 w-20 rounded-md mx-auto"
                  alt=""
                />

                <div className="w-5/6">
                  <div className=" flex flex-col items-start">
                    <p className="break-words text-orange-400 dark:text-orange-400 transition duration-200 text-lg font-medium">
                      {item.tenCumRap}
                    </p>
                    <p className="break-words text-base text-gray-800 dark:text-gray-400 mb-6">
                      {item.diaChi}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.lichChieuPhim.map((item) => {
                        return (
                          <Button
                            key={item.maLichChieu}
                            className="w-16 transition duration-200 bg-gray-300 dark:bg-gray-600 hover:!bg-gray-500 text-gray-900 dark:text-white font-medium focus:ring-0 focus:!outline-none"
                          >
                            {formatTime(item.ngayChieuGioChieu)}{" "}
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </List.Item>
            );
          })}
        </List>
      </div>
    </div>
  );
};

export default ShowTime;

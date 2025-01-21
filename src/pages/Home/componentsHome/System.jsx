import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  axiosLayThongTinLichChieuHeThongRap,
  axiosLayThonTinHeThongRap,
} from "../../../Redux/Actions/homeAction";
import { Button, List } from "flowbite-react";
import { Tooltip } from "antd";
import {
  loadLichChieuTheoCumRap,
  setMaHeThongRap,
} from "../../../Redux/homeReducer";
import { formatTime } from "../../../Utils/dateFormat";

const System = () => {
  const dispatch = useDispatch();
  const { cinemas, maHeThongRap, maCumRaps, listCumRap, listLichChieu } =
    useSelector((state) => state.home);

  const onClickLichChieuTheoCumRap = (maCumRap) => {
    dispatch(loadLichChieuTheoCumRap(maCumRap));
  };

  const onClickLayThongTinCumRapTheoHeThong = (maHeThongRap) => {
    dispatch(setMaHeThongRap(maHeThongRap));
  };
  useEffect(() => {
    dispatch(axiosLayThongTinLichChieuHeThongRap(maHeThongRap));
  }, [maHeThongRap]);

  // lấy danh sách hệ thống rạp
  useEffect(() => {
    dispatch(axiosLayThonTinHeThongRap());
  }, []);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:h-[600px]">
      {/* Hệ thống rạp */}
      <div className="col-span-1 lg:col-span-1 mx-auto lg:py-0 py-5">
        <List unstyled className="flex lg:flex-col gap-4 dark:divide-gray-700">
          {cinemas.map((item) => {
            return (
              <List.Item
                key={item.maHeThongRap}
                onClick={() => {
                  onClickLayThongTinCumRapTheoHeThong(item.maHeThongRap);
                }}
              >
                <Tooltip
                  color="#505050"
                  placement="topRight"
                  title={item.tenHeThongRap}
                >
                  <img
                    className="cursor-pointer rounded-full h-16 w-16 mx-auto border border-gray-500 hover:opacity-70"
                    src={item.logo}
                    alt=""
                  />
                </Tooltip>
              </List.Item>
            );
          })}
        </List>
      </div>
      {/* List cụm rạp theo hệ thống */}
      <div className="col-span-1 border-b lg:border-b-0 lg:col-span-5 py-5 lg:py-0 w-full mx-auto h-full overflow-y-auto pr-3 border-r-2 border-gray-300 dark:border-gray-400 scrollbar">
        <div className="h-[520px] ">
          <List className="w-full flex flex-col gap-1 ">
            {listCumRap &&
              listCumRap.map((item) => {
                return (
                  <List.Item
                    key={item.maCumRap}
                    className={`h-20 group flex items-center ${
                      item.maCumRap === maCumRaps
                        ? "bg-gray-300 dark:bg-gray-700"
                        : "bg-white dark:bg-gray-800"
                    } list-none rounded-md border-b border-gray-300 transition duration-200 dark:border-gray-700 hover:bg-gray-300 hover:shadow-md dark:hover:bg-gray-700`}
                    onClick={() => {
                      onClickLichChieuTheoCumRap(item.maCumRap);
                    }}
                  >
                    <div className="basis-1/6">
                      <img
                        src={item.hinhAnh}
                        className="h-20 w-20 rounded-l-md"
                        alt=""
                      />
                    </div>
                    <div className="basis-5/6">
                      <div className="flex flex-col items-start">
                        <p
                          className={` ${
                            item.maCumRap === maCumRaps
                              ? "text-orange-400 dark:text-orange-400"
                              : "text-gray-900 dark:text-white"
                          } break-words group-hover:text-orange-400 transition duration-200 text-base font-medium text-gray-900 `}
                        >
                          {item.tenCumRap}
                        </p>
                        <p className="break-words text-base text-gray-500 dark:text-gray-400">
                          {item.diaChi}
                        </p>
                      </div>
                    </div>
                  </List.Item>
                );
              })}
          </List>
        </div>
      </div>
      {/* Lịch chiếu */}
      <div className="col-span-1 lg:col-span-6 py-5 lg:py-0 w-full mx-auto h-full overflow-y-auto pr-3 border-r-2 border-gray-300 dark:border-gray-400 scrollbar">
        <div className="h-[520px]">
          <List className="w-full border-0 space-y-2">
            {listLichChieu &&
              listLichChieu.map((item) => {
                return (
                  <List.Item
                    className="bg-white shadow list-none py-2 flex items-center rounded-md border-b border-gray-300 transition duration-200 dark:bg-gray-800 dark:border-gray-700"
                    key={item.maPhim}
                  >
                    <div className="basis-1/6">
                      <img
                        src={item.hinhAnh}
                        className="h-24 w-20 rounded-md mx-auto"
                        alt=""
                      />
                    </div>
                    <div className="basis-5/6">
                      <div className=" flex flex-col items-start">
                        <p className="break-words text-orange-400 dark:text-orange-400 transition duration-200 text-lg font-medium mb-2">
                          {item.tenPhim}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {item.lstLichChieuTheoPhim.map((item) => {
                            return (
                              <Button className="w-16 transition duration-200 bg-gray-300 dark:bg-gray-600 hover:!bg-gray-500 text-gray-900 dark:text-white font-medium focus:ring-0 focus:!outline-none">
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
    </div>
  );
};

export default System;

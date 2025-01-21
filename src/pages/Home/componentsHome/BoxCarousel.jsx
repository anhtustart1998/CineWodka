import React, { useEffect } from "react";
import { Carousel, Image } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { loadBannerAction } from "../../../Redux/Actions/homeAction";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const contentStyle = {
  margin: 0,
  height: "857px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};
const BoxCarousel = () => {
  const { dataBanner } = useSelector((state) => state.home);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadBannerAction());
  }, []);
  const onChange = (currentSlide) => {};
  return (
    <div>
      <Carousel arrows infinite={false} afterChange={onChange}>
        {dataBanner.map((item) => {
          return (
            <div
              className="relative h-[500px] w-full md:h-[600px] lg:h-[740px]"
              key={item.maBanner}
            >
              <img
                src={item.hinhAnh}
                alt={item.maPhim}
                className="w-full h-full object-cover"
              />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default BoxCarousel;

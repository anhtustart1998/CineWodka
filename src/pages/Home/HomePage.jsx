import BoxCarousel from "./componentsHome/BoxCarousel";
import ListMovies from "./componentsHome/ListMovies";
import System from "./componentsHome/System";
import { NavLink } from "react-router-dom";
import { List } from "flowbite-react";

export const HomePage = () => {
  return (
    <>
      <div>
        {/*Carousel  */}
        <BoxCarousel />
        {/* List Movie */}
        <div>
          <ListMovies />
        </div>
        {/* system */}

        <div className="container mt-10 mb-16">
          <h2 className="text-gray-900 text-3xl lg:text-4xl my-7 font-bold text-center dark:text-yellow-50">
            <span className=" border-b-2 border-gray-900 dark:border-yellow-50">
              System
            </span>
          </h2>
          <div className="mt-12">
            <System />
          </div>
          {/* <ShowTime /> */}
        </div>

        <div className="container border-t border-gray-500 p-6 flex justify-between gap-7 text-gray-900 dark:text-white">
          <div className="w-2/6 text-center">
            <h3 className="text-2xl mb-5 font-semibold">Menu</h3>
            <List className="text-base list-none">
              <List.Item>
                <NavLink className="hover:text-orange-400" to="/">
                  Home
                </NavLink>
              </List.Item>
              <List.Item>
                <NavLink className="hover:text-orange-400" to="/">
                  Login
                </NavLink>
              </List.Item>
              <List.Item>
                <NavLink className="hover:text-orange-400" to="/">
                  Register
                </NavLink>
              </List.Item>
            </List>
          </div>

          <div className="w-4/5 text-base">
            <p className="mb-2">
              {" "}
              Watch free online movies in high quality with Vietnamese
              subtitles, dubbing, and voiceovers. Always updates the latest
              movies, including blockbusters, Chinese dramas, and Korean series,
              at lightning speed.
            </p>
            <p>
              The website features an intuitive, user-friendly interface with
              fast loading speeds and frequent updates of new movies, promising
              an excellent experience for movie enthusiasts.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

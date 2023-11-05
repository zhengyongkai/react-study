import { Routes, Route } from "react-router-dom";
import RouterPage1 from "./components/routerPage1";
import HomePage from "./components/home";
import NewsPage from "./components/news";
import MyPage from "./components/my";
import Login from "./components/login";
import Location from "./components/location";
import ComingSoon from "./components/comingSoon";
import NowPlaying from "./components/nowPlaying";
import FilmPage from "./components/films";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  getLocationAsync,
  getLocationListsAsyc,
} from "@/store/common/location";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fn = async () => {
      // do something
      await dispatch(getLocationAsync());
      await dispatch(getLocationListsAsyc());
    };
    fn();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login></Login>} />
        <Route path="/location" element={<Location />} />
        <Route path="/name/*" element={<RouterPage1 />}>
          <Route path="home" element={<HomePage />}>
            <Route path="nowPlaying" element={<NowPlaying />}></Route>
            <Route path="comingSoon" element={<ComingSoon />}></Route>
          </Route>

          <Route path="news" element={<NewsPage />}></Route>
          <Route path="my" element={<MyPage />}></Route>
        </Route>
        <Route path="/films/:id" element={<FilmPage />} />
      </Routes>
    </>
  );
}
// import useFetch from "@/hook/fetch";
import useLocation from "@/hook/location";

import {
  getCinemas,
  getCinemasList,
  getMoviceDetail,
} from "@/pages/api/movice";
import {
  cinemaListResponseImf,
  cinemaResponseImf,
  moviceImf,
  chinemaDetailImf,
} from "@/pages/types/movice";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "@/pages/css/cinemas.scss";

import NavTitle from "./navTitle";
import { Dropdown, List } from "antd-mobile";
import Loading from "./loading";
import { useSelector } from "react-redux";
import { tudeStateImf } from "@/types/location";
import { getBetweenDistance } from "@/pages/utils/location";
import { getDay, getDaysNameFn } from "@/pages/utils/day";
import Tab from "./dateTab";

export default function cinemas() {
  const menuRef = useRef<any>();
  const locationAttr = useSelector(
    (state: tudeStateImf) => state.location.tude
  );
  const { id = "" } = useParams();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [cityName, setCityName] = useState("");
  const [date, setDate] = useState(0);
  const navigator = useNavigate();

  const [params, setParams] = useState({
    filmId: "",
    cityId: 0,
    cinemaIds: "",
  });

  const [film, setFilm] = useState<moviceImf>({
    filmId: 0,
    name: "",
    category: "",
    synopsis: "",
    poster: "",
    grade: "",
    actors: [],
    runtime: 0,
    nation: "",
  });

  const [cinema, setCinemas] = useState<cinemaResponseImf>({
    cinemaExtendList: [],
    showCinemas: [],
  });

  const [cinemaList, setCinemasList] = useState<{
    cinemas: Map<string, chinemaDetailImf[]>;
    cinemasList: chinemaDetailImf[];
  }>({
    cinemas: new Map(),
    cinemasList: [],
  });

  function to(path: string) {
    navigator(path);
  }

  function getDistance(longitude: number, latitude: number) {
    return (
      getBetweenDistance(
        locationAttr.longitude,
        locationAttr.latitude,
        longitude,
        latitude
      ).toFixed(1) + "km"
    );
  }

  location((locale) => {
    setParams({
      filmId: id,
      cityId: locale.cityId,
      cinemaIds: "",
      // cityName: params.cityName,
    });
  });

  useEffect(() => {
    async function fn() {
      const {
        data: { film },
      } = await getMoviceDetail({ filmId: id });
      setFilm(film);
    }
    fn();
  }, []);
  useEffect(() => {
    async function getList() {
      const {
        data: { cinemaExtendList, showCinemas },
      } = (await getCinemas(params)) as {
        data: cinemaResponseImf;
      };

      showCinemas.sort((a, b) => a.showDate - b.showDate);
      setCinemas({
        cinemaExtendList,
        showCinemas: showCinemas,
      });

      setDate(showCinemas[0].showDate);
    }
    if (params.filmId && params.cityId !== -1) {
      getList();
    }
  }, [params.filmId, params.cityId]);

  useEffect(() => {
    if (cinema.showCinemas.length) {
      setLoading(true);

      const cinemaIds = params.cinemaIds
        ? params.cinemaIds
        : cinema.showCinemas[0].cinemaList.join(",");
      async function fn() {
        const {
          data: { cinemas },
        } = (await getCinemasList({
          cityId: params.cityId,
          cinemaIds,
        })) as cinemaListResponseImf;
        const moviceMap = new Map<string, Array<chinemaDetailImf>>();
        cinemas.forEach((element) => {
          // console.log(element);
          const key = moviceMap.get(element.districtName);

          if (key) {
            moviceMap.set(element.districtName, [...key, element]);
          } else {
            moviceMap.set(element.districtName, [element]);
          }
        });
        setCinemasList({
          cinemas: moviceMap,
          cinemasList: [...moviceMap.values()][0],
        });
        setCityName([...moviceMap.values()][0][0].districtName);
        setLoading(false);
      }
      fn();
    }
  }, [cinema.showCinemas, params.cinemaIds, params.cityId]);

  function cityItemsChange(res: string) {
    const cinemas = cinemaList.cinemas.get(res) || [];

    setCinemasList({
      cinemas: cinemaList.cinemas,
      cinemasList: cinemas,
    });
    menuRef.current.close();
    setCityName(res);
  }

  function formatPrice(price: number) {
    const pre = "￥" + String(price).slice(0, 2);

    return pre;
  }

  return (
    <>
      <NavTitle title={film.name} back={true} />
      <div style={{ paddingTop: 48 }}>
        {/* <div className="cinemas-dates  inner-scroll">
          {cinema.showCinemas.map((item, index) => {
            return (
              <div
                className={item.showDate === date ? 'cinemas-dates-active' : ''}
                key={index}
                onClick={() => {
                  setParams({
                    ...params,
                    cinemaIds: item.cinemaList.join(','),
                  });
                  setDate(item.showDate);
                }}
              >
                <span>{getDaysNameFn(item.showDate)}</span>
              </div>
            );
          })}
        </div> */}
        <Tab
          tabList={cinema.showCinemas}
          dataKey="showDate"
          defaultActive={0}
          onChange={(key, item) => {
            setParams({
              ...params,
              cinemaIds: item.cinemaList.join(","),
            });
            setDate(item.showDate);
          }}
        />
        <Dropdown ref={menuRef}>
          <Dropdown.Item key="location" title={cityName}>
            <div className="city-items">
              {[...cinemaList.cinemas.keys()].map((res, index) => {
                return (
                  <div
                    key={index}
                    className="city-item"
                    onClick={() => cityItemsChange(res)}
                    style={
                      cityName === res
                        ? { border: "1px solid #ff5f16", color: "#ff5f16" }
                        : {}
                    }
                  >
                    {res}
                  </div>
                );
              })}
            </div>
          </Dropdown.Item>
          <Dropdown.Item key="recent" title="离我最近">
            <List>
              <List.Item>离我最近</List.Item>
            </List>
          </Dropdown.Item>
        </Dropdown>
        {loading ? (
          <Loading></Loading>
        ) : (
          <div className="cinemas-items">
            {cinemaList.cinemasList.map((item, index) => {
              return (
                <div
                  className="cinemas-item"
                  key={index}
                  onClick={() =>
                    to(`/films/chinemasInfo/${item.cinemaId}/${film.filmId}`)
                  }
                >
                  <div className="cinemas-top">
                    <div>{item.name}</div>
                    <div>
                      <span>{formatPrice(item.lowPrice)}</span> <span>起</span>{" "}
                    </div>
                  </div>
                  <div className="cinemas-bottom">
                    <div className="text-ellipsis">{item.address}</div>
                    <div>{getDistance(item.longitude, item.latitude)}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

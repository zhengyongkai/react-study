import type {
  amountInf,
  cardInf,
  cardListInf,
  user,
  userState,
} from "@/types/user";
import { useSelector } from "react-redux";

import { useEffect, useState } from "react";
import { formatPrice } from "@/utils/price";

import Styles from "@/assets/css/my.module.scss";

import orderImg from "@/assets/img/order.png";
import customImg from "@/assets/img/custom.png";
import settingImg from "@/assets/img/setting.png";
import { RightOutline } from "antd-mobile-icons";
import { useNavigate } from "react-router-dom";
import SvgIcon from "@/components/SvgIcon/Index";
import { cssCb } from "@/utils/css";

export default function MyPage() {
  const navigate = useNavigate();

  const userData = useSelector<userState, user>((state) => state.user.userData);
  const userCouponData = useSelector<userState, cardListInf[]>(
    (state) => state.user.couponList
  );
  const [card, setCard] = useState<cardInf & amountInf>({
    cardList: userCouponData,
    availableAmount: 0,
    frozenAmount: 0,
    totalAmount: 0,
  });

  const menus = [
    {
      img: orderImg,
      title: "电影订单",
      url: "/order",
    },
    {
      img: customImg,
      title: "帮助与客服",
      url: "/custom",
    },
    {
      img: settingImg,
      title: "设置",
      url: "/setting",
    },
  ];

  useEffect(() => {
    setCard({
      ...card,
      cardList: userCouponData,
    });
  }, [userCouponData]);

  function login() {
    navigate("/login");
  }

  /**
   * @description: 获取性别
   * @return {*}
   */
  function getSex() {
    if (userData.gender === 1) {
      return <SvgIcon name="sexm" size={12}></SvgIcon>;
    } else {
      return <SvgIcon name="sexw" size={12}></SvgIcon>;
    }
  }

  return (
    <>
      <div className={cssCb([Styles["user-bg"], "flex", "items-center"])}>
        {userData.userId ? (
          <>
            <div className={Styles["user-headerIcon"]}>
              <img src={userData.headIcon} alt="" />
            </div>
            <div className={Styles["user-nickName"]}>
              <div>{userData.nickName}</div>
              <div className="flex items-center">
                <div>ID： {userData.uid}</div>
                <div>{getSex()}</div>
              </div>
            </div>
          </>
        ) : (
          <div onClick={login}>请先登录</div>
        )}
      </div>
      <div className={Styles["user-card"]}>
        <div onClick={() => navigate("/coupon")}>
          <div>{card.cardList.length}张</div>
          <div>优惠卷</div>
        </div>
        <div>
          <div>{formatPrice(userData.balance)}</div>
          <div>余额</div>
        </div>
      </div>
      <div className={Styles["user-menu-items"]}>
        {menus.map((item, key) => {
          return (
            <div
              className={Styles["user-menu-item"]}
              key={key}
              onClick={() => navigate(item.url)}
            >
              <img src={item.img} alt="" />
              <div>{item.title}</div>
              <RightOutline></RightOutline>
            </div>
          );
        })}
      </div>
    </>
  );
}

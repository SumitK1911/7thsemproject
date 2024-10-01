import image from "../../../../../public/user.png";

import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdShoppingBag,
  MdAttachMoney,
  MdWork,
  MdAnalytics,
  MdPeople,
  MdOutlineSettings,
  MdHelpCenter,
  MdLogout,
} from "react-icons/md";
import MenuLinks from "./menulink/MenuLinks";
import Image from "next/image";

const menuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <MdDashboard />,
      },
      {
        title: "Users",
        path: "/dashboard/users",
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: "Products",
        path: "/dashboard/products",
        icon: <MdShoppingBag />,
      },
      {
        title: "Transactions",
        path: "/dashboard/transactions",
        icon: <MdAttachMoney />,
      },
    ],
  },
  {
    title: "Analytics",
    list: [
      {
        title: "Revenue",
        path: "/dashboard/revenue",
        icon: <MdWork />,
      },
      {
        title: "Reports",
        path: "/dashboard/reports",
        icon: <MdAnalytics />,
      },
      {
        title: "Teams",
        path: "/dashboard/teams",
        icon: <MdPeople />,
      },
    ],
  },
  {
    title: "User",
    list: [
      {
        title: "Settings",
        path: "/dashboard/settings",
        icon: <MdOutlineSettings />,
      },
      {
        title: "Help",
        path: "/dashboard/help",
        icon: <MdHelpCenter />,
      },
    ],
  },
];

const Sidebar = () => {
  return (
    <div className="sticky w-[20rem] top-[40px]">
      <div className="flex items-center gap-[14px] mb-[20px]">
        <Image
          src={image}
          alt=""
          width="50"
          height="50"
          className="rounded-full object-cover"
        />
        <div className="flex flex-col">
          <span className="font-bold text-[12px]">Sanjay Prajapati</span>
          <span>Admin</span>
        </div>
      </div>
      <ul className="flex flex-col">
        {menuItems.map((cat) => (
          <li key={cat.title} className="flex flex-col gap-3">
            <span className="text-gray-400 font-bold text-[13px] my-[10px]">
              {cat.title}
            </span>
            <div className="flex flex-col gap-2">
              {cat.list.map((item) => (
                <MenuLinks item={item} key={item.title} />
              ))}
            </div>
          </li>
        ))}
      </ul>
      <button className="p-2 rounded-lg bg-gray-500 flex gap-2 items-center mt-5 cursor-pointer hover:scale-[1.02] active:scale-[0.98]">
        <MdLogout />
        Logout
      </button>
    </div>
  );
};

export default Sidebar;

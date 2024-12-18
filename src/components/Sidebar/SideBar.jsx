import { NavLink, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
import { BiLeftArrowCircle } from "react-icons/bi";
import whiteLogoNew from "../../images/logoWhiteNew.png";
import OtherHousesOutlinedIcon from '@mui/icons-material/OtherHousesOutlined';
import AddLinkIcon from '@mui/icons-material/AddLink';
import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded';
import WarehouseOutlinedIcon from '@mui/icons-material/WarehouseOutlined';
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import SpeedOutlinedIcon from '@mui/icons-material/SpeedOutlined';
import FlightOutlinedIcon from '@mui/icons-material/FlightOutlined';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import PlaylistAddCheckOutlinedIcon from '@mui/icons-material/PlaylistAddCheckOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PrivacyTipOutlinedIcon from '@mui/icons-material/PrivacyTipOutlined';
import MilitaryTechOutlinedIcon from '@mui/icons-material/MilitaryTechOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import DriveFileMoveOutlinedIcon from '@mui/icons-material/DriveFileMoveOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
const routes = [
  {
    path: "/Admin/dashboard",
    name: "Dashboard",
    icon: <SpeedOutlinedIcon />,
  },
  {
    path: "/Admin/billing",
    name: "Invoice",
    icon: <AccountBalanceIcon />,
  },
  {
    path: "",
    name: "Manage Invoices", 
    icon: <FlightOutlinedIcon />,
    subRoutes: [
      {
        path: "/Admin/billing",
        name: "Invoices",
        icon: <SupervisorAccountOutlinedIcon />,
      },
      {
        path: "/Admin/sageinvoice",
        name: "Sage Invoices",
        icon: <FaUser />,
      },
           {
        path: "/Admin/cashbook",
        name: "Cashbook",
        icon: <ShoppingCartOutlinedIcon />,
      },
    ],
  },
  {
    path: "",
    name: "Manage Freight", 
    icon: <FlightOutlinedIcon />,
    subRoutes: [
      {
        path: "/Admin/managefreight",
        name: "Freight By Admin",
        icon: <SupervisorAccountOutlinedIcon />,
      },
      {
        path: "/Admin/freight",
        name: "Freight By User",
        icon: <FaUser />,
      },
            {
        path: "/Admin/order",
        name: "Freight Orders",
        icon: <ShoppingCartOutlinedIcon />,
      },
    ],
  },
  {
    path: "",
    name: "Custom Clearance",
    icon: <PlaylistAddCheckOutlinedIcon />,
    subRoutes: [
      {
        path: "/Admin/custom-clearance-order",
        name: "Custom By Admin",
        icon: <SupervisorAccountOutlinedIcon />,
      },
      {
        path: "/Admin/Custom-clearence-byuser",
        name: "Custom by user",
        icon: <FaUser />,
      },
           {
        path: "/Admin/calculation-order",
        name: "Clearance Order",
        icon: <ShoppingCartOutlinedIcon />,
      },
    ],
  },
  {
    path: "",
    name: "Batches",
    icon: <WorkspacePremiumOutlinedIcon />,
    subRoutes: [
      {
        path: "/Admin/Batches",
        name: "Batches",
        icon: <MilitaryTechOutlinedIcon />,
      },
         ],
  },
  {
    path: "",
    name: "Warehouse",
    icon: <WarehouseOutlinedIcon />,
    subRoutes: [
      {
        path: "/Admin/WarehouseOrder",
        name: "Warehouse Order",
        icon: <ShoppingCartOutlinedIcon />,
      },
    ],
  },
  {
    path: "",
    name: "Imports ",
    icon: <FileUploadOutlinedIcon />,
    subRoutes: [
      {
        path: "/Admin/oploadfile",
        name: "Excel",
        icon: <DriveFileMoveOutlinedIcon />,
      },

    ],
  },
  {
    path: "/Admin/countryoforigin",
    name: "Country Of Origin",
    icon: <LanguageOutlinedIcon />,
  },
    {
    path: "/Admin/manage-customer",
    name: "Manage Customers",
    icon: <PeopleAltOutlinedIcon />,
  },
  {
    path: "/Admin/manage-shipment",
    name: "Manage Shipments",
    icon: <PeopleAltOutlinedIcon />,
  },
];
const userControlRoutes = {
  path: "",
  name: "User Control",
  icon: <SecurityOutlinedIcon />,
  subRoutes: [
    {
      path: "/Admin/manage-staff",
      name: "Manage Staff",
      icon: <Groups2OutlinedIcon />,
    },
    {
      path: "/Admin/Warehouse",
      name: "Warehouse",
      icon: <OtherHousesOutlinedIcon />,
    },
    {
      path: "/Admin/manage-supplier",
      name: "Manage Suppliers",
      icon: <LocalShippingOutlinedIcon />,
    },
    {
      path: "/Admin/query",
      name: "Query",
      icon: <QueryStatsIcon />,
    },
    {
      path: "/Admin/notifications",
      name: "Notifications",
      icon: <NotificationsActiveOutlinedIcon />,
    },
    {
      path: "/Admin/link",
      name: "Add Links",
      icon: <AddLinkIcon />,
    },
    {
      path: "/Admin/term-conditions",
      name: "Terms and Conditions",
      icon: <DescriptionOutlinedIcon />,
    },
    {
      path: "/Admin/privacy-policy",
      name: "Privacy Policy",
      icon: <PrivacyTipOutlinedIcon />,
    },
  ],
};
const SideBar = ({ children }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const usertype = JSON.parse(localStorage.getItem("data123")).user_type;
  const filteredRoutes = [...routes];
  if (usertype === "1") {
    filteredRoutes.push(userControlRoutes);
  }
  useEffect(() => {
    const savedState = localStorage.getItem("sidebarOpen");
    if (savedState !== null) {
      setIsOpen(savedState === "true");
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("sidebarOpen", isOpen);
  }, [isOpen]);
  const toggle = () => setIsOpen(!isOpen);
  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: "170px",
      padding: "7px 21px",
      transition: {
        duration: 0.2,
      },
    },
  };
  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };
  return (
    <>
      <div className="main-container" >
        <motion.div
          animate={{
            width: isOpen ? "300px" : "45px",
            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className={`sidebar `}
        >
          <div className="top_section">
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo"
                >
                  <img
                    src={whiteLogoNew}
                    alt="this is image"
                    style={{ width: "150px" }}
                  />
                </motion.h1>
              )}
            </AnimatePresence>
            <div className="bars" style={{ borderRadius: "20px" }}>
              <BiLeftArrowCircle
                onClick={toggle}
                style={{ fontSize: "2rem",cursor:"pointer" }}
              />
            </div>
          </div>
          <div className="text-center">
            <div>
              <button className="search" style={{ cursor: "pointer" }} onClick={() => {
                navigate("/Admin/Addfreight");
              }}>
                <AnimatePresence>
                  <span>
                    <ControlPointRoundedIcon />
                  </span>
                  {isOpen && (
                    <p
                      className="addF"
                      style={{ cursor: "pointer" }}

                    >
                      Add Freight
                    </p>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
          <section className="routes">
            {filteredRoutes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                    key={index}
                  />
                );
              }
              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className={({ isActive }) => (isActive ? "link active" : "link")}
                >
                  <div className="icon">
                    <p className="icon_para">{route.icon}</p>
                  </div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>
        </motion.div>
        <motion.div
          animate={{
            width: isOpen ? "85%" : "100%",
            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className={`main_div `}
        >
          <main>{children}</main>
        </motion.div>
      </div>
    </>
  );
};
export default SideBar;
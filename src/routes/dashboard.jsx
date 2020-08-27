import Dashboard from "views/Dashboard/Dashboard.jsx";
import ChainProperties from "../views/Chainproperties/ChainProperties";
import Member from "../views/Member/Member";
import Blocks from "../views/Blocks/Blocks";
import Witnesses from "../views/Witnesses/Witnesses";
import About from "../views/About/About";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "fa fa-tachometer-alt",
    component: Dashboard
  },
  {
    path: "/witnesses",
    name: "Witnesses",
    icon: "fas fa-user-secret",
    component: Witnesses
  },
  {
    path: "/chainprops",
    name: "Properties",
    icon: "fas fa-dice-d20",
    component: ChainProperties
  },
  {
    path: "/about",
    name: "About",
    icon: "fas fa-bell",
    component: About
  },
  {
    dynamic: true,
    path: "/@:username",
    component: Member
  },
  {
    dynamic: true,
    path: "/:block",
    component: Blocks
  },
  { redirect: true, path: "/", pathTo: "/dashboard", name: "Dashboard" }
];
export default dashRoutes;

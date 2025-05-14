import { Outlet } from "react-router-dom";
import { Navbar } from "../component/Navbar";

const Layout = () => {
  return (
    <div className="layout">
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;

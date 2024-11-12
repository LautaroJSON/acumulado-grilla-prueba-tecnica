import React from "react";
interface ILayout {
  children: React.ReactNode;
}
const Layout = ({ children }: ILayout) => {
  return (
    <div className="lay-sidebar">
      <div className="sidebar__main">{children}</div>
      <div className="sidebar__aside">
        <div className="banner --desktop --large"></div>
        <div className="com-ranking hlp-none hlp-tablet-none">
          <h2 className="com-title-section-m">Recetas más leídas</h2>
        </div>
        <div className="banner --desktop --large"></div>
      </div>
    </div>
  );
};

export default Layout;

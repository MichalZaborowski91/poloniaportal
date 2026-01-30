import { NavLink, Outlet } from "react-router-dom";

export const AccountLayout = () => {
  return (
    <div style={{ display: "flex", gap: 24 }}>
      <aside style={{ minWidth: 200 }}>
        <h3>Account</h3>

        <nav style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <NavLink to="">Profile</NavLink>
          <NavLink to="security">Security</NavLink>
        </nav>
      </aside>
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
    </div>
  );
};

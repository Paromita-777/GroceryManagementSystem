import LogoutButton from "../components/LogoutButton";

export default function Topbar() {

    const user = JSON.parse(localStorage.getItem("user") || "{}");
  
  return (
    <nav className="navbar navbar-light bg-white shadow-sm px-4 d-flex justify-content-between align-items-center">

      <p className="mb-0">
         Welcome <b>{user.username || "Guest"}</b>
      </p>
      <LogoutButton />

    </nav>
  );
}
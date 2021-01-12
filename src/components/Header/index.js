import { Link } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../../auth";
import LogOut from "../LogOut";

function Header() {
  const { user } = useContext(AuthContext);
  return (
    <header>
      {user ? (
        <>
          Welcome {user.email}
          <LogOut />
        </>
      ) : (
        <>
          <Link to="/signup">Register</Link> | <Link to="/login">Login</Link>
        </>
      )}
    </header>
  );
}

export default Header;

import firebase from "firebase";
import { useHistory } from "react-router-dom";

function LogOut() {
  const history = useHistory();

  return (
    <button
      onClick={async () => {
        try {
          await firebase.auth().signOut();
          history.push("/login");
        } catch (error) {
          console.log(error);
        }
      }}
    >
      Log out
    </button>
  );
}

export default LogOut;

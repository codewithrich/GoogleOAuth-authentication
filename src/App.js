import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

function App() {
  const [user, setUser] = useState({});

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token:" + response.credential);
    var userObject = jwtDecode(response.credential);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
  }

  function handleSignOut(event) {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "your_client_id",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });

    google.accounts.id.prompt();
  }, []);

  // no user -> then show the sign in button
  // if we have a user then show the sign out button

  return (
    <div className="App">
      <div id="signInDiv"></div>

      {user && (
        <div>
          <img src={user.picture} alt="WELCOME TO GOOGLE RICHIEE'S AUTHENTICATION"></img>
          <h1>{user.name}</h1>
          <h1>{user.email}</h1>

          {Object.keys(user).length !== 0 && (
            <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
          )}
        </div>
      )}
    </div>
  );
}
export default App;

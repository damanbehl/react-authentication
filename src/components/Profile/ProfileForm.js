import classes from "./ProfileForm.module.css";
import { useContext, useRef } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import { API_KEY } from "../Auth/AuthForm";

const ProfileForm = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const newPasswordRef = useRef();
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredNewPassword = newPasswordRef.current.value;
    //Add validation here

    fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idToken: authCtx.token,
          password: enteredNewPassword,
          returnSecureToken: false,
        }),
      }
    )
      .then((res) => {
        // assume success
        history.replace("/");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          minLength="7"
          ref={newPasswordRef}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;

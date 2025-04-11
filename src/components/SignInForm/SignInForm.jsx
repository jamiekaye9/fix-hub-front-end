import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { signIn } from "../../services/authService";
import { UserContext } from "../../contexts/UserContext";
import styles from "./SignInForm.module.css";

const SignInForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setMessage("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const signedInUser = await signIn(formData);
      setUser(signedInUser);
      navigate("/");
    } catch (e) {
      setMessage(e.message);
    }
  };

  return (
    <main className={styles.signInForm}>
      <h1 className={styles.title}>Sign In</h1>
      <p className={styles.message}>{message}</p>
      <form
        className={styles.formItems}
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <div className={styles.div}>
          <label htmlFor="username" className={styles.label}>
            Username
          </label>
          <input
            type="text"
            autoComplete="off"
            id="username"
            value={formData.username}
            name="username"
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.div}>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input
            type="password"
            autoComplete="off"
            id="password"
            value={formData.password}
            name="password"
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.buttonDiv}>
          <button className={styles.button}>Sign In</button>
          <button className={styles.button} onClick={() => navigate("/")}>
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
};

export default SignInForm;

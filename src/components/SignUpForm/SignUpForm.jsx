import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { signUp } from "../../services/authService";
import { UserContext } from "../../contexts/UserContext";
import styles from "./SignUpForm.module.css";

const SignUpForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    passwordConf: "",
    role: "",
  });

  const { firstName, lastName, username, password, passwordConf, role } =
    formData;

  const handleChange = (e) => {
    setMessage("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = await signUp(formData);
      setUser(newUser);
      navigate("/");
    } catch (e) {
      setMessage(e.message);
    }
  };

  const isFormValid = () => {
    return !(
      firstName &&
      lastName &&
      username &&
      password &&
      role &&
      password === passwordConf
    );
  };

  return (
    <main className={styles.signUpForm}>
      <h1 className={styles.title}>Sign Up</h1>
      <p className={styles.message}>{message}</p>
      <form className={styles.formItems} onSubmit={handleSubmit}>
        <div className={styles.div}>
          <label htmlFor="firstName" className={styles.label}>
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            name="firstName"
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.div}>
          <label htmlFor="lastName" className={styles.label}>
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            name="lastName"
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.div}>
          <label htmlFor="username" className={styles.label}>
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            name="username"
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.div}>
          <label htmlFor="role" className={styles.label}>
            Role
          </label>
          <select
            id="role"
            value={role}
            name="role"
            onChange={handleChange}
            required
            className={styles.input}
          >
            <option value="" disabled>
              Select a role
            </option>
            <option value="serviceDesk">Service Desk</option>
            <option value="requestor">Requestor</option>
          </select>
        </div>
        <div className={styles.div}>
          <label htmlFor="password" className={styles.label}>
            Confirm Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            name="password"
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.div}>
          <label htmlFor="passwordConf" className={styles.label}>
            Password
          </label>
          <input
            type="password"
            id="passwordConf"
            value={passwordConf}
            name="passwordConf"
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.buttonDiv}>
          <button className={styles.button} disabled={isFormValid()}>
            Sign Up
          </button>
          <button className={styles.button} onClick={() => navigate("/")}>
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
};

export default SignUpForm;

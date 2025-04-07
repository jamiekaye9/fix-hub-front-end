import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { signUp } from '../../services/authService';
import { UserContext } from '../../contexts/UserContext';

const SignUpForm = () => {
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);
    const [message, setMessage] = useState('');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        passwordConf: '',
        role: '',
    });

    const { firstName, lastName, username, password, passwordConf, role } = formData;

    const handleChange = (e) => {
        setMessage('');
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newUser = await signUp(formData);
            setUser(newUser);
            navigate('/');
        } catch (e) {
            setMessage(e.message);
        }
    }

    const isFormValid = () => {
        return !(firstName && lastName && username && password && role && password === passwordConf);
    }

    return (
        <main>
            <h1>Sign Up</h1>
            <p>{message}</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="firstName">First Name</label>
                    <input 
                      type="text"
                      id='firstName'
                      value={firstName}
                      name='firstName'
                      onChange={handleChange}
                      required
                    />
                </div>
                <div>
                    <label htmlFor="lastName">Last Name</label>
                    <input 
                      type="text"
                      id='lastName'
                      value={lastName}
                      name='lastName'
                      onChange={handleChange}
                      required
                    />
                </div>
                <div>
                    <label htmlFor="username">Username</label>
                    <input 
                      type="text"
                      id='username'
                      value={username}
                      name='username'
                      onChange={handleChange}
                      required
                    />
                </div>
                <div>
                    <label htmlFor="role">Role</label>
                    <select 
                      id='role'
                      value={role}
                      name='role'
                      onChange={handleChange}
                      required
                    >
                      <option value="serviceDesk">Service Desk</option>
                      <option value="requestor">Requestor</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input 
                      type="password"
                      id='password'
                      value={password}
                      name='password'
                      onChange={handleChange}
                      required
                    />
                </div>
                <div>
                    <label htmlFor="passwordConf">Password</label>
                    <input 
                      type="password"
                      id='passwordConf'
                      value={passwordConf}
                      name='passwordConf'
                      onChange={handleChange}
                      required
                    />
                </div>
                <div>
                    <button disabled={isFormValid()}>Sign Up</button>
                    <button onClick={() => navigate('/')}>Cancel</button>
                </div>
            </form>
        </main>
    )
}

export default SignUpForm;

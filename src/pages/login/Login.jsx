import './Login.css';
import { useState } from 'react';
import { useLogin } from '../../hooks/useLogin';
export default function Login() {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');

	const { login, isPending, error } = useLogin();

	// handle submit
	const handleSubmit = (e) => {
		e.preventDefault();
		login(email, password);
		setEmail('');
		setPassword('');
	};
	return (
		<form className="auth-form" onSubmit={handleSubmit}>
			<h2>Login</h2>

			<label>
				<span>email</span>
				<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
			</label>
			<label>
				<span>password</span>
				<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
			</label>

			{!isPending && <button className="btn">Log in</button>}
			{isPending && (
				<button className="btn" disabled>
					loading
				</button>
			)}
			{error && <div className="error">{error}</div>}
		</form>
	);
}

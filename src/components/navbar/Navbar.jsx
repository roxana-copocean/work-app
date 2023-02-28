import './Navbar.css';

import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { useLogout } from '../../hooks/useLogout';
import { useAuthContext } from '../../hooks/useAuthContext';

export default function Navbar() {
	const { user } = useAuthContext();
	const { logout } = useLogout();
	return (
		<nav className="navbar">
			<ul>
				<li className="logo">
					<Link to="/" className="logo_layout">
						<img src={logo} alt="logo" />
						<span>geekMonk</span>
					</Link>
				</li>
				{!user && (
					<React.Fragment>
						<li>
							<Link to="/login" className="btn_primary">
								Login
							</Link>
						</li>
						<li>
							<Link to="/signup" className="btn_primary">
								Signup
							</Link>
						</li>
					</React.Fragment>
				)}
				{user && (
					<li>
						<button className="btn_secondary" type="button" onClick={logout}>
							Logout
						</button>
					</li>
				)}
			</ul>
		</nav>
	);
}

import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo2.svg';
import { useAuthContext } from '../../hooks/useAuthContext';
import './Sidebar.css';
import Avatar from '../avatar/Avatar';

export default function Sidebar() {
	const { user } = useAuthContext();
	return (
		<div className="sidebar">
			<div className="sidebar-content">
				<div className="user">
					<Avatar src={user.photoURL} />
					<p>{user.displayName}</p>
				</div>

				<nav className="links">
					<ul>
						<li>
							<NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
								{/* <img src={dashboard} alt="dashboard" /> */}
								<span>Dashboard</span>
							</NavLink>
						</li>
						<li>
							<NavLink to="/create" className={({ isActive }) => (isActive ? 'active' : '')}>
								{/* <img src={add} alt="add" /> */}
								<span>New Project</span>
							</NavLink>
						</li>
					</ul>
				</nav>
			</div>
			<img src={logo} alt="logo" className="logo_img" />
		</div>
	);
}

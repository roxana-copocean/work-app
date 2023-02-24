import React from 'react';
import './OnlineUsers.css';
import { useCollection } from '../../hooks/useCollection';
import Avatar from '../avatar/Avatar';

export default function OnlineUsers() {
	const { documents, error } = useCollection('users');
	return (
		<div className="user-list">
			<h2>All Users</h2>
			{error && <div className="error">{error}</div>}
			{documents &&
				documents.map((doc) => (
					<div key={doc.id} className="user-list-item">
						{doc.online && <span className="online-user" />}
						<span>{doc.displayName}</span>

						<Avatar src={doc.photoURL} />
					</div>
				))}
		</div>
	);
}

import React from 'react';
import { useState } from 'react';
import { timestamp } from '../../firebase/config';
import { serverTimestamp } from 'firebase/firestore';
import { useAuthContext } from '../../hooks/useAuthContext';

export default function ProjectComments() {
	const [ comment, setComment ] = useState('');
	const { user } = useAuthContext();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const newComment = {
			displayName: user.displayName,
			photoURL: user.photoURL,
			content: comment,
			createdAt: serverTimestamp(new Date()),
			id: Math.random()
		};

		console.log(newComment);
	};
	return (
		<div className="project-comments">
			<h4>Project Comments</h4>
			<form className="add-comment" onSubmit={handleSubmit}>
				<label>
					<span>Add comment</span>
					<textarea required onChange={(e) => setComment(e.target.value)} value={comment} />
				</label>
				<button className="btn_secondary">Add comment</button>
			</form>
		</div>
	);
}

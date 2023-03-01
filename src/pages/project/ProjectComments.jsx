import React from 'react';
import { useState } from 'react';
import { serverTimestamp, Timestamp } from 'firebase/firestore';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useFirestore } from '../../hooks/useFirestore';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import Avatar from '../../components/avatar/Avatar';
import { timestamp } from '../../firebase/config';

export default function ProjectComments({ project }) {
	const { updateDocument, response } = useFirestore('projects');
	const [ comment, setComment ] = useState('');
	const { user } = useAuthContext();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const newComment = {
			displayName: user.displayName,
			photoURL: user.photoURL,
			content: comment,
			createdAt: serverTimestamp(),
			id: Math.random()
		};

		const updatedComments = [ ...project.comments, newComment ];

		await updateDocument(project.id, { comments: updatedComments });

		if (!response.error) {
			setComment('');
		}
	};

	return (
		<div className="project-comments">
			<h4>Project Comments</h4>
			<ul>
				{project.comments.length > 0 &&
					project.comments.map((comment) => (
						<li key={comment.id}>
							<div className="comment-author">
								<Avatar src={comment.photoURL} />
								<p>{comment.displayName}</p>
							</div>
							{comment.createdAt && (
								<div className="comment-date">
									<p>
										{formatDistanceToNow(new Date(comment.createdAt.seconds * 1000), {
											addSuffix: true
										})}
									</p>
								</div>
							)}
							<div className="comment-content">
								<p>{comment.content}</p>
							</div>
						</li>
					))}
			</ul>
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

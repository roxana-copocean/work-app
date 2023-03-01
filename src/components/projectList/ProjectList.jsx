import React from 'react';
import { Link } from 'react-router-dom';
import './ProjectList.css';
import Avatar from '../avatar/Avatar';

export default function ProjectList({ projects }) {
	return (
		<div className="project-list">
			{projects.length === 0 && <p>No projects yet!</p>}
			{projects.map((project) => (
				<Link to={`/project/${project.id}`} key={project.id}>
					<h4>{project.name}</h4>
					<p className="due-date">Due by: {project.dueDate}</p>
					<div className="assigned-to">
						<p>Assigned to:</p>
						<ul>
							{project.assignedUsersList.map((user) => (
								<li key={user.photoURL}>
									<Avatar src={user.photoURL} />
								</li>
							))}
						</ul>
					</div>
				</Link>
			))}
		</div>
	);
}

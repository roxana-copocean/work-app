import React from 'react';
import Avatar from '../../components/avatar/Avatar';
import { useFirestore } from '../../hooks/useFirestore';
import { useAuthContext } from '../../hooks/useAuthContext';

export default function ProjectSummary({ project }) {
	const { deleteDocument } = useFirestore('projects');
	const { user } = useAuthContext();

	const handleDeleteProject = (e) => {
		deleteDocument(project.id);
	};
	return (
		<div>
			<div className="project-summary">
				<h2>{project.name}</h2>
				<div className="project_details">
					<p className="createdBy">created by {project.createdBy.displayName}</p>
					<p className="due-date">Project due by {project.dueDate}</p>
				</div>
				<p className="details">{project.details}</p>
				<h4>Project is assigned to :</h4>
				<div className="assigned-users">
					{project.assignedUsersList.map((user) => (
						<div key={user.id}>
							<Avatar src={user.photoURL} />
						</div>
					))}
				</div>
				{user.uid === project.createdBy.id && (
					<button className="btn_primary" onClick={handleDeleteProject}>
						Mark as complete
					</button>
				)}
			</div>
		</div>
	);
}

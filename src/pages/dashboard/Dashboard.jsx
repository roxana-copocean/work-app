import './Dashboard.css';
import { useState } from 'react';
import { useCollection } from '../../hooks/useCollection';
import ProjectList from '../../components/projectList/ProjectList';
import ProjectFilter from './ProjectFilter';
import { useAuthContext } from '../../hooks/useAuthContext';

export default function Dashboard() {
	const [ newFilter, setNewFilter ] = useState('all');
	const { documents, error } = useCollection('projects');
	const { user } = useAuthContext();

	const changeFilter = (newFilterChoice) => {
		setNewFilter(newFilterChoice);
	};

	const projects =
		documents &&
		documents.filter((doc) => {
			switch (newFilter) {
				case 'all':
					return true;
				case 'mine':
					let assignedToMe = false;
					doc.assignedUsersList.forEach((u) => {
						if (user.uid === u.id) {
							assignedToMe = true;
						}
					});
					return assignedToMe;
				case 'development':
				case 'design':
				case 'backend':
				case 'frontend':
					return doc.category === newFilter;
				default:
					return false;
			}
		});
	return (
		<div>
			<h2 className="page-title">Dashboard</h2>
			{documents && <ProjectFilter newFilter={newFilter} changeFilter={changeFilter} />}
			{documents && <ProjectList projects={projects} />}
			{error && <p className="error">{error}</p>}
		</div>
	);
}

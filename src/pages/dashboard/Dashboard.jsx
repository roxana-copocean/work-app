import './Dashboard.css';
import { useCollection } from '../../hooks/useCollection';
import ProjectList from '../../components/projectList/ProjectList';

export default function Dashboard() {
	const { documents, error } = useCollection('projects');
	return (
		<div>
			<h2 className="page-title">Dashboard</h2>
			{documents && <ProjectList projects={documents} />}
			{error && <p className="error">{error}</p>}
		</div>
	);
}
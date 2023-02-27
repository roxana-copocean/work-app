import './Dashboard.css';
import { useCollection } from '../../hooks/useCollection';

export default function Dashboard() {
	const { documents, error } = useCollection('projects');
	return (
		<div>
			<h2 className="page-title">Dashboard</h2>
			{documents && documents.map((doc) => <p key={doc.id}>{doc.name}</p>)}
			{error && <p className="error">{error}</p>}
		</div>
	);
}

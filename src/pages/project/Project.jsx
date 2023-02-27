import './Project.css';
import { useDocument } from '../../hooks/useDocument';
import { useParams } from 'react-router-dom';

export default function Project() {
	const { id } = useParams();

	const { projectDocument, error } = useDocument('projects', id);

	if (error) {
		return <div className="error">{error}</div>;
	}
	if (!projectDocument) {
		return <div className="loading">Loading...</div>;
	}

	return (
		<div className="project-details">
			{' '}
			<h1 className="page-title">{projectDocument.name} </h1>
		</div>
	);
}

import './Create.css';
import { useState, useEffect } from 'react';
import Select from 'react-select';
import { useCollection } from '../../hooks/useCollection';
import { timestamp } from '../../firebase/config';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useFirestore } from '../../hooks/useFirestore';
import { useNavigate } from 'react-router-dom';

const categories = [
	{ value: 'development', label: 'Development' },
	{ value: 'design', label: 'Design' },
	{ value: 'backend', label: 'Backend' },
	{ value: 'frontend', label: 'Frontend' }
];

export default function Create() {
	const { documents } = useCollection('users');
	const { user } = useAuthContext();
	const { addDocument, response } = useFirestore('projects');

	const [ users, setUsers ] = useState([]);
	const [ name, setName ] = useState('');
	const [ details, setDetails ] = useState('');
	const [ dueDate, setDueDate ] = useState('');
	const [ category, setCategory ] = useState('');
	const [ assignedUsers, setAssignedUsers ] = useState([]);
	const [ formError, setFormError ] = useState(null);

	let navigate = useNavigate();

	useEffect(
		() => {
			if (documents) {
				const options = documents.map((user) => {
					return { value: user, label: user.displayName };
				});
				setUsers(options);
			}
		},
		[ documents ]
	);
	const handleSubmitProject = async (e) => {
		e.preventDefault();
		setFormError(null);

		if (!category) {
			setFormError('Please select a project category!');
			return;
		}
		if (assignedUsers.length < 1) {
			setFormError('Please assign the project to al lest one user!');
			return;
		}
		const createdBy = {
			displayName: user.displayName,
			photoURL: user.photoURL,
			id: user.uid
		};

		const assignedUsersList = assignedUsers.map((user) => {
			return {
				displayName: user.value.displayName,
				photoURL: user.value.photoURL,
				id: user.value.uid
			};
		});

		const project = {
			name,
			details,
			category: category.value,
			dueDate: timestamp.fromDate(new Date(dueDate)),
			comments: [],
			createdBy: createdBy,
			assignedUsersList: assignedUsersList
		};
		await addDocument(project);
		if (!response.error) {
			navigate('/');
		}
	};

	return (
		<div className="create-form">
			<h2 className="page-title">Create a new project</h2>
			<form onSubmit={handleSubmitProject}>
				<label>
					<span>Project name</span>
					<input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
				</label>
				<label>
					<span>Project details</span>
					<textarea type="text" value={details} onChange={(e) => setDetails(e.target.value)} required />
				</label>

				<label>
					<span>Set due date</span>
					<input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
				</label>

				<label>
					<span>Project category</span>
					<Select options={categories} onChange={(option) => setCategory(option)} />
				</label>

				<label>
					<span>Assigned to:</span>
					<Select options={users} onChange={(option) => setAssignedUsers(option)} isMulti />
				</label>
				<button className="btn">Add project</button>
				{formError && <div className="error">{formError}</div>}
			</form>
		</div>
	);
}

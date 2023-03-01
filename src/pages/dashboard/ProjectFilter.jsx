import React from 'react';
import { useState } from 'react';

const filterList = [ 'all', 'mine', 'development', 'design', 'marketing', 'sales' ];

export default function ProjectFilter() {
	const [ newfilter, setNewFilter ] = useState('all');
	const handleClick = (selectFilter) => {
		setNewFilter(selectFilter);
		console.log(selectFilter);
	};

	return (
		<div className="project-filter">
			<nav>
				<p>Filter by:</p>
				{filterList.map((filter, idx) => (
					<button
						key={idx}
						className={newfilter === filter ? 'active btn_filter' : 'btn_filter'}
						onClick={() => handleClick(filter)}
					>
						{filter}
					</button>
				))}
			</nav>
		</div>
	);
}

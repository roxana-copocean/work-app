const filterList = [ 'all', 'mine', 'development', 'design', 'frontend', 'backend' ];

export default function ProjectFilter({ newFilter, changeFilter }) {
	const handleClick = (selectFilter) => {
		changeFilter(selectFilter);
	};

	return (
		<div className="project-filter">
			<nav>
				<p>Filter by:</p>
				{filterList.map((filter, idx) => (
					<button
						key={idx}
						className={newFilter === filter ? 'active btn_filter' : 'btn_filter'}
						onClick={() => handleClick(filter)}
					>
						{filter}
					</button>
				))}
			</nav>
		</div>
	);
}

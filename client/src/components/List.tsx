import React from 'react';
import data from '../data.json'
import Todo from "./Todo";


const List = () => {
	console.log(data.data)
	return (
		<ul className="flex-1 min-w-max">
			{/*{Object.entries(data.data).map(([key, value])=> <p key={key}>{JSON.stringify(value)}</p>)}*/}
			<Todo />
		</ul>

	);
};

export default List;
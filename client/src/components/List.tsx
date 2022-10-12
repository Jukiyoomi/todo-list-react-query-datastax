import React from 'react';
import data from '../data.json'
import Todo from "./Todo";


const List = () => {
	console.log(data.data)
	return (
		<ul className="flex-1 flex flex-col gap-4 min-w-max">
			{/*{Object.entries(data.data).map(([key, value])=> <p key={key}>{JSON.stringify(value)}</p>)}*/}
			<Todo />
			<Todo />
			<Todo />
			<Todo />
			<Todo />
			<Todo />
			<Todo />
			<Todo />
			<Todo />
			<Todo />
			<Todo />
			<Todo />
			<Todo />
			<Todo />
			<Todo />
			<Todo />
			<Todo />
			<Todo />
			<Todo />
			<Todo />
			<Todo />
			<Todo />
			<Todo />
			<Todo />
			<Todo />
			<Todo />
			<Todo />
			<Todo />
		</ul>

	);
};

export default List;
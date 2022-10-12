import React from 'react';

const Todo = () => {
	return (
		<li className="todo relative flex justify-between px-6 bg-white py-5 rounded-xl shadow shadow-xl hover:shadow-lg transition border-l-8 border-l-green-700">
			<p className="font-bold text-xl">Sortir la poubelle</p>
			<button className="cursor-pointer text-sm">Complete This todo</button>
		</li>
	);
};

export default Todo;
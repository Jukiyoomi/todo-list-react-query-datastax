import React from 'react';
import {AiOutlineCheckCircle, AiOutlineCloseCircle} from "react-icons/all";

type Todo = {content: string, completed: boolean}
type PropType = {id: string, todo: Todo}

const Todo = ({id, todo}: PropType) => {
	return (
		<li
			className="todo relative flex justify-between md:flex-row gap-4 items-center px-6 bg-white py-3 rounded-xl shadow shadow-xl hover:shadow-lg transition border-l-8 border-l-green-700"
			style={{minWidth: 320}}
		>
			<p className="font-bold text-xl">{todo.content}</p>
			{/*<button className="cursor-pointer text-sm">Complete This todo</button>*/}
			<AiOutlineCheckCircle className="cursor-pointer text-xl text-xl text-green-700" />
			<AiOutlineCloseCircle className="cursor-pointer text-xl text-xl text-red-700" />
		</li>

	);
};

export default Todo;
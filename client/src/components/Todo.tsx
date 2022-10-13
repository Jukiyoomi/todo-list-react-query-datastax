import React from 'react';
import {AiOutlineCheckCircle, AiOutlineCloseCircle, BsTrash} from "react-icons/all";
import {useMutation, useQueryClient} from "react-query";
import axios from "axios";

type Todo = {content: string, completed: boolean, createdAt: number, id:string}
type PropType = {todo: Todo}


const Todo = ({todo}: PropType) => {
	const queryClient = useQueryClient()
	const oppositeBoolean = !todo.completed


	const toggle = useMutation(() => {
		return axios
			.patch('http://localhost:4000/todos/update/'+ todo.id, {
			completed: oppositeBoolean,
		})
			.then(() => {
			queryClient.invalidateQueries(['todos'])
		})
	})

	const deletion = useMutation(() => {
		return axios
			.delete('http://localhost:4000/todos/delete/'+ todo.id)
			.then(() => queryClient.invalidateQueries(['todos']))
	})

	return (
		<li
			className={`todo relative flex justify-between md:flex-row gap-4 items-center px-6 bg-white py-3 rounded-xl shadow shadow-xl hover:shadow-lg transition border-l-8 ${todo.completed ? 'border-l-green-700' : 'border-l-red-700'}`}
			style={{minWidth: 320}}
		>
			<p className="font-bold text-xl">{todo.content}</p>
			<div className="flex items-center gap-2">
				{
					todo.completed ?
						<AiOutlineCloseCircle className="cursor-pointer text-xl text-red-700" onClick={toggle.mutate} />
						: <AiOutlineCheckCircle className="cursor-pointer text-xl text-green-700" onClick={toggle.mutate} />
				}
				<BsTrash className="cursor-pointer text-xl" onClick={deletion.mutate} />
			</div>
		</li>

	);
};

export default Todo;
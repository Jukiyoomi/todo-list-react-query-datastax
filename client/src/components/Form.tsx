import React, { useRef} from 'react';
import DisplayOptions from "./DisplayOptions";
import {useMutation, useQueryClient} from "react-query";
import axios from "axios";

const Form = ({setUrl}: {setUrl: Function}) => {
	const todoText = useRef() as React.MutableRefObject<HTMLInputElement>
	const queryClient = useQueryClient()

	const {mutate} = useMutation((e: Event) => {
		e.preventDefault()
		if(!todoText.current.value) return
		console.log(todoText.current.value)
		return axios.post('http://localhost:4000/todos/new', {
			content: todoText.current.value.toString()
		}).then(() => {
			todoText.current.value = ""
		}).then(() => {
			queryClient.invalidateQueries(['todos'])
		})
	})


	return (
		<aside className="flex md:sticky h-auto relative top-0 gap-5 flex-1 flex-col">
			<form
				className="flex-1 flex-col gap-5 flex items-center px-6 bg-white py-5 rounded-xl shadow shadow-xl"
				style={{maxHeight: 362}}
				onSubmit={mutate}
			>
				<div className="flex w-full flex-col">
					<label htmlFor="todo">Your Todo</label>
					<input
						type="text"
						name="todo"
						id="todo"
						className="flex-1 p-3 rounded outline-none bg-gray-200"
						ref={todoText}
					/>
				</div>
				<button type="submit" className="w-full p-3 rounded bg-red-400">Add</button>
			</form>
			<DisplayOptions setUrl={setUrl}/>
		</aside>
	);
};

export default Form;
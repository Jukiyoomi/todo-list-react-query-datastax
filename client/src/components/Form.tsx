import React from 'react';
import DisplayOptions from "./DisplayOptions";

const Form = ({setUrl}: {setUrl: Function}) => {
	return (
		<aside className="flex md:sticky h-auto relative top-0 gap-5 flex-1 flex-col">
			<form
				className="flex-1 flex items-center px-6 bg-white py-5 rounded-xl shadow shadow-xl"
				style={{maxHeight: 362}}
			>
				<div className="flex w-full flex-col">
					<label htmlFor="todo">Your Todo</label>
					<input type="text" name="todo" id="todo" className="flex-1 p-3 rounded outline-none bg-gray-200" />
				</div>
				<button type="submit"></button>
			</form>
			<DisplayOptions setUrl={setUrl}/>
		</aside>
	);
};

export default Form;
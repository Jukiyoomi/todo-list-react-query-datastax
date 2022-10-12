import React from 'react';

const DisplayOptions = ({setUrl}: {setUrl: Function}) => {
	const handleClick = (e: Event) => {
		const newUrl: string = e?.target?.dataset?.type
		console.log(newUrl)
		setUrl(`http://localhost:4000/todos/${newUrl}`)
	}
	return (
		<form className="flex flex-1 justify-between" >
			<div className="flex gap-1">
				<label htmlFor="all" className="font-bold">All</label>
				<input type="radio" name="request_type" id="all" data-type="all" defaultChecked onChange={handleClick}/>
			</div>
			
			<div className="flex gap-1">
				<label htmlFor="completed" className="font-bold">Completed</label>
				<input type="radio" name="request_type" id="completed" data-type="completed" onChange={handleClick}/>
			</div>

			<div className="flex gap-1">
				<label htmlFor="non-completed" className="font-bold">Non Completed</label>
				<input type="radio" name="request_type" id="non-completed" data-type="non-completed" onChange={handleClick}/>
			</div>
		</form>
	);
};

export default DisplayOptions;
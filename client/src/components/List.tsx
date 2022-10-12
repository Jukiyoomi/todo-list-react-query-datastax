import React, {useEffect} from 'react';
import Todo from "./Todo";
import {useQuery} from "react-query";
import axios from "axios";

const List = ({url}: {url: string}) => {

	const {data, refetch, isFetching, isLoading} = useQuery(['todos'], () => {
		return axios.get(url).then((res) => res.data)
	})
	useEffect(() => {
		refetch()
		console.log(url)
	}, [url])

	return (
		<ul className="flex-1 flex flex-col gap-4 min-w-max list">
			<>
				{isLoading || isFetching ? <p>Loading...</p> :
					(Object.entries(data.data).length > 0 ?
						<>
							<p>Total : {Object.entries(data.data).length}</p>
							{data.data.map((todo: { id?: any; content?: string; completed?: boolean; })=> <Todo key={todo.id} todo={todo} />)}
						</> :
						<p>No todos</p>
					)
				}
			</>

		</ul>

	);
};

export default List;
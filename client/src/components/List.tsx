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
	// console.log(data)

	return (
		<ul className="flex-1 flex flex-col gap-4 min-w-max">
			<>
				{isLoading || isFetching ? <p>Loading...</p> :
					(Object.entries(data.data).length > 0 ?
						<>
							<p>Total : {Object.entries(data.data).length}</p>
							{Object.entries(data.data).map(([key, value])=> <Todo key={key} id={key} todo={value}/>)}
						</> :
						<p>No todos</p>
					)
				}
			</>

		</ul>

	);
};

export default List;
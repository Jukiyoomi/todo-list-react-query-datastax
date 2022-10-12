import { useState } from 'react'
import List from "./components/List";
import Form from "./components/Form";

function App() {
    const [url, setUrl] = useState<string>('http://localhost:4000/todos/all')
    return (
        <div className="bg-gray-200 h-screen w-screen flex flex-col items-center p-6 gap-10">
            <h1 className="text-3xl underline font-bold w-max">Todo List</h1>
            <div
                className="container w-3/4 flex justify-center items-end p-3 overflow-y-scroll flex-wrap-reverse gap-10 relative"
                style={{height: 600}}
            >
                <List url={url} />
                <Form setUrl={setUrl} />
            </div>
        </div>
    )
}

export default App

import { useState } from 'react'
import List from "./components/List";
import Form from "./components/Form";

function App() {
    return (
        <div className="bg-gray-200 h-screen w-screen flex flex-col items-center p-6 gap-10">
            <h1 className="text-3xl underline font-bold w-max">Todo List</h1>
            <div className="w-3/4 flex justify-center flex-wrap-reverse gap-10">
                <List />
                <Form />
            </div>
        </div>
    )
}

export default App

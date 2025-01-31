import { resolve } from "path"

type User={
    id:number,
    name:string,
    email:string,
    username:string,
    phone:number
}

export default async function UserServer(){
    await new Promise((resolve)=>{
        setTimeout(resolve, 2000)  // Simulate delay for server-side rendering
    })
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    const users = await response.json()

    return <div>
        <h1>Users</h1>
        <ul>
            {users.map((user:User)=>(
                <li 
                className="bg-green-300 rounded-xl text-gray-700 m-2 text-center hover:bg-red-400"
                key={user.id}>
                    <h2>Name={user.name}</h2>
                    <p>Email={user.email}</p>
                    <p>Username={user.username}</p>
                    <br />
                </li>
            ))}
        </ul>
    </div>
}
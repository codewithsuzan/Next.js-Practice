"use client"
import {useState,useEffect} from "react"

type User={
    id:number,
    name:string,
    email:string,
    username:string,
    phone:number
}
export default function UserClient(){
    const [users, setUsers] = useState<User[]>([]);
    const [loading,setLoading] = useState(true)
    const [error,setError]=useState("")

    useEffect(()=>{
        async function fetchUsers() {
            try {
              const response = await fetch("https://jsonplaceholder.typicode.com/users");
              if (!response.ok) throw new Error("Failed to fetch users");
              
              const data: User[] = await response.json();
              setUsers(data);
            } catch (err) {
              setError((err as Error).message);
            } finally {
              setLoading(false);
            }
          }
      
          fetchUsers();
    },[])
    
    if(loading) return <h1>Loading...</h1>
    if(error) return <h1>{error}</h1>
    
    return <div>
        <h1>Users</h1>
        <ul>
            {users.map(user=>(
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
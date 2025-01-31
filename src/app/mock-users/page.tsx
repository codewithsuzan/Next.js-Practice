import { resolve } from "path";
import { revalidatePath } from "next/cache" 

type MockUser = {
  id: number;
  name: string;
  email: string;
  username: string;
};

export default async function MockUsers() {
  // await new Promise((resolve)=>{
  //     setTimeout(resolve, 2000)  // Simulate delay for server-side rendering
  // })
  const response = await fetch(
    "https://679c6d4987618946e65225da.mockapi.io/users"
  );
  const users = await response.json();

  async function addUser(formData:FormData){
    "use server"
    const name=formData.get("name")
    const res=await fetch("https://679c6d4987618946e65225da.mockapi.io/users",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name}),
    }
)
const newUser=await res.json() 
    revalidatePath("/mock-users")  // Revalidate the "/users" route after adding a new user
console.log(newUser)
}

  return (
    <div className="py-10">
      <form action={addUser}>
        <input
          type="text"
          placeholder="Name"
          name="name"
          required
          className="border p-2 mr-2 rounded-lg text-black"
        />
        <button
          type="submit"
          
          className="bg-blue-500 p-2 rounded-lg hover:bg-green-900"
        >
          Add User
        </button>
      </form>
      <h1>Users</h1>
      <ul>
        {users.map((user: MockUser) => (
          <li
            className="bg-green-300 rounded-xl text-gray-700 m-2 text-center hover:bg-red-400"
            key={user.id}
          >
            <h2>Name={user.name}</h2>
            <br />
          </li>
        ))}
      </ul>
    </div>
  );
}

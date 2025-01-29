import { users } from "../route";
export async function GET(_request: Request,{params}:{params:{id:string}}){
    const {id}= params
    const user=users.find(user=>user.id===parseInt(id))
    return new Response(JSON.stringify(user),{
        headers:{
            'Content-Type':'application/json'
        },
        status:200
    })
}
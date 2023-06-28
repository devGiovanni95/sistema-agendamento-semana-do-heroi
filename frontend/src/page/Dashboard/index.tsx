import { useContext } from "react"
import { AuthContext } from "../../components/AuthContext"

export function Dashboard(){
        const {user} = useContext(AuthContext)
        console.log("🚀 ~ file: index.tsx:6 ~ Dashboard ~ user:", user)
    return(
        <div>
            <h1>Dashboard</h1>
        </div>
    )
}
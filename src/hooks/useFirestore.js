import { collection, getDocs,query, where } from "firebase/firestore/lite"
import { useEffect, useState } from "react"
import { db } from "../firebase"

export const useFirestore = ()=>{
    
    const [data, setData] = useState([])
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        console.log("getData")
        getData()
    }, [])
    
 const getData = async () => {
    try {
        setLoading(true)
        const dataRef = collection(db, "url");
        const q = query(dataRef, where("uid", "==", "rAiHWNLL8vd1kMZd7fuLcQmRaFE3"))
        const querySnapshot = await getDocs(q);
        const dataDB = querySnapshot.docs.map((doc) => doc.data());
        setData(dataDB)
       } catch (error) {
        setError(error.message)
        console.log(error.message)
    }finally{
        setLoading(false)
    }
 }   
    return {
        data, error, loading
    }
}
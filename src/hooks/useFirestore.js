import { collection, doc,  getDocs,query, setDoc, where } from "firebase/firestore/lite"
import {  useState } from "react"
import { auth, db } from "../firebase"
import { nanoid } from "nanoid"

export const useFirestore = ()=>{
    
    const [data, setData] = useState([])
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)

   
    
 const getData = async () => {
   
   //console.log(auth.currentUser.uid)
    try {
        setLoading(true)
        const dataRef = collection(db, "url");
        const q = query(dataRef, where("uid", "==", auth.currentUser.uid))
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
 
 const addData = async (url) => {
    try {
        setLoading(true)
        const newDoc = {
            enable: true,
            nanoid: nanoid(4).toUpperCase(), 
            origin: url,
            uid: auth.currentUser.uid
        }

        const docRef = doc(db, "url", newDoc.nanoid)
        await setDoc(docRef, newDoc)
        setData([...data, newDoc])   
    } catch (error) {
        setError(error.message)
        console.log("addData" + error.message)
    }finally{
        setLoading(false)
    }
 }
    return {
        data, 
        error, 
        loading, 
        getData, 
        addData
    }
}
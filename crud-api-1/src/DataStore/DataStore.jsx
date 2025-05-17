import { data } from 'react-router-dom'
import {create} from 'zustand'

const apiUrl = "http://localhost:8000/students"

export const useStore = create((set) => ({
    message : "Start Zustand",
    data : null,
    error : null,
    setData : (newData) => set({data : newData}),
    fetchedData : async () => {
        try {
            const resp = await fetch(apiUrl)
            const result = await resp.json()
            set({data : result})
        } catch (error) {
            set({error})
        }
    }

}))



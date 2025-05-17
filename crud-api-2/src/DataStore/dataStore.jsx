import {create} from 'zustand'

const apiUrl = "http://localhost:4000/students"

export const useStore = create((set) => ({
    message : "this is zustand",
    data : null ,
    fetchData : async () => {
        try {
            const resp = await fetch(apiUrl)
            if(resp.ok) {
                const result = await resp.json()
                set({data : result})
            }
        } catch (error) {
            console.log(error.message)
        }
    }
}))
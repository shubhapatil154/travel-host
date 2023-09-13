export const getFromLocalStorage=(key)=>{
    const data=localStorage.getItem(key)
    return JSON.parse(data)

}
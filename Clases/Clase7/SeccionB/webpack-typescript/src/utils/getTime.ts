export const getTime = ()=>{
    return{
        date: new Date().toLocaleTimeString(),
        timestamp:Date.now()
    }
}
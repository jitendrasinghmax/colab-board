export function useFetch(){
    const post=async(url,method,body)=>{
        try{
            const resp=await fetch(url,{
                method,
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",  
                  },
                body:JSON.stringify(body)
            })
            if(resp.ok){
                const data=await resp.json();
                return data;
            }
            else{
                if(resp){
                    const data=await resp.json();
                    throw new error(resp.msg);
                }
                else throw new error("fail to fetch");
            }
        }
        catch(e){
            console.log(e.message)
        }    
    }
    return {post}
}
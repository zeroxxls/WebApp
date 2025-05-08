export const handleProfileClick = (navigate, id )=>{
    if(id){
        navigate(`/profile/${id}`)
    }else{
        console.warn("User ID is missing for navigation.");
    }
}
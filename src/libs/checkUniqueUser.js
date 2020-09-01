export async function isUserUnique (email, id = 0) {
  if (id === null) {
    if(email !== undefined) {
      let result = await fetch(`http://localhost:4000/users/exists/${email}`)
      let jsonData = await result.json();
      return !jsonData[0].exists;
    }    
  } else {
    if(email !== undefined) {
      let result = await fetch(`http://localhost:4000/users/exists/${email}/${id}`)
      let jsonData = await result.json();
      return !jsonData[0].exists;
    }  
  }

}

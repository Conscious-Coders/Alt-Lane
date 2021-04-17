// React.useEffect(()=>{
//   const allRelation = []
//   let fetchType = ""
//   if(authState.userType === "mentee"){
//     fetchType = "mentor"
//   }else{
//     fetchType = "mentee"
//   }
//     //for each mentor a mentee has get their first and last name , bio, position 
//   //for each mentee get a mentor gets their first and last name and all of their interests 
//   data.forEach(mentor => {
//   async function getInfoDisplay(){
//   // async function getStuff() {
//     await fetch(`http://localhost:9000/${fetchType}s/${mentor.user}`, {
//       headers: {
//         'Authorization': `Bearer ${authState.token}`
//       }
//     }).then(res => res.json())
//     .then(result =>{
//       allRelation.push({
//         name: result.data[0].first_name + " " + result.data[0].last_name,
//         firsName: result.data[0].first_name,
//         lastName: result.data[0].last_name,
//         bio: result.data[0].bio,
//         career: result.data[0].career_field_id,
//         photoUrl: result.data[0].photo_url
//       })
      
//     })   
//       console.log(allRelation, "in loop")
//       setHomeInfo(allRelation)
//     }  
//     getInfoDisplay()
//   })
// }, [authState.token, authState.userType, data])
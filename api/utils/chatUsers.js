const db = require('../db')

const addUser = ({ id, name, room }) => {
    //JavaScript Mastery = javascriptmastery
    
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();
    // const existingUser = users.find((user) => user.room === room && user.name === name);

   
    const user = { id, name, room}

    // users.push(user);

    return {user}
}


const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);
    if(index !== -1){
        return users.splice(index, 1)[0];
    }
}






const getUserById = async (id) => {
    if(!id) {
        console.log(`no id, returning early`)
        throw new Error(`no id provided`)
    }
    try{
        const user = await db.one(`SELECT * FROM users WHERE user_id = ${id}`)
        return user
    }catch(err){
        console.log(err)
    }
   
}

const getMentorship = async (user) => {
    const id = user.user_id
    
    try{
        if(user.user_type === 'mentee'){
         const mentor = await db.any(`SELECT mentor_id FROM mentorship WHERE mentee_id=${id}`)
         return mentor
        }
        
        else {
        const mentee = await db.any(`SELECT mentee_id FROM mentorship WHERE mentor_id=${id}`)
        return mentee
        }
    }catch(err){
        console.log(err)
    }
}


module.exports = {getUserById, getMentorship, addUser}
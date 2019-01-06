const handleProfile = (req,res,db)=> {
    const {id} = req.params;
    // let found = false;
    db.select('*').from('users').where({
        id: id
    }).then(user => {
        if (user.length) {
            res.json(user[0])
        }
        else {
            res.status(400).json('Not found')
        }
    }).catch(err => {
        res.status(400).json('user not found')
    })
    // database.users.forEach(user=> {
    //     if (user.id === id) {
    //         found = true;
    //        return res.json(user[0])
    //     }
        
        
    // })
    // if (!found) {
    //     return res.status(400).json('wrong id')
    //  } 
}


module.exports = {
    handleProfile: handleProfile
}
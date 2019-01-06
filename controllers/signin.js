const handleSignIn = (req,res,db, bcrypt)=> {
    const {email, password} = req.body;
    if (!email  || !password) {
        return  res.status(400).json('Username or password is incorrect ');
    }
    db.select('email', 'hash').from('login').
    where('email', '=', email).
    then(data => {
        const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
        console.log(isValid);
        if (isValid) {
            return db.select('*').from('users').
            where('email', '=', email).
            then(user => {
                console.log(user);
                res.json(user[0])
            }).
            catch(err => {
                res.status(400).json('unable to get user')
            })
        }
        
    }).
    catch(err => {
        res.status(400).json('unable to get credentials')
    })
    // if(req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
    //     res.json(database.users[0])
    // }
    // else {
    //     res.status(400).json('error logging in')
    // }

}



module.exports = {
    handleSignIn: handleSignIn
}

const handleRegister = (req, res,psql,bcrypt) => {
   
    const { userName, userEmail, userPassword }=req.body;
	if(!userEmail||!userName||!userPassword){
		return res.status(400).json('incorrect form submission');
	} 
    console.log(userPassword);
    const saltRounds = 10; // use for hashing
	const hash = bcrypt.hashSync(userPassword, saltRounds);

    psql.transaction(trx =>{
		trx.insert({
			hash: hash,
			email: userEmail
		})
		.into('login')
		.returning('email')
		.then(loginEmail => {
			return trx('users')
				.returning('*')
				.insert({
					username: userName,
					useremail: loginEmail[0].email,
					joined: new Date()

				})
				.then(user =>{
					res.json(user[0]); 
				})
		})
		.then(trx.commit)
		.catch(trx.rollback)
	})
	.catch(err =>res.status(400).json("unable to register"))	

}

    module.exports = {
        handleRegister: handleRegister
    };	
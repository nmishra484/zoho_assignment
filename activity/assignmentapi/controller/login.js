const handleSignin = (req, res, psql, bcrypt) => {

	const{userEmail, userPassword} = req.body;
	if(!userEmail||!userPassword){
		return res.status(400).json('incorrect form submission');
        
	}/*console.log(userEmail);*/

	psql.select('hash', 'email').from('login')
    
	.where('email', '=', userEmail)
	.then(data => {
		const isValid = bcrypt.compareSync(userPassword, data[0].hash);
	if(isValid) {
			return psql.select('*').from('users')
			  .where('useremail', '=', userEmail)
			  .then(user => {  
			  	res.json(user[0])
			  })
			  .catch(err => res.status(400).json('unable to get user'))
		} else {
			res.status(400).json('wrong credentials')
		}
	})
.catch(err => res.status(400).json('wrong credentials'))
}

module.exports = {
	handleSignin:handleSignin
};
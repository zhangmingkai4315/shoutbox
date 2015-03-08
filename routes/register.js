exports.form=function(req,res){
	res.render('register',{title:'Register Page!'});
};
var User=require('../lib/user');
exports.submit=function(req,res,next){
	//console.log(req.body);
	var data=req.body;
	console.log(data['username']);
	console.log(data.username);
	User.getByName(data.namename,function(err,user){
		if(err) return next(err);
		if(user.id){
			res.error("Username already taken");
			res.redirect('back');
		}
		else{
			user=new User({
				name:data.username,
				pass:data.userpass
	    	});
		   user.save(function(err){
		   	if(err) return next(err);
		   	req.session.uid=user.id;
		   	res.redirect('/');
		   });
		}

	});
};
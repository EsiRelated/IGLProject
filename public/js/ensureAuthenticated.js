module.exports = function(req, res, next){
  if(req.isAuthenticated()){
    return next();
  } else {
    req.flash('danger','please login');
    res.redirect('/users/login');
  }
}

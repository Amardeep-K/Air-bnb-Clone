import { User } from '../models/user.model.js';


export const renderloginForm = (req, res) => {
    console.log("Login route accessed");
  res.render('authentication/login.ejs');
}
export const renderRegisterForm = (req, res) => {
  res.render('authentication/register.ejs');
}

export const handleRegisterForm= async (req, res) => {
  try{
    const {username, password, email} = req.body;
  const newUser = new User({email, username});
  const registeredUser = await User.register(newUser, password);
  req.login(registeredUser, err => {
    if(err) return next(err);
    req.flash('success', 'Welcome to Wander Lust!');
    
    const redirectUrl = res.locals.redirectUrl || '/';
    
  res.redirect(redirectUrl);
  });
    
} catch(e){
  req.flash('error', e.message);
  res.redirect('/authentication/register');
}
  
 }

export const handleLoginForm= (req, res) => {
  req.flash('success', 'Welcome to Wander Lust!');
  const redirectUrl = res.locals.redirectUrl || '/';
  res.redirect(redirectUrl);

  
}

export const handleLogout= (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }


    req.flash('success', 'Logged out successfully!');
   const redirectUrl = res.locals.redirectUrl || '/';
  res.redirect(redirectUrl);
  });
}
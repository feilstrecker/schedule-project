const Login = require("../models/LoginModel");

exports.index = (req, res) => {
    res.render('login');
  };

exports.register = async function(req, res) {
  try {
    const login = new Login(req.body)
    await login.register();

    const erros = login.errors;
    const success = login.success;
    if(erros.length > 0) {
      req.flash('errors', erros);
      req.session.save(function() {
        return res.redirect('index');
      })
    } else {
      req.flash('success', success)
      req.session.save(function() {
        return res.redirect('index');
      })
    }
    return;

  } catch(er){
    console.log(er);
    res.render('404');
  }
}

exports.login = async function(req, res) {
  try {
    const login = new Login(req.body)
    await login.login();

    const erros = login.errors;
    const success = login.success;
    if(erros.length > 0) {
      req.flash('errors', erros);
      req.session.save(function() {
        return res.redirect('index');
      })
    } else {
      req.flash('success', success)
      req.session.user = login.user;
      req.session.save(function() {
        return res.redirect('index');
      })
    }
    return;

  } catch(er){
    console.log(er);
    res.render('404');
  }
}

exports.logout = async function(req, res) {
  req.session.destroy();
  res.redirect('/login/index');
}

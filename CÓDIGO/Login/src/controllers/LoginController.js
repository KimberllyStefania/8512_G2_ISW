const bcrypt = require('bcrypt');
function index(req, res) {

    res.render('login/index');
  }
function auth(req, res) {
  const data = req.body;

  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM Usuarios WHERE email = ?', [data.email], (err, userdata) => {
      if(userdata.length > 0) {
       
        
      }
        else {
          res.render('login/register' , { error: 'Error: El usuario no existe!'});
        }
});
});
}

function register(req, res) {
  res.render('login/register');
}

function storeUser(req, res) {
  const data = req.body;
  
    req.getConnection((err, conn) => {
      conn.query('SELECT * FROM Usuarios WHERE email = ?', [data.email], (err, userdata) => {
        if(userdata.length > 0) {
          res.render('login/register' , { error: 'Error: El usuario ya existe!'})
        }
          else {
            bcrypt.hash(data.password, 12).then(hash => {
              data.password = hash;

              req.getConnection((err, conn) => {
                conn.query('INSERT INTO Usuarios set ?', [data], (err, rows) => {   
                  res.redirect('/');
          });
              });
  });
    }});
  });
}
  
function logout(req, res) {
  if (req.session.loggedin) {
    req.session.destroy();
  }
  res.redirect('/');
}


module.exports = {
  index: index,
  register: register,
  auth: auth,
  logout: logout,
  storeUser: storeUser,
}
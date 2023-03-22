const Contato = require('../models/ContatoModel');


exports.index = async (req, res) => {
  const contato_func = new Contato(req.body);
  const contatos = await contato_func.buscaContatos();
  console.log(contatos);
  res.render('index', { contatos });
};
const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs')

const LoginSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true }
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.success = [];
    this.user = null;
  }

  async register() {
    this.valida();

    await this.userExists();

    if(this.errors.length > 0) return;
      const salt = bcryptjs.genSaltSync();
      this.body.password = bcryptjs.hashSync(this.body.password, salt);
      this.user = await LoginModel.create(this.body);
      this.success.push('Cadastro efetuado com sucesso!');
  }

  async login() {
    this.valida();
    if(this.errors.length > 0) return;
    this.user = await LoginModel.findOne({ email: this.body.email });
    if(!this.user) {
      this.errors.push('Usuário não existe.');
      return;
    }

    if(!bcryptjs.compareSync(this.body.password, this.user.password)) {
      this.errors.push('Senha inválida!');
      this.user = null;
      return;
    }
    this.success.push('Logado com sucesso!');
  }

  async userExists() {
    const user = await LoginModel.findOne({ email: this.body.email });
    if(user) this.errors.push('Usuário já existe.');
  }

  valida() {
    this.cleanup();

    // VALIDACAO
    if(!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido!');
    this.pass = this.body.password;
    if (this.pass.length < 5) {
      this.errors.push('A senha não possui mais que 5 caracteres');
    }

  }

  cleanup() {
    for(const key in this.body) {
      if(typeof this.body[key] !== 'string') {
        this.body[key] = '';
      }
    }
    this.body = {
      email: this.body.email,
      password: this.body.password
    };
    console.log(this.body)
  }

}

module.exports = Login;

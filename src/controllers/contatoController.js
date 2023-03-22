const Contato = require('../models/ContatoModel');

exports.index = function(req, res) {
    res.render('contato', { contato: '' });
}

exports.register = async function(req, res) {
    try {
        const contato = new Contato(req.body);
        await contato.register();
        if(contato.errors.length > 0) {
            console.log(contato.errors);
            req.flash('errors', contato.errors);
            req.session.save(() => res.redirect('/contato/index'));
            return;
        }
        req.flash('success', 'Seu contato foi registrado!!');
        req.session.save(() => res.redirect(`/contato/index/${contato.contato._id}`));
        return;
    } catch(er) {
        console.log('deu merda')
        console.log(er);
        return res.render('404');
    }
}

exports.editIndex = async function(req, res) {
    if(!req.params.id) return res.render('404');
    const contato_func = new Contato(req.body);
    const contato = await contato_func.buscaPorId(req.params.id)
    if(!contato) return res.render('404');
    
    res.render('contato', { contato });

}

exports.edit = async function(req, res) {
    if(!req.params.id) return res.render('404');
    const contato = new Contato(req.body);
    try {
        await contato.edit(req.params.id);
        if(contato.errors.length > 0) {
            console.log(contato.errors);
            req.flash('errors', contato.errors);
            req.session.save(() => res.redirect('/contato/index'));
            return;
        }
        req.flash('success', 'Seu contato foi editado!!');
        req.session.save(() => res.redirect(`/contato/index/${contato.contato._id}`));
        return;
    } catch(er) {
        console.log('deu merda')
        console.log(er);
        return res.render('404');
    }

}

exports.delete = async function(req, res) {
    if(!req.params.id) return res.render('404');
    const contato_func = new Contato(req.body);
    const contato = await contato_func.delete(req.params.id)
    if(!contato) return res.render('404');
    req.flash('success', 'Seu contato foi deletado!!');
    req.session.save(() => res.redirect(`back`));
    return;
}
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
admin.initializeApp();


let mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'seu-gmail',
    pass: 'sua-senha'
  }
});

exports.createUser = functions.firestore
  .document('/funcionarios/{documentId}')
  .onCreate((snap, context) => {

    const funcionario = snap.data();
    const email = funcionario.email;
    const nome = funcionario.nome;
    const departamento = funcionario.departamento.nome;
    const texto = `<h2>  Dados de acesso ao Sistema de Requisições
                  <br> Bem vindo  <b>${nome}</b>.  </h2>
                  <h3> Acesso as requisisções para o departamento  ${departamento} </h3>
                  <h4> A senha para acesso é: <h4> <b> 123456 </b>  <br>  `


    admin.auth().createUser({
      uid: `${email}`,
      email: `${email}`,
      emailVerified: false,
      password: `123456`,
      displayName: `${nome}`,
      disabled: false
    })
      .then((userRecord) => {
        const mailOptions = {
          from: `<noreply@firebase.com>`,
          to: email,
        };
        mailOptions.subject = `Sistema de Requisições | Dados de acesso`;
        mailOptions.html = `${texto}`;
        mailTransport.sendMail(mailOptions).then(() => {
          console.log('Email enviado para:', email);
          return null;
        });

      })
      .catch(function (error) {
        console.log("Não foi possível criar o usuário:", error);
      });
  });



exports.notifyUser = functions.firestore
  .document('/requisicoes/{documentId}')
  .onUpdate((snap, context) => {

    const requisicao = snap.after.data();
    const solicitante = requisicao.solicitante;
    const email = solicitante.email;
    const movimentacoes = requisicao.movimentacoes;

    if (movimentacoes.length > 0) {
      const movimentacao = movimentacoes[movimentacoes.length - 1];

      const texto = `<h2> Sua requisição recebeu uma atualização! </h2>
                     <h3> Descricao:   ${movimentacao.descricao} </h3>
                     <h4> Status:  ${movimentacao.descricao}  <br> `
      const mailOptions = {
        from: `<noreply@firebase.com>`,
        to: email,
      };
      mailOptions.subject = `Sistema de Requisições | Processamento de Requisições`;
      mailOptions.html = `${texto}`;
      mailTransport.sendMail(mailOptions).then(() => {
        console.log('Email enviado para:', email);
        return null;
      }).catch(function (error) {
        console.log("Não foi possível notificar  o usuário:", error);
      });
    }
  })


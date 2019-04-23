const express = require('express')
const bodyParser = require('body-parser')
const app = express()
var http = require('http');
const httpProxy = require('express-http-proxy')
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const helmet = require('helmet');
require("dotenv-safe").load();

var EspecialidadesProfissionalController = require('./app/controllers/EspecialidadesProfissionalController')
var GruposMateriaisController = require('./app/controllers/GruposMateriaisController')
var MateriaisController = require('./app/controllers/MateriaisController')
var PerfisController = require('./app/controllers/PerfisController')
var PessoasController = require('./app/controllers/PessoasController')
var PessoasDeficienciasController = require('./app/controllers/PessoasDeficienciasController')
var PessoasLocomocoesController = require('./app/controllers/PessoasLocomocoesController')
var PessoasSitClinicasController = require('./app/controllers/PessoasSitClinicasController')
var PessoasTelefonesController = require('./app/controllers/PessoasTelefonesController')
var PessoasTransportesController = require('./app/controllers/PessoasTransportesController')
var RedesController = require('./app/controllers/RedesController')


var UsuariosController = require('./app/controllers/UsuariosController')

var ModeloProcessosController = require('./app/controllers/ModeloProcessosController')
var ProcessosController = require('./app/controllers/ProcessosController')
var RPCSolicitacaoProfissionalController = require('./app/controllers/RPCSolicitacaoProfissionalController')
var LoginController = require('./app/controllers/LoginController')



var swaggerUi = require('swagger-ui-express');
var swaggerJSDoc = require("swagger-jsdoc");


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(logger('dev'));
app.use(helmet());;
app.use(cookieParser());



var swaggerDefinition = {
    info: {
      title: 'API Sistema SHRINERS',
      version: '1.0.0',
      description: 'Documentação da API do sistema Shriners',
    },
    host: 'localhost:3000',
    basePath: '/',
  };
  var options = {
    swaggerDefinition: swaggerDefinition,
    apis: ['./app/controllers/*.js'],
  };
var swaggerSpec = swaggerJSDoc(options);
app.get('/swagger.json', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use('/especialidades-profissional', EspecialidadesProfissionalController);
app.use('/grupos-materiais', GruposMateriaisController);
app.use('/materiais', MateriaisController);
app.use('/pessoas', PessoasController)
app.use('/perfis', PerfisController);
app.use('/pessoas-deficiencias', PessoasDeficienciasController);
app.use('/pessoas-locomocoes', PessoasLocomocoesController);
app.use('/pessoas-sit-clinicas', PessoasSitClinicasController);
app.use('/pessoas-telefones', PessoasTelefonesController);
app.use('/pessoas-transportes', PessoasTransportesController);
app.use('/redes', RedesController);



app.use('/usuarios', UsuariosController);
app.use('/modeloprocessos', ModeloProcessosController);
app.use('/processos', ProcessosController);
app.use('/rpc-solicitacoes-profissional', RPCSolicitacaoProfissionalController);
app.use('/login', LoginController);



app.listen(3000)

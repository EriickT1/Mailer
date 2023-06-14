const enviar = require('./mailer')
const url = require('url')
const http = require('http');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const axios = require('axios');
const port = 3000;
let ID = uuidv4().slice(30);
let indicador ="";

indicadores = async () =>{
try{
const { data } = await axios.get('https://mindicador.cl/api');
const uf = data.uf.valor;
const dolar = data.dolar.valor;
const euro = data.euro.valor;
const utm = data.utm.valor;

const plantilla = `
El valor del dolar el día de hoy es : ${dolar}
El valor del euro el día de hoy es : ${euro}
El valor del uf el día de hoy es : ${uf}
El valor del utm el día de hoy es : ${utm}`
return plantilla;
}catch(err){
    console.log(err);
}
}

indicadores()
.then((respuesta)=>{
    indicador = respuesta;
})

http
.createServer(function (req, res) {




if (req.url =='/') {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    fs.readFile('index.html', 'utf8', (err, html) => {
    res.end(html)
    })
}

if (req.url.startsWith('/mailing')) {
    let { correos, asunto, contenido } = url.parse(req.url, true).query


    const contenidototal = contenido+indicador;

    enviar(correos.split(','), asunto, contenidototal)
    .then((respuesta)=>{
        console.log(respuesta)
    });

    res.end(`<h1>Correo enviado!</h1>`,
        console.log('correo enviado')
        );

    fs.writeFile(`./correos/${ID}.txt`,`Correos:${correos},
    Asunto: ${asunto},
    Contenido: ${contenidototal}`,(err)=>{
        if(err){
            console.log('Error al crear el archivo');
            res.end();
        }else{
            console.log('Archivo creado');
            res.end();
        }
    });
}




})
.listen(port ,()=>{console.log('Server on Port:',port)})
//http://localhost:3000/?para=eriick1324@gmail.com&asunto=Servidor&contenido=ADL

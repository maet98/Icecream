# Ice Cream Order API



## Configuraciòn del proyecto

Descargar el proyecto y entrar en la carpeta del proyecto:

```shell
git clone https://github.com/maet98/Icecream.git
cd Icecream
```

Abrir el folder con su editor de texto favorito. En el caso que no tenga instalado node js instalarlo [Node js](https://nodejs.org/en/).

En la carpeta root habra un archivo llamado **email.js** en el cual debera insertar las credenciales del email que se utilizara para enviar los emails siguiendo la documentacion de [nodemailer](https://nodemailer.com/about/). Cambiar la parte comentada.

```javascript
const transporter = nodemailer.createTransport({
    //service: 'Ex: Gmail',
    //auth: {
        //user: '{Insert email here}',
        //pass: '{Insert password here}'
    //}
});

module.exports = function sendEmail(receive,message,subject){
    var mailOptions = {
        //from: '{email here}',
```

---

Entonces para correrlo solo tiene que :

```shell
node app.js
```

y el servicio API estara corriendo de manera local en su red. Si desea probar cada ruta le recomiendo que utilice la app [Postman](https://www.getpostman.com/) . No se debe preocupar por la base de datos ya que esta montada en mongo Atlas donde siempre estara disponible.

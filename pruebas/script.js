const cedula    = 'E-12222A';
const regExp    = new RegExp(/^[VE]-[0-9]{1,8}$/); 
const resultado = regExp.test(cedula);

console.log(resultado) 
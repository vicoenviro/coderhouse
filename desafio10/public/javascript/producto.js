(function () { 

  updateProductos()

  function updateProductos() {
    fetch('/javascript/templates/template.hbs')
    .then(response => response.text())
    .then(text => {
      axios.get('http://localhost:3000/api/productos-test', {
        responseType: 'json'
      })
        .then(function(res) {
          if(res.status==200) {
            console.log('get prod:',res.data);
            const template = Handlebars.compile(text);
            const html = template({ productos: res.data });
            document.querySelector('tbody').innerHTML = html;
          }
          console.log(res);
        })
        .catch(function(err) {
          console.log(err);
        })      
    });
  }
  
})();
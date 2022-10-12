(function () {
  
  const formProducto = document.getElementById('form-producto');
  const inputTitle = document.getElementById('title');
  const inputdescripcion = document.getElementById('descripcion');
  const inputcodigo = document.getElementById('codigo');
  const inputPreci = document.getElementById('preci');
  const inputstock = document.getElementById('stock');
  const inputThumbnail = document.getElementById('thumbnail');
  const mensaje = document.getElementById('mensaje');
  
  let siguienteID = 1

  formProducto.addEventListener('submit', (event) => {
    event.preventDefault();
    axios.post('http://localhost:8080/api/productos', {
        id: siguienteID,
        timestamp: Date.now(),
        nombre: inputTitle.value,
        descripcion: inputdescripcion.value,
        codigo: inputcodigo.value,
        foto: inputThumbnail.value,
        precio: inputPreci.value,
        stock: inputstock.value
    })
      .then(function(res) {
        if(res.status==201) {
          mensaje.innerHTML = 'El nuevo Producto ha sido almacenado con id: ' + siguienteID;
        }
      })
      .catch(function(err) {
        console.log(err);
      })
      siguienteID++
    inputTitle.value = '';
    inputPreci.value = '';
    inputThumbnail.value = '';
    inputTitle.focus();
    updateProductos()
  })


  function updateProductos() {
    fetch('/javascript/templates/template.hbs')
    .then(response => response.text())
    .then(text => {
      axios.get('http://localhost:8080/api/productos', {
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
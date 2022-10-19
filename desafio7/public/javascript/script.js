(function () {
  const formMessage = document.getElementById('form-message');
  const inputMessage = document.getElementById('input-message');
  const inputMail = document.getElementById('input-mail');
  const showMessage = document.getElementById('show-message');
  const formProducto = document.getElementById('form-producto');
  const inputTitle = document.getElementById('title');
  const inputPreci = document.getElementById('preci');
  const inputThumbnail = document.getElementById('thumbnail');
  
  const socket = io();

  /* inputMessage.addEventListener('keyup', (event) => {
    socket.emit('nuevo-mensaje', event.target.value);
  }) */

  function updateMessages(messages = []) {
    showMessage.innerText = '';
    //console.log('updatemessages:', messages)
    messages.forEach((data) => {
      const item = document.createElement('li');
      item.innerHTML = "<FONT COLOR='blue'>"+data.correo+"</FONT> <FONT COLOR='red'>["+data.fecha+"</FONT> <FONT COLOR='green'>"+data.mensaje+"</FONT>";
      showMessage.appendChild(item);
    })
  }

  formMessage.addEventListener('submit', (event) => {
    event.preventDefault();
    socket.emit('nuevo-mensaje', { correo: inputMail.value, mensaje: inputMessage.value });
    inputMessage.value = '';
    inputMail.value = '';
    inputMessage.focus();
  })

  formProducto.addEventListener('submit', (event) => {
    event.preventDefault();
    socket.emit('nuevo-producto', { title: inputTitle.value, preci: inputPreci.value, thumbnail: inputThumbnail.value });
    inputTitle.value = '';
    inputPreci.value = '';
    inputThumbnail.value = '';
    inputTitle.focus();
  })

  socket.on('connect', () => {
    console.log('Conectados al servidor');
  });

  socket.on('inicio', (data) => {
    //console.log('Inicio :', data)
    updateMessages(data.mensaje);
    updateProductos(data.productos);
  });

  socket.on('notificacion', (data) => {
    //console.log('Cliente mensaje:', data.mensaje)
    updateMessages(data.mensaje);
    updateProductos(data.productos);
  });

  socket.on('notificacionprod', (data) => {
    //console.log('productos backend:', data)
    updateMessages(data.mensaje);
    updateProductos(data.productos);
  });

  function updateProductos(productos = []) {
    fetch('/javascript/templates/template.hbs')
    .then(response => response.text())
    .then(text => {
      const template = Handlebars.compile(text);
      //console.log('productos:', productos)
      const html = template({ productos });
      //console.log('html', html);
      document.querySelector('tbody').innerHTML = html;
    });
  }
  
})();
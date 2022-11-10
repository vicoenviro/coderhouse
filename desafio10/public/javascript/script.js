(function () {
  const formMessage = document.getElementById('form-message');
  const inputMessage = document.getElementById('input-message');
  const inputMail = document.getElementById('input-mail');
  const showMessage = document.getElementById('show-message');
  const inputnombre = document.getElementById('input-nombre');
  const inputapellido = document.getElementById('input-apellido');
  const inputedad = document.getElementById('input-edad');
  const inputalias = document.getElementById('input-alias');
  const inputavatar = document.getElementById('input-avatar');
  
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
    socket.emit('nuevo-mensaje', { correo: inputMail.value, mensaje: inputMessage.value, nombre: inputnombre.value, apellido: inputapellido.value, edad: inputedad.value, alias: inputalias.value, avatar: inputavatar.value});
    inputMessage.value = '';
    inputnombre.value = '';
    inputapellido.value = '';
    inputedad.value = '';
    inputalias.value = '';
    inputavatar.value = '';
    inputMessage.focus();
  })

  socket.on('connect', () => {
    console.log('Conectados al servidor');
  });

  socket.on('inicio', (data) => {
    //console.log('Inicio :', data)
    updateMessages(data.mensaje);
  });

  socket.on('notificacion', (data) => {
    //console.log('Cliente mensaje:', data.mensaje)
    updateMessages(data.mensaje);
  });
  
})();
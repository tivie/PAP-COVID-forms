/*
 *     PARC-COVID: Plataforma Automática de Rastreio de Contactos
 *     Copyright (C) 2020 - 2020 Estêvão Soares dos Santos
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU Affero General Public License as published
 *     by the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     You are forbidden, however, to remove ANY COPYRIGHT NOTICE FROM BOTH THE
 *     LICENSE FILE OR SOURCE CODE, either visible or invisible to the public.
 *     
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU Affero General Public License for more details.
 *
 *     You should have received a copy of the GNU Affero General Public License
 *     along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

function submitForm3(ev) {
  var form = $('#formulario-rastreio-contactos');
  if (!form[0].checkValidity()) {
    return false;
  }
  ev.preventDefault();
  addLoadingStatus(ev);
  var arrayData = form.serializeArray();
  var contactos;
  var payload = {};
  var params = getParams();

  // URL Params
  payload.casehash = window.location.hash.replace(/^#/, '');
  payload.contactos = [];
  contactos = arrayData.filter(function (f) {
    return f.name.match(/^contacto_/);
  });

  for (var i = 0; i < contactos.length; i = i + 4) {
    if (contactos[i].value && contactos[i + 1].value) {
      // apenas processa info se tiver nome e contacto telefonico
      var contact = {
        c_nome: contactos[i].value,
        c_tel: contactos[i + 1].value,
        c_email: contactos[i + 2].value,
        c_data_contacto: contactos[i + 3].value
      }
      payload.contactos.push(contact);
    }
  }

  // para testar, abrir a consola no browser e descomentar as 2 linhas abaixo
  //console.log(payload);
  //console.log(JSON.stringify(payload));
  //return;

  var url = config.form3.url;

  var rqt = $.ajax({
    url: url,
    type: "POST",
    crossDomain: true,
    data: JSON.stringify(payload),
    dataType: "json",
    headers: {
      'Content-Type': 'application/json'
    }
  });

  rqt.done(function (response) {
    // dar feedback ao utente
    window.location.href = '../responses/sucesso.html';
  });

  rqt.fail(function (xhr, status) {
    var button = document.getElementById('enviarform');
    button.disabled = false;
    button.children[0].classList.add("d-none");
    console.log(xhr);
    alert(xhr.responseJSON.message);
  });
}

$(document).ready(function () {
  $('#adicionar-contacto').click(function () {
    $('#cena-para-add .rastreio-de-contactos-row')
      .first()
      .clone()
      .appendTo('#rastreio-de-contactos-items');
  });
});
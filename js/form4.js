/*
 *     PARC-COVID: Plataforma Automática de Rastreio de Contactos
 *     Copyright (C) 2020 - 2021 Estêvão Soares dos Santos
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

function carregar(ev) {
  var casehash = document.getElementById('casehash').value;
  var data_ct = document.getElementById('data_contacto').value;
  var data = document.getElementById('contactos').value;
  var payload = {}
  payload.casehash = casehash;
  payload.contactos = [];

  var contactos = data.replace(/\r\n/g, '\n').trim().split('\n');

  for (var i = 0; i < contactos.length; ++i) {
    var contacto = contactos[i].split('\t');

    payload.contactos.push({
      c_nome: contacto[0],
      c_tel: contacto[1],
      c_email: contacto[2],
      c_data_contacto: data_ct
    })
  }
  
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

  rqt.done(function () {
    // dar feedback ao utente
    alert('dados carregados com sucesso');
  });

  rqt.fail(function (xhr) {
    alert(xhr.responseJSON.error.message);
  });
}
$(document).ready(function () {
  var params = getParams();
  document.getElementById('casehash').value = params.get('codigo_seguranca');
  
  $('#carregarBtn').click(function(ev) {
    carregar(ev);
  });
});


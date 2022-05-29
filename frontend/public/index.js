function showlist() {
    $.ajax({
        url: '/back/list',
        type: 'GET',
        success: function (data) {
            var toadd = '<table>';
                toadd+= "<tr><th>ID</th><th>Title</th><th>Description</th><th>Created</th><th>Stuff to do</th></tr>";
            for (let x = 0; x < data.length; x++) {
                toadd+= "<tr>";
                toadd+= `<td>${data[x].id}</td>`
                toadd+= `<td>${data[x].title}</td>`
                toadd+= `<td>${data[x].description}</td>`
                toadd+= `<td>${data[x].created}</td>`
                toadd+= `<td>`
                if(!data[x].done) {
                    toadd+= `<button onclick="update(${data[x].id})">Mark</button>`
                } else {
                    toadd+= `<button onclick="update(${data[x].id})" disabled>Mark</button>`
                }
                toadd+= `<button onclick="remove(${data[x].id})">Delete</button>`
                toadd+= `</td>`
                toadd+= "</tr>";
            }
            toadd += '<table>';
            document.getElementById('listofthings').innerHTML = toadd;
        }
    })

}

showlist();

function update(x) {
    $.ajax({
        url: `/back/update/${x}`,
        type: 'POST',
        success: function() {
            showlist();
        }
    })
}

function remove(x) {
    $.ajax({
        url: `/back/remove/${x}`,
        type: "DELETE",
        success: function() {
            showlist();
        }
    })
}

function add() {
    const title = document.getElementById('title').value || 'untitled';
    const desc = document.getElementById('desc').value || 'No description provided';
    $.ajax({
        url: `/back/add/${title}?desc=${desc}`,
        type: 'PUT',
        success: function(data) {
            showlist();
        }
    })
}
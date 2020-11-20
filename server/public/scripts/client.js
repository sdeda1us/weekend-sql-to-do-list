$(document).ready(readyNow);

function readyNow() {
    $('#submit-btn').on('click', storeTask);
    getTodos();
}


//Sends entered task to the POST route server side
function storeTask(event) {
    event.preventDefault();
    let taskObject = {
        task: $('#task-in').val(),
        complete: false
    }
    $.ajax({
        type: 'POST',
        url: '/todos',
        data: taskObject
    })
    .then(function(response) {
        $('#task-in').val('');
        getTodos();
    })
}

//Activates GET route from server side
function getTodos() {
    let webText = '';
    $('#tasks-out').empty();
    $.ajax({
        type: 'GET',
        url: '/todos'
      })
      .then(function (response) {
        for (item of response){
            webText = `<tr data-id="${item.id}">
                            <td>${item.task}</td>
                            <td>${item.completed}</td>
                            <td><button class="delete-btn">Delete</button></td>
                        </tr>`;
            $('#tasks-out').append(webText);
        }    
      })
      .catch ( function (error){
        console.log (`Error:`, error);
        alert ('Something bad happened')
        });
}
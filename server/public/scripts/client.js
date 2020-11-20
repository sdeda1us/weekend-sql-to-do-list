$(document).ready(readyNow);

function readyNow() {
    $('#submit-btn').on('click', storeTask);
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
    $.ajax({
        type: 'GET',
        url: '/todos'
      })
      .then(console.log(resposne));
}
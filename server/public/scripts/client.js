$(document).ready(readyNow);

function readyNow() {
    $('#submit-btn').on('click', storeTask);
    $('#tasks-out').on('click', '.delete-btn',  function () {deleteTask($(this).closest('tr').data('id'))});
    $('#tasks-out').on('change', '#checkbox-in', function () {postCompleted($(this).closest('tr').data('id'), $(this).closest('#checkbox-in').is(':checked'))});
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
    .catch(function (error) {
        console.log('Error:', error);
        alert('Something bad happened. Try again later');
      });
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
                            <td><input type="checkbox" id="checkbox-in"/></td>
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



function deleteTask(todosid) {
    console.log('in deleteTask');
    $.ajax({
        method: 'DELETE',
        url: `/todos/${todosid}`
    }). then (function() {;
    getTodos();
    })
    .catch(function (error) {
        console.log('Error:', error);
        alert('Something bad happened. Try again later');
      });
};

function postCompleted(todosid, completedStatus) {
    console.log('in postCompleted', id, completedStatus);
    $.ajax({
        method: 'PUT',
        url: `/todos/${todosid}`,
        data: completedStatus
      })
        .then(function (response) {
          getKoalas();
        })
        .catch(function (error) {
          console.log('Error:', error);
          alert('Something bad happened. Try again later');
        })
    }
}
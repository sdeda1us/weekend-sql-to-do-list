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
    swal({
        title: "Are you sure?",      
        text: "Once deleted, you will not be able to recover this imaginary file!",      
        icon: "warning",      
        buttons: true,      
        dangerMode: true,    
    })
    .then((willDelete) => {      
        if (willDelete) {        
            swal("Poof! Your task has been deleted!", {
                icon: "success",        
            });
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
        })
        } else {
            swal("Your task is safe!");      
        }
        
    
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
            if(item.completed === true){
                webText = `<tr data-id="${item.id}" class="checked">
                            <td class="linethrough">${item.task}</td>
                            <td class="btn-group-toggle" data-toggle="buttons">
                                <label class="btn btn-success active">
                                    <input type="checkbox" id="checkbox-in" checked> Completed
                                </label>
                            </td>
                            <td><button class="btn btn-danger delete-btn">Delete</button></td>
                            <td>${item.complete_time}</td>
                        </tr>`;
            } else {
                webText = `<tr data-id="${item.id}">
                            <td>${item.task}</td>
                            <td class="btn-group-toggle" data-toggle="buttons">
                                <label class="btn btn-success active">
                                    <input type="checkbox" id="checkbox-in" unchecked> Not Complete
                                </label>
                            </td>
                            <td><button class="btn btn-danger delete-btn">Delete</button></td>
                            <td>&nbsp;</td>
                        </tr>`;
            }
            $('#tasks-out').append(webText);
        }    
      })
      .catch ( function (error){
        console.log (`Error:`, error);
        alert ('Something bad happened')
        });
}


//Activates DELETE request on server side
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

//Activiates a PUT request to change completed status of the task
function postCompleted(todosid, completedStatus) {
    console.log('in postCompleted', todosid, completedStatus);
    $.ajax({
        method: 'PUT',
        url: `/todos/${todosid}`,
        data: {completedStatus: completedStatus}
      })
    .then(function (response) {
        getTodos();
    })
    .catch(function (error) {
        console.log('Error:', error);
        alert('Something bad happened. Try again later');
    })
}
var login =  function () {

    var username = $("#username").val();
    var password = $("#password").val();

    if ($.trim(username).length > 0 && $.trim(password).length > 0) {

        $.ajax({
            type: "POST",
            url: webURL + "api/login",
            data: {
                username: username,
                password: password
            },
            dataType: 'json',
            beforeSend: function () {
                $('#load_gif').show();
            },
            success: function (data) {

                if (data != null) {
                    localStorage.setItem('token', JSON.stringify(data));
                    location.replace('index.html');
                } else {
                    alert('Incorrect username or password.');
                }
            },
            error: function () {
                $('#info_box').html('<div class="row">' +
                    '<div class="col">' +
                    '<p class="my-3 text-muted">Internal server error, please reload.</p>' +
                    '</div>' +
                    '</div>');
            },
            complete: function () {
                $('#load_gif').hide();
            }
        });

    } else {
        alert('Invalid username or password character.');
    }

};
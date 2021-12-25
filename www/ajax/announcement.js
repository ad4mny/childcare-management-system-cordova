window.addEventListener('load', (event) => {

    $.ajax({
        url: webURL + "api/get_announcement",
        dataType: 'json',
        beforeSend: function () {
            $('#load_gif').show();
        },
        success: function (data) {

            if (data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    $('#display').append('<div class="row pt-2">' +
                        '<div class="col">' +
                        '                    <div class="card h-100 rounded-3 shadow-sm position-relative">' +
                        '                        <div class="card-header">' +
                        '                            <p class="text-capitalize mb-0 fw-bold">' + data[i].title + '</p>' +
                        '                        </div>' +
                        '                        <div class="card-body">' +
                        '                            <div class="card-text">' +
                        '                                <small class="mb-0">' + data[i].description + '</small><br />' +
                        '                            </div>' +
                        '                            <p class="card-text text-end"><small class="text-muted">Last updated ' + data[i].datetime + '</small></p>' +
                        '                        </div>' +
                        '                    </div>' +
                        '                </div>' +
                        '            </div>' +
                        '</div>');
                }
            } else {
                $('#display').append('<div class="row pt-2">' +
                    '<div class="col">' +
                    '         <h5 class="text-capitalize">No announcement yet.</h5>' +
                    ' </div>' +
                    '</div>');
            }

        },
        error: function () {

            $('#info_box').html(
                '<div class="row">' +
                '<div class="col">' +
                '<p class="my-3 text-muted">Internal server error, please reload.</p>' +
                '</div>' +
                '</div>'
            );
            
        },
        complete: function () {
            $('#load_gif').hide();
        }
    });

});
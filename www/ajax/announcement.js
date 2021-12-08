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
                        '                    <div class="card h-100 rounded-3 border-0 shadow position-relative">' +
                        '                        <div class="card-header">' +
                        '                            <h5 class="text-capitalize">' + data[i].title + '</h5>' +
                        '                        </div>' +
                        '                        <div class="card-body">' +
                        '                            <div class="card-text">' +
                        '                                <p class="mb-0">' + data[i].description + '<br />' +
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
            $('#info_box').html('<div class="row"><div class="col"><p class="my-3 text-muted">Internal server error, please reload.</p></div></div>');
        },
        complete: function () {
            $('#load_gif').hide();
        }
    });

});


var scan = function () {

    cordova.plugins.barcodeScanner.scan(function (result) {

        var id = result["text"];

        $.ajax({
            type: "POST",
            url: web_links + "api/add_attendance",
            data: {
                child_id: id
            },
            dataType: 'JSON',
            beforeSend: function () {
                $('#loadGif').show();
            },
            success: function (data) {

                if (data != false) {
                    alert('Child attendance has been added succesfully.');
                } else {
                    alert('Scanning error! Scan the QR again.');
                }

                location.replace('attendance.html');

            },
            error: function () {
                $('#display').html('<div class="row"><div class="col"><p class="my-3 text-white">Internal server error, please reload.</p></div></div>');
            },
            complete: function () {
                $('#loadGif').hide();
            }
        });
    }, function (error) {
        alert('Error!');
    }, {
        showFlipCameraButton: true, // iOS and Android
        showTorchButton: true, // iOS and Android
        prompt: "Place a barcode inside the scan area", // Android
        resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
        formats: "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
        orientation: "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
        disableAnimations: true, // iOS
        disableSuccessBeep: false // iOS and Android
    });

};
window.addEventListener('load', (event) => {

    $.ajax({
        url: webURL + "api/get_attendance",
        dataType: 'json',
        beforeSend: function () {
            $('#load_gif').show();
        },
        success: function (data) {

            if (data != "") {
                for (var i = 0; i < data.length; i++) {
                    $('#display').append('<div class="row pt-2">' +
                        '<div class="col">' +
                        '<p class="text-capitalize mb-0 fw-bold">' + data[i]['date'] + '</p>' +
                        '</div>' +
                        '</div>');

                    var attendenceid = data[i]['attendenceid'].split(',');
                    var fullname = data[i]['fullname'].split(',');
                    var status = data[i]['status'].split(',');
                    var time = data[i]['time'].split(',');

                    for (var x = 0; x < fullname.length; x++) {
                        $('#display').append(
                            ' <div class="row rounded-3 shadow-sm border bg-white mb-1 mx-1">' +
                            '    <div class="col-6">' +
                            '        <p class="text-truncate text-capitalize mb-0">' + fullname[x] + '</p>' +
                            '    </div>' +
                            '    <div class="col">' +
                            '        <p class="text-capitalize mb-0">' + status[x] + '</p>' +
                            '    </div>' +
                            '    <div class="col">' +
                            '        <p class="text-capitalize mb-0">' + time[x] + '</p>' +
                            '    </div>' +
                            '</div>'
                        );
                    }
                }
            } else {
                $('#display').append(
                    ' <div class="row rounded-3 shadow-sm border bg-white mb-1 mx-1">' +
                    '    <div class="col">' +
                    '        <p class="text-capitalize mb-0">No attendance data available.</p>' +
                    '    </div>' +
                    '</div>'
                );
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

    cordova.plugins.barcodeScanner.scan(
        function (result) {

            var scanned_id = result["text"];

            $.ajax({
                type: "POST",
                url: webURL + "api/add_attendance",
                data: {
                    child_id: scanned_id
                },
                dataType: 'JSON',
                beforeSend: function () {
                    $('#loadGif').show();
                },
                success: function (data) {
                    if (data != false) {
                        alert('Child attendance has been added succesfully.');
                        location.reload();
                    } else {
                        alert('Scanning error! Scan the QR again.');
                    }
                },
                error: function () {
                    $('#display').html('<div class="row"><div class="col"><p class="my-3">Internal server error, please reload.</p></div></div>');
                },
                complete: function () {
                    $('#loadGif').hide();
                }
            });

        },
        function (error) {
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
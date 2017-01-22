var seatChart = (function ($) {
    "use strict";

    var uri = "api/students";
    $(document).ready(function () {

        $('#sortableChart').click(function () {
            if ($('#sortableChart').is(':checked')) {
                $("#drop").sortable();
            }
            else {
                
                $("#drop").sortable({
                    disabled: true
                });
            }
        });

        if ($("body").height() < $(window).height()) {
            $("body").height($(window).height());
        }

        $.getJSON(uri).done(function (data) {
            // On success, 'data' contains a list of students.
            var index = 1;
            $.each(data, function (key, item) {

                // Add a list item for the student.
                var div = $('<div>', { id: index }).addClass('draggable').appendTo($('#origin'));
                div.data("id", index);
                div.data("image", item.ImagePath);
                div.data("firstName", item.FirstName);
                div.data("lastName", item.LastName);
                $('<span>', { text: formatItem(item, index) }).appendTo(div);

                index++;
            });
            $(".draggable").draggable({ cursor: "crosshair", revert: "invalid" });
        });

        $("#drop").droppable({
            accept: ".draggable",
            drop: function (event, ui) {
                console.log("drop");
                var delInput = document.createElement("input");
                delInput.className = 'delete';
                delInput.type = 'button';
                delInput.value = 'X';
                $(this).removeClass("border").removeClass("over").removeClass("fbox ui-droppable ui-sortable");
                var dropped = ui.draggable;
                var droppedOn = $(this);
                var newdiv = $('<div>', { id: dropped.data("id") }).addClass('show-image').appendTo(droppedOn);
                newdiv.data("image", dropped.data("image"));
                newdiv.data("firstName", dropped.data("lastName"));
                newdiv.data("lastName", dropped.data("firstName"));

                $('<img>', { src: GetSiteRoot() + dropped.data("image"), height: '100px', width: '150px' }).appendTo(newdiv);
                $('<div>').text(dropped.data("lastName") + ", " + dropped.data("firstName")).appendTo(newdiv);
                $(delInput).appendTo(newdiv);
                $(dropped).detach();
            },
            over: function (event, elem) {
                $(this).addClass("over");
                console.log("over");
            },
            out: function (event, elem) {
                $(this).removeClass("over");
            }
        });

        //$("#drop").sortable();
    });

    $(document).on('click', '.delete', function (event, ui) {
        var droppedOn = $(this).parent();
        var div = $('<div>', { id: droppedOn[0].id }).addClass('draggable').appendTo($('#origin'));
        div.data("id", droppedOn[0].id);
        var str = droppedOn[0].childNodes[0].src;
        var res = str.replace(GetSiteRoot(), "");
        div.data("image", res);
        div.data("firstName", droppedOn[0].childNodes[1].textContent.split(',')[1]);
        div.data("lastName", droppedOn[0].childNodes[1].textContent.split(',')[0]);
        $('<span>', { text: droppedOn[0].childNodes[1].textContent.split(',')[0] + ', ' + droppedOn[0].childNodes[1].textContent.split(',')[1] }).appendTo(div);

        var main = document.getElementById('origin');

        [].map.call(main.children, Object).sort(function (a, b) {
            return +a.id.match(/\d+/) - +b.id.match(/\d+/);
        }).forEach(function (elem) {
            main.appendChild(elem);
        });

        $(".draggable").draggable({ cursor: "crosshair", revert: "invalid" });
        droppedOn.remove();
    });

    function formatItem(item, index) {
        return item.LastName + ', ' + item.FirstName;
    }

    function GetSiteRoot() {
        return window.location.protocol + "//" + window.location.host + "/";

    }
}(jQuery));


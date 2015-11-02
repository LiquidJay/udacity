/* STUDENTS IGNORE THIS FUNCTION
 * All this does is create an initial
 * attendance record if one is not found
 * within localStorage.
 */
    var model =  {
            init: function(){
                if (!localStorage.attendance) {
            console.log('Creating attendance records...');
            function getRandom() {
                return (Math.random() >= 0.5);
            }

            var nameColumns = $('tbody .name-col'),
                attendance = {};

            nameColumns.each(function() {
                var name = this.innerText;
                attendance[name] = [];

                for (var i = 0; i <= 11; i++) {
                    attendance[name].push(getRandom());
                }
            });

            localStorage.attendance = JSON.stringify(attendance);
            }
        }
    };

    var controller ={
        init: function(){
            model.init();
            view.init();
        }
    };

    var view = {
        init: function(){
           
        }
            
    };


    controller.init();


/* STUDENT APPLICATION */
$(function() {
    var attendance = JSON.parse(localStorage.attendance),      //<---CONTROLLER
        $allMissed = $('tbody .missed-col'),       //<---VIEW
        $allCheckboxes = $('tbody input');          //<---VIEW

    //Count a student's missed days
    function countMissing() {      //<---VIEW
        $allMissed.each(function() {
            var studentRow = $(this).parent('tr'),
                dayChecks = $(studentRow).children('td').children('input'),
                numMissed = 0;

            dayChecks.each(function() {
                if (!$(this).prop('checked')) {
                    numMissed++;
                }
            });

            $(this).text(numMissed);
        });
    }

            // Check boxes, based on attendace records     //<---VIEW
            $.each(attendance, function(name, days) {
                var studentRow = $('tbody .name-col:contains("' + name + '")').parent('tr'),
                    dayChecks = $(studentRow).children('.attend-col').children('input');

                dayChecks.each(function(i) {
                    $(this).prop('checked', days[i]);
                });
            });

    // When a checkbox is clicked, update localStorage         
    $allCheckboxes.on('click', function() {
        var studentRows = $('tbody .student'),     //<---VIEW
            newAttendance = {};

        studentRows.each(function() {              //<-- CONTROLLER
            var name = $(this).children('.name-col').text(),
                $allCheckboxes = $(this).children('td').children('input');

            newAttendance[name] = [];

            $allCheckboxes.each(function() {
                newAttendance[name].push($(this).prop('checked'));
            });
        });

        countMissing();                                              
        localStorage.attendance = JSON.stringify(newAttendance);     //<---MODEL
    });

    countMissing();
}());

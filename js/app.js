const model = {

    init: function() {

        if (!localStorage.attendance) {
            this.generateRandomData();
        }

        this.attendance = JSON.parse(localStorage.attendance);
    },

    generateRandomData: function() {

        function getRandom() {
            return (Math.random() >= 0.5);
        }

        const nameColumns = $('tbody .name-col');
        const attendance = [];

        nameColumns.each(function(index) {
            const name = this.innerText;
            attendance[index] = {};
            attendance[index].name = name;
            attendance[index].randArr = []

            for (var i = 0; i <= 11; i++) {
                attendance[index].randArr.push(getRandom());
            }
        });

        localStorage.attendance = JSON.stringify(attendance);
    }
}

const view = {
    
    init: function() {
        const attendance = octopus.getAttendance();
        const $allCheckboxes = $('tbody input');

        $.each(attendance, function(index, days) {
            const studentRow = $('tbody .name-col:contains("' + attendance[index].name + '")').parent('tr');
            const dayChecks = $(studentRow).children('.attend-col').children('input');
    
            dayChecks.each(function(i) {
                $(this).prop('checked', days.randArr[i]);
            });
        });

        $allCheckboxes.on('click', function() {
            var studentRows = $('tbody .student'),
                newAttendance = {};
    
            studentRows.each(function() {
                var name = $(this).children('.name-col').text(),
                    $allCheckboxes = $(this).children('td').children('input');
    
                newAttendance[name] = [];
    
                $allCheckboxes.each(function() {
                    newAttendance[name].push($(this).prop('checked'));
                });
            });
    
            octopus.countMissing();
            localStorage.attendance = JSON.stringify(newAttendance);
        });
        octopus.countMissing();
    }
 
}

const octopus = {
    
    init: function() {
        model.init();
        view.init();
    },

    getAttendance: function() {
        return model.attendance;
    },

    countMissing: function() {
        const $allMissed = $('tbody .missed-col')

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
}
octopus.init();


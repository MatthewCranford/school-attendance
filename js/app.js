const model = {

    init: function() {

        if (!localStorage.attendance) {
            this.attendance =  {
                'Slappy the Frog': {
                    name: 'Slappy the Frog',
                    missed: 0,
                    checkedBoxes: []
                },
                'Lilly the Lizard': {
                    name: 'Lilly the Lizard',
                    missed: 0,
                    checkedBoxes: []
                },
                'Paulrus the Walrus': {
                    name: 'Paulrus the Walrus',
                    missed: 0,
                    checkedBoxes: []
                },
                'Gregory the Goat': {
                    name: 'Gregory the Goat',
                    missed: 0,
                    checkedBoxes: []
                },
                'Adam the Anaconda': {
                    name: 'Adam the Anaconda',
                    missed: 0,
                    checkedBoxes: []
                }
            }
        }
        else {
            this.attendance = JSON.parse(localStorage.attendance);
        }

    } 
}

const view = {
    
    init: function() {
        const $allCheckboxes = $('tbody input');
        const rows = Array.from($('.student'));
        const attendance = octopus.getAttendance();
 

        // Render local storage checkboxes
        rows.forEach(row => {
            const name = row.firstElementChild.innerText;
            const cols = Array.from(row.getElementsByClassName('attend-col'));
            console.log(name,cols);
            cols.forEach((col,index) => {
                col.firstElementChild.checked = attendance[name].checkedBoxes[index];
            });
        })

        $allCheckboxes.on('click', function() {
            const row = $(this)[0].parentElement.parentElement
            const name = row.firstElementChild.innerText;
            const cols = Array.from(row.getElementsByClassName('attend-col'));
            const newCheckedBoxesArr = [];

            cols.forEach(col => {
                newCheckedBoxesArr.push(col.firstElementChild.checked);
            });
     
            if($(this).prop('checked')) {
                octopus.incrementMissed(name);
            }
            else {
                octopus.decrementMissed(name);
            } 
            octopus.addNewArr(name,newCheckedBoxesArr);
            view.render();
        });
     
    },

    render: function() {
        const rows = Array.from(document.querySelectorAll('.student'));
        const attendance = octopus.getAttendance();

        rows.forEach(row => {
            const rowName = row.getElementsByClassName('name-col')[0].innerText;
            const rowMissed = row.getElementsByClassName('missed-col')[0];

            rowMissed.innerText = attendance[rowName].missed;
        });
    }
}

const octopus = {
    
    init: function() {
        model.init();
        view.init();
        view.render();
    },

    getAttendance: function() {
        return model.attendance;
    },

    incrementMissed: function(name) {
        const attendance = octopus.getAttendance();
        attendance[name].missed++;
        this.storeAttendance();
    },

    decrementMissed: function(name) {
        const attendance = octopus.getAttendance();
        attendance[name].missed--;
        this.storeAttendance();

    },

    storeAttendance: function() {
        localStorage.attendance = JSON.stringify(model.attendance);
    },

    addNewArr: function(name, newCheckedBoxesArr) {
        const attendance = octopus.getAttendance();
        attendance[name].checkedBoxes = newCheckedBoxesArr;
        this.storeAttendance();
    }
}
octopus.init();


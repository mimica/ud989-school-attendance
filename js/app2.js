/* STUDENTS IGNORE THIS FUNCTION
 * All this does is create an initial
 * attendance record if one is not found
 * within localStorage.
 */
(function() {
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
}());



var model = {
    appName: 'Udacity Attendance',
    students: [
        {
            name: "Slappy the Frog",
            days: [{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0}]
        },
        {
            name: "Lilly the Lizard",
            days: [{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0}]
        },
        {
            name: "Paulrus the Walrus",
            days: [{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0}]
        },
        {
            name: "Gregory the Goat",
            days: [{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0}]
        },
        {
            name: "Adam the Anaconda",
            days: [{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0},{"value":0}]
        }
    ]
};

var controller = {

    init: function() {
        // tell our views to initialize
        view.init();
    },

    getStudents: function() {
        return model.students;
    },

    markCheckBox: function(day) {
        if (day.value === 0) day.value = 1;
        else day.value = 0;
    }

};


var view = {

    init: function() {
        this.studentElem = document.getElementById('student-tbody');

        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function() {

        var students = controller.getStudents();

        var student, i, j, day, studentTotal;
        var elemTR, elemTDName, elemTDDay, elemCheckBox, elemTDTotal;

        // empty the student list
        this.studentElem.innerHTML = '';

        // loop over the students
        for (i = 0; i < students.length; i++) {

            student = students[i];
            studentTotal = 0;

            // make a new student list
            elemTR = document.createElement('tr');
            
            elemTDName = document.createElement('td');
            elemTR.appendChild(elemTDName);
            elemTDName.textContent = student.name;
            
            for (j = 0; j < student.days.length; j++) {

                day = student.days[j];

                // make a new column
                elemTDDay = document.createElement('td');
                elemTDDay.className = "attend-col";
                elemTR.appendChild(elemTDDay);

                elemCheckBox = document.createElement('input');
                elemCheckBox.type = "checkbox";
                
                if (day.value === 0) elemCheckBox.checked = false;
                else {
                    elemCheckBox.checked = true;
                    studentTotal++;
                }

                elemCheckBox.id = student.name+'_'+j;

                elemCheckBox.addEventListener('click', (function(dayCopy) {
                    return function() {
                        controller.markCheckBox(dayCopy);
                        view.render();
                    };
                })(day));

                elemTDDay.appendChild(elemCheckBox);
            }

            elemTDTotal = document.createElement('td');
            elemTR.appendChild(elemTDTotal);
            elemTDTotal.className = "missed-col";
            elemTDTotal.textContent = studentTotal;

            // finally, add the element to the list
            this.studentElem.appendChild(elemTR);
        }

    }
};


// Start app
controller.init();

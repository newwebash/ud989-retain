$(function(){

    var model = {
        init: function() {
            if (!localStorage.notes) {  // Get notes from local storage if they exist
                localStorage.notes = JSON.stringify([]);
            }
        },
        add: function(obj) {  // Add new object parameter to data var in local storage
            var data = JSON.parse(localStorage.notes);
            data.push(obj);
            localStorage.notes = JSON.stringify(data);
        },
        getAllNotes: function() {  // Get notes from local storage
            return JSON.parse(localStorage.notes);
        }
    };


    var octopus = {
        addNewNote: function(noteStr) {  // Call add function above passing note string
            model.add({
                content: noteStr,
                date: Date.now()
            });
            view.render();  // After adding the note, re-render the view
        },

        getNotes: function() {  // Get all notest from the model
            return model.getAllNotes();
        },

        init: function() {  // Initialize both the model and the view
            model.init();
            view.init();
        }
    };


    var view = {
        init: function() {                      // Initialize the view
            this.noteList = $('#notes');        // Select notes ul from html and store in view attribute noteList
            var newNoteForm = $('#new-note-form');  // Select new-note-form from html and store in var
            var newNoteContent = $('#new-note-content');  // Select content element and store in var
            newNoteForm.submit(function(e){     // Declare submit function to operate on newNoteForm
                octopus.addNewNote(newNoteContent.val());  // Call addNewNote fun from octpus and pass new note
                newNoteContent.val('');         // Clear the form
                e.preventDefault();             // Cancel default action 
            });
            view.render();                      // Re-render the view
        },
        render: function(){     // render the view
            var htmlStr = '';    // store empty string in a var
            octopus.getNotes().forEach(function(note){  // Get each note from octopus and store in a <li>
                htmlStr += '<li class="note">'+
                        note.content +
                        '</br>' +
                        new Date (note.date).toString() +
                    '</li>';
            });
            this.noteList.html( htmlStr );  // Add each note to the note list in view
        }
    };

    octopus.init();  // Initialize octopus -> initialize both the model and view
});
$(function(){

    var model = {
        init: function() {
            if (!window.localStorage.notes) {
                window.localStorage.notes = JSON.stringify([]);
            }
        },

        add: function(obj) {
            var data = JSON.parse(window.localStorage.notes);
            data.push(obj);
            window.localStorage.notes = JSON.stringify(data);
        },

        getAllNotes: function() {
            return JSON.parse(window.localStorage.notes);
        },

        clearAllData: function(){
            window.localStorage.clear();
            window.localStorage.notes = JSON.stringify([]);
        }
    };


    var octopus = {
        addNewNote: function(noteStr) {
            model.add({
                content: noteStr,
                date : new Date().toJSON().slice(0, 10)
            });
            view.render();
        },

        getNotes: function() {
            return model.getAllNotes();
        },

        clearNotes: function(){
            model.clearAllData();
            view.render();
        },

        init: function() {
            model.init();
            view.init();
        }
    };


    var view = {
        init: function() {
            this.noteList = $('#notes');
            var newNoteForm = $('#new-note-form');
            var newNoteContent = $('#new-note-content');
            var clearBtn = $('.clearBtn');
          
            newNoteForm.submit(function(e){
                octopus.addNewNote(newNoteContent.val());
                newNoteContent.val('');
                e.preventDefault();
            });

            clearBtn.click(function(){
                octopus.clearNotes();
            });

            view.render();
        },

        render: function(){
            var htmlStr = '';
            octopus.getNotes().forEach(function(note){
                htmlStr += '<li class="note">'+
                        note.content + " Date: " + note.date +
                    '</li>';
            });
            this.noteList.html( htmlStr );
        }
    };

           
    octopus.init();
});

 var StateHandler = function() {

        var commands = [],
            index = -1,
            limit = 0,
            isExecuting = false,
            callback,

        // functions
            execute;

        execute = function(command, action) {
            if (!command || typeof command[action] !== "function") {
                return this;
            }
            isExecuting = true;

            command[action]();

            isExecuting = false;
            return this;
        };

        return {

            /*
            Add a command to the queue.
            */
            add: function (command) {
                if (isExecuting) {
                    return this;
                }

                // invalidate items higher on the stack
                commands.splice(index + 1, commands.length - index);

                commands.push(command);
                

                // set the current index to the end
                index = commands.length - 1;
                if (callback) {
                    callback();
                }
                return this;
            },

            //Function to callback on undo/redo actions
            setCallback: function (callbackFunc) {
                callback = callbackFunc;
            },


            //undo: call the undo function at the current index and decrease it by 1.
            undo: function () {
                var command = commands[index];
                if (!command) {
                    return this;
                }
                execute(command, "undo");
                index -= 1;
                if (callback) {
                    callback();
                }
                return this;
            },


            //redo: call the redo function at the next index and increase the index by 1.

            redo: function () {
                var command = commands[index + 1];
                if (!command) {
                    return this;
                }
                execute(command, "redo");
                index += 1;
                if (callback) {
                    callback();
                }
                return this;
            },

            /*
            To clear the Memory and Reset
            */
            clear: function () {
                var prev_size = commands.length;

                commands = [];
                index = -1;

                if (callback && (prev_size > 0)) {
                    callback();
                }
            },

            getCommands: function () {
                return commands;
            },

            getIndex: function() {
                return index;
            }
            

        };
    };


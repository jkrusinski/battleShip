/**
 * Created by jkrusinski on 9/24/15.
 */

$(document).ready(function () {

    if (!window.mobileCheck()) {

        //if not a mobile site, play the game
        playGame();

    } else {

        //hide the game
        $('#not-mobile').hide().addClass('hidden');

        //show sorry message
        $('#is-mobile').show().removeClass('hidden');

        emailLink();

    }

});

window.mobileCheck = function () {
    var check = false;
    (function (a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))check = true
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};

var playGame = function () {
    /******************************************************
     ********************** THE BOARD *********************
     ******************************************************/

    var board = {
        //The coordinates
        'A': [0, 0, 0, 0, 0, 0, 0, 0, 0],
        'B': [0, 0, 0, 0, 0, 0, 0, 0, 0],
        'C': [0, 0, 0, 0, 0, 0, 0, 0, 0],
        'D': [0, 0, 0, 0, 0, 0, 0, 0, 0],
        'E': [0, 0, 0, 0, 0, 0, 0, 0, 0],
        'F': [0, 0, 0, 0, 0, 0, 0, 0, 0],
        'G': [0, 0, 0, 0, 0, 0, 0, 0, 0],
        'H': [0, 0, 0, 0, 0, 0, 0, 0, 0],
        'I': [0, 0, 0, 0, 0, 0, 0, 0, 0],

        //used to convert between row name and row index
        rows: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'],

        //start with 0 ships, 5 max
        numShips: 0,

        //how many ships are sunk
        shipsSunk: 0,

        //board.ships[whichShip (1-5)][position (0 - length-1)] = array(row, col)
        ships: {},

        //instruction counter
        instructionCounter: 0,

        //instruction messages
        instructions: [],

        //ammunition
        ammunition: 39,

        //determines if lost
        isLooser: false,

        //determines if won
        isWinner: false,

        /**
         * @function randDirection
         * Randomly returns 'north', 'east', 'south', or 'west'
         * @returns {string}
         */
        randDirection: function () {

            var directions = ['north', 'east', 'south', 'west'];
            //Math expression randomly selects an index from 0 - 3
            return directions[Math.floor(Math.random() * 4)];

        },

        /**
         * @function randCoordinate
         * Randomly returns a coordinate in the format [randRow, randCol]
         * @returns {*[]}
         */
        randCoordinate: function () {
            //random integer from 0 - 8, assign to randRow and randCol
            var randRow = Math.floor(Math.random() * 9);
            var randCol = Math.floor(Math.random() * 9);

            //returns an array with the starting coordinates
            return [randRow, randCol];
        },

        /**
         * @function checkBorders
         * returns true if length within board borders
         * returns false if length would go off the board
         * @param whichDirection
         * @param whichCoordinate
         * @param length
         * @returns {boolean}
         */
        checkBorders: function (whichDirection, whichCoordinate, length) {
            var row = whichCoordinate[0];       //starting row coordinate
            var col = whichCoordinate[1];       //starting col coordinate
            var adjustedLength = length - 1;    //convert length to index value

            switch (whichDirection) {

                case 'north':

                    //if expression evaluates true, ship will fit on the board
                    return row - adjustedLength >= 0;

                case 'east':

                    //if expression evaluates true, ship will fit on the board
                    return col + adjustedLength <= 8;

                case 'south':

                    //if expression evaluates true, ship will fit on the board
                    return row + adjustedLength <= 8;

                case 'west':

                    //if expression evaluates true, ship will fit on the board
                    return col - adjustedLength >= 0;

                default:

                    //error for board.checkBorders
                    console.error('board.checkBorders Switch Statement Error: No case found.');
                    break;
            }
        },

        /**
         * @function checkExisting
         * returns true if there are no exisitng ships in the way
         * returns false if space already occupied
         * @param whichDirection
         * @param whichCoordinate
         * @param length
         * @returns {boolean}
         */
        checkExisting: function (whichDirection, whichCoordinate, length) {
            var row = whichCoordinate[0];       //starting row coordinate
            var col = whichCoordinate[1];       //starting col coordinate
            var adjustedLength = length - 1;    //convert length to index value

            //loop depends on whichDirection
            switch (whichDirection) {

                case 'north':
                    //loop north
                    //start with row, decrement north until row - adjustedLength (end coordinate)
                    for (var i = row; i >= row - adjustedLength; i--) {

                        //if ANY coordinate is greater than zero, return false (zero = empty coordinate)
                        //this.rows[i] converts from row name ('A' -> 'I') to index (0 -> 8)
                        if (this[this.rows[i]][col]) return false;

                    }

                    //if all coordinates clear, return true
                    return true;

                case 'east':
                    //loop east
                    //start with col, increment east until col + adjustedLength (end coordinate)
                    for (i = col; i <= col + adjustedLength; i++) {

                        //if ANY coordinate is greater than zero, return false (zero = empty coordinate)
                        //this.rows[row] converts from row name ('A' -> 'I') to index (0 -> 8)
                        if (this[this.rows[row]][i]) return false;

                    }

                    //if all coordinates clear, return true
                    return true;

                case 'south':
                    //loop south
                    //start with row, increment south until row + adjustedLength (end coordinate)
                    for (i = row; i <= row + adjustedLength; i++) {

                        //if ANY coordinate is greater than zero, return false (zero = empty coordinate)
                        //this.rows[i] converts from row name ('A' -> 'I') to index (0 -> 8)
                        if (this[this.rows[i]][col]) return false;

                    }

                    //if all coordinates clear, return true
                    return true;

                case 'west':
                    //loop west
                    //start with col, decrement west until col - adjustedLength (end coordinate)
                    for (i = col; i >= col - adjustedLength; i--) {

                        //if ANY coordinate is greater than zero, return false (zero = empty coordinate)
                        //this.rows[row] converts from row name ('A' -> 'I') to index (0 -> 8)
                        if (this[this.rows[row]][i]) return false;

                    }

                    //if all coordinates clear, return true
                    return true;

                default:
                    //error for board.checkExisting
                    console.error('board.checkExisting Switch Statement Error: No case found.');
                    break;
            }
        },

        /**
         * @function printShip
         * adds the ship ID to the coordinates where the new ship is placed
         * @param whichDirection
         * @param whichCoordinate
         * @param length
         */
        printShip: function (whichDirection, whichCoordinate, length) {
            var row = whichCoordinate[0];       //starting row coordinate of ship
            var col = whichCoordinate[1];       //starting col coordinate of ship
            var adjustedLength = length - 1;    //convert length to index value
            var whichShip = this.numShips;      //name of the ship (integer from 1 - 5)

            //make a ship object inside the board.ships object
            board.ships[whichShip] = {};

            //loops depend on whichDirection
            switch (whichDirection) {

                case 'north':
                    //loop north
                    //start with row, decrement north until row - adjustedLength (end coordinate)
                    for (var i = row; i >= row - adjustedLength; i--) {

                        //add ship id to each coordinate
                        this[this.rows[i]][col] = whichShip;
                        //add ship coordinates to board.ships.whichShip object
                        //i - row adds keys for each coordinate from 0 -> adjustedLength
                        //Math.abs() necessary since loop decrements
                        board.ships[whichShip][Math.abs(i - row)] = [this.rows[i], col];

                    }
                    break;

                case 'east':
                    //loop east
                    //start with col, increment east until col + adjustedLength (end coordinate)
                    for (i = col; i <= col + adjustedLength; i++) {

                        //add ship id to each coordinate
                        this[this.rows[row]][i] = whichShip;
                        //add ship coordinates to board.ships.whichShip object
                        //i - row adds keys for each coordinate from 0 -> adjustedLength
                        board.ships[whichShip][i - col] = [this.rows[row], i];

                    }
                    break;

                case 'south':
                    //loop south
                    //start with row, increment south until row + adjustedLength (end coordinate)
                    for (i = row; i <= row + adjustedLength; i++) {

                        //add ship id to each coordinate
                        this[this.rows[i]][col] = whichShip;
                        //add ship coordinates to board.ships.whichShip object
                        //i - row adds keys for each coordinate from 0 -> adjustedLength
                        board.ships[whichShip][i - row] = [this.rows[i], col];

                    }
                    break;

                case 'west':
                    //loop west
                    //start with col, decrement west until col - adjustedLength (end coordinate)
                    for (i = col; i >= col - adjustedLength; i--) {

                        //add ship id to each coordinate
                        this[this.rows[row]][i] = whichShip;
                        //add ship coordinates to board.ships.whichShip object
                        //i - row adds keys for each coordinate from 0 -> adjustedLength
                        //Math.abs() necessary since loop decrements
                        board.ships[whichShip][Math.abs(i - col)] = [this.rows[row], i];

                    }
                    break;

                default:
                    //board.printShip error
                    console.error('board.printShip Switch Statement Error: No case found.');
                    break;
            }
        },

        /**
         * @function newShip
         * places a new ship on the board
         * @param length - length of the ship to be added
         */
        newShip: function (length) {

            //if there are less than five ships on the board
            if (this.numShips < 5) {

                //if the length of the ship to create is an integer between 1 and 5
                if (length > 0 && length <= 5) {

                    //repeat will tell the function to try again if the parameters
                    //    to create a new ship are not met
                    var repeat;

                    do {

                        //choose a fresh direction and starting coordinates
                        //must be located in do...while loop in case function needs to start over
                        var whichDirection = this.randDirection();
                        var whichCoordinate = this.randCoordinate();

                        //if checkBorders returns true -> check passed
                        if (this.checkBorders(whichDirection, whichCoordinate, length)) {

                            //if checkExisting returns true -> check passed
                            if (this.checkExisting(whichDirection, whichCoordinate, length)) {

                                //increment this.numShips
                                //will become the id for the new ship
                                this.numShips++;
                                //call printShip to create the newShip
                                this.printShip(whichDirection, whichCoordinate, length);
                                //newShip successful, do not repeat
                                repeat = false;

                            } else {

                                //checkExisting was not passed, repeat newShip from scratch
                                repeat = true;

                            }

                        } else {

                            //checkBorders was not passed, repeat newShip from scratch
                            repeat = true;

                        }

                    } while (repeat); //check if newShip needs to try again


                } else {

                    //an illegal length was entered
                    console.error('The ship size must be an integer between 1 and 5.')

                }

            } else {

                //the maximum number of ships exist on the board
                console.error('The board has reached the maximum number of ships.')

            }
        },

        /**
         * @function stillAlive
         * return true if ship is still alive
         * return false if final hit sinks ship
         * @param ID
         * @returns {boolean}
         */
        stillAlive: function (ID) {
            //declare result variable
            var result = 0;

            //check to see if ship is still alive
            //add values at ship coordinates together
            //if stillAlive > 0, it is still alive
            for (var key in this.ships[ID]) {

                //make sure the key exists
                if (this.ships[ID].hasOwnProperty(key)) {

                    //grab coordinates from board.ships.ID
                    var checkRow = this.ships[ID][key][0];
                    var checkCol = this.ships[ID][key][1];

                    //add the value in that coordinate to result
                    result += this[checkRow][checkCol];
                }
            }

            //converts the result to a boolean and returns it
            //if result > 0, returns true: ship is still alive
            //if result == 0, returns false: ship is dead
            return Boolean(result);

        },

        /**
         * @function sinkShip
         * change all coordinates of shipID to the danger btn style
         * @param ID
         */
        sinkShip: function (ID) {
            //increment shipsSunk
            this.shipsSunk++;

            //loop through coordinates for specified shipID
            for (var key in this.ships[ID]) {

                //make sure the key exists
                if (this.ships[ID].hasOwnProperty(key)) {

                    //grab coordinates from board.ships.ID
                    var row = this.ships[ID][key][0];
                    var col = this.ships[ID][key][1];
                    //create jquery selector (construct the div ID from the coordinates)
                    var divID = row + (col + 1); //add 1 to col since divIDs are from 1 - 9

                    //change btn style to danger to indicate sink
                    $('#' + divID).removeClass('btn-warning').addClass('btn-danger');
                }
            }

        },

        /**
         * @function initializeInstructions
         * Add instruction elements to the board.instructions array
         * Also sets board.instructionCounter to the length of the array
         * @return void
         */
        initializeInstructions: function () {

            var letsGo = "<span>&gt;&gt; What are you waiting for? Let's play battleShip()!</span>\n";

            var ammo = "<span>&gt;&gt; You only have 40 ammo. Use each shot wisely.</span>";
            ammo += "<span style='font-weight: bold;'> **press ENTER**</span>\n";

            var fire = "<span>&gt;&gt; Click on any coordinate to fire.</span>";
            fire += "<span style='font-weight: bold'> **press ENTER**</span>\n";

            var shipInfo = "<span>&gt;&gt; There are 5 ships on the board.</span>";
            shipInfo += "<span style='font-weight: bold;'> **press ENTER**</span>\n";
            shipInfo += "<span style='font-weight: bold;'>   #   ship              size</span>\n";
            shipInfo += "<span>   1x  Destroyer         2</span>\n";
            shipInfo += "<span>   1x  Cruiser           3</span>\n";
            shipInfo += "<span>   2x  Battleship        4</span>\n";
            shipInfo += "<span>   1x  Aircraft Carrier  5</span>\n";

            //push directions from last to first
            this.instructions.push(letsGo);
            this.instructions.push(ammo);
            this.instructions.push(fire);
            this.instructions.push(shipInfo);

            //set message counter to first message (last in index)
            this.instructionCounter = this.instructions.length;
        },

        /**
         * @function displayInstructions
         * Adds an instruction to the <pre> tag
         * @return void
         */
        displayInstructions: function () {
            //if board.instructionCounter is 0, don't print any more instructions
            if (this.instructionCounter) {

                //prepends instruction using board.instructionCounter - 1 as the index
                $('pre').prepend(board.instructions[this.instructionCounter - 1]);

                //decrement board.instructionCounter
                this.instructionCounter--;

            }
        },

        /**
         * @function checkCoordinate
         * This is where most of the game play lives
         * Responsible for determining hit, miss, or sink
         * Changes colors of the coordinates
         * Prints messages to the board
         * @param row string
         * @param col int
         * @param $elClicked jQuery object
         * @return void
         */
        checkCoordinate: function (row, col, $elClicked) {

            var $pre = $('pre');

            //if guess coordinate is not empty...
            if (this[row][col]) {

                //grab shipID from the board
                var shipID = this[row][col];

                //make coordinate null to indicate guessed
                this[row][col] = null;

                //check to see if guess was a sink or a hit
                if (this.stillAlive(shipID)) { //if hit

                    //change button style to warning to indicate a hit
                    $elClicked.removeClass('btn-info').addClass('btn-warning');

                    //print hit message to board
                    var msg = "<span>&gt;&gt; That was a </span>";
                    msg += "<span style='font-weight: bold; color: orange;'>HIT</span><span>!</span>\n";
                    msg += "<span>   Remaining Ammo: </span>";
                    msg += "<span style='font-weight: bold;'>" + this.ammunition + "</span>\n";
                    //print message to <pre>
                    $pre.prepend(msg);

                } else { //if sink

                    //make sure all coordinates have class btn-warning before moving all to danger
                    // (see .removeClass in sinkShip function)
                    $elClicked.removeClass('btn-info').addClass('btn-warning');

                    //change all ship coordinates to the danger button style to indicate a sink
                    this.sinkShip(shipID);

                    //Print sink message to board
                    msg = "<span>&gt;&gt; Wow! You </span>";
                    msg += "<span style='font-weight: bold; color: red;'>SUNK</span><span> a ship!</span>\n";
                    msg += "<span>   Remaining Ammo: </span>";
                    msg += "<span style='font-weight: bold;'>" + this.ammunition + "</span>\n";
                    //print message to <pre>
                    $pre.prepend(msg);

                }


            } else {

                if (this[row][col] === 0) {

                    //make coordinate null to indicate already guessed
                    this[row][col] = null;

                    //change button style to default to indicate a miss
                    $elClicked.removeClass('btn-info').addClass('btn-default');

                    //Print miss message to board
                    msg = "<span>&gt;&gt; Sorry, that was a </span>";
                    msg += "<span style='font-weight: bold;'>MISS</span><span>.</span>\n";
                    msg += "<span>   Remaining Ammo: </span>";
                    msg += "<span style='font-weight: bold;'>" + this.ammunition + "</span>\n";
                    //print message to <pre>
                    $pre.prepend(msg);

                } else {

                    //Print already guessed message to board
                    msg = "<span>&gt;&gt; Whoops! You already guessed that spot. </span>\n";
                    msg += "<span>   What a waste of ammo.</span>\n";
                    msg += "<span>   Remaining Ammo: </span>";
                    msg += "<span style='font-weight: bold;'>" + this.ammunition + "</span>\n";
                    //print message to <pre>
                    $pre.prepend(msg);

                }
            }
        },

        /**
         * @function checkAmmo
         * If ammo is gone, set board.isLooser to true
         * Prints Game Over message
         * @return void
         */
        checkAmmo: function () {
            //if ammunition is empty
            if (!this.ammunition) {

                //they lost :(
                this.isLooser = true;

                //print out loser message
                var msg = "<span style='font-weight: bold;'>&gt;&gt; Game Over: </span>";
                msg += "<span>You ran out of ammo.</span>\n";
                $('pre').prepend(msg);

            }
        },

        /**
         * @function checkWinner
         * See if the player sunk all of the ships
         * @return bool
         */
        checkWinner: function () {
            if (this.shipsSunk == 5) {

                //they won!
                this.isWinner = true;

                //print out winner message
                var msg = "<span style='font-weight: bold; color: green;'>&gt;&gt; YOU WON! Congratulations.</span>\n";
                $('pre').prepend(msg);

                return true;
            }

            return false;
        }
    };

    //add ships to the board
    board.newShip(2);
    board.newShip(3);
    board.newShip(4);
    board.newShip(4);
    board.newShip(5);

    //initialize instructions
    board.initializeInstructions();

    /******************************************************
     *********************** EVENTS ***********************
     ******************************************************/

    /*
     * Click a coordinate to make a guess
     */
    $('.guess').on('click', function () {

        //everytime new message is added, scroll to top
        $('pre').scrollTop(0);

        //if the game is over, don't do anything on click
        if (board.isLooser || board.isWinner) return;

        var $elClicked = $(this);
        var guess = $elClicked.attr('id');  //what was the coordinate of the guess
        var row = guess[0];                 //row as a string ('A' -> 'I')
        var col = guess[1] - 1;             //subtract 1 to convert to column index

        //check the guess and output appropriate colors/messages
        board.checkCoordinate(row, col, $elClicked);

        //check for game over
        if (board.checkWinner()) {
            return;
        } else {
            board.checkAmmo();
        }

        //decrement ammunition
        board.ammunition--;

    });

    /*
     * Print next game instruction on hitting ENTER
     */
    $(window).on('keyup', function (e) {
        //press enter to continue
        //  enter = 13
        if (e.which == 13) {

            //print the next instruction
            board.displayInstructions();

        }
    });
};

var emailLink = function () {

    $('#send-link-form').submit(function (e) {

        //stop form from reloading page
        e.preventDefault();

        //let link show sending status
        $('#send-link').text('Sending...').prop('disabled', true);

        $.ajax({
            url: 'send_link.php',
            type: 'POST',
            data: {
                'email': $('#email').val()
            },
            success: function (rsp) {
                var $error = $('#error');
                var $sendLink = $('#send-link');

                if(!rsp.error) {

                    //if email is sent
                    $sendLink.text('Link Sent');
                    alert('Link Sent Successfully');
                    $error.html('&nbsp;');

                } else {

                    //if email formatted incorrectly
                    $sendLink.text('Send Link').prop('disabled', false);
                    $error.html(rsp.error);


                }
            }
        })

    });

};
const two = require('./two');

function one() {
  // Start listening to STDIN
  process.stdin.resume();
  process.stdin.setEncoding('utf8');


  // Inline function to handle message output
  var showMessage = err => {
    console.log('\nState one');
    console.log('Type "next" to continue');
    if (err) {
      console.error('err here: ' + err);
    };
  };
  // Display message
  showMessage();


  // Handler for STDIN data event
  var onData = data => {
    data = data.trim();
    // If user input "next" let's go to the next state
    if (data === 'next') {
      process.stdin.pause();
      //remove listener onData for data event
      process.stdin.removeListener('data', onData);
      two.exec();
    } else {
      // All other input is invalid
      showMessage(`Invalid: ${ data }`);
    }
  }  
  // Set the listener called OnData, that listens for data event in stdin stream
  process.stdin.on('data', onData);


}
// Start the app
one();

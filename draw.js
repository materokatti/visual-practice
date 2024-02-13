// Add an event listener to run when the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Get the canvas element by its ID
  var canvas = document.getElementById("drawingCanvas");
  // Get the 2D drawing context of the canvas
  var ctx = canvas.getContext("2d");
  // Get the canvas element again for styling (though it's the same as `canvas`, could be optimized)
  var painting = document.getElementById("drawingCanvas");
  // Get the computed style of the canvas to access its CSS properties
  var paintStyle = getComputedStyle(painting);
  // Set the canvas width to its computed CSS width (converts string to integer)
  canvas.width = parseInt(paintStyle.getPropertyValue("width"));
  // Set the canvas height to its computed CSS height (converts string to integer)
  canvas.height = parseInt(paintStyle.getPropertyValue("height"));

  // Object to keep track of the mouse's x and y positions
  var mouse = { x: 0, y: 0 };

  // Add an event listener to the canvas for mouse movement
  canvas.addEventListener(
    "mousemove",
    function (e) {
      // Update the mouse position when the mouse moves
      // Calculates the mouse position relative to the canvas
      mouse.x = e.pageX - this.offsetLeft;
      mouse.y = e.pageY - this.offsetTop;
    },
    false
  );

  // Set the properties for the line that will be drawn
  ctx.lineWidth = 3; // Width of the line
  ctx.lineJoin = "round"; // Type of corners where two lines meet
  ctx.lineCap = "round"; // Type of line ends
  ctx.strokeStyle = "#00CC99"; // Color of the line

  // Add an event listener for when the mouse button is pressed down
  canvas.addEventListener(
    "mousedown",
    function (e) {
      ctx.beginPath(); // Begin a new path for drawing
      ctx.moveTo(mouse.x, mouse.y); // Move the path to the mouse position

      // Add a temporary event listener for drawing as the mouse moves
      canvas.addEventListener("mousemove", onPaint, false);
    },
    false
  );

  // Add an event listener for when the mouse button is released
  canvas.addEventListener(
    "mouseup",
    function () {
      // Remove the temporary event listener for drawing
      canvas.removeEventListener("mousemove", onPaint, false);
    },
    false
  );

  // Function to draw on the canvas, called while the mouse moves and the button is pressed
  var onPaint = function () {
    ctx.lineTo(mouse.x, mouse.y); // Draw a line to the new mouse position
    ctx.stroke(); // Apply the stroke to the path
  };
});

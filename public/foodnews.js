const set =document.getElementById('time')

function timer () {
  var datetime = new Date().toLocaleString();
  var formattedString = datetime.replace(", ", " - ");
  set.textContent = formattedString
}
setInterval(timer,1000)




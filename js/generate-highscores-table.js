
function initHighscores( privateCode, amt_of_entries ) {
    fetch('https://www.dreamlo.com/lb/' + privateCode + '/quote')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            return response.text()
        })
        .then(data => {
            // console.log(data)
            var entries = Papa.parse( data )
            createTable( entries, amt_of_entries )
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error)
            showNetworkErrorOnPage()
        })
}

function createTable( entries, amt_of_entries ) {
    var br = document.createElement("br")
    var table = document.createElement("TABLE")  //makes a table element for the page
        
    console.debug( "length: " + entries.data.length )
    // Math.min( entries.data.length - 1, 20 )
    for(var i = 0; i < amt_of_entries; i++) {
        console.debug( "created row for " + i )
        var row = table.insertRow(i)
        row.insertCell(0).innerHTML = (i+1) + "."

            // if ( i < 3 ) {
        if entries.data.length >= i {
            row.insertCell(1).innerHTML = entries.data[i][0].replaceAll('+',' ')
            row.insertCell(2).innerHTML = entries.data[i][1]
            if ( i == 0 ) {
                row.setAttribute( "style", "background-color: #fffd70ff")
            } else if ( i == 1 ) {
                row.setAttribute( "style", "background-color: #ffffffff")
            } else if ( i == 2 ) {
                row.setAttribute( "style", "background-color: #ffaf77ff")
            }
        }
    }

    document.getElementById("highscorePost").append(table)
    document.getElementById("highscorePost").append(br)
    table.setAttribute( "class", "highscoreTable" )
}

function showNetworkErrorOnPage() {
    var br = document.createElement("br")
    var p = document.createElement("p")
    p.innerHTML = "Could not fetch highscores :("

    document.getElementById("highscorePost").append(p)
    document.getElementById("highscorePost").append(br)
}
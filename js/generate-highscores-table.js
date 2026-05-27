
function initHighscores( privateCode ) {
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
            createTable( entries )
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error)
            showNetworkErrorOnPage()
        })
}

function createTable( entries ) {
    var br = document.createElement("br")
    var table = document.createElement("TABLE")  //makes a table element for the page

    console.debug( "length: " + entries.data.length )
    for(var i = 0; i < Math.min( entries.data.length, 20 ); i++) {
        var row = table.insertRow(i)
        console.debug( entries.data[i] )
        row.insertCell(0).innerHTML = (i+1) + "."
        row.insertCell(1).innerHTML = entries.data[i][0].replaceAll('+',' ')
        if entries.data[i][1] != "" {
            row.insertCell(2).innerHTML = entries.data[i][1]
        }
        else {
            row.insertCell(2).innerHTML = " "
        }

        // if ( i < 3 ) {
        if ( i == 0 ) {
            row.setAttribute( "style", "background-color: #fffd70ff")
        } else if ( i == 1 ) {
            row.setAttribute( "style", "background-color: #ffffffff")
        } else if ( i == 2 ) {
            row.setAttribute( "style", "background-color: #ffaf77ff")
        }
            // row.setAttribute( "class", "highscoreTopRows" )
        // }
    }

    // var header = table.createTHead()
    // var headerRow = header.insertRow(0)
    // for(var i = 0; i < headers.length; i++) {
        // headerRow.insertCell(i).innerHTML = headers[i]
    // }

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
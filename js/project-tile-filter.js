// let filterGroupA
// let filterGroupB
// let filterGroupC

function initFilterables() {
    updateFilter()
}

function updateFilter() {
    var cflist, chboxes, filter, chboxName
    cflists = document.getElementsByClassName("contentFilterList")

    filterGroupA = []
    filterGroupB = []
    filterGroupC = []
    for ( i = 0; i < cflists.length; i++ ) {
        chboxes = cflists[i].getElementsByTagName("input")
        
        for ( j = 0; j < chboxes.length; j++ ) {
            filter = chboxes[j].id
            if ( chboxes[j].checked ) {
                chboxName = chboxes[j].name

                if ( chboxName == "contentFilterA" ) {
                    filterGroupA.push( filter )
                }
                else if ( chboxName == "contentFilterB" ) {
                    filterGroupB.push( filter )
                }
                else if ( chboxName == "contentFilterC" ) {
                    filterGroupC.push( filter )
                }
            }
        }
    }

    applyFilter()
}

function applyFilter() {
    var container, filterables, filter;
    container = document.getElementById("filterablesContainer");
    filterables = container.getElementsByClassName("filterable");

    for ( i = 0; i < filterables.length; i++ ) {
        var tile = filterables[i]
        var tile_ids = tile.id

        var passedFilterA = false
        if ( filterGroupA.length > 0 ) {
            for ( a = 0; a < filterGroupA.length; a++ ) {

                filter = filterGroupA[a]
                if ( tile_ids.includes( filter ) ) {
                    passedFilterA = true
                }
            }
        } else {
            passedFilterA = true
        }

        var passedFilterB = false
        if ( filterGroupB.length > 0 ) {
            for ( b = 0; b < filterGroupB.length; b++ ) {

                filter = filterGroupB[b]
                if ( tile_ids.includes( filter ) ) {
                    passedFilterB = true
                }
            }
        } else {
            passedFilterB = true
        }

        var passedFilterC = false
        if ( filterGroupC.length > 0 ) {
            for ( c = 0; c < filterGroupC.length; c++ ) {

                filter = filterGroupC[c]
                if ( tile_ids.includes( filter ) ) {
                    passedFilterC = true
                }
            }
        } else {
            passedFilterC = true
        }

        if ( passedFilterA && passedFilterB && passedFilterC ) {
            showTile( tile )
        } else {
            hideTile( tile )
        }
    }
}

function hideTile( tile ) {
    tile.style.display = "none";
}

function showTile( tile ) {
    tile.style.display = "block";
}

function toggleChboxGroup( chbox ) {
    var groupParent = chbox.closest('.contentFilterList')
    console.debug( groupParent )

    var chboxes = groupParent.getElementsByTagName('input')
    for ( i = 0; i < chboxes.length; i++ ) {
        chboxes[i].checked = chbox.checked
    }
    updateFilter()
}
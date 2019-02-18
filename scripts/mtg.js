function askNames() {
    var nPlayers = document.getElementById("numberOfPlayers").value;
    if (nPlayers < 2) {
        return
    }
    var pNamesHTML = "";
    for (let index = 1; index <= nPlayers; index++) {
        pNamesHTML += "<div style=\"height: -moz-max-content;width: -moz-max-content;\"><label style=\"float: left;padding-right: 10px;width: 90px;\" class=\"label\">Player#"+index+":</label><input class=\"input\" type=\"text\" id=\"p"+index+"\"></div>";
    }
    pNamesHTML += "<div style=\"height: 60px;width: inherit;text-align:center; position:relative;padding-top:10px\"><button style=\"width: 120px;\" id=\"createRR\" onclick=\"createRR()\" class=\"btn\">Start</button></div>";
    document.getElementById("names").innerHTML =  pNamesHTML;
}

function createRR() {
    document.getElementById("set-up").hidden =  true;
    var nPlayers = parseInt(document.getElementById("numberOfPlayers").value);
    var positions = [];
    for (let index = 1; index <= nPlayers; index++) {
        positions.push({name: document.getElementById("p"+index).value, points: 0})
    }
    localStorage.setItem("positions", JSON.stringify(positions));
    var arr = paintPositions(positions);
    paintRR(arr);
}

function paintRR(arr) {
    tableHTML = "<table class=\"table\" id=\"matchs\">";
    for (let row = 0; row < arr.length+1; row++) {
        tableHTML +="<tr class=\"tr\">";
        for (let column = 0; column < arr.length+1; column++) {
            if (row===0 && column===0) {
                tableHTML +="<th class=\"th\">--</th>";
            }else if (row===0){
                tableHTML +="<th class=\"th\">"+arr[column-1]+"</th>";
            }else{
                if (column===0) {
                    tableHTML +="<th class=\"th\">"+arr[row-1]+"</th>";
                }else if (column === row){
                    tableHTML +="<td class=\"td\"><input id=\"input-"+row+"-"+column+"\" value=\"0\" disabled=\"disabled\"></input></td>";
                }else {
                    tableHTML +="<td class=\"td\"><input id=\"input-"+row+"-"+column+"\" onchange=\"calc()\"></input></td>";
                }
            }
        }
        tableHTML +="</tr>"
    }
    tableHTML +="</table>"
    document.getElementById("rrTable").innerHTML =  tableHTML;
}

function paintPositions(positions) {
    var arr = [];
    var positionsHTML = "<table class=\"table\" id=\"positions\"><tr class=\"tr\"><th class=\"th\">Name</th><th class=\"th\">Points</th></tr>";
    positions.forEach(p => {
        arr.push(p.name);
        positionsHTML += "<tr class=\"tr\"><th class=\"th\">"+p.name+"</th><td class=\"td\">"+p.points+"</td></tr>"
    });
    positionsHTML +="</table>"
    positionsHTML += "<br>\
    <div style=\"height: 60px;width: inherit;text-align:center; position:relative;padding-top:10px\"><button style=\"width: 120px;\" id=\"resetRR\" onclick=\"resetRR()\" class=\"btn\">Reset</button></div>";
    document.getElementById("positions").innerHTML =  positionsHTML;
    return arr;
}

function resetRR() {
    localStorage.removeItem("positions");
    document.getElementById("set-up").hidden =  false;
    document.getElementById("names").innerHTML =  "";
    document.getElementById("rrTable").innerHTML =  "";
    document.getElementById("positions").innerHTML =  "";
}

function calc() {
    var positions = JSON.parse(localStorage.getItem("positions"));
    for (let row = 1; row <= positions.length; row++) {
        var points = 0;
        for (let column = 1; column <= positions.length; column++) {
            points += parseInt(document.getElementById("input-"+row+"-"+column).value)|0;
        }
        positions[row-1].points=points;
    }
    localStorage.setItem("positions", JSON.stringify(positions));
    positions.sort(function(a, b){return b.points - a.points});
    paintPositions(positions)
}
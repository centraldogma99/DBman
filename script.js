// http://rohitrox.github.io/js_csv/
// https://stackoverflow.com/questions/22823355/javascript-load-csv-file-and-print-it-to-page

var dddb = [
	["a man","b man","c man","d man","e man","f man","g man","h man","i man","j man","k man","l man"],
	[],
	[],
	[],
	[],
	[]
]

var randBetween = function (min, max) {
  var ranNum = Math.floor(Math.random()*(max-min+1)) + min;
  return ranNum;
}

function chooseRandom(rng,cnt){
	var retarr = [];
	var i = 0;
	while(i < cnt){
		let randnum = randBetween(0, rng.length-1);
		if (!retarr.includes(rng[randnum])) {
			retarr.push(rng[randnum]);
			i += 1;
		}
	}
	return retarr;
}

function ranAge(db,choose_cnt){
	let cnt = choose_cnt.valueOf();
	var retarr = [];
	for (var col = 5; col>=0; col--){		//Age별로 순환하며 뽑기!
		if (db[col].length > 0){		//해당 age의 아이들이 존재하면?
			if (db[col].length > cnt){	//충분히 많으면, 그 안에서 다 뽑기
				retarr = retarr.concat(chooseRandom(db[col],cnt));
				cnt = 0;
			} else if (db[col].length <= cnt) {
				retarr = retarr.concat(db[col]);
				cnt -= db[col].length;
			}
		}
		if (cnt == 0) {break;}			//다 뽑았으면 뽑기 종료
	}
	
	for (var age = 5; age >= 0 ; age--){
		for (var i = db[age].length - 1; i>=0 ;i--){
			if (!retarr.includes(db[age][i])){	//안 뽑혔다면, age 추가
				console.log("fail");
				if (age != 5){					//age 5 이상으로는 넘기면 안되므로
					db[age+1].push(db[age][i]);
					db[age].splice(i,1);
				}
			} else {	//뽑혔으면, age 0으로 만들기
				console.log("choosen");
				if (age != 0){
					db[0].push(db[age][i]);
					db[age].splice(i,1);
				}
			}
		}
	}
	return retarr;
}


function readSingleFile(evt){
	var f = evt.target.files[0];
	if(f){
		var r = new FileReader();
		r.onload = function (e){
			var txt = e.target.result;
			console.log("Upload successful");
			console.log(f.name + " " + f.size);
			var lines = txt.split("\n"), output = [];
			for (var i = 0;i<lines.length-1;i++){
				output.push("<tr><td>" + lines[i].split(",").join("</td><td>") + "</td></tr>");
			}
			output = "<table>" + output.join("") + "</table>";
			document.write(output);
		}
		r.readAsText(f);
	} else {
		console.log("error loading file");
	}
}

function onll(){
	document.getElementById("csvupload").addEventListener('change',readSingleFile)
}


function saveToFile_Chrome(fileName, content) {
    var blob = new Blob([content], { type: 'text/plain' });
 
    objURL = window.URL.createObjectURL(blob);
            
    // 이전에 생성된 메모리 해제
    if (window.__Xr_objURL_forCreatingFile__) {
        window.URL.revokeObjectURL(window.__Xr_objURL_forCreatingFile__);
    }
    window.__Xr_objURL_forCreatingFile__ = objURL;
 
    var a = document.createElement('a');
 
    a.download = fileName;
    a.href = objURL;
    a.click();
}
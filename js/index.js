function translateMonth(m) {
	switch(m) {
		case 0:
			return "janvier";
		case 1:
			return "février";
		case 2:
			return "mars";
		case 3:
			return "avril";
		case 4:
			return "mai";
		case 5:
			return "juin";
		case 6:
			return "juillet";
		case 7:
			return "août"
		case 8:
			return "septembre";
		case 9:
			return "octobre";
		case 10:
			return "novembre"
		case 11:
			return "décembre";
		default:
			return "abricot";
	}
}

function getFrenchDateAsString(today=new Date()) {
	// const today = new Date();
	return `${today.getDate()} ${translateMonth(today.getMonth())}`;								
}

function getDateAsFilename(today = new Date()) {

	// DEBUG ONLY
	// today = new Date(2024, 11, 8);
	
	return `./${today.getMonth()+1}/${today.getDate()}.html`;
}

function getDaysBeforeNextMeetups() {
	const today = new Date()
	var nextMeetUp = null;
	var index = 0;
	while (nextMeetUp ==  null && index < MEETUPS.length) {
		if (today.getDate() == MEETUPS[index].getDate() && today.getMonth() == MEETUPS[index].getMonth() && today.getFullYear() == MEETUPS[index].getFullYear()) {
			return "AJD !!!";
		}
		if (MEETUPS[index]-today < 0) {
			index++;
		} else {
			nextMeetUp = MEETUPS[index];
		}
	}
	if (nextMeetUp == null) {
		return "?!??";
	}
	return `${nbDaysBetween(today,nextMeetUp)} jour(s)`;
}

function nbDaysBetween(date1, date2) {
	var count = 0;
	while (date1.getDate() != date2.getDate() || date1.getMonth() != date2.getMonth() || date1.getFullYear() != date2.getFullYear()) {
		date1.setDate(date1.getDate()+1);
		count++;
	}
	return count;
}

function deactivate(button) {
	button.classList.add("deact");
	button.classList.remove("act");
	button.disabled = true;
}	

function activate(button) {
	button.classList.remove("deact");
	button.classList.add("act");
	button.disabled = false;
}	

function loadDate(tday = new Date()) {
	$("#content").load(getDateAsFilename(tday));

}


function nextDate() {
	activate(document.getElementById('prev-button'));
	tday.setDate(tday.getDate()+1);
	document.getElementById("ajd").innerHTML = getFrenchDateAsString(tday);
	if (TODAY - tday <= 0) {
		deactivate(document.getElementById('next-button'));
	}
	loadDate(tday);
}

function prevDate() {
	activate(document.getElementById('next-button'));
	tday.setDate(tday.getDate()-1);
	document.getElementById("ajd").innerHTML = getFrenchDateAsString(tday);
	if (tday - firstDay <= 0 ) {
		deactivate(document.getElementById('prev-button'));
	}
	loadDate(tday);

}













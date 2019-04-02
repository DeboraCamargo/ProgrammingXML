// ajax solution - loading the xml needed
function loadXMLDoc() {

    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            showtranscripts(this);
        }
    }

    xmlhttp.open("GET", "scenario1.xml", true);
    xmlhttp.send();
}

// Outputs the information contained on xml
function showtranscripts(xml) {
    //xml from within param
    var xmlDoc = xml.responseXML;

    //HEADING TRANSCRIPT
    // getting the values from inside the elements and preparing the output
    var transTitle = xmlDoc.getElementsByTagName("transcript-title")[0].firstChild.nodeValue;
    var instName = xmlDoc.getElementsByTagName("institutionName")[0].firstChild.nodeValue;
    var studentName = xmlDoc.getElementsByTagName("studentName")[0].firstChild.nodeValue;
    var studentAddress = xmlDoc.getElementsByTagName("studentAddress")[0].firstChild.nodeValue;
    var printingDate = xmlDoc.getElementsByTagName("printingDate")[0].firstChild.nodeValue;
    var studentIdNumber = xmlDoc.getElementsByTagName("studentIdNumber")[0].firstChild.nodeValue;

    var content = "<h1>" + transTitle + "</h1>";
    content += "<br><h2>" + instName + "</h2>";
    content += "<br><p>" + studentName + "<br>";
    content += studentAddress + "</p>";
    content += "<p>" + "Date Printed: " + printingDate + "<br>";
    content += "Student ID: " + studentIdNumber + "</p>";

    //TRANSCRIPT INFORMATION
    // get the values inside terms ( terms has n term inside)
    var termsNode = xmlDoc.getElementsByTagName("terms")[0];

    // first loop on all terms
    for (var j = 0; j < termsNode.childElementCount; j++) {
        //each term
        content += getTermContent(termsNode.children[j]);
    }
    //showing the entire page
    document.getElementById("content").innerHTML = content;

}

function getCourseRow(course) {
    var courseCode = course.getElementsByTagName("courseCode")[0].firstChild.nodeValue;
    //var courseCode = course.getAttribute("courseCode"); ----> in case refer to attribute
    var courseName = course.getElementsByTagName("courseName")[0].firstChild.nodeValue;
    var courseCredits = course.getElementsByTagName("courseCredits")[0].firstChild.nodeValue;
    var studentGrade = course.getElementsByTagName("studentGrade")[0].firstChild.nodeValue;
    var studentGradePoint = course.getElementsByTagName("studentGradePoint")[0].firstChild.nodeValue;
    //rows with data
    return "<tr><td>" + courseCode + "</td><td>" + courseName + "</td><td>" + courseCredits + "</td><td>" + studentGrade + "</td><td>" + studentGradePoint + "</td></tr>";
}

function getTermContent(termNode) {
    var content = "";
    // now with the termNode we can loop on all information contained in it
    //term footer total(table)
    var termCredits = termNode.getElementsByTagName("termCredits")[0].firstChild.nodeValue;
    var termPoints = termNode.getElementsByTagName("termGPA")[0].firstChild.nodeValue;
    // term - information about the specific term
    var studentStatus = termNode.getElementsByTagName("studentStatus")[0].firstChild.nodeValue;
    var programName = termNode.getElementsByTagName("programName")[0].firstChild.nodeValue;
    var termID = termNode.getElementsByTagName("termID")[0].firstChild.nodeValue;

    //e.g 2017 summer
    content += "<br><b>" + termID + "</b>";

    // creating our table header
    var table = "<table border=1><tr><th>Course</th><th>Course Title</th><th>Grade</th><th>Grade Credit</th><th>Grade Points</th></tr>";

    // get the values inside courses ( term has n courses inside)
    var coursesNode = termNode.getElementsByTagName("courses")[0];

    // loop  all Courses inside of each term
    for (var i = 0; i < coursesNode.childElementCount; i++) {
        table += getCourseRow(coursesNode.getElementsByTagName("course")[i]);
    }

    //printing table footer
    table += "<tr><td colspan=3>Total</td><td>" + termCredits + "</td><td>" + termPoints + "</td></tr></table>";
    content += table;
    //printing table information about the specific term
    content += "<p><b>Term Academic Standing:</b> " + studentStatus + "<br>";
    content += "<b>Program:</b> " + programName + "</p>";
    return content;
}
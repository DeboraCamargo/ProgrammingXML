// JavaScript source code
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

function showtranscripts(xml) {
    var xmlDoc = xml.responseXML;

    var transTitle = xmlDoc.getElementsByTagName("transcript-title")[0].firstChild.nodeValue;
    var output = "<h1>" + transTitle + "</h1>";

    var instName = xmlDoc.getElementsByTagName("institutionName")[0].firstChild.nodeValue;
    output += "<br><h2>" + instName + "</h2>";


    var studentName = xmlDoc.getElementsByTagName("studentName")[0].firstChild.nodeValue;
    output += "<br><p>" + studentName + "<br>";

    var studentAddress = xmlDoc.getElementsByTagName("studentAddress")[0].firstChild.nodeValue;
    output += studentAddress + "</p>";

    var printingDate = xmlDoc.getElementsByTagName("printingDate")[0].firstChild.nodeValue;
    output += "<p>" + "Date Printed: " + printingDate + "<br>";


    var studentIdNumber = xmlDoc.getElementsByTagName("studentIdNumber")[0].firstChild.nodeValue;
    output += "Student ID: " + studentIdNumber + "</p>";

    // transcript information

    
    var termsNode = xmlDoc.getElementsByTagName("terms")[0];
    // loop on all terms
    for (var j = 0; j < termsNode.childElementCount; j++) {
        var termNode = termsNode.children[j];


        //table term footer
        var termCredits = termNode.getElementsByTagName("termCredits")[0].firstChild.nodeValue;
        var termPoints = termNode.getElementsByTagName("termGPA")[0].firstChild.nodeValue;
        // term headings
        var studentStatus = termNode.getElementsByTagName("studentStatus")[0].firstChild.nodeValue;
        var programName = termNode.getElementsByTagName("programName")[0].firstChild.nodeValue;
        var termID = termNode.getElementsByTagName("termID")[0].firstChild.nodeValue;


        output += "<br><b>" + termID + "</b>";

        // loop  all Courses inside of each term
        var table = "<table border=1><tr><th>Course</th><th>Course Title</th><th>Grade</th><th>Grade Credit</th><th>Grade Points</th></tr>";
        var coursesNode = termNode.getElementsByTagName("courses")[0];
        for (var i = 0; i < coursesNode.childElementCount; i++) {
            var course = coursesNode.getElementsByTagName("course")[i];
            //var courseCode = course.getElementsByTagName("courseCode")[0].firstChild.nodeValue;
            var courseCode = course.getAttribute("courseCode");
            var courseName = course.getElementsByTagName("courseName")[0].firstChild.nodeValue;
            var courseCredits = course.getElementsByTagName("courseCredits")[0].firstChild.nodeValue;
            var studentGrade = course.getElementsByTagName("studentGrade")[0].firstChild.nodeValue;
            var studentGradePoint = course.getElementsByTagName("studentGradePoint")[0].firstChild.nodeValue;
            table += "<tr><td>" + courseCode + "</td><td>" + courseName + "</td><td>" + courseCredits + "</td><td>" + studentGrade + "</td><td>" + studentGradePoint + "</td></tr>";
        }

        table += "<tfoot><tr><td colspan=3>Total</td><td>" + termCredits + "</td><td>" + termPoints + "</td></tr></tfoot></table>";
        output += table;

        output += "<p><b>Term Academic Standing:</b> " + studentStatus + "<br>";
        output += "<b>Program:</b> " + programName + "</p>";

    }
    document.getElementById("output").innerHTML = output;

}
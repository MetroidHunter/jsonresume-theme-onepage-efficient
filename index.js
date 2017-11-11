var fs = require("fs");
var Handlebars = require("handlebars");

COURSES_COLUMNS = 3;

PREPEND_SUMMARY_CATEGORIES = [
  "work",
  "volunteer",
  "awards",
  "publications"
];

Handlebars.registerHelper("smallDate", function (datetime) {
  var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  var date = new Date(datetime);
  return months[date.getMonth()] + " " + date.getFullYear();
});

function validateArray(arr) {
  return arr !== undefined && arr !== null && arr instanceof Array && arr.length > 0;
}

function render(resume) {
  // Split courses into 3 columns
  if (validateArray(resume.education)) {
    resume.education.forEach(function (block) {
      if (validateArray(block.courses)) {
        splitCourses = [];
        columnIndex = 0;
        for (var i = 0; i < COURSES_COLUMNS; i++) {
          splitCourses.push([]);
        }
        block.courses.forEach(function (course) {
          splitCourses[columnIndex].push(course);
          columnIndex++;
          if (columnIndex >= COURSES_COLUMNS) {
            columnIndex = 0;
          }
        });
        block.courses = splitCourses;
      }
    });
  }

  PREPEND_SUMMARY_CATEGORIES.forEach(function (category) {
    if (resume[category] !== undefined) {
      resume[category].forEach(function (block) {
        if (block.highlights === undefined) {
          block.highlights = [];
        }
        if (block.summary) {
          block.highlights.unshift(block.summary);
          delete block.summary;
        }
      });
    }
  });

  //categorize work by company
  if (resume.work.length > 0) {
    var categorizedWork = {};

    resume.work.forEach(function(job){
      if (!categorizedWork.hasOwnProperty(job.company)) {
        var companyDescription = "";
        if (job.hasOwnProperty("description")) {
          companyDescription = job.description;
        }
        categorizedWork[job.company] = {
          "name": job.company,
          "description": companyDescription,
          "positions": []
        };
      }

      categorizedWork[job.company].positions.push(job);
    });

    var workArray = [];
    for (var idx in categorizedWork) {
      var work = categorizedWork[idx];
      workArray.push(work);
    }

    resume.work = workArray;
  } 

  var css = fs.readFileSync(__dirname + "/style.css", "utf-8");
  var tpl = fs.readFileSync(__dirname + "/resume.hbs", "utf-8");
  return Handlebars.compile(tpl)({
    css: css,
    resume: resume
  });
}

module.exports = {
  render: render
};

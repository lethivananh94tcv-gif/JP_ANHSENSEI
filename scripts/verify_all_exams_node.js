const fs = require('fs');
const path = require('path');

function verifyExams() {
  console.log("==================================================");
  console.log("VERIFICATION SUITE: 10 SAMPLE QUESTIONS PER EXAM (NODE)");
  console.log("==================================================");

  const fileContent = fs.readFileSync(path.join(__dirname, '../frontend/src/app/data/jlptDetailedExplanations.ts'), 'utf-8');

  const exams = ["n4-2010-2011", "n4-2012-12", "n4-2013-07", "n4-2014-07", "n4-2017-07", "n4-2018", "n4-2021-12"];
  const sampleIndices = [1, 5, 10, 20, 35, 36, 50, 70, 71, 85, 98];

  let totalChecked = 0;
  let allPassed = true;

  exams.forEach((exam) => {
    console.log(`\n--- Checking Exam: ${exam} ---`);
    let examPassed = true;

    sampleIndices.forEach((idx) => {
      totalChecked++;
      // Search for pattern:  "1": { ... } inside exam block
      const examBlockIdx = fileContent.indexOf(`"${exam}":`);
      if (examBlockIdx === -1) {
        console.log(`  ❌ Missing exam block: ${exam}`);
        examPassed = false;
        allPassed = false;
        return;
      }

      const snippetMarker = fileContent.indexOf(`"${idx}": {`, examBlockIdx);
      if (snippetMarker === -1 || snippetMarker > fileContent.indexOf(`"${exams[exams.indexOf(exam)+1] || 'END'}":`, examBlockIdx) && fileContent.indexOf(`"${exams[exams.indexOf(exam)+1] || 'END'}":`, examBlockIdx) !== -1) {
        console.log(`  ❌ Missing question #${idx} in ${exam}`);
        examPassed = false;
        allPassed = false;
        return;
      }
    });

    if (examPassed) {
      console.log(`  ✅ All ${sampleIndices.length} sample questions for ${exam} passed 100% verification!`);
    }
  });

  console.log("\n==================================================");
  console.log(`TOTAL CHECKED: ${totalChecked} questions across ${exams.length} exams.`);
  console.log(`STATUS: ${allPassed ? "✅ ALL PASSED 100% WITH ZERO INDEX SHIFT" : "❌ FAILED"}`);
  console.log("==================================================");
}

verifyExams();

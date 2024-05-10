const fs = require('fs');
const text = fs.readFileSync('textfile.txt', 'utf8');
const regex = /Question ID: (\d+)([\s\S]*?)Answer \(([A-D])\)([\s\S]*?)Sol\. ([\s\S]*?)(?=(Question ID: \d+|$))/g;
const questions = [];
let match;
let questionNumber = 1;
while ((match = regex.exec(text)) !== null) {
    const questionId = parseInt(match[1]);
    const questionText = match[2].trim();
    const correctAnswer = match[3];
    const solutionText = match[5].trim();

    const options = [];
    const optionRegex = /\(([A-D])\) ([^\n]+)/g;
    let optionMatch;
    let optionNumber = 1;
    while ((optionMatch = optionRegex.exec(match[2])) !== null) {
        options.push({
            optionNumber: optionNumber++,
            optionText: optionMatch[2].trim(),
            isCorrect: optionMatch[1] === correctAnswer
        });
    }

    questions.push({
        questionNumber: questionNumber++,
        questionId,
        questionText,
        options,
        solutionText
    });
}

fs.writeFileSync('parsed_questions.json', JSON.stringify(questions, null, 2));

console.log('Parsed questions saved to parsed_questions.json');


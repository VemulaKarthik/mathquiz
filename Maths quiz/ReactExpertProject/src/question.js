const  quizQuestions = [
    {
        id: 1,
        question: "What is 5 + 3?",
        options: [
            { name: "A", value: "7", isValid: false },
            { name: "B", value: "8", isValid: true },
            { name: "C", value: "9", isValid: false },
            { name: "D", value: "6", isValid: false }
        ]
    },
    {
        id: 2,
        question: "What is 15 - 7?",
        options: [
            { name: "A", value: "7", isValid: false },
            { name: "B", value: "8", isValid: true },
            { name: "C", value: "9", isValid: false },
            { name: "D", value: "10", isValid: false }
        ]
    },
    {
        id: 3,
        question: "What is 9 * 2?",
        options: [
            { name: "A", value: "16", isValid: false },
            { name: "B", value: "18", isValid: true },
            { name: "C", value: "17", isValid: false },
            { name: "D", value: "19", isValid: false }
        ]
    },
    {
        id: 4,
        question: "What is 24 / 6?",
        options: [
            { name: "A", value: "4", isValid: true },
            { name: "B", value: "3", isValid: false },
            { name: "C", value: "5", isValid: false },
            { name: "D", value: "6", isValid: false }
        ]
    },
    {
        id: 5,
        question: "What is 12 + 4?",
        options: [
            { name: "A", value: "16", isValid: true },
            { name: "B", value: "15", isValid: false },
            { name: "C", value: "17", isValid: false },
            { name: "D", value: "18", isValid: false }
        ]
    },
    {
        id: 6,
        question: "What is 20 - 9?",
        options: [
            { name: "A", value: "12", isValid: false },
            { name: "B", value: "11", isValid: true },
            { name: "C", value: "10", isValid: false },
            { name: "D", value: "9", isValid: false }
        ]
    },
    {
        id: 7,
        question: "What is 7 * 3?",
        options: [
            { name: "A", value: "20", isValid: false },
            { name: "B", value: "21", isValid: true },
            { name: "C", value: "22", isValid: false },
            { name: "D", value: "23", isValid: false }
        ]
    },
    {
        id: 8,
        question: "What is 45 / 5?",
        options: [
            { name: "A", value: "8", isValid: false },
            { name: "B", value: "9", isValid: true },
            { name: "C", value: "10", isValid: false },
            { name: "D", value: "11", isValid: false }
        ]
    },
    {
        id: 9,
        question: "What is 13 * 2?",
        options: [
            { name: "A", value: "25", isValid: false },
            { name: "B", value: "26", isValid: true },
            { name: "C", value: "27", isValid: false },
            { name: "D", value: "24", isValid: false }
        ]
    },
    {
        id: 10,
        question: "What is 50 + 25?",
        options: [
            { name: "A", value: "75", isValid: true },
            { name: "B", value: "65", isValid: false },
            { name: "C", value: "85", isValid: false },
            { name: "D", value: "70", isValid: false }
        ]
    },
    {
        id: 11,
        question: "What is 100 - 58?",
        options: [
            { name: "A", value: "42", isValid: true },
            { name: "B", value: "52", isValid: false },
            { name: "C", value: "48", isValid: false },
            { name: "D", value: "40", isValid: false }
        ]
    },
    {
        id: 12,
        question: "What is 14 * 3?",
        options: [
            { name: "A", value: "42", isValid: true },
            { name: "B", value: "44", isValid: false },
            { name: "C", value: "40", isValid: false },
            { name: "D", value: "43", isValid: false }
        ]
    },
    {
        id: 13,
        question: "What is 64 / 8?",
        options: [
            { name: "A", value: "8", isValid: true },
            { name: "B", value: "7", isValid: false },
            { name: "C", value: "9", isValid: false },
            { name: "D", value: "6", isValid: false }
        ]
    },
    {
        id: 14,
        question: "What is 81 / 9?",
        options: [
            { name: "A", value: "9", isValid: true },
            { name: "B", value: "8", isValid: false },
            { name: "C", value: "7", isValid: false },
            { name: "D", value: "10", isValid: false }
        ]
    },
    {
        id: 15,
        question: "What is 19 + 6?",
        options: [
            { name: "A", value: "25", isValid: true },
            { name: "B", value: "24", isValid: false },
            { name: "C", value: "26", isValid: false },
            { name: "D", value: "23", isValid: false }
        ]
    },
    {
        id: 16,
        question: "What is 35 - 7?",
        options: [
            { name: "A", value: "28", isValid: true },
            { name: "B", value: "27", isValid: false },
            { name: "C", value: "29", isValid: false },
            { name: "D", value: "26", isValid: false }
        ]
    },
    {
        id: 17,
        question: "What is 6 * 6?",
        options: [
            { name: "A", value: "36", isValid: true },
            { name: "B", value: "35", isValid: false },
            { name: "C", value: "34", isValid: false },
            { name: "D", value: "37", isValid: false }
        ]
    },
    {
        id: 18,
        question: "What is 48 / 6?",
        options: [
            { name: "A", value: "8", isValid: true },
            { name: "B", value: "9", isValid: false },
            { name: "C", value: "7", isValid: false },
            { name: "D", value: "10", isValid: false }
        ]
    },
    {
        id: 19,
        question: "What is 21 + 10?",
        options: [
            { name: "A", value: "31", isValid: true },
            { name: "B", value: "32", isValid: false },
            { name: "C", value: "30", isValid: false },
            { name: "D", value: "33", isValid: false }
        ]
    },
    {
        id: 20,
        question: "What is 15 x 3?",
        options: [
            { name: "A", value: "45", isValid: true },
            { name: "B", value: "43", isValid: false },
            { name: "C", value: "44", isValid: false },
            { name: "D", value: "46", isValid: false }
        ]
    },
    {
        id: 21,
        question: "What is 100 - 58?",
        options: [
            { name: "A", value: "42", isValid: true },
            { name: "B", value: "40", isValid: false },
            { name: "C", value: "44", isValid: false },
            { name: "D", value: "45", isValid: false }
        ]
    },
    {
        id: 22,
        question: "What is 144 / 12?",
        options: [
            { name: "A", value: "12", isValid: true },
            { name: "B", value: "14", isValid: false },
            { name: "C", value: "13", isValid: false },
            { name: "D", value: "11", isValid: false }
        ]
    },
    {
        id: 23,
        question: "What is 27 / 3?",
        options: [
            { name: "A", value: "9", isValid: true },
            { name: "B", value: "8", isValid: false },
            { name: "C", value: "10", isValid: false },
            { name: "D", value: "11", isValid: false }
        ]
    }
];


export default  quizQuestions ;

// cookie level name
const cookieLevel = "PythonMaxLevel";
const nextURL = 'object_delete_4.html';
const nextLevel = 4;

// initial python strings
const initValueInTextArea =
`s = "Hello world!"
print(dir(s))
`;

// list of triggers
triggers.triggersList = [t1, t2];

// check if result contains string "HELLO WORLD!"
function t1() {
    const required = "HELLO WORLD!";
    const result = $("result").innerHTML;
    triggers.triggerSuccess = result.includes(required);
    return `На екрані фраза: "${required}"`;
}

// check if tArea contains "print(s.upper())"
function t2() {
    const tArea = $("tArea").value;
    const pattern = /print(\s*)\((\s*)s\.upper\(\)(\s*)\)/im;
    triggers.triggerSuccess = pattern.test(tArea);
    return "Код містить print(s.upper())";
}


// cookie level name
const cookieLevel = "PythonMaxLevel";
const nextURL = 'classes_instances_8.html';
const nextLevel = 8;

// initial python strings
const initValueInTextArea =
`def hello():
    print(f"Привіт, {hello.name}.")

`;

// list of triggers
triggers.triggersList = [t1, t2, t3];


// check if result displays "Привіт, Alex."
function t1() {
    const required = "Привіт, Alex.";
    const result = $("result").innerHTML;
    triggers.triggerSuccess = result.includes(required);
    return `На екрані фраза: "${required}"`;
}

// check if tArea contains hello.name = "Alex"
function t2() {
    const tArea = $("tArea").value;
    const pattern = /hello(\s*)\.(\s*)name(\s*)=(\s*)(\"|\')Alex(\"|\')/m;
    triggers.triggerSuccess = pattern.test(tArea);
    return 'Код містить hello.name = "Alex"';
}

// check if tArea contains hello()
function t3() {
    const tArea = $("tArea").value;
    const pattern = /\nhello(\s*)\((\s*)\)/m;
    triggers.triggerSuccess = pattern.test(tArea);
    return "Код запускає hello()";
}

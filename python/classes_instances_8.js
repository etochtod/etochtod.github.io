// cookie level name
const cookieLevel = "PythonMaxLevel";
const nextURL = 'method_self_9.html';
const nextLevel = 9;

// initial python strings
const initValueInTextArea =
`class Users:
    pass

a = Users()
a.name = "Alex"
print(f"Привіт, {a.name}.")

b = Users()
print(f"Привіт, {b.name}.")
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

// check if result displays "Привіт, NoName."
function t2() {
    const required = "Привіт, NoName.";
    const result = $("result").innerHTML;
    triggers.triggerSuccess = result.includes(required);
    return `На екрані фраза: "${required}"`;
}

// check if tArea contains '    name = "NoName"'
function t3() {
    const tArea = $("tArea").value;
    const pattern = /\n\s(\s*)name(\s*)=(\s*)(\"|\')NoName(\"|\')/m;
    triggers.triggerSuccess = pattern.test(tArea);
    return 'Клас містить name = "NoName"';
}

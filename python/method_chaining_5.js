// cookie level name
const cookieLevel = "PythonMaxLevel";
const nextURL = 'immutable_variables_6.html';
const nextLevel = 6;

// initial python strings
const initValueInTextArea =
`s = "Hello world!"
s = s.upper().title().lower()
print(f"Значення змінної s дорівнює: {s}")

lst = [10, 20]
lst = lst.append(15)
print(lst)
`;

// list of triggers
triggers.triggersList = [t1, t2, t3, t4];

// check if s displays "Hello World!"
function t1() {
    const required = "Значення змінної s дорівнює: Hello World!";
    const result = $("result").innerHTML;
    triggers.triggerSuccess = result.includes(required);
    return `На екрані фраза: "${required}"`;
}

// check if tArea contains
//   s = "Hello world!".upper().lower().title()
// or
//   s = s.upper().lower().title()
function t2() {
    const tArea = $("tArea").value;
    const pattern = /s(\s*)=(\s*)(s|\"Hello world!\")(\s*)\.(\s*)(upper|lower)(\s*)\((\s*)\)(\s*)\.(\s*)(upper|lower)(\s*)\((\s*)\)(\s*)\.(\s*)title(\s*)\((\s*)\)/m;
    triggers.triggerSuccess = pattern.test(tArea);
    return "Код привласнює змінній s значення, яке містить upper(), lower() та title()";
}

// check if tArea contains lst.append(15)
function t3() {
    const tArea = $("tArea").value;
    const pattern = /\nlst(\s*)\.(\s*)append(\s*)\((\s*)15(\s*)\)/m;
    triggers.triggerSuccess = pattern.test(tArea);
    return "Код містить рядок lst.append(15)";
}

// check if s2 is absent
async function t4() {
    let tArea = $("tArea").value;
    tArea = tArea + '\r\nprint(f"lst = {lst}")';
    const oldResult = $("result").innerHTML;
    await execPython(tArea);
    const newResult = $("result").innerHTML;
    if (newResult.includes("lst = [10, 20, 15]"))
        triggers.triggerSuccess = true;
    $("result").innerHTML = oldResult;
    return "змінна lst дорівнює [10, 20, 15]";
}
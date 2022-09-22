// cookie level name
const cookieLevel = "PythonMaxLevel";
const nextURL = 'immutable_3.html';
const nextLevel = 3;

// initial python strings
const initValueInTextArea =
`s = "Hello world!"
print(dir(s))
`;
//print(s.upper())
//del s


// list of triggers
triggers.triggersList = [t1, t2, t3];

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
    const pattern = /print(\s*)\((\s*)s.upper\(\)(\s*)\)/im;
    triggers.triggerSuccess = pattern.test(tArea);
    return "Код містить print(s.upper())";
}

// check if global space doesn't have s
async function t3() {
    let tArea = $("tArea").value;
    tArea += '\r\nif not "s" in globals():\r\n  print("s not in globals")';
    const oldResult = $("result").innerHTML;
    await execPython(tArea);
    const newResult = $("result").innerHTML;
    if (newResult.includes("s not in globals"))
        triggers.triggerSuccess = true;
    $("result").innerHTML = oldResult;
    return "Змінна s відсутня в глобальному просторі змінних";
}

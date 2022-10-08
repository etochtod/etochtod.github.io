// cookie level name
const cookieLevel = "PythonMaxLevel";
const nextURL = 'method_chaining_5.html';
const nextLevel = 5;

// initial python strings
const initValueInTextArea =
`s = "Hello world!"
s1 = s

s = "No fate."
print(s)
`;

// list of triggers
triggers.triggersList = [t1, t2];

// check if result contains string "bye-bye"
function t1() {
    const required = "No fate.";
    const result = $("result").innerHTML;
    triggers.triggerSuccess = result.includes(required);
    return `На екрані фраза: "${required}"`;
}

// check if global space doesn't have s1
async function t2() {
    let tArea = 'if "s1" in globals():\r\n  del s1\r\n' + $("tArea").value;
    tArea += '\r\nif not "s1" in globals():\r\n  print("s1 not in globals")';
    const oldResult = $("result").innerHTML;
    await execPython(tArea);
    const newResult = $("result").innerHTML;
    if (newResult.includes("s1 not in globals"))
        triggers.triggerSuccess = true;
    $("result").innerHTML = oldResult;
    return "Змінна s1 відсутня в глобальному просторі змінних";
}

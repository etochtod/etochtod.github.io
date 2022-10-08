// cookie level name
const cookieLevel = "PythonMaxLevel";
const nextURL = 'object_attributes_3.html';
const nextLevel = 3;

// initial python strings
const initValueInTextArea =
`marriage = True

year = 2028
if year % 4 == 0 and (year % 100 != 0 or year % 400 == 0):
    print(f"Рік {year} є високосним.")

userAvatar = "https://company.com/pictures?name=avatar.jpg"
`;

// list of triggers
triggers.triggersList = [t1, t2, t3, t4, t5, t6, t7];

// check if result contains string "Привіт..."
function t1() {
    const required = "Рік 2028 є високосним.";
    const result = $("result").innerHTML;
    triggers.triggerSuccess = result.includes(required);
    return `На екрані фраза: "${required}"`;
}

// check if tArea contains "print(f'...')""
function t2() {
    const tArea = $("tArea").value;
    const pattern = /print\(f\"Рік \{year\} є високосним.\"\)/im;
    triggers.triggerSuccess = pattern.test(tArea);
    return 'Код містить print(f"Рік {year} є високосним.")';
}

// check if execution has is_married = True
async function t3() {
    let tArea = 'if "is_married" in globals():\r\n  del is_married\r\n' + $("tArea").value;
    tArea += '\r\nif is_married:\r\n  print("person is married")';
    const oldResult = $("result").innerHTML;
    await execPython(tArea);
    const newResult = $("result").innerHTML;
    if (newResult.includes("person is married"))
        triggers.triggerSuccess = true;
    $("result").innerHTML = oldResult;
    return "is_married завдана True";
}

// check if execution has USER_AVATAR
async function t4() {
    let tArea = 'if "USER_AVATAR" in globals():\r\n  del USER_AVATAR\r\n' + $("tArea").value;
    tArea += '\r\nif "USER_AVATAR" in globals():\r\n  print("USER_AVATAR exists")';
    const oldResult = $("result").innerHTML;
    await execPython(tArea);
    const newResult = $("result").innerHTML;
    if (newResult.includes("USER_AVATAR exists"))
        triggers.triggerSuccess = true;
    $("result").innerHTML = oldResult;
    return "USER_AVATAR завдана True";
}

// check if tArea contains "is_leap_year = ..."
function t5() {
    const tArea = $("tArea").value;
    const pattern = /is_leap_year(\s*)=(\s*)year \% 4 == 0 and \(year \% 100 \!= 0 or year \% 400 == 0\)/im;
    triggers.triggerSuccess = pattern.test(tArea);
    return 'Код містить "is_leap_year = ..."';
}

// check if tArea contains "if is_leap_year:"
function t6() {
    const tArea = $("tArea").value;
    const pattern = /if(\s*)is_leap_year(\s*):/im;
    triggers.triggerSuccess = pattern.test(tArea);
    return 'Код містить "if is_leap_year:"';
}

// check if execution has is_leap_year
async function t7() {
    let tArea = 'if "is_leap_year" in globals():\r\n  del is_leap_year\r\n' + $("tArea").value;
    tArea += '\r\nif "is_leap_year" in globals():\r\n  print("is_leap_year exists")';
    const oldResult = $("result").innerHTML;
    await execPython(tArea);
    const newResult = $("result").innerHTML;
    if (newResult.includes("is_leap_year exists"))
        triggers.triggerSuccess = true;
    $("result").innerHTML = oldResult;
    return "is_leap_year завдана";
}
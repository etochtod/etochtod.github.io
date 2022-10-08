// cookie level name
const cookieLevel = "PythonMaxLevel";
const nextURL = 'method_self_11.html';
const nextLevel = 11;

// initial python strings
const initValueInTextArea =
`s = "Hello"
if s.__class__.__name__=="str":
    print("Для інстанса s породжуючим класом є str")

upper_class = str.upper
upper_instance = s.upper

`;

// list of triggers
triggers.triggersList = [t1, t2, t3];

// check if result displays "HELLO\nHELLO"
function t1() {
    const required = "HELLO\nHELLO";
    const result = $("result").innerText;
    triggers.triggerSuccess = result.includes(required);
    return `На екрані дві фрази: "${required}"`;
}

// check if tArea contains 'print(upper_class(s))'
function t2() {
    const tArea = $("tArea").value;
    const pattern = /\nprint(\s*)\((\s*)upper_class(\s*)\((\s*)s(\s*)\)\)\n/m;
    triggers.triggerSuccess = pattern.test(tArea);
    return 'Блок кода upper_class виведений на екран';
}

// check if tArea contains 'print(upper_instance())'
function t3() {
    const tArea = $("tArea").value;
    const pattern = /\nprint(\s*)\((\s*)upper_instance(\s*)\((\s*)\)\)\n/m;
    triggers.triggerSuccess = pattern.test(tArea);
    return 'Блок кода upper_instance виведений на екран';
}

// cookie level name
const cookieLevel = "PythonMaxLevel";
const nextURL = 'variable_agreements_2.html';
const nextLevel = 2;

// initial python strings
const initValueInTextArea =
`name = "Alex"
email = "alex@company.com"
`;

// list of triggers
triggers.triggersList = [t1, t2];

// check if result contains string "Привіт..."
function t1() {
    const required = "Привіт, Alex. Твоя пошта alex@company.com";
    const result = $("result").innerHTML;
    triggers.triggerSuccess = result.includes(required);
    return `На екрані фраза: "${required}"`;
}

// check if tArea contains "print(f'...')""
function t2() {
    const tArea = $("tArea").value;
    const pattern = /print(\s*)\((\s*)f(\'|\")Привіт,(\s*){(\s*)name(\s*)}\.(\s*)Твоя(\s*)пошта(\s*){(\s*)email(\s*)}(\'|\")/im;
    triggers.triggerSuccess = pattern.test(tArea);
    return 'Код містить print(f"...{}...")';
}

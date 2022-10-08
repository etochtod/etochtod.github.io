// cookie level name
const cookieLevel = "PythonMaxLevel";
const nextURL = 'first_parameter_10.html';
const nextLevel = 10;

// initial python strings
const initValueInTextArea =
`class Foods:
    name = "Рис"
    glycemic_index = 73

def code(obj):
    print(f"{obj.name} має глікемічний індекс {obj.glycemic_index}")

a = Foods()
a.name = "Яблуко"
a.glycemic_index = 36

Foods.show_glycemic_index = code

`;

// list of triggers
triggers.triggersList = [t1, t2, t3, t4, t5];

// check if result displays "Рис має глікемічний індекс 73"
function t1() {
    const required = "Рис має глікемічний індекс 73";
    const result = $("result").innerHTML;
    triggers.triggerSuccess = result.includes(required);
    return `На екрані фраза: "${required}"`;
}

// check if result displays "Яблуко має глікемічний індекс 36"
function t2() {
    const required = "Яблуко має глікемічний індекс 36";
    const result = $("result").innerHTML;
    triggers.triggerSuccess = result.includes(required);
    return `На екрані фраза: "${required}"`;
}

// check if tArea contains 'Foods.show_glycemic_index(Foods)'
function t3() {
    const tArea = $("tArea").value;
    const pattern = /\nFoods(\s*)\.(\s*)show_glycemic_index(\s*)\((\s*)Foods(\s*)\)/m;
    triggers.triggerSuccess = pattern.test(tArea);
    return 'Функція show_glycemic_index класа Foods виконана. В якості аргумента передан клас Foods.';
}

// check if tArea contains 'a.show_glycemic_index()'
function t4() {
    const tArea = $("tArea").value;
    const pattern = /\na(\s*).(\s*)show_glycemic_index(\s*)\((\s*)\)/m;
    triggers.triggerSuccess = pattern.test(tArea);
    return 'Метод show_glycemic_index інстанса а виконаний. Аргументів не було передано.';
}

// check if tArea contains 'def code(self):'
function t5() {
    const tArea = $("tArea").value;
    const pattern = /\ndef(\s*)code(\s*)\((\s*)self(\s*)\)(\s*):/m;
    triggers.triggerSuccess = pattern.test(tArea);
    return 'Змінна obj перейменована на self.';
}

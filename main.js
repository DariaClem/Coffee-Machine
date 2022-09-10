const input = require('sync-input');

function listOfProducts() {
    console.log(`
The coffee machine has:
${water} ml of water
${milk} ml of milk
${soyMilk} ml of soy milk
${coffeeBeans} g of coffee beans
${disposableCups} disposable cups
${straws} straws
${sugar} sugar
${vanilla} vanilla
$${totalMoney} of money
`)
}

function menu() {
    console.log(`
Coffee:
$4 espresso
$7 latte
$6 cappuccino
$8 iced coffee

Extras:
$0.5 Sugar
$1 Milk
$1.5 Soy Milk
`);
}

function takeMoney() {
    console.log(`I gave you $${totalMoney}
`);
    totalMoney = 0;
}

function sorry(product) {
    console.log(`Sorry, not enough ${product}!
`);
}

function enoughProduct() {
    console.log('I have enough resources, making you a coffee!\n');
}

function enoughExtra(extra) {
    console.log(`I have enough resources, adding you extra ${extra}
`);
}

function accessDenied() {
    console.log('Access denied!\n');
}

function fillMachine() {
    water += Number(input(`
Write how many ml of water you want to add:
`));
    milk += Number(input(`Write how many ml of milk you want to add:
`));
    soyMilk += Number(input(`Write how many ml of soy milk you want to add:
`));
    coffeeBeans += Number(input(`Write how many grams of coffee beans you want to add:
`));
    disposableCups += Number(input(`Write how many disposable cups you want to add:
`));
    straws += Number(input(`Write how many straws you want to add:
`));
    sugar += Number(input(`Write how many grams of sugar you want to add:
`));
    vanilla += Number(input(`Write how many ml of vanilla you want to add:
`));
    console.log();
}

function itIsEnoughMilk(quantity) {
    let milkOption = Number(input(`Choose what type of milk do you want: 1 - milk, 2 - soy milk:
`));
    switch (milkOption) {
        case 1:
            if (milk < quantity) {
                sorry('milk');
                return 0;
            } else {
                milk -= quantity;
                return 1;
            }
        case 2:
            if (soyMilk < quantity) {
                sorry('soy milk');
                return 0;
            } else {
                soyMilk -= quantity;
                return 1;
            }
    }
}

function coffeeOption() {
    let option = Number(input(
        '\nWhat do you want to buy? 1 - espresso, 2 - latte, 3 - cappuccino, 4 - iced coffee, back - to main menu:\n'));
    console.log();
    switch (option) {
        case 1:
            if (water < 250) {
                sorry('water');
            } else if (coffeeBeans < 16) {
                sorry('coffee beans');
            } else if (disposableCups === 0) {
                sorry('disposable cups');
            } else {
                enoughProduct();
                water -= 250;
                coffeeBeans -= 16;
                totalMoney += 4;
                disposableCups--;
            }
            break;
        case 2:
            if (water < 350) {
                sorry('water');
            } else if (coffeeBeans < 20) {
                sorry('coffee beans');
            } else if (disposableCups === 0) {
                sorry('disposable cups');
            } else if (itIsEnoughMilk(75)) {
                enoughProduct();
                water -= 350;
                coffeeBeans -= 20;
                totalMoney += 7;
                disposableCups--;
            }
            break;
        case 3:
            if (water < 200) {
                sorry('water');
            } else if (coffeeBeans < 12) {
                sorry('coffee beans');
            } else if (disposableCups === 0) {
                sorry('disposable cups');
            } else if (itIsEnoughMilk(100)) {
                enoughProduct();
                water -= 200;
                coffeeBeans -= 12;
                totalMoney += 6;
                disposableCups--;
            }
            break;
        case 4:
            if (water < 350) {
                sorry('water');
            } else if (coffeeBeans < 20) {
                sorry('coffee beans');
            } else if (disposableCups === 0) {
                sorry('disposable cups');
            } else if (straws === 0) {
                sorry('straws');
            } else if (vanilla < 15) {
                sorry('vanilla');
            } else if (itIsEnoughMilk(150)) {
                enoughProduct();
                water -= 350;
                coffeeBeans -= 20;
                totalMoney += 7;
                disposableCups--;
            }
            break;
        case "back":
            return;
    }
}

function extras() {
    let option = Number(input(
        '\nWhat do you want to buy? 1 - sugar, 2 - milk, 3 - soy milk, back - to main menu:\n'));
    switch (option) {
        case 1:
            if (sugar < 5) {
                sorry('sugar');
            } else {
                enoughExtra('sugar');
                sugar -= 5;
                totalMoney -= 0.5;
            }
            break;
        case 2:
            if (milk < 20) {
                sorry('milk');
            } else {
                enoughExtra('milk');
                milk -= 20;
                totalMoney -= 1;
            }
            break;
        case 3:
            if (soyMilk < 20) {
                sorry('soy milk');
            } else {
                enoughExtra('soy milk');
                soyMilk -= 20;
                totalMoney -= 1.5;
            }
            break;
        case "back":
            return;
    }
}

function user() {
    typeOfUser = Number(input(`Hi! Are you a: 1 - customer, 2 - staff member?
`));

    console.log();
}

let typeOfUser;
let totalMoney = 550;
let water = 400;
let milk = 540;
let coffeeBeans = 120;
let disposableCups = 9;
let sugar = 200;
let soyMilk = 540;
let straws = 9;
let vanilla = 250;

let mainMenu = true;
user();
while (mainMenu) {
    let actionOption = input(`Write action (menu, buy, fill, take, remaining, exit):
`).toLowerCase();
    switch (actionOption) {
        case "menu":
            menu();
            break;
        case "buy":
            let productOption = Number(input(`
What do you want to buy? 1 - coffee, 2 - extras:
`));
            switch (productOption) {
                case 1:
                    coffeeOption();
                    break;
                case 2:
                    extras();
                    break;
            }
            break;
        case "fill":
            if (typeOfUser === 1) {
                accessDenied();
            } else {
                fillMachine();
            }
            break;
        case "take":
            if (typeOfUser === 1) {
                accessDenied();
            } else {
                takeMoney();
            }
            break;
        case "remaining":
            listOfProducts();
            break;
        case "exit":
            mainMenu = false;
            break;
        default:
            console.log(`Please write a valid option
`);
    }
}

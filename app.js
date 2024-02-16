const budgetAmount = Number(document.getElementById('budget-amount').innerText);
const placeTitleHr = document.getElementById('place-title-hr');
const placeTitleContainer = document.getElementById('place-title-container');
const totalCostTxt = document.getElementById('totalCost');
const grandTotal = document.getElementById('grandTotal');
const btnTransport = document.querySelectorAll('#btn-transport button');


let totalCost = 0, restBudget = budgetAmount, transportCost = 0, RemainingTotalCost;

// checking for hide the hr under cart
if(totalCost === 0) {
    placeTitleHr.classList.add('hidden');
}

// get all the button of card
const cardButtons = document.querySelectorAll('.card button');

for(const btn of cardButtons) {
    btn.addEventListener('click', function(e) {
        addBackgroundColor(e.target.parentNode.parentNode, e.target);
    });
}

function addBackgroundColor(card, btn) {
    const amount = Number(card.querySelector('p span').innerText);
    const title = card.querySelector('h3').innerText;

    if(btn.classList.contains('bg-red-500')) {

        totalCost = totalCost - amount;
        RemainingTotalCost = Number(grandTotal.innerText) -  amount;
        restBudget = (budgetAmount + totalCost);
        totalCostTxt.innerText = totalCost;
        grandTotal.innerText = RemainingTotalCost;

        card.classList.remove('bg-green-200');
        btn.classList.remove('bg-red-500');
        btn.innerText = 'Add to Cart';

        const child = document.getElementById(title);
        placeTitleContainer.removeChild(child)
    }
    else {
        if(restBudget >= amount) {
            totalCost += amount;
            restBudget = (budgetAmount - totalCost);
    
            card.classList.add('bg-green-200');
            btn.classList.add('bg-red-500');
            btn.innerText = 'Remove';
    
            const list = document.createElement('p');
            list.innerText = `${title} - ${amount} $`;
            list.setAttribute('id', title);
            placeTitleContainer.appendChild(list);

            totalCostTxt.innerText = totalCost;
            grandTotal.innerText = amount + Number(grandTotal.innerText);
        }
        else {
            alert("You dont't have enough amount");
        }
    }
    
    if(totalCost > 0) {
        placeTitleHr.classList.remove('hidden');
    }

    if(totalCost === 0) {
        placeTitleHr.classList.add('hidden');
        grandTotal.innerText = 0;
    }
}


for(const transpot of btnTransport) {
    transpot.addEventListener('click', function(e) {
        if(totalCost > 0) {

            const transportAmountArray = e.target.innerText.split(' ');
            transpotAmout = Number(transportAmountArray[1]);

            transportCost = totalCost + transpotAmout;
            grandTotal.innerText = transportCost;
        }
    })
}
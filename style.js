/*
What this does?
1. add items to storage dynamically by entering text and clicking add item
2. display the added items
3. persist the items on page reload
4. toggle check boxes on reload
5. add clear all button to clear all items on the list
6. add check all button to check all items present on the list
add uncheck all button to un-check all the items present on the list
*/

/*
get required elements
*/

const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const clearAll = document.querySelector('[name=clearAll]');
const checkAll = document.querySelector('[name=checkAll]');
const uncheckAll = document.querySelector('[name=uncheckAll]');
const items = JSON.parse(localStorage.getItem('items')) || [];

//functions
function addItem(e) {
    e.preventDefault();
    const text = (this.querySelector('[name=item]')).value;
    const item = {
        text,
        done: false
    };

    items.push(item);
    populateList(items, itemsList);

    //persist the items on page reload

    localStorage.setItem('items', JSON.stringify(items));
    this.reset();
}

//display the added items to the storage list

function populateList(plates = [], platesList) {
    platesList.innerHTML = 'Loading Storage...';
    if (!plates.length) {
        platesList.innerHTML = 'Please add some items first';
    } else {
        //else show the items in the list
        platesList.innerHTML = plates.map((plate, i) => {
            return `
                <li>
                <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''} />
                <label for="item${i}">${plate.text}</label>
                </li>
                `;
            
        }).join('');
    }
}
//toggle checkboxes on click
function toggleDone(e) {
    if(!e.target.matches('input')) return; //skip this unless it's an input

    const el =e.target;
    const index = el.dataset.index;
    items[index].done = !items[index].done;
    bindList(items);
}

//clear all items on the list

function clearAllItems() {
    items.length = 0;
    bindList(items);
}

//check and uncheck all the items present on the list

function toggleAllItems(status) {
    const checkboxes = document.querySelectorAll('.plates input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = items[checkbox.dataset.index].done = status;
    });
    bindList(items);
}

//Bind the storage list based on the array data passed 
function bindList(data) {
    localStorage.setItem('items',  JSON.stringify(data));
    populateList(data, itemsList);
}


//the event listeners

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);
clearAll.addEventListener('click', clearAllItems);
checkAll.addEventListener('clcik', () => toggleAllItems(true));
uncheckAll.addEventListener('click', () => toggleAllItems(false));

//call the main function on page load

populateList(items, itemsList);

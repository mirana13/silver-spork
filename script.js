const firstName = document.getElementById("firstname");  // element with id firstname
const startingBid = document.getElementById("startingbid"); // element with id startingbid
const education = document.getElementById("education"); // element with id education
const networth = document.getElementById("networth"); // element with id education
const skills = document.getElementsByClassName("skills"); // HTMLCollection (like an array of elements, but not an actual array)
const age = document.getElementsByName("age");
const button = document.getElementById("submit");
const love_letter = document.getElementById("love_letter");

const calculate = () => {
    let name = firstName.value; // name of the groom/bride
    let price = startingBid.value; // turns your starting bid string into number
    let letter = love_letter.value;
    if (name != "" && price) { 
        price = Number(price);
        price = getNewPrice(price, education);
        price = getNewPrice(price, networth);

        getCheckboxValuesFilterReduce(skills, price);
        console.log(age);
        getRadioValue(age, price);

        let person = {
            fullName: name,
            finalPrice: price,
            loveLetter: letter
        }
        document.getElementById("result").innerHTML = `The price for ${person.fullName} is ${person.finalPrice}. Your love letter is ${person.loveLetter}`;
    }
    else {
        alert("Name and starting bid cannot be empty");
    }
}

const getNewPrice = (price, criteria) => {
    return price * Number(criteria.value);
}

/* if you will set an attribute class="skills" for each input checkbox and use this selector 
--> document.getElementsByClassName("skills"), it will return you HTMLCollection that you can pass to this function as an argument*/
const getCheckboxValuesForLoop = (html_collection, price) => { // Check this one, it should work for values with coefficients and with integers
	for (let i=0; i < html_collection.length; i++) {  
		if (html_collection[i].checked && Number.isInteger(Number(html_collection[i].value))) {
			price = price + Number(html_collection[i].value)
		}
		else if (html_collection[i].checked && !Number.isInteger(html_collection[i].value)) {
			price = price * Number(html_collection[i].value)
		}
	}
	return price;
}

/* if you will set an attribute class="skills" for each input checkbox and use this selector 
--> document.getElementsByClassName("skills"), it will return you HTMLCollection that you can pass to this function as an argument*/
const getCheckboxValuesFilterReduce = (html_collection, price) => { // create a function that accepts your HTMLCollection of elements and the current price
    let list = Array.from(html_collection).filter(filteration) // this method turn your HTMLCollection into array
    let result = list.reduce(reducer, price)
    return result;
}

const reducer = (accumulator, item) => {
    return accumulator + Number(item.value);
}
const filteration = (item) => {
    return item.checked;
}

/* if you will set an attribute name="age" for each input radio and use this selector 
--> document.getElementsByName("age"), it will return you NodeList that you can pass to this function as an argument*/
const getRadioValue = (node_list, price) => {  
    node_list.forEach(item => {
        if (item.checked) {
            price = price * Number(item.value)
        }
    })
    return price;
}

button.addEventListener("click", calculate)



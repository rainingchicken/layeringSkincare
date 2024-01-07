var n = 1; //the nth number of div
//dynamically create input boxes
function addElement() {
  n++; //increments n as new elements are created

  //create div
  const newdiv = document.createElement("div");
  newdiv.setAttribute("name", "divname");
  newdiv.setAttribute("id", "ddiv" + n);

  //create input box
  const newinput = document.createElement("input");
  newinput.setAttribute("type", "text");
  newinput.setAttribute("name", "inputbox"); //sets name="inputbox" very important!
  newinput.onblur = autocomplete(newinput, product); //applys autocomplete function to current created input

  //create delete button to remove input and div
  const deletebtn = document.createElement("button");
  deletebtn.setAttribute("id", "" + n + "");
  deletebtn.setAttribute("content", "test content");
  deletebtn.textContent = "DELETE";
  deletebtn.setAttribute("type", "button");
  deletebtn.setAttribute("onclick", "remove(this)"); //when click delete div and everything in it

  //put created elements in newdiv so they are grouped together and will easily deleted
  newdiv.appendChild(newinput);
  newdiv.appendChild(deletebtn);

  document.getElementById("div1").appendChild(newdiv); //places created group in div1
}

//remove element at n
function remove(button) {
  let n = button.id;
  let ddiv = document.getElementById("ddiv" + n);
  ddiv.remove(); //specificelement.remove()
}

//starts with at least two products to compare
addElement();
addElement();

//////////////////////////////////////////////////
//autocomplete
//https://www.educative.io/answers/how-to-add-autocomplete-to-an-input-field-in-javascript

function autocomplete(input, list) {
  //Add an event listener to compare the input value with all countries
  input.addEventListener("input", function () {
    //Close the existing list if it is open
    closeList();

    //If the input is empty, exit the function
    if (!this.value) return;

    //Create a suggestions <div> and add it to the element containing the input field
    suggestions = document.createElement("div");
    suggestions.setAttribute("id", "suggestions");
    this.parentNode.appendChild(suggestions);

    //Iterate through all entries in the list and find matches
    for (let i = 0; i < list.length; i++) {
      if (list[i].toUpperCase().includes(this.value.toUpperCase())) {
        //If a match is found, create a suggestion <div> and add it to the suggestions <div>
        suggestion = document.createElement("div");
        suggestion.innerHTML = list[i];
        suggestion.style.padding = "5px";

        suggestion.addEventListener("click", function () {
          input.value = this.innerHTML;
          closeList();
        });
        suggestion.style.cursor = "pointer";

        suggestions.appendChild(suggestion);
      }
    }
  });

  function closeList() {
    let suggestions = document.getElementById("suggestions");
    if (suggestions) suggestions.parentNode.removeChild(suggestions);
  }
}

//////////////////////////////////////////////////

//get list of input boxes and for each, apply autocomplete function
document.getElementsByName("inputbox").forEach((element) => {
  autocomplete(element, product);
});

function submitcheck() {
  //get inputs
  var inputArr = [];
  document.getElementsByName("inputbox").forEach((element) => {
    //for each input boxes
    let arrayelement = element.value;
    inputArr.push(arrayelement); //put strings into array
  });

  //since form gets reset where everything is earsed inputs will be stored in id="inputs"
  document.getElementById("inputs").innerHTML = inputArr;

  var indexes = []; //to get ingredient at index
  inputArr.forEach((arrElement) => {
    product.forEach((prodElement) => {
      //for each array element
      //compare it to product list
      if (arrElement == prodElement) {
        let arrIndex = product.indexOf(prodElement);
        indexes.push(arrIndex);
      }
    });
  });

  var layer = []; //array of ingredient list
  indexes.forEach((i) => {
    let ingredientlist = ingredient[i];
    layer.push(ingredientlist);
  });

  //flags for each ingredients that one should take caution when using
  var retinol = false;
  var vitc = false;
  var benzoylperoxide = 0;
  var salicylicacid = 0;
  var aha = 0;
  var bha = 0;
  var niacinamide = 0;
  var hydroquinone = 0;
  layer.forEach((element) => {
    if (
      element.includes("retinol") ||
      element.includes("retinyl palmitate ") ||
      element.includes("retinyl acetate") ||
      element.includes("retinyl linoleate")
    ) {
      retinol = true;
    } else if (element.includes("benzoyl peroxide")) {
      benzoylperoxide = true;
    } else if (
      element.includes("vitamin c") ||
      element.includes("ascorbic acid") ||
      element.includes("ascorbyl glucoside") ||
      element.includes("vitamin C glucoside") ||
      element.includes("vitamin CG")
    ) {
      vitc = true;
    } else if (element.includes(" salicylic acid")) {
      salicylicacid = true;
    } else if (
      element.includes("lactic acid") ||
      element.includes("glycolic acid") ||
      element.includes("malic acid") ||
      element.includes("citric acid") ||
      element.includes("tartaric acid")
    ) {
      aha = true;
    } else if (
      element.includes("salicylic acid") ||
      element.includes("beta hydroxybutanoic acid") ||
      element.includes("tropic acid") ||
      element.includes("trethocanic acid")
    ) {
      bha = true;
    } else if (
      element.includes("niacinamide") ||
      element.includes("vitamin b3") ||
      element.includes("nicotinamide")
    ) {
      niacinamide = true;
    } else if (element.includes("hydroquinone ")) {
      hydroquinone = true;
    }
  });

  //checks conditions
  if (retinol && benzoylperoxide) {
    document.getElementById("result").innerHTML =
      "Not recommended! Products contain both retinol and benzoyl peroxide";
  } else if (retinol && vitc) {
    document.getElementById("result").innerHTML =
      "Not recommended! Products contain both retinol and vitamin C";
  } else if (retinol && salicylicacid) {
    document.getElementById("result").innerHTML =
      "Not recommended! Products contain both retinol and salicylic acid";
  } else if (retinol && aha) {
    document.getElementById("result").innerHTML =
      "Not recommended! Products contain both retinol and alpha hydroxy acids";
  } else if (retinol && bha) {
    document.getElementById("result").innerHTML =
      "Not recommended! Products contain both retinol and beta hydroxy acids";
  } else if (vitc && aha) {
    document.getElementById("result").innerHTML =
      "Not recommended! Products contain both vitamin C and alpha hydroxy acids";
  } else if (vitc && bha) {
    document.getElementById("result").innerHTML =
      "Not recommended! Products contain both vitamin C and beta hydroxy acids";
  } else if (vitc && benzoylperoxide) {
    document.getElementById("result").innerHTML =
      "Not recommended! Products contain both vitamin C and benzoyl peroxide";
  } else if (niacinamide && aha) {
    document.getElementById("result").innerHTML =
      "Not recommended! Products contain both niacinamide and alpha hydroxy acids";
  } else if (niacinamide && bha) {
    document.getElementById("result").innerHTML =
      "Not recommended! Products contain both niacinamide and beta hydroxy acids";
  } else if (hydroquinone && benzoylperoxide) {
    document.getElementById("result").innerHTML =
      "Not recommended! Products contain both hydroquinone and benzoylperoxide";
  } else {
    document.getElementById("result").innerHTML = "Everything looks good!";
  }

  //reset when click submit
  document.getElementById("myform").reset();
  retinol = false;
  vitc = false;
  benzoylperoxide = 0;
  salicylicacid = 0;
  aha = 0;
  bha = 0;
  niacinamide = 0;
  hydroquinone = 0;
}

// Get the button:
let mybutton = document.getElementById("topbutton");

//when scrolling detected
addEventListener("scroll", (event) => {
  if (window.scrollY > 20) {
    //if scrolled pass current px
    mybutton.style.display = "block"; //displays button to go to top
  } else {
    mybutton.style.display = "none"; //if near top of screen no need to show button
  }
});

// when click scroll to the top of the document
function scrolltotop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

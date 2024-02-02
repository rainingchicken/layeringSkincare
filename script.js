var n = 0; //the nth number of div
//dynamically create input boxes
function addElement() {
  n++; //increments n as new elements are created

  //create div
  const newdiv = document.createElement("div");
  newdiv.setAttribute("name", "divname");
  newdiv.setAttribute("class", "divnames");
  newdiv.setAttribute("id", "ddiv" + n);

  //create input box
  const newinput = document.createElement("input");
  newinput.setAttribute("type", "text");
  newinput.setAttribute("name", "inputbox"); //sets name="inputbox" very important!
  newinput.onblur = autocomplete(newinput, product); //applys autocomplete function to current created input

  //create collapsible element that shows ingredient list
  const ingredientbox = document.createElement("button");
  ingredientbox.setAttribute("id", "" + n + "");
  ingredientbox.setAttribute("type", "button");
  ingredientbox.setAttribute("class", "collapsebox");
  ingredientbox.setAttribute("onclick", "collapse(this)");
  ingredientbox.setAttribute(
    "title",
    "Click to show or hide ingredients of product"
  );
  ingredientbox.textContent = "TOGGLE SHOW/HIDE INGREDIENTS";

  //create div that shows when pressed button
  const collapsediv = document.createElement("div");
  collapsediv.setAttribute("class", "collapse");
  collapsediv.setAttribute("id", "collapsediv" + n);
  collapsediv.innerHTML = "List of ingredients will be shown here";

  //create delete button to remove input and div
  const deletebtn = document.createElement("button");
  deletebtn.setAttribute("id", "" + n + "");
  deletebtn.setAttribute("content", "test content");
  deletebtn.textContent = "DELETE";
  deletebtn.setAttribute("type", "button");
  deletebtn.setAttribute("onclick", "remove(this)"); //when click delete div and everything in it
  deletebtn.setAttribute("title", "Delete product");
  deletebtn.setAttribute("class", "deletebtn");

  //put created elements in newdiv so they are grouped together and will easily deleted
  newdiv.appendChild(newinput);
  newdiv.appendChild(deletebtn);
  newdiv.appendChild(ingredientbox);
  newdiv.appendChild(collapsediv);

  document.getElementById("div1").appendChild(newdiv); //places created group in div1
}

//remove element at n
function remove(button) {
  let n = button.id;
  let ddiv = document.getElementById("ddiv" + n);
  ddiv.remove(); //specificelement.remove()
}

//function to hide and unhide ingredient list
function collapse(button) {
  let n = button.id;
  let collapsediv = document.getElementById("collapsediv" + n);
  //toggles display on and off to show and hide collapsediv
  if (collapsediv.style.display === "block") {
    collapsediv.style.display = "none";
  } else {
    collapsediv.style.display = "block";
  }
}

//starts with at least two products to compare
addElement();
addElement();

//////////////////////////////////////////////////
//autocomplete
//https://www.educative.io/answers/how-to-add-autocomplete-to-an-input-field-in-javascript
//parameters are input elements and array of autocomplete suggestions
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
        suggestion.style.padding = "7px";
        suggestion.style.border = "solid";
        suggestion.style.borderWidth = "thin";

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

  var indexes = []; //to get ingredient at index
  inputArr.forEach((arrElement) => {
    //create collapsible div that to show and hide ingredient list
    product.forEach((prodElement) => {
      //for each array element
      //compare it to product list
      if (arrElement == prodElement) {
        let arrIndex = product.indexOf(prodElement);
        indexes.push(arrIndex);
      }
    });
  });
  var itemnum = 0; //counts number of product items
  var layer = []; //array of ingredient list
  indexes.forEach((i) => {
    itemnum++;
    let ingredientlist = ingredient[i];
    var showningredient = document.getElementById("collapsediv" + itemnum);
    //restart to first itemnum and go through each element again to combat skipping id from deletion or multiple addition of inputbox
    for (let j = 0; j < itemnum; j++) {
      if (showningredient == null) {
        //keep incrementing itemnum until find an existing collapse div
        itemnum++;
        showningredient = document.getElementById("collapsediv" + itemnum);
      }
    }
    showningredient.innerHTML = ingredientlist; //set ingredient to text of collapsediv
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
      element.includes("retinyl palmitate") ||
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
      element.includes("vitamin c glucoside") ||
      element.includes("vitamin cg")
    ) {
      vitc = true;
    } else if (element.includes("salicylic acid")) {
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
    } else if (element.includes("hydroquinone")) {
      hydroquinone = true;
    }
  });

  var warning = [];
  //checks conditions
  if (
    retinol ||
    vitc ||
    benzoylperoxide ||
    salicylicacid ||
    aha ||
    bha ||
    niacinamide ||
    hydroquinone
  ) {
    if (retinol && benzoylperoxide) {
      warning.push(" retinol and benzoyl peroxide");
    }
    if (retinol && vitc) {
      warning.push(" retinol and vitamin C");
    }
    if (retinol && salicylicacid) {
      warning.push(" retinol and salicylic acid");
    }
    if (retinol && aha) {
      warning.push(" retinol and alpha hydroxy acids");
    }
    if (retinol && bha) {
      warning.push(" retinol and beta hydroxy acids");
    }
    if (vitc && aha) {
      warning.push(" vitamin C and alpha hydroxy acids");
    }
    if (vitc && bha) {
      warning.push(" vitamin C and beta hydroxy acids");
    }
    if (vitc && benzoylperoxide) {
      warning.push(" vitamin C and benzoyl peroxide");
    }
    if (niacinamide && aha) {
      warning.push(" niacinamide and alpha hydroxy acids");
    }
    if (niacinamide && bha) {
      warning.push(" niacinamide and beta hydroxy acids");
    }
    if (hydroquinone && benzoylperoxide) {
      warning.push(" hydroquinone and benzoyl peroxide");
    }
  }

  //recommendation status
  if (warning.length > 0) {
    document.getElementById("result").innerHTML =
      "Not recommended! Products contain the following combination(s):" +
      warning;
    //if products are not recommended together show ingredients to help user choose which to keep
    for (
      let ingredientbuttons = 0;
      ingredientbuttons < document.getElementsByClassName("collapsebox").length;
      ingredientbuttons++
    ) {
      document.getElementsByClassName("collapse")[
        ingredientbuttons
      ].style.display = "block";
    }
  } else {
    document.getElementById("result").innerHTML = "Everything looks good!";
    //if ingredients dont contradict each other then hide ingredient list
    for (
      let ingredientbuttons = 0;
      ingredientbuttons < document.getElementsByClassName("collapsebox").length;
      ingredientbuttons++
    ) {
      document.getElementsByClassName("collapse")[
        ingredientbuttons
      ].style.display = "none";
    }
  }

  //array of active ingredients that tend to not mix well together
  var keyingredient = [
    "retinol",
    "retinyl palmitate",
    "retinyl acetate",
    "retinyl linoleate",
    "benzoyl peroxide",
    "vitamin c",
    "ascorbic acid",
    "ascorbyl glucoside",
    "vitamin c glucoside",
    "vitamin cg",
    "salicylic acid",
    "lactic acid",
    "glycolic acid",
    "malic acid",
    "citric acid",
    "tartaric acid",
    "beta hydroxybutanoic acid",
    "tropic acid",
    "trethocanic acid",
    "niacinamide",
    "vitamin b3",
    "nicotinamide",
    "hydroquinone",
  ];

  //count number of items in page and go through each one to highlight the problematic ingredients
  var itemnum2;
  for (itemnum2 = 1; itemnum2 <= itemnum; itemnum2++) {
    let elementboxes = document.getElementById("collapsediv" + itemnum2);
    if (elementboxes != null) {
      for (let i = 0; i < keyingredient.length; i++) {
        elementboxes.innerHTML = elementboxes.innerHTML.replaceAll(
          keyingredient[i],
          "<span style='color:#e0829d;'>" + keyingredient[i] + "</span>"
        );
      }
    }
  }

  //reset when click submit

  retinol = false;
  vitc = false;
  benzoylperoxide = 0;
  salicylicacid = 0;
  aha = 0;
  bha = 0;
  niacinamide = 0;
  hydroquinone = 0;
  itemnum = 0;
  itemnum2 = 1;
  indexes = [];
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
  window.scrollTo({ top: 0 });
}

// Get the header
var header = document.getElementById("myheader");

var previousscroll = window.scrollY;

//when scrolling detected
addEventListener("scroll", (event) => {
  var currentscroll = window.scrollY;
  //if previous scroll Y is greater than current scroll Y this means user scrolled up
  if (previousscroll > currentscroll) {
    header.style.position = "sticky"; //change css header {positition:sticky} which shows header on top of screen
  } else {
    header.style.position = "static"; //puts header back on top of page
  }
  previousscroll = currentscroll;
});

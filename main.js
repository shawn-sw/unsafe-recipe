import { ingredients as ingredientData } from './ingredients.js';

const ingredientContainer = document.getElementById('ingredients');
const methodContainer = document.getElementById('methods');
const recipeOutput = document.getElementById('recipeOutput');
const styleSelector = document.getElementById('style');
const generateButton = document.getElementById('generateButton');
const resetButton = document.getElementById('resetButton');
const addIngredientButton = document.getElementById('addIngredientButton');
const customIngredientInput = document.getElementById('customIngredient');
const loadingAnimation = document.getElementById('loadingAnimation');
const saveImageButton = document.getElementById('saveImageButton');
const recipeCanvas = document.getElementById('recipeCanvas');

const defaultMethods = [
  "Microwave", "Deep Fry", "Raw / No Cooking",
  "Steam", "Bake", "Sous Vide"
];

let selectedIngredients = [];
let selectedMethod = null;

const gifList = ["loading1.gif", "loading2.gif", "loading3.gif"];
const preloadedGifs = gifList.map(src => {
  const img = new Image();
  img.src = src;
  return img;
});

function renderIngredients() {
  ingredientContainer.innerHTML = '';
  ingredientData.forEach((item, index) => {
    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.value = item.name;
    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        if (selectedIngredients.length >= 5) {
          checkbox.checked = false;
          alert("You can only select up to 5 ingredients.");
        } else {
          selectedIngredients.push(item.name);
        }
      } else {
        selectedIngredients = selectedIngredients.filter(i => i !== item.name);
      }
    });
    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(item.name));
    ingredientContainer.appendChild(label);
  });
}

function renderMethods() {
  methodContainer.innerHTML = '';
  defaultMethods.forEach(method => {
    const label = document.createElement('label');
    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'method';
    radio.value = method;
    radio.addEventListener('change', () => {
      selectedMethod = method;
    });
    label.appendChild(radio);
    label.appendChild(document.createTextNode(method));
    methodContainer.appendChild(label);
  });
}

addIngredientButton.addEventListener('click', () => {
  const name = customIngredientInput.value.trim();
  if (name && !selectedIngredients.includes(name)) {
    if (selectedIngredients.length >= 5) {
      alert("You can only select up to 5 ingredients.");
      return;
    }
    selectedIngredients.push(name);
    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = true;
    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        selectedIngredients.push(name);
      } else {
        selectedIngredients = selectedIngredients.filter(i => i !== name);
      }
    });
    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(name));
    ingredientContainer.appendChild(label);
    customIngredientInput.value = '';
  }
});

resetButton.addEventListener('click', () => {
  selectedIngredients = [];
  selectedMethod = null;
  renderIngredients();
  renderMethods();
  recipeOutput.innerText = '';
  recipeOutput.style.display = 'block';
  loadingAnimation.style.display = 'none';
});

generateButton.addEventListener('click', () => {
  const gifList = ["loading.gif", "loading2.gif", "loading3.gif"];
  const randomGif = gifList[Math.floor(Math.random() * gifList.length)];
  document.getElementById("loadingGif").src = randomGif;

  recipeOutput.style.display = 'none';
  loadingAnimation.style.display = 'block';

  setTimeout(() => {
    loadingAnimation.style.display = 'none';
    recipeOutput.style.display = 'block';
    generateRecipe();
  }, 2000);
});

function generateRecipe() {
  if (selectedIngredients.length === 0 || !selectedMethod) {
    alert("Please select ingredients and a method.");
    return;
  }

  const time = document.getElementById('time').value;
  const style = styleSelector.value;

  let output = "";

  // Style variations
  const stylePrefix = {
    default: ["Take", "Then", "Finally"],
    lab: ["Combine", "Agitate", "Stabilize with"],
    hell: ["Toss", "Incinerate", "Curse it using"],
    kids: ["Hug", "Dance with", "Tickle it using"]
  };

  const prefix = stylePrefix[style] || stylePrefix.default;
  const ingList = selectedIngredients.join(", ");
  const garnish = ["lava salt", "spicy ice cream", "rust flakes", "golden glue", "frozen mayo"];

  output += `Step 1: ${prefix[0]} ${ingList}.\n`;
  output += `Step 2: ${prefix[1]} it with ${selectedMethod} for ${time} minutes.\n`;
  output += `Step 3: ${prefix[2]} ${garnish[Math.floor(Math.random() * garnish.length)]}.\n\n`;

  // Random scores
  const risk = "🔥".repeat(Math.floor(Math.random() * 4) + 1);
  const tox = Math.floor(Math.random() * 10) + 1;
  const taste = Math.floor(Math.random() * 21) - 10;

  output += `✨ Risk Level: ${risk}\n`;
  output += `☣ Toxicity: ${tox}/10\n`;
  output += `🍽 Taste Score: ${taste}/10`;

  recipeOutput.innerText = output;
}

saveImageButton.addEventListener('click', () => {
  const ctx = recipeCanvas.getContext('2d');
  ctx.fillStyle = "#fff9f0";
  ctx.fillRect(0, 0, recipeCanvas.width, recipeCanvas.height);
  ctx.fillStyle = "#333";
  ctx.font = "16px Arial";
  const lines = recipeOutput.innerText.split('\n');
  lines.forEach((line, i) => {
    ctx.fillText(line, 20, 30 + i * 24);
  });
  const link = document.createElement('a');
  link.download = 'recipe.png';
  link.href = recipeCanvas.toDataURL();
  link.click();
});

renderIngredients();
renderMethods();

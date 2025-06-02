import { ingredients as ingredientData } from './ingredients.js';

const defaultMethods = [
  "Microwave", "Deep Fry", "Raw / No Cooking",
  "Steam", "Bake", "Sous Vide", "Grilled with Candle Flame"
];

const ingredientsDiv = document.getElementById("ingredients");
const methodsDiv = document.getElementById("methods");

function populateIngredients(list) {
  ingredientsDiv.innerHTML = "";
  list.forEach(({ name }) => {
    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = name;
    checkbox.name = "ingredient";
    label.appendChild(checkbox);
    label.append(" " + name);
    ingredientsDiv.appendChild(label);
  });
}

function populateMethods(list) {
  methodsDiv.innerHTML = "";
  list.forEach(item => {
    const label = document.createElement("label");
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.value = item;
    radio.name = "method";
    label.appendChild(radio);
    label.append(" " + item);
    methodsDiv.appendChild(label);
  });
}

function addCustomIngredient() {
  const input = document.getElementById("customIngredient");
  const newIngredient = input.value.trim();
  if (!newIngredient) return alert("Please enter an ingredient name.");

  const exists = Array.from(document.querySelectorAll('input[name="ingredient"]'))
    .some(el => el.value.toLowerCase() === newIngredient.toLowerCase());
  if (exists) return alert("This ingredient already exists.");

  const label = document.createElement("label");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.value = newIngredient;
  checkbox.name = "ingredient";
  label.appendChild(checkbox);
  label.append(" " + newIngredient);
  ingredientsDiv.appendChild(label);

  input.value = "";
}

function generateRecipe() {
  const selected = Array.from(document.querySelectorAll('input[name="ingredient"]:checked'));
  const selectedIngredients = selected.map(input => input.value);
  if (selectedIngredients.length === 0 || selectedIngredients.length > 5) {
    return alert("Please select 1 to 5 ingredients.");
  }

  const methodInput = document.querySelector('input[name="method"]:checked');
  if (!methodInput) return alert("Please choose a cooking method.");

  const method = methodInput.value;
  const time = parseInt(document.getElementById("time").value) || 30;
  const style = document.getElementById("style").value;

  const typeMap = new Map(ingredientData.map(i => [i.name, i.type]));
  const typesUsed = selectedIngredients.map(name => typeMap.get(name) || 'unknown');
  const mainCount = typesUsed.filter(t => t === 'main').length;
  if (mainCount > 1) return alert("Only one main ingredient allowed.");

  const output = createRecipeText(selectedIngredients, method, time, style);
  document.getElementById("recipeOutput").innerText = output;
}

function createRecipeText(ingredients, method, time, style) {
  const styleSets = {
    default: {
      actions: ["mash", "blend", "sauté", "overheat", "ferment"],
      garnishes: ["toothpaste foam", "soda glaze", "shrimp shells"]
    },
    lab: {
      actions: ["chemically synthesize", "cryofuse", "electroshock", "mutate"],
      garnishes: ["reagent X", "plasma dust", "irradiated marshmallow"]
    },
    hell: {
      actions: ["burn", "curse", "incinerate", "sacrifice"],
      garnishes: ["lava salt", "devil's breath", "blood pepper flakes"]
    },
    kids: {
      actions: ["rainbow-mix", "glitter-smash", "gummy-squish"],
      garnishes: ["gummy bears", "jelly sprinkles", "bubblegum drizzle"]
    }
  };

  const set = styleSets[style] || styleSets.default;

  const step1 = `Step 1: Take ${ingredients.join(", ")} and ${randomItem(set.actions)} them.`;
  const step2 = `Step 2: Then ${method.toLowerCase()} it for exactly ${time} minutes.`;
  const step3 = `Step 3: Finally, garnish with ${randomItem(set.garnishes)}.`;

  const toxicity = ingredients.filter(i => /rotten|raw|moldy|toothpaste/i.test(i)).length * 2;
  const taste = Math.floor(Math.random() * 11) - 5;
  const risk = toxicity > 6 ? "🔥🔥🔥 (HIGH)" : toxicity > 2 ? "🔥🔥 (MEDIUM)" : "🔥 (LOW)";

  const chaos = ingredients.includes("Toothpaste") && ingredients.includes("Shrimp Shells");
  if (chaos) {
    return `☠ SYSTEM OVERLOAD: INGREDIENTS UNSTABLE ☠\nBl3nD th3 pøíßøns w1th f1re... Do NoT CoOk...`;
  }

  return `${step1}\n${step2}\n${step3}\n\n✨ Risk Level: ${risk}\n☣ Toxicity: ${toxicity}/10\n🍽 Taste Score: ${taste}/10`;
}

function resetForm() {
  document.querySelectorAll('input[name="ingredient"]').forEach(cb => cb.checked = false);
  document.querySelectorAll('input[name="method"]').forEach(rb => rb.checked = false);
  document.getElementById("time").value = 30;
  document.getElementById("style").value = "default";
  document.getElementById("recipeOutput").innerText = "";
}

function randomItem(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function saveRecipeImage() {
  const text = document.getElementById("recipeOutput").innerText;
  if (!text) return alert("Please generate a recipe first.");

  const canvas = document.getElementById("recipeCanvas");
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#d9534f";
  ctx.font = "bold 20px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("🔥 Unsafe Recipe", canvas.width / 2, 40);
  ctx.textAlign = "start";

  ctx.strokeStyle = "#ccc";
  ctx.beginPath();
  ctx.moveTo(20, 50);
  ctx.lineTo(canvas.width - 20, 50);
  ctx.stroke();

  ctx.fillStyle = "#000";
  ctx.font = "16px monospace";
  wrapText(ctx, text, 20, 70, 470, 22);

  const link = document.createElement("a");
  link.download = "unsafe-recipe.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const lines = text.split(/\n/g);
  for (const paragraph of lines) {
    const words = paragraph.split(' ');
    let line = '';
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && n > 0) {
        ctx.fillText(line, x, y);
        line = words[n] + ' ';
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, x, y);
    y += lineHeight + 5;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  populateIngredients(ingredientData);
  populateMethods(defaultMethods);
  document.getElementById("addIngredientButton").addEventListener("click", addCustomIngredient);
  document.getElementById("generateButton").addEventListener("click", generateRecipe);
  document.getElementById("resetButton").addEventListener("click", resetForm);
  document.getElementById("saveImageButton").addEventListener("click", saveRecipeImage);
});

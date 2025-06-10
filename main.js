import { ingredients as ingredientData } from './ingredients.js';

const defaultMethods = [
  "Microwave", "Deep Fry", "Raw / No Cooking",
  "Steam", "Bake", "Sous Vide", "Grilled with Candle Flame"
];

const ingredientsDiv = document.getElementById("ingredients");
const methodsDiv = document.getElementById("methods");

const gifList = ["loading1.gif", "loading2.gif", "loading3.gif"];
const preloadedGifs = gifList.map(src => {
  const img = new Image();
  img.src = src;
  return img;
});

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
/*
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
*/


function createRecipeText(ingredients, method, time, style) {
  const styleSets = {
    default: {
      actions: ["mash", "blend", "sauté", "overheat", "ferment"],
      garnishes: ["toothpaste foam", "soda glaze", "shrimp shells"],
      mixes: ["stir into a thick paste", "swirl rapidly", "fold gently", "smash repeatedly", "beat until foamy"],
      modifiers: ["with lightning speed", "using ancient technique", "while blindfolded", "without mercy", "with suspicious confidence"],
      preps: ["cleanse with vinegar", "slice into thin strips", "marinate in mystery oil", "rub with garlic", "cool under running water"],
      finishes: ["freeze-dry instantly", "press into a mold", "flash-evaporate", "caramelize quickly", "plate like fine art"]
    },
    lab: {
      actions: ["chemically synthesize", "cryofuse", "electroshock", "mutate", "recode"],
      garnishes: ["reagent X", "plasma dust", "irradiated marshmallow", "glow syrup", "nano-spice"],
      mixes: ["recombine at quantum level", "merge molecules chaotically", "stir with magnetic field", "oscillate in reactor", "vortex blend"],
      modifiers: ["under 3000 volts", "in a centrifuge", "at absolute zero", "via bio-replication", "through wormhole distortion"],
      preps: ["decontaminate using acid", "slice with laser beam", "sterilize with UV", "analyze under microscope", "inject RNA sequence"],
      finishes: ["suspend in anti-gravity field", "freeze in nitrogen bath", "shock-solidify", "encase in carbon shell", "atomize"]
    },
    hell: {
      actions: ["sear", "torch", "flash-fry", "pan-blast", "wok-toss"],
      garnishes: ["charred lemon zest", "pepper smoke", "crispy shallots", "hot chili threads", "black garlic oil"],
      mixes: ["slam together in scorching wok", "toss mid-air with steel pan", "whisk while shouting", "fold under pressure", "combine on flaming surface"],
      modifiers: ["while the fire alarm blares", "with one hand tied", "during chef's scream", "in 90 seconds", "on a countdown timer"],
      preps: ["peel in under 5 seconds", "chop at lightning speed", "clean while it's still burning", "marinate under shouting", "season aggressively"],
      finishes: ["plate dramatically", "slam onto hot metal tray", "torch top with culinary rage", "shower with oil splash", "present with burnt flair"]
    },
    kids: {
      actions: ["rainbow-mix", "glitter-smash", "gummy-squish", "slime-fold", "jelly-pop"],
      garnishes: ["gummy bears", "jelly sprinkles", "bubblegum drizzle", "cotton candy fog", "choco eyeballs"],
      mixes: ["whip into rainbow tornado", "blend in toy blender", "shake with squeaky hands", "squash in bento box", "slam with plush hammer"],
      modifiers: ["while giggling", "under blanket fort", "after pillow fight", "while jumping", "with rainbow gloves"],
      preps: ["dip in syrup river", "cut with safety scissors", "draw faces on it", "cool in freezer playground", "cover with stickers"],
      finishes: ["wrap with marshmallow tape", "launch with glitter cannon", "trap in jelly dome", "seal in snack box", "lick and swirl"]
    },
    royal: {
      actions: ["caramelize", "gold-flame", "whip elegantly", "triple-glaze", "infuse with truffle"],
      garnishes: ["gold dust", "rose petals", "diamond sugar", "saffron threads", "caviar glaze"],
      mixes: ["fold with silver spoon", "blend at ballroom speed", "churn with grace", "mix to royal rhythm", "temper with charm"],
      modifiers: ["while waltzing", "in presence of royalty", "on silk tablecloth", "with orchestral music", "after bowing thrice"],
      preps: ["trim with jewel knife", "polish each slice", "soak in wine bath", "dry between silk sheets", "brush with gold leaf"],
      finishes: ["plate on porcelain", "fan with peacock feathers", "seal in velvet pouch", "press under crown weight", "present with trumpet fanfare"]
    }
  };

  const set = styleSets[style] || styleSets.default;
  const steps = [];

  if (ingredients.length <= 2) {
    steps.push(`Step 1: Take ${ingredients.join(", ")} and ${randomItem(set.actions)} them.`);
    steps.push(`Step 2: Then ${method.toLowerCase()} it for exactly ${time} minutes.`);
    steps.push(`Step 3: Finally, garnish with ${randomItem(set.garnishes)}.`);
  } else if (ingredients.length <= 4) {
    steps.push(`Step 1: Prepare ${ingredients[0]} and ${randomItem(set.actions)} it.`);
    steps.push(`Step 2: ${randomItem(set.preps)} the ${ingredients[0]} and combine it ${randomItem(set.modifiers)}.`);
    steps.push(`Step 2: Mix in ${ingredients[1]} and let it rest for ${Math.floor(time / 4)} minutes.`);
    steps.push(`Step 3: Fold ${ingredients[2]} into the blend and stir violently.`);
    if (ingredients[3]) {
      steps.push(`Step 4: Carefully introduce ${ingredients[3]} and ${randomItem(set.actions)} again.`);
    }
    steps.push(`Step 5: Garnish with ${randomItem(set.garnishes)} and serve immediately.`);
  } else {
    steps.push(`Step 1: Begin with ${ingredients[0]} and ${randomItem(set.actions)} it.`);
    steps.push(`Step 2: ${randomItem(set.preps)} the ${ingredients[1]} and combine it ${randomItem(set.modifiers)}.`);
    steps.push(`Step 3: Add ${ingredients[2]} and ${randomItem(set.mixes)}.`);
    steps.push(`Step 4: Carefully introduce ${ingredients[3]} and ${randomItem(set.actions)} again.`);
    steps.push(`Step 5: Let the mixture ${randomItem(set.finishes)} for ${Math.floor(time / 5)} minutes.`);
    steps.push(`Step 6: Apply ${method.toLowerCase()} technique until bubbling starts.`);
    steps.push(`Step 7: Surprise twist: crush ${ingredients[4]} and hide it beneath ${ingredients[5]}.`);
    steps.push(`Step 8: Finally, garnish with ${randomItem(set.garnishes)} and scream BON APPÉTIT.`);
  }

  const dangerCount = ingredients.filter(i => /rotten|raw|moldy|toothpaste/i.test(i)).length;
  const styleToxicityOffset = { kids: 3, lab: 3, default: 0, royal: 0, hell: 2 };
  const offset = styleToxicityOffset[style] || 0;
  const toxicity = Math.max(-10, Math.min(10, dangerCount * 2 - 2 + offset));

  const taste = Math.floor(Math.random() * 21) - 10;
  const risk = toxicity > 6 ? "🔥🔥🔥 (HIGH)" : toxicity > 2 ? "🔥🔥 (MEDIUM)" : "🔥 (LOW)";
  const chaos = ingredients.includes("Toothpaste") && ingredients.includes("Shrimp Shells");

  if (chaos) {
    return `☠ SYSTEM OVERLOAD: INGREDIENTS UNSTABLE ☠\nBl3nD th3 pøíßøns w1th f1re... Do NoT CoOk...`;
  }

  return `${steps.join("\n")}\n\n✨ Risk Level: ${risk}\n☣ Toxicity: ${toxicity}/10\n🍽 Taste Score: ${taste}/10`;
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
  generateButton.addEventListener('click', () => {
    // 随机选择一个 GIF
    const gifList = ["loading1.gif", "loading2.gif", "loading3.gif"];
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
  document.getElementById("resetButton").addEventListener("click", resetForm);
  document.getElementById("saveImageButton").addEventListener("click", saveRecipeImage);
});
const ingredientsList = [
    "Egg", "Wasabi", "Cotton Candy", "Raw Chicken", "Ice Cream",
    "Hot Sauce", "Pickles", "Banana Peel", "Marshmallow", "Garlic",
    "Sushi-grade Tuna", "Moldy Cheese", "Vinegar", "Toothpaste", "Frozen Fries",
    "Soda", "Durian", "Chocolate Syrup", "Energy Drink", "Shrimp Shells"
  ];
  
  const methodsList = [
    "Microwave", "Deep Fry", "Raw / No Cooking",
    "Steam", "Bake", "Sous Vide", "Grilled"
  ];
  
  const ingredientsDiv = document.getElementById("ingredients");
  const methodsDiv = document.getElementById("methods");
  
  ingredientsList.forEach(item => {
    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = item;
    checkbox.name = "ingredient";
    label.appendChild(checkbox);
    label.append(" " + item);
    ingredientsDiv.appendChild(label);
  });
  
  methodsList.forEach(item => {
    const label = document.createElement("label");
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.value = item;
    radio.name = "method";
    label.appendChild(radio);
    label.append(" " + item);
    methodsDiv.appendChild(label);
  });
  
  function generateRecipe() {
    const selectedIngredients = Array.from(document.querySelectorAll('input[name="ingredient"]:checked'))
      .map(input => input.value);
    if (selectedIngredients.length === 0 || selectedIngredients.length > 5) {
      alert("Please select 1 to 5 ingredients.");
      return;
    }
  
    const selectedMethod = document.querySelector('input[name="method"]:checked');
    if (!selectedMethod) {
      alert("Please choose a cooking method.");
      return;
    }
  
    const time = document.getElementById("time").value || 30;
    const recipe = createUnsafeRecipe(selectedIngredients, selectedMethod.value, time);
    document.getElementById("recipeOutput").innerText = recipe;
  }
  
  function createUnsafeRecipe(ingredients, method, time) {
    const actions = [
      "mash", "blend", "sauté", "overheat", "marinate aggressively",
      "fuse chemically", "freeze then boil", "ferment in direct sunlight"
    ];
    const garnishOptions = [
      "with toothpaste foam", "and serve with soda glaze",
      "topped with shrimp shells", "and add a drizzle of wasabi",
      "decorated using banana peels"
    ];
  
    const intro = `Take ${ingredients.join(", ")} and ${randomItem(actions)} them.`;
    const mainStep = `Then ${method.toLowerCase()} it for exactly ${time} minutes.`;
    const garnish = `Finally, ${randomItem(garnishOptions)}.`;
    const warning = `⚠️ Warning: This dish may be hazardous to health. Consume at your own risk.`;
  
    return `${intro} ${mainStep} ${garnish}\n\n${warning}`;
  }
  
  function randomItem(list) {
    return list[Math.floor(Math.random() * list.length)];
  }
  
  function resetForm() {
    document.querySelectorAll('input[name="ingredient"]').forEach(cb => cb.checked = false);
    document.querySelectorAll('input[name="method"]').forEach(radio => radio.checked = false);
    document.getElementById("time").value = 30;
    document.getElementById("recipeOutput").innerText = "";
  }
  
  function addCustomIngredient() {
    const input = document.getElementById("customIngredient");
    const newIngredient = input.value.trim();
    if (newIngredient === "") {
      alert("Please enter an ingredient name.");
      return;
    }
  
    // Check for duplicates
    const existing = Array.from(document.querySelectorAll('input[name="ingredient"]'))
      .some(input => input.value.toLowerCase() === newIngredient.toLowerCase());
    if (existing) {
      alert("This ingredient already exists.");
      return;
    }
  
    // Add to ingredients section
    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = newIngredient;
    checkbox.name = "ingredient";
    label.appendChild(checkbox);
    label.append(" " + newIngredient);
    ingredientsDiv.appendChild(label);
  
    // Clear input box
    input.value = "";
  }
  
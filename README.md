# Unsafe Recipe Generator

The Unsafe Recipe Generator is a humorous, interactive procedural generation project designed to create unpredictable, absurd, and potentially hazardous recipes based on user-selected ingredients, cooking methods, and chaotic system logic.

## 🚀 Features

* **Ingredient Selection**: Choose up to 5 ingredients from a predefined list or add your own.
* **Method Selection**: Pick one of several strange or standard cooking methods.
* **Time Control**: Specify the cooking time in minutes.
* **Style Mode**: Select a generation style such as "Hell Kitchen," "Mad Scientist Lab," or "Kids' Imagination" to influence recipe language and behavior.
* **Multi-step Output**: Recipes are presented in 3 detailed steps, mimicking a cooking guide.
* **Scoring System**:

  * ⚠️ **Risk Level** (🔥): Based on ingredient combinations.
  * ☣️ **Toxicity**: Calculated from suspicious components.
  * 🍽️ **Taste Score**: Randomly evaluated for absurdity.
* **Failure Mode**: Some combinations trigger glitch output or system meltdown.

## 🧠 Architecture

* `index.html`: UI layout and structure.
* `main.js`: Logic and DOM manipulation (modular, ES6-based).
* `ingredients.js`: Categorized list of ingredients with types (main, side, condiment).

## 📦 Setup

### Serve Locally

Because this project uses JavaScript modules (`import`), it must be served over HTTP:

```bash
python -m http.server
# or use VS Code Live Server
```

Then open: [http://localhost:8000](http://localhost:8000)

### GitHub Pages

* Make sure to use `<script type="module">`
* Host all files in the repository root or use relative paths

## 🧪 Examples

**Sample Output:**

```
Step 1: Take Raw Chicken, Chocolate Syrup and mutate them.
Step 2: Then deep fry it for exactly 60 minutes.
Step 3: Finally, garnish with lava salt.

✨ Risk Level: 🔥🔥🔥 (HIGH)
☣ Toxicity: 8/10
🍽 Taste Score: -4/10
```

## 🎯 Academic Context

This project was developed as a final for a generative design course. It demonstrates:

* Procedural generation (via CFG-like templates and randomness)
* Emergent behavior (chaotic ingredient combos)
* Playful critique of automation and recommendation systems

## ✍️ Team

* Shaoan Wang
* Bolan Guan
* Peilin Huang
* Guangyang Chen
* Richard Tao

## 📜 License

MIT (for fun, not for food!)

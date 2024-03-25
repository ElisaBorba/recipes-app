# 🍽️ Recipes App🍹

Bem-vindo ao Recipes App, uma aplicação desenvolvida em React pensada para dispositivos móveis(360 x 640), que permite o usuário descobrir e compartilhar receitas deliciosas de refeições e drinks! Esta aplicação oferece uma experiência culinária completa, permitindo que você explore uma ampla variedade de receitas, filtre por categoria e favorite suas receitas preferidas. Além de contar com uma interface amigável e funcionalidades intuitivas.


## ⚙️ Funcionalidades
* Navegue por uma ampla seleção de receitas de refeições e drinks;
* Escolha por categorias, como tipo de bebida (ex: cocktail, shake) ou tipo de refeição (ex: carne, frango, sobremesa);
* Favoritar receitas para acesso rápido na página de favoritos.
* Acesse receitas prontas no perfil do usuário para uma experiência personalizada.
* Visualize os ingredientes, modo de preparo e compartilhe suas receitas favoritas.

[Recipes App](https://github.com/ElisaBorba/recipes-app/assets/122118734/f7fdf3cb-0bce-47cb-b5db-9da00b444cd3)

## 🛠 Tecnologias utilizadas
* React
* TypeScript
* Context API
* React Router DOM
* React Testing Library

### APIs
* API de refeições ([clique aqui](https://www.themealdb.com/))
* API de Drinks ([clique aqui](https://www.thecocktaildb.com/))

### Estrutura do projeto
```
.
├── src/
│   ├── components/
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── Icon.tsx
│   │   ├── Login.tsx
│   │   ├── Modal.tsx
│   │   ├── Footer.tsx
│   │   ├── Footer.tsx
│   │   ├── RecipeDetails.tsx
│   │   ├── RecipeInProgress.tsx
│   │   ├── RecipeListDrinks.tsx
│   │   ├── RecipeListMeals.tsx
│   │   ├── Recipes.tsx
│   │   └── SearchBar.tsx
│   ├── context/
│   │   ├── DrinksContext/
│   │   │   ├── DrinksContext.tsx
│   │   │   └── DrinksProvider.tsx
│   │   ├── MealsContext/
│   │   │   ├── MealsContext.tsx
│   │   │   └── MealsProvider.tsx
│   │   ├── MealsContext/
│   │   ├── datacontext.ts
│   │   └── dataprovider.tsx
│   ├── images/
│   ├── pages/
│   │   ├── DoneRecipes/
│   │   ├── Drinks/
│   │   ├── DrinksReceita/
│   │   ├── FavoriteRecipes/
│   │   ├── Home/
│   │   ├── Meals/
│   │   ├── MealsProgress/
│   │   ├── MealsReceita/
│   │   └── profile/
│   ├── services/
│   │   └── fetchAPI.ts
│   ├── styles/
│   ├── tests/
│   ├── App.tsx
|   ├── index.css
│   ├── main.tsx
│   └── types.ts
├── README.md
└── package.json

```
### Como executar
1️⃣ Instale as dependências:
```
npm install
```
2️⃣ Inicie a aplicação:
```
npm run dev
```
3️⃣ Execute os testes:
```
npm test
```

### Contribuidores
Quero expressar minha gratidão a todos os colaboradores que contribuíram para este projeto. Cada um de vocês desempenhou um ótimo papel para o desenvolvimento de Recipes App. Agradeço muito pela troca de ideias e experiências.
* [Amanda Giussani](https://github.com/amandagiussani)
* [Flauberte Madeiro](https://github.com/flaubertemadeiro)
* [Josy Pamplona](https://github.com/josypamplona)

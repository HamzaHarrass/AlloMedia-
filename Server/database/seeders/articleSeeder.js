const Article = require("../../models/Article");
const { faker } = require("@faker-js/faker");

async function insertArticles(menus) {
  const articlesToInsert = [];
  for (let i = 1; i <= 20; i++) {
    const Plat = faker.commerce.productName();
    const prix = faker.commerce.price();
    const description = faker.commerce.productDescription();
    articlesToInsert.push({
      Plat,
      prix,
      description,
      menu:
        menus[Math.floor(Math.random() * menus.length)]._id,
    });
  }
  try {
    const articles = await Article.insertMany(articlesToInsert);
    console.log("articles inserted successfully");
    return articles;
  } catch (error) {
    console.error("Error inserting articles:", error);
  }
}

module.exports = insertArticles;

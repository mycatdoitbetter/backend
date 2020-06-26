import Knex from "knex";

export async function seed(knex: Knex) {
  await knex("items").insert([
    { titulo: "Lâmpadas", image: "lampadas.svg" },
    { titulo: "Pilhas e Baterias", image: "baterias.svg" },
    { titulo: "Papéis e Papelão", image: "papeis-papelao.svg" },
    { titulo: "Resíduos Eletrônicos", image: "eletronicos.svg" },
    { titulo: "Resíduos Orgânicos", image: "organicos.svg" },
    { titulo: "Óleo de Cozinha", image: "oleo.svg" },
  ]);
}

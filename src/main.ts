import "reflect-metadata";
import { PRISMA } from "./config/db.config"
import scraper from "./service/companys"
import express from "express";

const main = async () => {
  await PRISMA;
  const teste = await scraper.main("https://ca.indeed.com/jobs?q=node.js&l=Toronto%2C+ON&vjk=58432fa9cd391fcb");
  console.log("arrived in the final")
}

main();
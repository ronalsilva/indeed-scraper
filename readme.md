# Indeed Job Scraper

This is a project developed in Node.js and TypeScript that allows you to monitor job vacancies on the Indeed website. The aim is to keep track of vacancies for which you have not yet applied, helping you to better manage the application process.

[x] PostgreSQL
[x] Cheerio
[x] `typescript` support
[x] based on `PRISMA` database

## Features

- Job monitoring:** The scraper regularly checks the Indeed website for new vacancies, comparing them with the vacancies you have already applied for.

- Database:** Vacancy information and the status of applications are stored in a PostgreSQL database. This allows you to track and manage your applications efficiently.

- Cheerio:** The Cheerio library is used to parse the HTML of Indeed pages and extract the relevant information from the vacancies.

## Prerequisites

- Node.js: Make sure you have Node.js installed. If not, you can download it [here](https://nodejs.org/).

- PostgreSQL: You need to have a PostgreSQL database configured. If you don't, you can install it [here](https://www.postgresql.org/download/).

## How to use

1. Clone this repository to your computer:

```
- git clone https://github.com/seu-usuario/indeed-job-scraper.git
```

2. Install the project dependencies:

```
- npm i
- docker-compose up -d
- npx prisma db push
```

3. Create an `.env` file in the root of the project with the following variables:

```
DATABASE_URL="postgresql://postgres:admin@localhost:5432/scraper"
PORT=8080
```

4. Start the scraper:

```
npm start
```

## Contribution

Contributions are welcome! Feel free to open issues and send pull requests and to send any kind of comments.

## Disclaimer

This project was created for educational and learning purposes only. Scraping websites may violate the terms of use of some platforms. Use it responsibly and always check the terms of use of the site being scraped.
import { PRISMA } from "../../config/db.config";
import { load } from "cheerio";
import { gotScraping } from 'got-scraping';

class scraper {
    async create(body: any): Promise<any> {
        let response;
        const companyData = {
            job_id: body.job_id,
            name: body.job_id,
            address: body.job_id,
            description: body.job_id,
            link: body.job_id,
            information: body.job_id,
            posted_date: body.job_id,
            appled: body.job_id
        }
        try {
            response = await PRISMA.companys.create({
                data: companyData,
            });
        } catch (error) {
            console.log("Error on create data of company")
        }

        return response;
    }

    async update(body: any): Promise<any> {
        let response;
        const companyData = {
            job_id: body.job_id,
            name: body.job_id,
            address: body.job_id,
            description: body.job_id,
            link: body.job_id,
            information: body.job_id,
            posted_date: body.job_id,
            appled: body.job_id
        }
        try {
            response = await PRISMA.companys.update({
                where: {
                    job_id: body.job_id
                },
                data: companyData,
            });
        } catch (error) {
            console.log("Company updated")
        }

        return response;
    }

    async get(job_id: String, company_id?: String): Promise<any> {
        let response;

        const whereData:object = company_id? { job_id, company_id }: { job_id };

        try {
            response = await PRISMA.companys.findMany({
                where: whereData
            })
        } catch (error) {
            console.log("Company not found")
        }

        return response;
    }

    async getPage(url:any): Promise<any> {
        const html = await gotScraping({
            url,
            headerGeneratorOptions: {
                browsers: [{ name: "firefox", minVersion: 80 }],
                devices: ["desktop"],
                locales: ["en-US", "en"],
                operatingSystems: ["linux"],
            },
        });
        const $ = load(`${html.body}`);
        let result = [];
        let job_id, name, location, salary, description, link, job_title, posted_date;
        

        $('#mosaic-provider-jobcards ul li').each(function() {
            job_id = $(this).find('.cardOutline.tapItem.result').attr('class');
            name = $(this).find('.cardOutline.tapItem.result .companyName').text();
            posted_date = $(this).find('.cardOutline.tapItem.result span.date').text();
            job_title = $(this).find('.cardOutline.tapItem.result a.jcs-JobTitle span').text();
            link = "https://ca.indeed.com/"+$(this).find('.cardOutline.tapItem.result a.jcs-JobTitle').attr('href');
            $(this).find('.cardOutline.tapItem.result .job-snippet ul li').each(function() {
                const snippet = $(this).text();
                description = "- "+ snippet+", -"+snippet;
            })
            location = $(this).find('.cardOutline.tapItem.result .companyLocation').text();
            salary = $(this).find('.cardOutline.tapItem.result .salaryOnly .attribute_snippet')? $(this).find('.cardOutline.tapItem.result .salaryOnly .attribute_snippet').text():""; 

            if(job_id != undefined && name != undefined) {
                job_id = job_id.replace('cardOutline tapItem dd-privacy-allow result ', '').split(' ')[0];

                const body = { job_id, name, posted_date, job_title, link, location, salary }

                console.log(job_id)
                console.log(name)
                console.log(posted_date)
                console.log(job_title)
                console.log(link)
                console.log(location)
                console.log(salary)
                console.log("-------------------------")
            }
        })
        return result;
    }

    main(url:string): Promise<any> {
        const result = this.getPage(url);
        return result;
    }
}
  
export default new scraper;
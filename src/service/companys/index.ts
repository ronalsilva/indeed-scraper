import { PRISMA } from "../../config/db.config";
import { load } from "cheerio";
import { gotScraping } from 'got-scraping';

interface CompanyData {
    job_id: string;
    name: string;
    job_title: string,
    location: string;
    description: string;
    link: string;
    information: string;
    posted_date: string;
    appled?: boolean;
}

class scraper {
    async create(body:CompanyData): Promise<any> {
        let response;
        const companyData = {
            ...body,
            appled: false
        }

        console.log(companyData)
        console.log("-------------")

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
        let job_id, name, location, information, description, link, job_title, posted_date;
        

        $('#mosaic-provider-jobcards ul li').each((index, element) => {
            job_id = $(element).find('.cardOutline.tapItem.result').attr('class');
            name = $(element).find('.cardOutline.tapItem.result .companyName').text();
            posted_date = $(element).find('.cardOutline.tapItem.result span.date').text();
            job_title = $(element).find('.cardOutline.tapItem.result a.jcs-JobTitle span').text();
            link = "https://ca.indeed.com/"+$(element).find('.cardOutline.tapItem.result a.jcs-JobTitle').attr('href');
            $(element).find('.cardOutline.tapItem.result .job-snippet ul li').each(function() {
                const snippet = $(element).text();
                description = "- "+ snippet+", -"+snippet;
            })

            $(element).find('.cardOutline.tapItem.result .job-snippet ul li').each(function() {
                const informationText = $(element).text();
                information = " / - / "+ informationText+" / - / "+informationText;
            })
            location = $(element).find('.cardOutline.tapItem.result .companyLocation').text();
            information = $(element).find('.cardOutline.tapItem.result .salaryOnly .attribute_snippet')? $(element).find('.cardOutline.tapItem.result .salaryOnly .attribute_snippet').text():""; 

            if(job_id != undefined && name != undefined) {
                job_id = job_id.replace('cardOutline tapItem dd-privacy-allow result ', '').split(' ')[0];

                const body:CompanyData = { job_id, name, posted_date, job_title, link, location, information, description }

                this.create(body);
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
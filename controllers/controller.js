var request = require('request');
var cheerio = require('cheerio');
var Note = require("./../models/note.js");
var News = require("./../models/news.js");
module.exports = {

    scrape: function (cb) {
        //make a request to the NYT site to grab articles
        request('https://www.nytimes.com/section/world/americas', function (err, response, html) {
            //Load the html body from request into cheerio
            const $ = cheerio.load(html);

            //For each element with a "story" class
            $('h2.headline').each(function (i, element) {
                // Save the text of the title
                const headline = $(this).find("h2").text();
                // Save the link for the story
                const link = $(this).children("a").attr("href");
                // Save the text summary for the story
                const summary = $(this).find("p").text();

                //create an object of every headline, link and summary
                const result = {};
                //Add content to result object
                result.headline = headline;
                result.link = link;
                result.summary = summary;
                //create a new entry that passes the result object to the entry
                const entry = new News(result);

                // Save entry to the db
                entry.save(function (err, doc) {
                    // Console.log any errors
                    if (err) {
                        console.log(err);
                    }
                    // Or log the doc
                    else {
                        console.log(doc);
                    }

                })

            });
            cb();
        });

    }
};


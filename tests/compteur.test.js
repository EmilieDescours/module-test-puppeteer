const timeout = 15000;
describe("Tests compteur", () => {
    let page;

// vérification du chargement de la page d'accueil
    test('compteur1', async () => {

        await page.goto('http://polr.stationmyr.net/');
        await page.click('.pull-right .dropdown .dropdown-toggle')
        await page.type ('[name=username]', 'admin');
        await page.type ('[name=password]', 'campus');
        await page.screenshot({path: './tests/img/signin2.png'});
        await page.click('[name=login]');
        await page.waitFor(1000)
        await page.goto('http://polr.stationmyr.net/admin#links');
        await page.screenshot({path: './tests/img/signin3.png'});

        // charger la page d'accueil
       /* await page.goto('http://polr.stationmyr.net/admin#admin');
        // attendre que l'élément <body> soit chargé
        await page.waitForSelector('body');
        // récupérer le contenu de l'élément <body>
        const html = await page.$eval('body', e => e.innerHTML);
        // vérifier que dans cet élément Body on trouve "Polr du campus"
        await page.screenshot({path: './tests/img/compteur.png'});
        expect(html).toContain("links")*/


        let result = await page.evaluate(() => {
            let tds = Array.from(document.querySelectorAll('table tr td'))
            return tds.map(td => td.innerText)
        });
        console.log(result[1]);
        let linkEnding = result[0];
        let clicks = result[2];
        let page2 = await global.__BROWSER__.newPage()
        let url = 'http://polr.stationmyr.net/' + linkEnding;
        await page2.goto(url);
        await page.reload();
        await page.goto('http://polr.stationmyr.net/admin#links')
        await page.screenshot({path: './tests/img/signin4.png'});
        let result2 = await page.evaluate(() => {
            let tds = Array.from(document.querySelectorAll('table tr td'))
            return tds.map(td => td.innerText)
        });
        console.log(result2)
        let newClick = result2[2];
        console.log(clicks, newClick);

    });

    // cette fonction est lancée avant chaque test de cette
    // série de tests
    beforeAll(async () => {
        // ouvrir un onglet dans le navigateur
        page = await global.__BROWSER__.newPage()
    }, timeout)

});
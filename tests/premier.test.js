const timeout = 15000;
describe("Tests basiques", () => {
    let page;


    // vérification du chargement de la page d'accueil
    test('sign in', async () => {
        // charger la page d'accueil
        await page.goto('http://polr.stationmyr.net');
        // attendre que l'élément <body> soit chargé
        await page.waitForSelector('body');
        // récupérer le contenu de l'élément <body>
        const html = await page.$eval('body', e => e.innerHTML);
        // vérifier que dans cet élément Body on trouve "Polr du campus"
        await page.screenshot({path: './tests/img/premier.png'});
        expect(html).toContain("Polr - Campus Valence")
    }, timeout);

    //parcours connexion sign in
    test('home and sign in', async () => {
        await page.goto('http://polr.stationmyr.net/');
        //click sur le lien "sign in" de la navigation
        await page.click('.pull-right .dropdown .dropdown-toggle')
        await page.screenshot({path: './tests/img/signin.png'});
    })
 // remplir les champs Username et password
   /* test('connexion sign in', async() => {
        await page.goto('http://polr.stationmyr.net/');
        await page.click('.pull-right .dropdown .dropdown-toggle')
        await page.type ('[name=username]', 'admin');
        await page.type ('[name=password]', 'campus');
        await page.screenshot({path: './tests/img/signin2.png'});
        await page.click('[name=login]');
        await page.screenshot({path: './tests/img/signin3.png'});

        const html = await page.$eval('#navbar', e => e.innerHTML);
        // on vérifie qu'il contient la bonne chaîne de caractères
        expect(html).toContain("admin");
    })*/

    // cette fonction est lancée avant chaque test de cette
    // série de tests
    beforeAll(async () => {
        // ouvrir un onglet dans le navigateur
        page = await global.__BROWSER__.newPage()
    }, timeout)

});
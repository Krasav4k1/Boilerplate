describe('example', function() {

    beforeEach(function () {
        browser.get('/#/example');
        waitUrl('/#/example');
    });

    function waitUrl(urlInput) {
        browser.wait(function() {
            return browser.getCurrentUrl().then(function(url) {
                return (url.indexOf(browser.baseUrl +  urlInput) !== -1);
            });
        });
    }

    function equalValueElement(el, text) {
        browser.wait(protractor.ExpectedConditions.textToBePresentInElement(el, text), 10000);
    }

    function checkAvailableElement(el) {
        browser.wait(protractor.ExpectedConditions.presenceOf(el), 10000);
    }

    it('Example test method', function() {

    });


});
/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
$(function() {
    describe('RSS Feeds', function() {
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Loops through each feed in the allFeeds object and
         * ensures it has a URL defined and that the URL is not empty.
         */
         it('have defined URLs', function() {
           allFeeds.forEach(function(obj) {
             expect(obj.url).toBeDefined();
             expect(obj.url).not.toBe('');
           })
         });


        /* Loops through each feed in the allFeeds object
         * and ensures it has a name defined and that the name is not empty.
         */
         it('all have names', function() {
           allFeeds.forEach(function(obj) {
             expect(obj.name).toBeDefined();
             expect(obj.name).not.toBe('');
           })
         })
    });

    describe('The menu', function() {
        /* Ensures the menu element is hidden by default.
         */
         it('is hidden by default', function() {
           expect($('body').hasClass('menu-hidden')).toBe(true);
         });

         /* Ensures the menu changes visibility when the menu
          *  icon is clicked.
          */
          it('changes visibility when the menu icon is clicked', function() {
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
          });
        });

    // got help with this test using this website: https://medium.com/letsboot/testing-javascript-with-jasmine-basics-48efe03cf973
    describe('Initial Entries', function() {
        /* Ensures when the loadFeed function is called and completes
         * its work, there is at least a single .entry element
         * within the .feed container.
         */
         beforeEach(function(done) {
           loadFeed(0, function() {
             done();
           });
         });

         it('have at least a single .entry element within the .feed container', function() {
           expect($('.feed .entry').length).toBeGreaterThan(0);
         });
    });

    describe('New Feed Selection', function() {

        /* Ensures when a new feed is loaded by the loadFeed function
         * that the content actually changes.
         */
         let first, second;

         beforeEach(function(done) {
           loadFeed(0, function() {
             first = $('.feed').html();
             loadFeed(1, function() {
               second = $('.feed').html();
               done();
             })
           });
         });

         it('content actually changes', function() {
           expect(first).not.toBe(second);
         });
     });

}());

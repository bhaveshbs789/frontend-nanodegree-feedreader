/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        
        /* ----Comments and answer---
         * This particular spec checks if the allFeeds variable
         * has been defined or not . It is done using the toBeDefined check
         * The second check that needs to be performed is 
         * that the length of the allFeeds array should not be zero
         * which is done by checking the length of the allFeeds array
         * and check that it should NOT be zero using not.toBe(0)
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        
        /*--comments and answer----
         * In this particular spec check for url string is defined 
         * or not and whether the length of the url string is zero
         */
        it('url defined', function(){
            for(let feed of allFeeds){
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
         });


        /* -------Comments and answer-----
         * This spec is supposed to loop through the allFeeds array
         * and expect that for each element starting from index 0
         * the array element should be defined and length of the 
         * 'name' variable to NOT zero
         */
         it('name defined', function(){
            for(let feedName of allFeeds){
                expect(feedName.name).toBeDefined();
                expect(feedName.name.length).not.toBe(0);
            }
         })
    });


    
    describe('The menu', function(){
        
        /* ----Comments and answer----
         * The below spec is for checking when the DOM is ready if the 
         * 'body' element has a class or 'menu-hidden'.
         * the expectation is that the classList should contain
         * 'menu-item' in its list and check toBe(true)
         */
         it('is hidden', function(){
            const b = document.querySelector('body'); 
            expect(b.classList.contains('menu-hidden')).toBe(true);
         });

         /* -----Comments and answer-----
          * This spec is for checking the functionality when the hamburger icon
          * is clicked it toggles hiding and the check if performed by first getting the
          * body element in 'b' and then get the 'menu-icon' details using the 
          * document.querySelector function.
          * the click is simulated using the icon.click() function
          */
          it('changes visibility when hamburger is clicked', function(){
            const b = document.querySelector('body');
            const menuIcon = document.querySelector('.menu-icon-link');
            
         /* Post clicking on the icon the class menu-hidden should not be visible ie
          * expctation is that the classList should NOT be having the 'menu-hidden' class
          */
            menuIcon.click(); 
            expect(b.classList.contains('menu-hidden')).toBe(false);
            
          /* Click again to make the menu disappear and expect that the class List
           * for the body element to contain 'menu-hidden' class
           */
            menuIcon.click(); 
            expect(b.classList.contains('menu-hidden')).toBe(true);
          });
    });
        

    
    describe('Initial Entries', function(){
        /* Test spec to check if there is at least
         * a single .entry element within the .feed container.
         */
         beforeEach(function(done){
            loadFeed(0,done);
         })

         /* ----old start code ---
         it('is loaded', function(){
            const feedDiv = document.querySelector('.feed');
            expect(feedDiv.childElementCount).toBeGreaterThan(0);
         })
         * --- old end code -- 
         */
        it('is loaded', function(){
            const articleEntry = document.querySelectorAll('.feed .entry');
            expect(articleEntry.length).toBeGreaterThan(0);
         });
    });
        
    
    describe('New Feed Selection', function(){
        
         
         /* ----previous code ----
         const feedDiv = document.querySelector('.feed');
         const feedList = [];

         beforeEach(function(done){
            loadFeed(0);
            for(let i of feedDiv.children){
                feedList.push(i.innerText);
            }
            loadFeed(1,done);
         })

        it('changes content', function(){
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
           Array.from(feedDiv.children).forEach(function(entry, index){
               expect(entry.innerText).not.toEqual(feedList[index]);
           });
        });
        const articleEntry = document.querySelector('.entry');
        * ------end previous code----
        */
        
        /* Test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.     
         * The below spec uses async code to first load feed from 
         * index 0 using loadFeed(0). The loadFeed(0) takes a callback 
         * which calls loadFeed(1) along with a callback function. 
         * when the callback is complete then done() is called which signals
         * jasmine about the completion of the aync call.
         */
        let feedList1,feedList2;
        beforeEach(function(done){
           loadFeed(0, function(){
               feedList1 = document.querySelector('.entry').innerText;
               loadFeed(1, function(){
                   feedList2 = document.querySelector('.entry').innerText;
                   done();
               });
           }); 
        });
        
        it('changes content', function(){
            expect(feedList1).not.toEqual(feedList2);
        });
    });
        
}());

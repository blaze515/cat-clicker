$(function () {
    // Model
    var data = {

        newCat: function (name, img, clicks) {
            var cat = {};
            cat.name = name;
            cat.img = img;
            cat.clicks = clicks;
            return cat;
        },

        init: function (cats) {
            for (var i = 0; i < cats.length; i++) {
                localStorage.setItem(cats[i].name, JSON.stringify(cats[i]));
            }
        },

        getCat: function (catName) {
            var catJSON = localStorage.getItem(catName);
            var parsedJSON = JSON.parse(catJSON);
            return data.newCat(parsedJSON.name, parsedJSON.img, parsedJSON.clicks);
        },

        increaseCount: function (catName) {
            var cat = data.getCat(catName);
            cat.clicks += 1;
            localStorage.setItem(cat.name, JSON.stringify(cat));
            return cat.clicks;
        }
    };


    // View
    var view = {
        init: function (cats) {
            var $catSelectorElem = $('#cat-selector');
            for (var i = 0; i < cats.length; i++) {
                var catStr = '<div class="col-md-12" id="' + cats[i].name + '">' + '<img class="thumbnail" src="' + cats[i].img + '">'
                    + ' ' + '<button class="btn btn-info cat-btn" name="cat-select-btn" id="' + cats[i].name + '">' + cats[i].name + '</button></div>';
                $catSelectorElem.append(catStr);
            }
            var $selectedCatHeaderElem = $('#selected-cat');
            var $catImgElem = $('#cat-img');
            var $catNumClicksElem = $('#clicks');

            // Set to first cat (Mike) as default
            var headerStr = 'Meet ' + cats[0].name;
            $selectedCatHeaderElem.text(headerStr);
            $catImgElem.attr("src", cats[0].img);
            $catImgElem.attr("alt", cats[0].name);
            var clicksStr = 'Number of clicks: ' + cats[0].clicks;
            $catNumClicksElem.text(clicksStr);

            // Setup button listener
            var $catButtonListener = $('.cat-btn');
            $catButtonListener.click(function () {
                    var $currentCatElem = $(this);
                    var currentCat = octopus.getCat($currentCatElem.attr("id"));
                    view.changeCat(currentCat);
                }
            );

            // Setup cat clicker listener
            $catImgElem.click(function(){
               var $currentImgElem = $(this);
               var catName = $currentImgElem.attr("alt");
               // Increase the cat's count by one and return the current count
               var updatedCount = octopus.updateCounter(catName);
               // Update the count in the View
               var clicksStr = 'Number of clicks: ' + updatedCount;
               $catNumClicksElem.text(clicksStr);
            });
        },

        changeCat: function (cat) {
            var $selectedCatHeaderElem = $('#selected-cat');
            var $catImgElem = $('#cat-img');
            var $catNumClicksElem = $('#clicks');

            // Set the cat to the selected cat
            var headerStr = 'Meet ' + cat.name;
            $selectedCatHeaderElem.text(headerStr);
            $catImgElem.attr("src", cat.img);
            $catImgElem.attr("alt", cat.name);
            var clicksStr = 'Number of clicks: ' + cat.clicks;
            $catNumClicksElem.text(clicksStr);
        }
    };

    // Octopus
    var octopus = {
        // Create the array of cats and initialize the model and view
        init: function () {
            var catArray = [];
            catArray.push(data.newCat('Mike', 'img/mike.jpg', 0));
            catArray.push(data.newCat('Eleven', 'img/eleven.jpg', 0));
            catArray.push(data.newCat('Nancy', 'img/nancy.jpg', 0));
            catArray.push(data.newCat('Steve', 'img/steve.jpg', 0));
            catArray.push(data.newCat('Hopper', 'img/hopper.jpg', 0));
            catArray.push(data.newCat('Demagorgan', 'img/demagorgan.jpg', 0));
            data.init(catArray);
            view.init(catArray);
        },

        // Get the cat from the model using the cat's name
        getCat: function (catName) {
            return data.getCat(catName);
        },

        // Increase the count in the model by 1 and return the current count
        updateCounter: function (catName) {
            return data.increaseCount(catName);
        }

    };


    octopus.init();

}());

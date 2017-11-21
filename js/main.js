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
            var cat = data.newCat(parsedJSON.name, parsedJSON.img, parsedJSON.clicks);
            return cat;
        }
    };


    // View
    var view = {
        init: function (cats) {
            $catSelectorElem = $('#cat-selector');
            for (var i = 0; i < cats.length; i++) {
                var index = '' + i;
                catStr = '<div class="col-md-12" id="' + cats[i].name + '">' + '<img class="thumbnail" src="' + cats[i].img + '">'
                    + ' ' + '<button class="btn btn-info cat-btn" name="cat-select-btn" id="' + cats[i].name + '">' + cats[i].name + '</button></div>';
                $catSelectorElem.append(catStr);
            }
            $selectedCatHeaderElem = $('#selected-cat');
            $catImgElem = $('#cat-img');
            $catNumClicksElem = $('#clicks');

            // Set to first cat (Mike) as default
            headerStr = 'Meet ' + cats[0].name;
            $selectedCatHeaderElem.text(headerStr);
            $catImgElem.attr("src", cats[0].img);
            clicksStr = 'Number of clicks: ' + cats[0].clicks;
            $catNumClicksElem.text(clicksStr);

            // Setup button listener
            $catButtonListener = $('.cat-btn');
            $catButtonListener.click(function () {
                    $currentCatElem = $(this);
                    console.log("Current Cat ID: " + $currentCatElem.attr("id").toString());
                    currentCat = octopus.getCat($currentCatElem.attr("id"));
                    view.changeCat(currentCat);
                }
            );
        },

        changeCat: function (cat) {
            console.log("got here");
            console.log("value of cat.name" + cat.name);
            $selectedCatHeaderElem = $('#selected-cat');
            $catImgElem = $('#cat-img');
            $catNumClicksElem = $('#clicks');

            // Set the cat to the selected cat
            headerStr = 'Meet ' + cat.name;
            $selectedCatHeaderElem.text(headerStr);
            $catImgElem.attr("src", cat.img);
            clicksStr = 'Number of clicks: ' + cat.clicks;
            $catNumClicksElem.text(clicksStr);
        }
    };

    // Octopus
    var octopus = {
        init: function () {
            catArray = [];
            catArray.push(data.newCat('Mike', 'img/mike.jpg', 0));
            catArray.push(data.newCat('Eleven', 'img/eleven.jpg', 0));
            catArray.push(data.newCat('Nancy', 'img/nancy.jpg', 0));
            catArray.push(data.newCat('Steve', 'img/steve.jpg', 0));
            catArray.push(data.newCat('Hopper', 'img/hopper.jpg', 0));
            catArray.push(data.newCat('Demagorgan', 'img/demagorgan.jpg', 0));
            data.init(catArray);
            view.init(catArray);
        },

        getCat: function (catName) {
            console.log("Octopus cat name: " + catName);
            cat = data.getCat(catName);
            return cat;
        }

        // $('#cat-pic').click(function(e) {
        //     var $clickElem = $('#clicks');
        //     count += 1;
        //     $clickElem.text('Number of clicks: ' + count);
        // })
        //
        // $('#cat-pic2').click(function(e) {
        //     var $clickElem = $('#clicks');
        //     count += 1;
        //     $clickElem.text('Number of clicks: ' + count);
        //
        //
        // })
    };


    octopus.init();

}());

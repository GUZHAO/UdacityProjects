const model = {
    currentCat: null,
    cats: [
        {
            name: 'pic1',
            imgSrc: 'img/antonio-lapa-93448-unsplash.jpg',
            clickCount: 0,
            imgAlt: 'Photo by Antonio Lapa on Unsplash'
        },
        {
            name: 'pic2',
            imgSrc: 'img/charlie-deets-517076-unsplash.jpg',
            clickCount: 0,
            imgAlt: 'Photo by Charlie Deets on Unsplash'
        },
        {
            name: 'pic3',
            imgSrc: 'img/mikhail-vasilyev-34524-unsplash.jpg',
            clickCount: 0,
            imgAlt: 'Photo by Charlie Deets on Unsplash'
        },
        {
            name: 'pic4',
            imgSrc: 'img/mikhail-vasilyev-130018-unsplash.jpg',
            clickCount: 0,
            imgAlt: 'Photo by Charlie Deets on Unsplash'
        },
        {
            name: 'pic5',
            imgSrc: 'img/yousef-espanioly-521227-unsplash.jpg',
            clickCount: 0,
            imgAlt: 'Photo by Charlie Deets on Unsplash'
        }
    ]
};

const control = {
    init: function () {
        model.currentCat = model.cats[0];
        //initiate view
        catListView.init();
        catView.init();
    },
    getCurrentCat: function () {
        return model.currentCat;
    },
    getCats: function () {
        return model.cats;
    },
    setCurrentCat: function (cat) {
        model.currentCat = cat;
    },
    incrementCounter: function () {
        model.currentCat.clickCount++;
        //render view
        catView.render();
    }
};

const catView = {
    init: function () {
        this.catNameElem = document.getElementById('cat-name');
        this.catImageElem = document.getElementById('cat-img');
        this.countElem = document.getElementById('cat-count');

        this.catImageElem.addEventListener('click', function () {
            control.incrementCounter();
        });
        //render
        this.render();
    },

    render: function () {
        let currentCat = control.getCurrentCat();
        this.countElem.textContent = currentCat.clickCount;
        this.catNameElem.textContent = currentCat.name;
        this.catImageElem.src = currentCat.imgSrc;
        this.catImageElem.height = '150';
        this.catImageElem.width = '200';
    }
};

const catListView = {
    init: function () {
        this.catListElem = document.getElementById('cat-list');
        //render
        this.render();
    },

    render: function () {
        let elem, i;
        const cats = control.getCats();

        this.catListElem.innerHTML = '';

        for (i = 0; i < cats.length; i++) {

            elem = document.createElement('li');
            elem.textContent = cats[i].name;

            elem.addEventListener('click', (function (catCopy) {
                return function () {
                    control.setCurrentCat(catCopy);
                    catView.render();
                };
            })(cats[i]));

            this.catListElem.appendChild(elem);
        }
    }
};

control.init();
// My first try
// const nums = new Array(5);
// for (let i = 0; i < nums.length; i++) {
//     const num = nums[i];
//     let times = 0;
//
//     const elem = document.createElement('img');
//     const counter = document.createElement('p');
//     elem.src = 'img/charlie-deets-517076-unsplash.jpg';
//     elem.alt = 'Photo by Charlie Deets on Unsplash';
//     elem.height = '400';
//     elem.width = '400';
//
//     elem.addEventListener('click', (function () {
//         return function () {
//             times++;
//             counter.innerHTML = 'The cat has been clicked for ' + times;
//         };
//     })(num));
//
//     document.body.appendChild(elem);
//     document.body.appendChild(counter);
// }





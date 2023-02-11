const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const loadingElement = $('.overlay')
const categoryItems = $$('.category-item')
const homeFilterBtns = $$('.home-filter__btn')
const newFilterBtn = $('.new-filter-btn')
const soldOutFilterBtn = $('.sold-out-btn')
const mobileNewFilterBtn = $('.mobile-new-filter-btn')
const mobileOutFilterBtn = $('.mobile-sold-out-btn')
const mobileFilterPriceBtn = $('.mobile-filter-price-btn')
const categoryList = $('.js-category-list')
const mobileCategory = $('.mobile-category__list')
const sortPriceIncrease = $('.sort-price-increase')
const searchInput = $('.header__search-input')
const searchBtn = $('.header__search-btn')
const slider = $('.slider-block')

const app = {
    isNewFilterBtn: false,
    isSoldOutFilterBtn: false,
    isSortPrice: false,
    config: JSON.parse(localStorage.getItem('HieuStore Config')) || [],
    urlApi: {
        category: 'https://api-firebase-8b76a-default-rtdb.asia-southeast1.firebasedatabase.app/categories.json',
        products: 'https://api-firebase-8b76a-default-rtdb.asia-southeast1.firebasedatabase.app/products.json' 
    },
    slides: [
        {
            id: 1,
            path: '1.png'
        },
        {
            id: 2,
            path: '2.jpg'
        },
        {
            id: 3,
            path: '3.png'
        },
    ],
    setConfig(key, value) {
        this.config[key] = value
        localStorage.setItem('HieuStore Config', JSON.stringify(this.config))
    },
    handleEvents() {
        const _this = this

        // sort by category
        categoryList.onclick = (e) => {
            if (e.target.closest('.category-item')) {
                const idCategory = Number(e.target.getAttribute('id-category'))
                _this.filterCategory(idCategory)
            }
        }

        mobileCategory.onclick = (e) => {
            if (e.target.closest('.mobile-category__item')) {
                const idCategory = Number(e.target.getAttribute('id-category'))
                _this.filterCategory(idCategory)
            }
        }

        // sort price increase
        sortPriceIncrease.onclick = (e) => {
            console.log(e.target);
        }

        // filter new product PC
        newFilterBtn.onclick = () => {
            $('.home-filter__btn.btn--active').classList.remove('btn--active')
            newFilterBtn.classList.add('btn--active')
            _this.isNewFilterBtn = true
            _this.sortNewProduct(_this.isNewFilterBtn)
        }

        mobileNewFilterBtn ? mobileNewFilterBtn.onclick = () => {
            $('.header__sort-link.header__sort-link--active').classList.remove('header__sort-link--active')
            mobileNewFilterBtn.classList.add('header__sort-link--active')
            _this.isNewFilterBtn = true
            _this.sortNewProduct(_this.isNewFilterBtn)
        } : {}

        // sold out PC
        soldOutFilterBtn.onclick = () => {
            $('.home-filter__btn.btn--active').classList.remove('btn--active')
            soldOutFilterBtn.classList.add('btn--active')
            _this.isSoldOutFilterBtn = true
            _this.sortSoldOutProduct(_this.isSoldOutFilterBtn)
        }

        mobileOutFilterBtn ? mobileOutFilterBtn.onclick = () => {
            $('.header__sort-link.header__sort-link--active').classList.remove('header__sort-link--active')
            mobileOutFilterBtn.classList.add('header__sort-link--active')
            _this.isSoldOutFilterBtn = true
            _this.sortSoldOutProduct(_this.isSoldOutFilterBtn)
        } : {}

        // sort price
        mobileFilterPriceBtn.onclick = () => {
            $('.header__sort-link.header__sort-link--active').classList.remove('header__sort-link--active')
            mobileFilterPriceBtn.classList.add('header__sort-link--active')

            _this.isSortPrice = !_this.isSortPrice
            _this.isSortPrice ? _this.sortPriceAsc() : _this.sortPriceDesc()
        }

        // search
        searchBtn.onclick = () => {
            const key = searchInput.value.trim()
            _this.setConfig('key-search', key)
            _this.search(key)
            // window.location.href = 'product.html'
        }
    },
    getCategories () {
        return new Promise(resolve => {
            fetch(this.urlApi.category)
            .then(res => res.json())
            .then(categories => resolve(categories));
        })
    },
    getProducts() {
        return new Promise(resolve => {
            fetch(this.urlApi.products)
            .then(res => res.json())
            .then(data => resolve(data));
        })
    },
    filterCategory(id) {
        this.getProducts()
            .then(products => {
                const filterProducts = products.filter(product => {
                    if (id) {
                        return product.id_category === id
                    }
                    return false
                })
                this.renderProducts(filterProducts)
            })
    },
    sortNewProduct() {
        if (this.isNewFilterBtn) {
            this.getProducts()
                .then(products => {
                    const newProducts = products.sort((a, b) => {
                        const c = new Date(a.date)
                        const d = new Date(b.date)
                        return c - d
                    })
                    this.renderProducts(newProducts)
                })
        }
    },
    sortSoldOutProduct() {
        if (this.isSoldOutFilterBtn) {
            this.getProducts()
                .then(products => {
                    const newProducts = products.sort((a, b) => b.sold - a.sold)
                    this.renderProducts(newProducts)
                })
        }
    },
    sortPriceAsc() {
        if (this.isSortPrice) {
            this.getProducts()
                .then(products => {
                    const newProducts = products.sort((a, b) => b.price - a.price)
                    this.renderProducts(newProducts)
                })
        }
    },
    sortPriceDesc() {
        if (!this.isSortPrice) {
            this.getProducts()
                .then(products => {
                    const newProducts = products.sort((a, b) => a.price - b.price)
                    this.renderProducts(newProducts)
                })
        }
    },
    search(key) {
        console.log(key);
    },
    renderSlide() {
        const htmls = this.slides.map(slide => {
            return `
                <div class="col l-12 m-12 c-12">
                    <div class="slider" style="background: url(./assets/img/banner/${slide.path}) top center / cover no-repeat;">
                    </div>
                </div>
            `
        })
        slider ? slider.innerHTML = htmls.join('') : {}
    },
    renderCategories(categories) {
        let pcHtmls = categories.map(category => {
            return `
                <li class="category-item">
                    <a class="category-item-link" id-category="${category.id}">${category.name}</a>
                </li>
            ` 
        })
        let mobileHtmls = categories.map(category => {
            return `
            <li class="mobile-category__item">
                <a class="mobile-category__link" id-category="${category.id}">${category.name}</a>
            </li>
            ` 
        })
        $('.js-category-list').innerHTML = pcHtmls.join('')
        $('.js-mobile-category__list').innerHTML = mobileHtmls.join('')
    },
    renderProducts(products) {
        let htmls = products.map(product => {
            return `
                <div class="col l-2-4 m-4 c-6">
                    <div class="product-item">
                        <a href="productDetail.html?id=${product.id}" class="product-item__link">
                            <div class="product-item__img" style="background-image: url(${product.img});"></div>
                            
                            <div class="product-item__info">
                                <h4 class="product-item__name">${product.name}</h4>
    
                                <div class="product-item__price">
                                    <span class="product-item__price-old">${formatCurrency(product.price*2)}</span>
                                    <span class="product-item__price-new">${formatCurrency(product.price)}</span>
                                </div>
    
                                <div class="product-item__action">
                                    <span class="product-item__like">
                                        <!-- liked: product-item__like--liked -->
                                        <i class="product-item__like-icon product-item__like-icon-empty fa-regular fa-heart"></i>
                                        <i class="product-item__like-icon product-item__like-icon-fill fa-solid fa-heart"></i>
                                    </span>
                                    <div class="product-item__rating">
                                        <i class="product-item__rating--star-gold fa-solid fa-star"></i>
                                        <i class="product-item__rating--star-gold fa-solid fa-star"></i>
                                        <i class="product-item__rating--star-gold fa-solid fa-star"></i>
                                        <i class="product-item__rating--star-gold fa-solid fa-star"></i>
                                        <i class="product-item__rating--star-gold fa-solid fa-star"></i>
                                    </div>
                                </div>
    
                                <div class="product-item__origin">
                                    <span class="product-item__origin-brand">Hồ Chí Minh</span>
                                    <span class="product-item__origin-name hide-on-mobile-tablet hide-on-pc">Việt Nam</span>
                                    <span class="product-item__sold">${product.sold > 0 ? product.sold + ' đã bán' : ''}</span>
                                </div>                                                
                            </div>
    
                            <div class="product-item__favorite">
                                <i class="fa-solid fa-check"></i>
                                <span>Yêu thích</span>
                            </div>
    
                            <div class="product-item__sale-off">
                                <span class="product-item__sale-off-percent">50%</span>
                                <span class="product-item__sale-off-label">GIẢM</span>
                            </div>
                        </a>
                    </div>
                </div>
            ` 
        })
        $('.js-products').innerHTML = htmls.join('')
    },
    start() {
        this.handleEvents()
        this.renderSlide()
    }
}
app.start()

loadingElement.classList.add('run')

Promise.all([app.getProducts(), app.getCategories()])
    .then(([products, categories]) => {
        app.renderProducts(products)
        app.renderCategories(categories)
    })
    .catch((error) => {
        console.log(error);
    })
    .finally(() => [
        loadingElement.classList.remove('run')
    ])
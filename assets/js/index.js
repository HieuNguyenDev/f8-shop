const getCategory = (url) => {
    fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        let pcHtmls = data.map(category => {
            return `
            <li class="category-item">
                <a class="category-item-link" href="">${category.name}</a>
            </li>
            ` 
        })
        let mobileHtmls = data.map(category => {
            return `
            <li class="mobile-category__item">
                <a href="" class="mobile-category__link">${category.name}</a>
            </li>
            ` 
        })
        document.querySelector('.js-category-list').innerHTML += pcHtmls.join('')
        document.querySelector('.js-mobile-category__list').innerHTML += mobileHtmls.join('')
    });
}

const getProduct = (url) => {
    fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        let htmls = data.map(product => {
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
                                    <span class="product-item__sold">${product.sold} đã bán</span>
                                </div>                                                
                            </div>

                            <div class="product-item__favorite">
                                <i class="fa-solid fa-check"></i>
                                <span>Yêu thích</span>
                            </div>

                            <div class="product-item__sale-off">
                                <span class="product-item__sale-off-percent">10%</span>
                                <span class="product-item__sale-off-label">GIẢM</span>
                            </div>
                        </a>
                    </div>
                </div>
            ` 
        })
        document.querySelector('.js-products').innerHTML = htmls.join('')
    });
}

getCategory('https://api-firebase-8b76a-default-rtdb.asia-southeast1.firebasedatabase.app/categories.json')
getProduct('https://api-firebase-8b76a-default-rtdb.asia-southeast1.firebasedatabase.app/products.json')
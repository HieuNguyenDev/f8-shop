const url = window.location.href;
function getUrlVars(url) {
    var vars = {};
    var parts = url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

const id = Number(getUrlVars(url)['id']) - 1;
function getProduct(url) {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            const htmls = `
                    <div class="app__content">
                        <div class="row detail-product__content">
                            <div class="col l-5 m-12 c-12">
                                <div class="main-product__img" style="background-image: url(${data[id].images[0].img})"></div>
                                <div class="main-product__sub-img-wrap">
                                    <div class="grid">
                                        <div class="row images-block"></div>
                                    </div>
                                </div>
                                
                                <div class="main-product__img-footer hide-on-mobile-tablet">
                                    <span class="main-product__socials">
                                        <span>Chia sẻ:</span>
                                        <a href="/">
                                            <img src="https://img.icons8.com/color/48/null/facebook-circled--v1.png"/>
                                        </a>
                                        <a href="/">
                                            <img src="https://img.icons8.com/color/48/null/pinterest--v1.png"/>
                                        </a>
                                        <a href="/">
                                            <img src="https://img.icons8.com/color/48/null/instagram-new--v1.png"/>
                                        </a>
                                        <a href="/">
                                            <img src="https://img.icons8.com/color/48/null/twitter-circled--v1.png"/>
                                        </a>
                                    </span>
            
                                    <span class="main-product__liked">
                                        <i class="fa-regular fa-heart"></i>
                                        <span>Đã thích (834)</span>
                                    </span>
                                </div>
                            </div>  
                            
                            <div class="col l-7 m-12 c-12">
                                <div class="main-product__info">
                                    <span class="main-product__name">${data[id].name}</span>
                                    <div class="main-product__detail">
                                        <span class="main-product__detail-rating">
                                            <span class="main-product__detail-rating-label">4.4</span>
                                            <i class="main-product__detail--star-gold fa-solid fa-star"></i>
                                            <i class="main-product__detail--star-gold fa-solid fa-star"></i>
                                            <i class="main-product__detail--star-gold fa-solid fa-star"></i>
                                            <i class="main-product__detail--star-gold fa-solid fa-star"></i>
                                            <i class="main-product__detail--star-gold fa-solid fa-star"></i>
                                        </span>
            
                                        <span class="main-product__detail-comment main-product__detail--separate">
                                            <span class="main-product__detail-comment-number">9</span>
                                            đánh giá
                                        </span>
                                        <span class="main-product__detail-sold main-product__detail--separate">
                                            <span class="main-product__detail-sold-number">${data[id].sold}</span>
                                            đã bán
                                        </span>
                                        <!-- <span class="main-product__detail-report">Tố cáo</span> -->
                                    </div>
            
                                    <div class="main-product__price-wrap">
                                        <span class="main-product__price-old">${formatCurrency(data[id].price * 2)}</span>
                                        <span class="main-product__price-new">${formatCurrency(data[id].price)}</span>
                                        <span class="main-product__sale">
                                            <span class="main-product__sale-percent">50%</span>
                                            GIẢM
                                        </span>
                                    </div>
            
                                    <div class="grid hide-on-mobile-tablet">
                                        <div class="row main-product__option-wrap">
                                            <div class="col l-2">
                                                <span class="main-product__option-heading">Vận chuyển</span>
                                            </div>
                                            <div class="col l-10">
                                                <div class="main-product__deliver-info">
                                                    <div class="main-product__deliver-status">
                                                        <img src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/1cdd37339544d858f4d0ade5723cd477.png" alt="" class="main-product__deliver-img">
                                                        <span class="main__product-deliver-label">Miễn phí vận chuyển</span>
                                                    </div>
                                                    <div class="main__product-deliver-address">
                                                        <img src="https://s3.amazonaws.com/iconbros/icons/icon_pngs/000/000/163/original/delivery.png?1632676571" alt="" class="main__product-deliver-icon">
                                                        <div class="main__product-deliver-address-content">
                                                            <div class="main__product-deliver-address-info">
                                                                <span class="main__product-deliver-address-label">
                                                                    Vận chuyển tới
                                                                </span>
                                                                <span class="main__product-deliver-address-select">
                                                                    Phước Vĩnh Tây, Cần Giuộc, Long An
                                                                    <i class="fa-solid fa-chevron-down"></i>
                                                                </span>
                                                            </div>
                                                            <div>
                                                                <span class="main__product-deliver-address-fee-label">
                                                                    Phí vận chuyển
                                                                </span>
                                                                <span class="main__product-deliver-address-fee">0đ</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row main-product__option-wrap">
                                            <div class="col l-2">
                                                <span class="main-product__option-heading">Màu sắc</span>
                                            </div>
                                            <div class="col l-10">
                                                <span class="main-product__option-item">Đen</span>
                                                <span class="main-product__option-item">Trắng</span>
                                                <span class="main-product__option-item">Xám</span>
                                            </div>
                                        </div>
                                        <div class="row main-product__option-wrap">
                                            <div class="col l-2">
                                                <span class="main-product__option-heading">Kích thước</span>
                                            </div>
                                            <div class="col l-10">
                                                <span class="main-product__option-item">38</span>
                                                <span class="main-product__option-item">39</span>
                                                <span class="main-product__option-item">40</span>
                                                <span class="main-product__option-item">41</span>
                                                <span class="main-product__option-item">42</span>
                                                <span class="main-product__option-item">43</span>
                                            </div>
                                        </div>
            
                                        <div class="row main-product__option-wrap">
                                            <div class="col l-2">
                                                <span class="main-product__option-heading">Kích cỡ</span>
                                            </div>
                                            <div class="col l-10">
                                                <span class="main-product__option-item">S (35 - 44 kg) <1m50</span>
                                                <span class="main-product__option-item">L (45 - 59 kg) <1m68</span>
                                                <span class="main-product__option-item">XL (60-70kg) <1m75</span>
                                                <span class="main-product__option-item">2XL (70 -75kg) <1m80</span>
                                            </div>
                                        </div>
            
                                        <div class="row main-product__option-wrap">
                                            <div class="col l-2">
                                                <span class="main-product__option-heading">Số lượng</span>
                                            </div>
                                            <div class="col l-10">
                                                <div class="main-product__quantity-option">
                                                    <span class="main-product__quantity-btn">
                                                        <i class="fa-solid fa-minus"></i>
                                                    </span>
                                                    <input type="text" class="main-product__quantity-input" value="1">
                                                    <span class="main-product__quantity-btn">
                                                        <i class="fa-solid fa-plus"></i>
                                                    </span>
                                                </div>
                                                <span class="main-product__quantity-available">240 sản phẩm có sẳn</span>
                                            </div>
                                        </div>
            
                                        <div class="main-product__option-wrap main-product__btn-wrap">
                                            <span class="btn main-product__btn-add btn--size-l">
                                                <i class="main-product__btn-add-icon fa-solid fa-cart-shopping"></i>
                                                Thêm vào giỏ hàng
                                            </span>
                                            <span class="btn btn--primary main-product__btn-buy btn--size-l">Mua ngay</span>
                                        </div>
                                        <span class="main-product__footer-border"></span>
                                        <div class="main-product__option-wrap main-product__footer">
                                            <span class="main-product__commit">
                                                <img src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/83e10a1f95cb083579c089448ef8dd3b.png" alt="" class="main-product__commit-img">
                                                <span>HieuStore đảm bảo</span>
                                            </span>
                                            <span class="main-product__commit-label">3 ngày hoàn trả / hoàn tiền</span>
                                        </div>
                                    </div>
            
                                </div>
                            </div>
                        </div> 
                        
                        <div class="row product__info">
                            <div class="col l-12 m-12 c-12">
                                <div class="product__content">
                                    <h3 class="product__content-heading">Mô tả sản phẩm</h3>
                                    <div class="product__content-wrap">
                                        <p class="product__content-sub-heading">${data[id].description ? data[id].description : ''}</p>
                                        <div class="product__content-img" style="background-image: url(${data[id].img});"></div>
                                    </div>
                                </div>  
                            </div>d
                            <!-- <div class="col l-2 m-12 c-12">
                                <div class="product__top">
                                    <span>Top sản phẩm bán chạy</span>
                                </div>
                            </div> -->
                        </div>
            
                        <!-- other products -->
                        <!-- <div class="row">
                            <div class="col l-12">
                                <div class="other-product">
                                    <h3 class="product__content-heading">Các sản phẩm khác của shop</h3>
                                    <div class="row sm-gutter js-products">
                                    </div>
                                </div>
                            </div>
                        </div> -->
                    </div>
                `
            const html = data[id].images.map((img) => {
                console.log(img);
                return `
                    <div class="col l-2-4 m-2 c-2">
                        <div class="main-product__sub-img" style="background-image: url(${img.img})"></div>
                    </div>
                `
            })
            document.querySelector('.js-detail-product').innerHTML = htmls
            document.querySelector('.images-block').innerHTML = html.join('')
        })
}

getProduct('https://api-firebase-8b76a-default-rtdb.asia-southeast1.firebasedatabase.app/products.json')

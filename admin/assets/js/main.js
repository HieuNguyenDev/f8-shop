const urlApi = {
    category: 'https://api-firebase-8b76a-default-rtdb.asia-southeast1.firebasedatabase.app/categories.json',
    products: 'https://api-firebase-8b76a-default-rtdb.asia-southeast1.firebasedatabase.app/products.json' 
}

function getProducts() {
    return new Promise(resolve => {
        fetch(urlApi.products)
            .then(res => res.json())
            .then(products => resolve(products))
    })
}

function renderProducts(products) {
    var htmls = products.map(product => {
        return `
        <tr>
          <th scope="row">${product.id}</th>
          <td>
            <img style="width: 80px" src="${product.img}" />  
          </td>
          <td>${product.name}</td>
          <td>${product.price}</td>
          <td>
              <a href="">Sửa</a>
              <a href="">Xóa</a>
          </td>
        </tr>
        `
    })
    document.getElementById('products-block').innerHTML = htmls.join('')
}
getProducts()
    .then(products => {
        renderProducts(products)
    })
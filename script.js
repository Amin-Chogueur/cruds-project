let data=localStorage.getItem("data") ? JSON.parse(localStorage.getItem("data")) : []

/* start dom */
let tbody=document.getElementById("tbody")
let title=document.getElementById("title")
let price=document.getElementById("price")
let ads=document.getElementById("ads")
let taxs=document.getElementById("taxs")
let discount=document.getElementById("discount")
let total=document.getElementById("total")
let parent=document.getElementById("parent")
let contety=document.getElementById("contety")
let create=document.getElementById("create")
let updateBtn=document.getElementById("update-btn")
let category=document.getElementById("category")
let deleteAllProduct=document.getElementById("delete-all")
let titleSearch=document.getElementById("title-search")
let categorySearch=document.getElementById("category-search")
let search=document.getElementById("search")

/* end dom */

/* start function get total */
function getTotal(){
    if(price.value!=""){
        let result=(+price.value + +ads.value + +taxs.value) - +discount.value;
        total.innerHTML=`${result}`
        parent.style.backgroundColor="red"
    }else{
        total.innerHTML=""
        parent.style.backgroundColor="darkgreen"
    }
}

/* end function get total */

/* start function read data from local storage */
function read(){
    let products="";
    if(data.length>0){
    for(let i=0;i<data.length;i++){
        products+=`
        <tr>
            <td>${i+1}</td>
            <td>${data[i].title}</td>
            <td>${data[i].price}</td>
            <td>${data[i].ads}</td>
            <td>${data[i].taxs}</td>
            <td>${data[i].discount}</td>
            <td>${data[i].total}</td>
            <td>${data[i].category}</td>
            <td><button onclick=update(${i})>update</button></td>
            <td><button onclick=deleteProduct(${i})>delete</button></td>
        </tr>
        `
    }
    
    deleteAllProduct.style.display="block"
    deleteAllProduct.innerHTML=`delete all:${data.length}`
    }
    tbody.innerHTML=products
    getTotal()
}
read()
/* end function read */

/* start function create products */
create.addEventListener("click",function(){
    let newProduct
    if(title.value!="" && price.value!="" && category.value!=""){
        for(let j=0;j<contety.value;j++){
            newProduct={
                "title":title.value,
                "price":price.value,
                "ads":ads.value,
                "taxs":taxs.value,
                "discount":discount.value,
                "total":total.innerHTML,
                "category":category.value,    
            }
            data.push(newProduct)
        }
        clearInputs()
    }
    localStorage.setItem("data",JSON.stringify(data))
    read()
})
/* end function create */

/* start function clear inputs */
function clearInputs(){
    price.value=""
    title.value=""
    ads.value=""
    taxs.value=""
    discount.value=""
    category.value=""
    contety.value=""
    total.innerHTML=""
    search.value=""
}
/* end function clear inputs */

/* start function delete product */
function deleteProduct(idToDelete){
    clearInputs()
    data.splice(idToDelete,1)
    localStorage.setItem("data",JSON.stringify(data))
    read()
}
/* end function delete product */

/* start function delete all */
deleteAllProduct.addEventListener("click",function(){
    clearInputs()
    data=[]
    deleteAllProduct.style.display="none"
    localStorage.removeItem("data")
    read()
}) 
/* end function delete all */

/* start function update */
let idToUpdate
function update(i){
    idToUpdate=i
    price.value=data[i].price
    title.value=data[i].title
    ads.value=data[i].ads
    taxs.value=data[i].taxs
    discount.value=data[i].discount
    category.value=data[i].category
    total.innerHTML=data[i].total
    window.scroll({
        top:0,
        behavior:"smooth"
    })
    contety.style.display="none";
    updateBtn.style.display="block";
    create.style.display="none";
}

updateBtn.addEventListener("click",function(){
    data[idToUpdate]={
        "title":title.value,
        "price":price.value,
        "ads":ads.value,
        "taxs":taxs.value,
        "discount":discount.value,
        "total":total.innerHTML,
        "category":category.value,    
    }
    localStorage.setItem("data",JSON.stringify(data))
    contety.style.display="block";
    create.style.display="block";
    updateBtn.style.display="none";
    clearInputs()
    read()
})

/* end function update */

/* start function search */
titleSearch.addEventListener("click",function(){
    read()
    if(search.style.display=="block"){
        search.style.display="none"
    }else{
        search.style.display="block"
    }
    
    search.placeholder="search by title";
    search.focus()
    search.value=""
    search.onkeyup=function(){
        let products=""
        for(let i=0;i<data.length;i++){
            if(data[i].title.includes(search.value)){
                    products+=`
                    <tr>
                        <td>${i+1}</td>
                        <td>${data[i].title}</td>
                        <td>${data[i].price}</td>
                        <td>${data[i].ads}</td>
                        <td>${data[i].taxs}</td>
                        <td>${data[i].discount}</td>
                        <td>${data[i].total}</td>
                        <td>${data[i].category}</td>
                        <td><button onclick=update(${i})>update</button></td>
                        <td><button onclick=deleteProduct(${i})>delete</button></td>
                    </tr>
                    `
                }
            }
           tbody.innerHTML=products
        }
})

categorySearch.addEventListener("click",function(){
    read()
    if(search.style.display=="block"){
        search.style.display="none"
    }else{
        search.style.display="block"
    }
    search.placeholder="search by category";
    search.focus()
    search.value=""
    search.onkeyup=function(){
        let products=[]
        for(let i=0;i<data.length;i++){
            if(data[i].category.includes(search.value)){
                    products+=`
                    <tr>
                        <td>${i+1}</td>
                        <td>${data[i].title}</td>
                        <td>${data[i].price}</td>
                        <td>${data[i].ads}</td>
                        <td>${data[i].taxs}</td>
                        <td>${data[i].discount}</td>
                        <td>${data[i].total}</td>
                        <td>${data[i].category}</td>
                        <td><button onclick=update(${i})>update</button></td>
                        <td><button onclick=deleteProduct(${i})>delete</button></td>
                    </tr>
                    `
                }
            }
           tbody.innerHTML=products
            
        }
})

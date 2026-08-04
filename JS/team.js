let links = document.querySelectorAll(".linkHeader")
if(localStorage.getItem("link")){
    let index = localStorage.getItem("link")
    links[index].classList.add("active")
}
else{
    links[0].classList.add("active")
}
links.forEach(function(item , index){
    item.addEventListener("click" , function(){
        links.forEach(function(items){
            items.classList.remove("active")
        })
        item.classList.add("active")
        localStorage.setItem("link" , index)
    })
    
})
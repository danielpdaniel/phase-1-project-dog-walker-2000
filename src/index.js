document.addEventListener("DOMContentLoaded", ()=>{
    let newHeader = document.createElement("h2");
    newHeader.textContent = "hiiiiiii"
    document.querySelector("body").appendChild(newHeader)

    const dogUrl = "https://dog.ceo/api/breeds/image/random/"


    function createDog(url){
        const newDog = document.createElement("img");
        newDog.id = "doggie";
        newDog.src = url;
        document.querySelector("body").appendChild(newDog)
    }

    function fetchDog(){
        fetch(`https://dog.ceo/api/breeds/image/random`)
        .then(res => res.json())
        .then(data => createDog(data.message))
    }
    

    // createDog(dogUrl)
    fetchDog()

})
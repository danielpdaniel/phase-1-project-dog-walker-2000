document.addEventListener("DOMContentLoaded", ()=>{
    let newHeader = document.createElement("h2");
    newHeader.textContent = "hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii"
    document.querySelector("body").appendChild(newHeader)

    const dogUrl = "https://dog.ceo/api/breeds/image/random/"


    function createDog(url){
        const newDog = document.createElement("img");
        newDog.id = "doggie";
        newDog.src = url;
        newDog.style.left = "100px"
        document.querySelector("div#dogImg").appendChild(newDog)
    }

    function fetchDog(){
        fetch(`https://dog.ceo/api/breeds/image/random`)
        .then(res => res.json())
        .then(data => createDog(data.message))
    }
    

    // createDog(dogUrl)
    fetchDog()

    // const doggie = document.querySelector("div").childNodes;
    // console.log(doggie)

    function doggieLeft(){
        const thisDoggie = document.querySelector("img#doggie");
        const leftPosition = thisDoggie.style.left.replace('px', '');
        const leftPositionNum = parseInt(leftPosition, 10);
        if(leftPositionNum > 0){
        thisDoggie.style.left = `${leftPositionNum - 10}px`
        }
        // thisDoggie.style.left = `${thisDoggie.style.left + 100}px`
    }

    document.addEventListener("keydown", doggieLeft)

})
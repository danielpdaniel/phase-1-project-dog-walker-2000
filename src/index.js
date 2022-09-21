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
        newDog.style.bottom = `0px`
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
    const speed = 100;

    function doggieLeft(){
        const thisDoggie = document.querySelector("img#doggie");
        const leftPosition = thisDoggie.style.left.replace('px', '');
        const leftPositionNum = parseInt(leftPosition, 10);
        if(leftPositionNum > 0){
        thisDoggie.style.left = `${leftPositionNum - speed}px`
        }
    };

    function doggieRight(){
        const thisDoggie = document.querySelector("img#doggie");
        const leftPosition = thisDoggie.style.left.replace('px', '');
        const leftPositionNum = parseInt(leftPosition, 10);
        if(leftPositionNum < window.innerWidth){
        thisDoggie.style.left = `${leftPositionNum + speed}px`
        }
    };

    function doggieUp(){
        const thisDoggie = document.querySelector("img#doggie");
        const bottomPosition = thisDoggie.style.bottom.replace("px", "");
        const bottomPositionNum = parseInt(bottomPosition, 10);
        if (bottomPositionNum < window.innerHeight - thisDoggie.height){
        thisDoggie.style.bottom = `${bottomPositionNum + speed}px`
        }
    };

    function doggieDown(){
        const thisDoggie = document.querySelector("img#doggie");
        const bottomPosition = thisDoggie.style.bottom.replace("px", "");
        const bottomPositionNum = parseInt(bottomPosition, 10);
        if (bottomPositionNum > 0){
        thisDoggie.style.bottom = `${bottomPositionNum - speed}px`
        }
    };

    document.addEventListener("keydown", function(event){
        // console.log(event.key)
        if(event.key === "ArrowLeft"){
            doggieLeft()
        }else if (event.key === "ArrowRight"){
            doggieRight()
        }else if(event.key === "ArrowUp"){
            doggieUp()
        }else if(event.key === "ArrowDown"){
            doggieDown()
        }
    })

    console.log(window.innerWidth)
    console.log(window.innerHeight)
    // console.log()
})
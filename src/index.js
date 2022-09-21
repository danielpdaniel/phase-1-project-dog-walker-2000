document.addEventListener("DOMContentLoaded", ()=>{
    let newHeader = document.createElement("h2");
    newHeader.textContent = "hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii"
    document.querySelector("body").appendChild(newHeader)

    const bone = document.createElement("span");
    document.querySelector("body").appendChild(bone);
    bone.textContent = "hey"
    bone.style.left = `${Math.floor(Math.random() * 200)}px`
    bone.style.bottom = `${Math.floor(Math.random() * 200)}px`
    

    const dogUrl = "https://dog.ceo/api/breeds/image/random/"


    function createDog(url){
        const newDog = document.createElement("img");
        newDog.className = "doggies";
        newDog.id = "doggie";
        newDog.src = url;
        newDog.style.left = "100px"
        newDog.style.bottom = `0px`
        document.querySelector("div#dogImg").appendChild(newDog)
    }

    function createDogOption(url){
        const selector = document.querySelector("select#dogDropDown")
        const thisOption = document.createElement("option");
        thisOption.id = url;
        thisOption.textContent = selector.childNodes.length;
        // console.log(message)
        selector.appendChild(thisOption);
        
    }


    function fetchRandomDogs(){
        fetch(`https://dog.ceo/api/breeds/image/random/5`)
        .then(res => res.json())
        .then(data => {
            data.message.forEach(createDogOption)
            // data.message.forEach(console.log(data.message))
        })
    }
    
    function fetchSingleDog(){
        fetch(`https://dog.ceo/api/breeds/image/random`)
        .then(res => res.json)
        .then(data => createDog(data.message))
    }


    createDog(`https://images.dog.ceo/breeds/labrador/n02099712_3613.jpg`)
    fetchRandomDogs()



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
    
    document.querySelector("select#dogDropDown").onchange = function(){
        const optionIndex = document.querySelector("select#dogDropDown").options.selectedIndex;
        const selectedOption = document.querySelector("select#dogDropDown").options[`${optionIndex}`]
        console.log(selectedOption.id)
        document.querySelector("img#doggie").src = selectedOption.id;
    }

    const options = document.querySelector("select#dogDropDown").options

    // createDog(document.querySelector("select#dogDropDown").options[0].id)

    // console.log(options['0'].id)
    console.log(document.querySelector("option"))
})
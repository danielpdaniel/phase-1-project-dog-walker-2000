document.addEventListener("DOMContentLoaded", ()=>{
    let newHeader = document.createElement("h2");
    newHeader.textContent = "hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii"
    newHeader.className = "ui"
    document.querySelector("body").appendChild(newHeader)

    function intMaker(stringValue){
        const num = stringValue.replace("px", "");
        const int = parseInt(num, 10);
        return int;
    }
    function boneMaker(){
    const bone = document.createElement("span");
    document.querySelector("body").appendChild(bone);
    bone.textContent = "🦴";
    bone.className = "bone"
    bone.style.position = "absolute"
    bone.style.left = `${Math.floor(Math.random() * 1000)}px`
    bone.style.bottom = `${Math.floor(Math.random() * 1000)}px`
        if(intMaker(bone.style.left) > window.innerWidth){
            bone.style.left = "0px"
        }
        if(intMaker(bone.style.bottom) > window.innerHeight){
            bone.style.bottom = "0px"
        }
    }
    boneMaker()
    boneMaker()
    boneMaker()
    const bones = [...document.getElementsByClassName("bone")]
    let bonePositions = bones.map(bone => bone.getBoundingClientRect())
    // bones.map(bone => console.log(bone))
    // for(element of bones){
    //     console.log(element.getBoundingClientRect().right, element.getBoundingClientRect().x)
    // }
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
        thisOption.textContent = `${selector.childNodes.length}. ${url.split("/")[4]}`;
        // console.log(message)
        // console.log(url.split('/'))[4];
        selector.appendChild(thisOption);
        
    }


    function fetchRandomDogs(){
        fetch(`https://dog.ceo/api/breeds/image/random/5`)
        .then(res => res.json())
        .then(data => {
            data.message.forEach(createDogOption)
            
            createDog(data.message[0])
            // data.message.forEach(console.log(data.message))
        })
    }
    
    function fetchSingleDog(){
        fetch(`https://dog.ceo/api/breeds/image/random`)
        .then(res => res.json)
        .then(data => createDog(data.message))
    }


    // createDog(`https://images.dog.ceo/breeds/labrador/n02099712_3613.jpg`)
    fetchRandomDogs()

    function positionChecker(){
        const thisDoggie = document.querySelector("img#doggie");
        let boundingObj = thisDoggie.getBoundingClientRect();
        bones.forEach(bone =>{let bonePos = bone.getBoundingClientRect();
        if(boundingObj.bottom >= bonePos.bottom){
            if(boundingObj.top <= bonePos.top){
                if(boundingObj.left <= bonePos.left){
                    if(boundingObj.right >= bonePos.right){
                    bone.textContent = "YOWCH!"
                    document.querySelector("audio#munch").play();
                    }
                }
            }
        }
    })
        // let boundingObj = thisDoggie.getBoundingClientRect()
        
        // console.log(boundingObj.y - boundingObj.x)
    }
    

    let speed = 100;
    // const thisDoggie = document.querySelector("img#doggie");
    // let leftPositionNum = intMaker(thisDoggie.style.left)

    function doggieLeft(){
        const thisDoggie = document.querySelector("img#doggie");
        const leftPositionNum = intMaker(thisDoggie.style.left)
        if(leftPositionNum > 0){
        thisDoggie.style.left = `${leftPositionNum - speed}px`
        }
    };

    function doggieRight(){
        const thisDoggie = document.querySelector("img#doggie");
        const leftPositionNum = intMaker(thisDoggie.style.left)
        if(leftPositionNum < window.innerWidth){
        thisDoggie.style.left = `${leftPositionNum + speed}px`
        }
    };

    function doggieUp(){
        const thisDoggie = document.querySelector("img#doggie");
        const bottomPositionNum = intMaker(thisDoggie.style.bottom)
        if (bottomPositionNum < window.innerHeight - thisDoggie.height){
        thisDoggie.style.bottom = `${bottomPositionNum + speed}px`
        }
    };

    function doggieDown(){
        const thisDoggie = document.querySelector("img#doggie");
        const bottomPositionNum = intMaker(thisDoggie.style.bottom)
        if (bottomPositionNum > 0){
        thisDoggie.style.bottom = `${bottomPositionNum - speed}px`
        }
    };

    document.addEventListener("keydown", function(event){
        // console.log(event.key)
        if(event.key === "ArrowLeft"){
            doggieLeft()
            positionChecker()
        }else if (event.key === "ArrowRight"){
            doggieRight()
            positionChecker()
        }else if(event.key === "ArrowUp"){
            doggieUp()
            positionChecker()
        }else if(event.key === "ArrowDown"){
            doggieDown()
            positionChecker()
        }
    })
    
    // document.querySelector("select#dogDropDown").onchange = function(){
    //     const optionIndex = document.querySelector("select#dogDropDown").options.selectedIndex;
    //     const selectedOption = document.querySelector("select#dogDropDown").options[`${optionIndex}`]
    //     console.log(selectedOption.id)
    //     document.querySelector("img#doggie").src = selectedOption.id;
    // }

    const dogSelect = document.querySelector("select#dogDropDown")
    dogSelect.addEventListener("change", function(){
        const optionIndex = document.querySelector("select#dogDropDown").options.selectedIndex;
        const selectedOption = document.querySelector("select#dogDropDown").options[`${optionIndex}`]
        // console.log(selectedOption.id)
        document.querySelector("img#doggie").src = selectedOption.id;
        
    })

    const options = document.querySelector("select#dogDropDown").options

    const slowBtn = document.querySelector("button#slower")
    slowBtn.addEventListener("click", function(){
        if(speed > 0){
        speed = speed - 10
        }else{
            speed = 0
        }
    })
    const fastBtn = document.querySelector("button#faster")
    fastBtn.addEventListener("click", function(){
        if (speed < 200){
        speed = speed + 10
        }else{
            speed = 200
        }
    })


    // dogSelect.addEventListener("blur", function(){
    //     alert("heyyy")
    // })
    // createDog(document.querySelector("select#dogDropDown").options[0].id)

    // console.log(options['0'].id)
    // console.log(document.querySelector("option"))
    // console.log(document.getElementsByClassName("bone").length)
    // console.log(document.querySelector("select").getBoundingClientRect())
})
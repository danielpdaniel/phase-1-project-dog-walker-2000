document.addEventListener("DOMContentLoaded", ()=>{
    let bonesCrunched = document.createElement("h2");
    let boneCount = 0;
    bonesCrunched.textContent = `Bones Crunched: ${boneCount}`
    bonesCrunched.id = "crunched"
    bonesCrunched.className = "ui"
    document.querySelector("body").appendChild(bonesCrunched)

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
        selector.appendChild(thisOption);
        
    }


    function fetchRandomDogs(){
        fetch(`https://dog.ceo/api/breeds/image/random/5`)
        .then(res => res.json())
        .then(data => {
            data.message.forEach(createDogOption)
            
            createDog(data.message[0])
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
        const bones = [...document.getElementsByClassName("bone")]
        const thisDoggie = document.querySelector("img#doggie");
        let doggiePos = thisDoggie.getBoundingClientRect();
        bones.forEach(bone =>{
        let bonePos = bone.getBoundingClientRect();
            if(doggiePos.bottom >= bonePos.bottom){
                if(doggiePos.top <= bonePos.top){
                    if(doggiePos.left <= bonePos.left){
                        if(doggiePos.right >= bonePos.right){
                        bone.textContent = "YOWCH!"
                        bone.className = "crunched"
                        boneCount = boneCount + 1
                        bonesCrunched.textContent = `Bones Crunched: ${boneCount}`
                        document.querySelector("audio#munch").play();
                        }
                    }
                }
            }
        })
    }
    

    let speed = 100;

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
        if(speed > 10){
        speed = speed - 10
        }else{
            speed = 1
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
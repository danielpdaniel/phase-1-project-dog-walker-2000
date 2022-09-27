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
                bone.style.left = "20px"
            }
            if(intMaker(bone.style.bottom) > window.innerHeight){
                bone.style.bottom = "20px"
            }
    }
    boneMaker()
    boneMaker()
    boneMaker()

   

    function weatherCardMaker() {

    }
   


    function createDog(dog){
        console.log(dog)
        const dogCard = document.createElement("div")
        dogCard.className = "dogCard";

        const dogName = document.createElement("h4"); 
        dogName.textContent = `Name: ${dog.name}`;

        const dogBreed = document.createElement("h5");
        dogBreed.textContent = `Dog Breed: ${dog.breed}`;

        const dogImg = document.createElement("img");
        dogImg.className = "doggies";
        dogImg.id = "doggie";
        dogImg.src = dog.image;
        dogImg.style.left = "100px";
        dogImg.style.bottom = "0px";
    
        dogCard.appendChild(dogName);
        dogCard.appendChild(dogBreed);
        document.querySelector("body").appendChild(dogImg);
        document.querySelector("body").appendChild(dogCard);
    }

    function createDogOption(dog){
        const selector = document.querySelector("select#dogDropDown")
        const thisOption = document.createElement("option");
        thisOption.id = dog.name;
        thisOption.textContent = `${dog.name} the ${dog.breed}`;
        selector.appendChild(thisOption);
        
    }


    function fetchRandomDogs(input){
        fetch(`http://localhost:3000/dogs`)
        .then(res => res.json())
        .then(data => {
            if (document.querySelector("select").options.length === 0){
            for(let dog of data){
                createDogOption(dog)
            }
            }
            if(input === undefined){
            createDog(data[0]);
            }else{
                createDog(data[input])
            }

            // for (let dog of data){
            //     createDog(dog);
            //     createDogOption(dog);
            // }
           
        })
    }
    
    function fetchSingleDog(){
        fetch(`https://dog.ceo/api/breeds/image/random`)
        .then(res => res.json)
        .then(data => createDog(data.message))
    }

    function fetchWeather(){

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
                        bone.textContent = ""
                        bone.className = "crunched"
                        boneCount = boneCount + 1
                        bonesCrunched.textContent = `Bones Crunched: ${boneCount}`
                        if (boneCount === 3){
                            bonesCrunched.textContent = `BonesCrunched: 3 Congrats! You've Crunched all the bones!`
                        }
                        document.querySelector("audio#munch").play();
                        let boneExplode = document.createElement("img");
                        boneExplode.src = "images/bone_explosion.gif";
                        boneExplode.className = "boneExplode";
                        boneExplode.style.left = `0px`;
                        boneExplode.style.bottom = `0px`;
                        bone.appendChild(boneExplode);
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
    dogSelect.addEventListener("change", e => {
       const dogImg = document.querySelector("img#doggie")
       const dogCard = document.querySelector("div.dogCard")
       dogImg.remove();
       dogCard.remove();
        const optionIndex = document.querySelector("select#dogDropDown").options.selectedIndex;
        const selectedOption = document.querySelector("select#dogDropDown").options[`${optionIndex}`]
        // document.querySelector("img#doggie").src = selectedOption.id;
        console.log(selectedOption)
        fetchRandomDogs(optionIndex)
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
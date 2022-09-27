document.addEventListener("DOMContentLoaded", ()=>{

    //Add Elements

    const body = document.querySelector("body")
    let bonesCrunched = document.createElement("h2");
    let boneCount = 0;
    bonesCrunched.textContent = `Bones Crunched: ${boneCount}`
    bonesCrunched.id = "crunched"
    bonesCrunched.className = "ui"
    body.appendChild(bonesCrunched)

    let dogsAvailable = document.createElement("h2");
    dogsAvailable.id = "dogsAvailable";
    dogsAvailable.textContent = `Dogs Available:`;
    body.appendChild(dogsAvailable);

  
    //Functions

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
            if(intMaker(bone.style.left) > window.innerWidth - 10){
                bone.style.left = "20px"
            }
            if(intMaker(bone.style.bottom) > window.innerHeight - 10){
                bone.style.bottom = "20px"
            }
    }
    boneMaker()
    boneMaker()
    boneMaker()
   
    function createDog(dog){
        
        const dogCard = document.createElement("div")
        dogCard.className = "dogCard";
        dogCard.id = dog.name

        const dogName = document.createElement("h4"); 
        dogName.textContent = `Name: ${dog.name}`;

        const dogBreed = document.createElement("h4");
        dogBreed.textContent = `Dog Breed: ${dog.breed}`;

        const dogWins = document.createElement("h4");
        dogWins.textContent = `Wins: ${dog.wins}`;
        dogWins.id = `${dog.name}Wins`;
        
        if (document.querySelector("img#doggie") === null){
        const dogImg = document.createElement("img");
        dogImg.className = "doggie";
        dogImg.id = "doggie";
        dogImg.src = dog.image;
        dogImg.style.left = "0px";
        dogImg.style.bottom = "0px";
        body.appendChild(dogImg);
        }

        const dogCardImg = document.createElement("img")
        dogCardImg.className = "dogCardImg"
        dogCardImg.src = dog.image
    
        dogCard.appendChild(dogName);
        dogCard.appendChild(dogBreed);
        dogCard.appendChild(dogWins);
        dogCard.appendChild(dogCardImg)
        // body.appendChild(dogImg);
        dogsAvailable.appendChild(dogCard);
    }

    let dogOptions;

    function createDogOption(dog){
        const selector = document.querySelector("select#dogDropDown")
        const thisOption = document.createElement("option");
        thisOption.id = dog.name;
        thisOption.textContent = `${dog.name} the ${dog.breed}`;
        selector.appendChild(thisOption);
        
    }

    //Fetch Requests
    
    function fetchDogs(){
        fetch(`http://localhost:3000/dogs`)
        .then(res => res.json())
        .then(data => {
            // if (document.querySelector("select").options.length === 0){
            // for (dog of data){
            //     createDogOption(dog)
            // }
            // }

            // if(input === undefined){
            // createDog(data[0]);
            // }else{
            //     createDog(data[input])
            // }

            // for (let dog of data){
            //     createDog(dog);
            //     createDogOption(dog);
            // }
            dogOptions = [...data];
            data.forEach(createDogOption)
            data.forEach(createDog)
           
        })
    }
    
    function patchDogWins(dog){
        fetch(`http://localhost:3000/dogs/${dog.id}`, {
        method: 'PATCH',
        headers:{
            'Content-type': 'application/json'
        },
        body: JSON.stringify(dog)
        })
        .then(res => res.json)
        .then(data => console.log(data))
    }
    
    fetchDogs()

    //Game Controls
    function positionChecker(){
        const bones = [...document.getElementsByClassName("bone")]
        const thisDoggie = document.querySelector("img#doggie");
        let doggiePos = thisDoggie.getBoundingClientRect();
        bones.forEach(bone =>{
        let bonePos = bone.getBoundingClientRect();
            if(doggiePos.bottom + 3 >= bonePos.bottom){
                if(doggiePos.top - 3 <= bonePos.top){
                    if(doggiePos.left - 3 <= bonePos.left){
                        if(doggiePos.right + 3 >= bonePos.right){
                        bone.textContent = ""
                        bone.className = "crunched"
                        boneCount = boneCount + 1
                        bonesCrunched.textContent = `Bones Crunched: ${boneCount}`
                        if (boneCount === 3){
                            bonesCrunched.textContent = `Bones Crunched: 3, Congrats! You've Crunched all the bones!`
                            let currentDog = dogOptions[document.querySelector("select").options.selectedIndex]
                            currentDog.wins += 1;
                            document.querySelector(`h4#${currentDog.name}Wins`).textContent = `Wins: ${currentDog.wins}`
                            console.log(currentDog)
                            patchDogWins(currentDog)
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
    

    let speed = 5;
    let doggiePadding = "5px"

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
    //    const dogCard = document.querySelector("div.dogCard")
    //    dogImg.remove();
    //    dogCard.remove();
        const optionIndex = document.querySelector("select#dogDropDown").options.selectedIndex;
        const selectedOption = document.querySelector("select#dogDropDown").options[`${optionIndex}`]
        dogImg.src = dogOptions[optionIndex].image;
        
        // fetchRandomDogs(optionIndex)
    })

    const options = document.querySelector("select#dogDropDown").options

    const slowBtn = document.querySelector("button#slower")
    slowBtn.addEventListener("click", function(){
        if(speed > 10){
        speed = speed - 5
        }else{
            speed = 1
        }
    })
    const fastBtn = document.querySelector("button#faster")
    fastBtn.addEventListener("click", function(){
        if (speed < 200){
        speed = speed + 5
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
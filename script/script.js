const allCells = document.getElementById("allCells")
let actionText = document.getElementById("actionText")
const imageDiv = document.getElementById("imageDiv")
const imageText = document.getElementById("imageText")
const api = document.getElementById("api")
let imageTexts = GetImage();
const url = "https://api.chucknorris.io/jokes/random"
const rows = 5;
const columns = 5;
let xPos = 2;
let yPos = 2;
const xMax = 5;
let index = xPos + (yPos * xMax)
let points = 0;


fetch(url)
    .then(function(response) { return response.json() })
    .then(function(data) {
        console.log(data)
        
        let card = document.createElement("div")
        card.setAttribute("class", "card")

        let joke = document.createElement("h4")
        joke.setAttribute("class", "joke")
        joke.setAttribute("id", "joke")
        joke.innerHTML = data.value

        card.appendChild(joke)
        api.appendChild(card)
    }
    ) 

BuildGameGrid()

//const cells = Array.from(document.getElementsByClassName("cell"))
//console.log("cells som array: ", cells)

let player = {
    name: 'P',
    position: index
}
let cat = {
    name: "",
    position: RandomCell()
}
let zombie = {
    name: "",
    position: RandomCell()
}

UpdateCells()

function BuildGameGrid() {

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            let cell = document.createElement("div")
            cell.setAttribute("class", "cell")
            allCells.appendChild(cell)
        }
    }
}

function UpdateCells() {
    document.getElementById("allCells").innerHTML = "";
    document.getElementById("imageDiv").innerHTML = "";
    document.getElementById("points").innerHTML = "Points: " + points;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            let cell = document.createElement("div")
            cell.setAttribute("class", "cell")
            allCells.appendChild(cell)
        }
    }
    DrawPCZ()
    SetImage()
    SetImageText()
    CheckCollision()
}
function SetImage() {   
    document.getElementById("imageDiv").innerHTML = ""
    let image = document.createElement("img")
    image.setAttribute("id", "image")
    image.setAttribute("src", "images/" + player.position + ".jpg")
    imageDiv.appendChild(image)

    if (player.position === cat.position){
        let objectImage = document.createElement("img")
        objectImage.setAttribute("id", "objectImage")
        objectImage.setAttribute("src", "images/cat.jpg")
        imageDiv.appendChild(objectImage)
        console.log("Obj img: ", objectImage)
    }
    if (player.position === zombie.position){
        let objectImage = document.createElement("img")
        objectImage.setAttribute("id", "objectImage")
        objectImage.setAttribute("src", "images/zombie.jpg")
        imageDiv.appendChild(objectImage)
        console.log("Obj img: ", objectImage)
    }
    
}
function SetImageText() {
    document.getElementById("imageText").innerHTML = imageTexts[player.position]
}

function DrawPCZ() {
    let cells = Array.from(document.getElementsByClassName("cell"))
    cells[player.position].innerHTML = player.name
    cells[cat.position].innerHTML = cat.name
    cells[zombie.position].innerHTML = zombie.name
}
function Move(xMove, yMove) {
    actionText.innerHTML = "";
    xPos = Math.max(0, Math.min(xPos + xMove, 4));
    yPos = Math.max(0, Math.min(yPos + yMove, 4));
    index = xPos + (yPos * xMax)
    player.position = index;
    UpdateCells()
}

function CheckCollision() {
    if (player.position === cat.position) {
        actionText.innerHTML = "You saved the kitten, and got points!"
        points += 20;
        while (cat.position === player.position || cat.position === zombie.position)
        {
            cat.position = RandomCell()
            console.log("Cat pos: ", cat.position)
        }
    }
    if (zombie.position === cat.position) {
        while (zombie.position === cat.position || cat.position === player.position)
        {
            cat.position = RandomCell()
        }
    }
    if (player.position === zombie.position) {
        actionText.innerHTML = "Zombie took a bite, you lost points!"
        points -= 10;
        while (zombie.position === cat.position || zombie.position === player.position)
        zombie.position = RandomCell();
    }
}
function RandomCell() {
    return Math.floor(Math.random() * ((rows * columns - 1) - 1 + 1) + 1)
}
function GetImage(player) {
    let images = [
        ["You forgot to bring your bathingsuit!"],
        ["The boat is floating around in the water."],
        ["Youre not sure you dare to cross the bridge."],
        ["You see your home from afar."],
        ["A picnic blancet and a beer would be awesome here."],
        ["The rocks looks weird."],
        ["Youre about to honor your parkour skills."],
        ["The forest is beautiful!"],
        ["Youre wondering around in the landscape."],
        ["There is a house! Wonder who lives there?"],
        ["The lakehouse is your favourite resort."],
        ["Youre thinking you would have done a better job than Frodo..."],
        ["You sit for a while and stare at the moon."],
        ["The creater of this code misses the old days of snowboarding now..."],
        ["You just discovered new species!"],
        ["There was suppose to be a rabbithole here. Where is it?"],
        ["The rain makes the forest so wet."],
        ["Now is the time to take a bath."],
        ["No ninjas to be seen. Good ninjas."],
        ["The scarecrow seems ineffective..."],
        ["You stop for a moment and look at the sky."],
        ["I should have brought my sled!"],
        ["You wave at the traindriver."],
        ["Your stare at the surroundings."],
        ["The waterfall sounds are enjoyable."],
    ]
    return images;
}

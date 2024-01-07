// javascript
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-4ba9c-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementListInDB = ref(database, "endorsementList")


const inputEndorsementEl = document.getElementById("input")
const publishBtnEl = document.getElementById("publish")
const publishedEndorsementEl = document.getElementById("output")

publishBtnEl.addEventListener("click", function() {
    let inputValue = inputEndorsementEl.value;
    if (inputValue) {
        push(endorsementListInDB, inputValue)
        clearInputFieldEl()
    }
})

function clearInputFieldEl(){
    inputEndorsementEl.value = ""
}


onValue(endorsementListInDB, function(snapshot) {
    if(snapshot.exists()){
        let itemsArray = Object.entries(snapshot.val())
        clearPublishedEndorsement()
        for(let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            appendPublishedEntorsements(currentItem)
        }
    }
    else {
        publishedEndorsementEl.textContent = "No Endorsements ...yet"
    }
})

function clearPublishedEndorsement() {
    publishedEndorsementEl.innerHTML = ""
}

function appendPublishedEntorsements( item ) {
    console.log(item)
    let itemID = item[0]
    let itemValue = item[1]
    let newEndorsementEl = document.createElement("p")
    newEndorsementEl.className = "output"
    newEndorsementEl.textContent = itemValue
    publishedEndorsementEl.append(newEndorsementEl)
    newEndorsementEl.addEventListener("dblclick", function() {
        let exactLocationInDB = ref(database, `endorsementList/${itemID}`)
        remove(exactLocationInDB)
    })
}


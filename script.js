	var buttonContainer = document.getElementById("button-container");
	var cardContainer = document.getElementById("card-container");
	var controlsContainer = document.getElementById("controls-container");
	var prevButton = document.getElementById("prevButton");
	var flipButton = document.getElementById("flipButton");
	var nextButton = document.getElementById("nextButton");
	var nextButton2 = document.getElementById("nextButton2");
	var cardStatus = document.getElementById("cardStatus");
	var defaultLanguageSelect = document.getElementById("defaultLanguageSelect");
    var frontCard = document.getElementById("front");
    var backCard = document.getElementById("back");
    var pinyinCard = document.getElementById("pinyin");
    var autoPlayButton = document.getElementById("autoPlayButton");
    var autoplayIntervalInput = document.getElementById("autoplayIntervalInput");
    var toggleRandomCheckbox = document.getElementById("toggleRandomCheckbox");
    var autoRandomPlayButton = document.getElementById("autoRandomPlayButton");
    var frontBack= document.getElementById("frontBack");
	var quizScore = document.getElementById("quizScore");
	var wordListMatch = document.getElementById("wordListMatch");
	var resetMatchingGameButton = document.getElementById("resetMatchingGameButton");
	var wordListTitle = document.getElementById("wordListTitle");
	var matchTitle = document.getElementById("matchTitle");
	var matchPairs = document.getElementById('match-pairs');
	var autoplaySound = document.getElementById('autoplaySound');

//=================================;
// 將文本數據轉換為 JSON 格式
function textToJSON(textData) {
    const lines = textData.trim().split('\n');
    const len = lines.length;

    const headers = lines[0].split('\t');
    const leng = headers.length;

    const jsonData = {};
    const otherItems = [];

    for (let i = 1; i < len; i++) {
        const values = lines[i].split('\t');
        const flashcardClass = values[headers.indexOf("[class]")];

        // 將[class]無值的設為「其他」
        const flashcardClassValue = flashcardClass ? flashcardClass : '其他';

        const item = {};

        for (let j = 0; j < leng; j++) {
            if (headers[j] !== "[class]" && values[j]) {
                item[headers[j].replace(/\[|\]/g, "")] = values[j];
            }
        }

        if (flashcardClassValue === '其他') {
            otherItems.push(item);
        } else {
            if (!jsonData[flashcardClassValue]) {
                jsonData[flashcardClassValue] = [];
            }
            if (Object.keys(item).length > 0) {
                jsonData[flashcardClassValue].push(item);
            }
        }
    }

    // 將「其他」放在最後一個
    if (otherItems.length > 0) {
        jsonData['其他'] = otherItems;
    }

    return jsonData;
}






var flashcards = textToJSON(textData);

/*

function getDataAndConvertToJSON(url) {
      // 使用 Fetch API 發送 HTTP 請求，獲取發布試算表的 HTML 內容
      fetch(url)
        .then(response => response.text())
        .then(html => {
          // 解析 HTML 內容，轉換為 Document 物件
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, "text/html");
          // 使用選擇器找到試算表數據的所有行
          const dataRows = doc.querySelectorAll("table tbody tr");

          const rowDataArray = [];
          // 遍歷每一行數據，並只讀取 A 到 E 欄的數據
          dataRows.forEach(row => {
            const columns = row.querySelectorAll("td");
            const rowData = [];
            for (let i = 0; i < 5; i++) {
              rowData.push(columns[i].textContent);
            }
            rowDataArray.push(rowData.join('\t'));
          });

		  let out = rowDataArray.join('\n');

		  return out;

          //const flashcardsJSON = textToJSON(rowDataArray.join('\n'));
          //console.log(flashcardsJSON);
        })
        .catch(error => {
		  return "錯誤";
          console.error('發生錯誤：', error);
        });
}



let myUrl = new URL(location.href);
let myQ = myUrl.searchParams.get('q');
let myQdata = getDataAndConvertToJSON("https://docs.google.com/spreadsheets/d/e/2PACX-1vSkCQbepJ6PIKkOx6SoIAXEdoSnn4wUk57nTyIcCM7-FwheJqUmtaQw40Xr2h3quyOtlrJyEmSwqHSE/pubhtml");
let myTextData = textToJSON(textData);

console.log(myQdata)
var flashcards = myQdata;

if(myQ){
	if( myQdata == "錯誤"){
				console.log("XX");
		flashcards = myTextData;	
	}else{
		flashcards = myQdata;	
		console.log("QQ");
	}
}else{
			console.log("VV");
  //flashcards = myTextData;
  flashcards = myQdata;
  currentFlashcard = flashcards[getLocalStorage("selectedFlashcard")]  || getObject(flashcards, 0); //閃示卡初始化;
}
*/

// 這裡可以使用 flashcards 變數來訪問轉換後的 JSON 數據

function createFlashcardNameMap(mydata) {
	mydata = mydata;
    var lines = mydata.split('\n');
    var flashcardNameMap = {};
	let len = lines.length;
    for (var i = 1; i < len; i++) {
        var line = lines[i].trim();
        if (line) {
            var columns = line.split('\t');
            if (columns.length === 2) {
                var flashcard = columns[0].trim();
                var name = columns[1].trim();
                flashcardNameMap[flashcard] = name;
            }
        }
    }
    return flashcardNameMap;
}

var flashcardNameMap = createFlashcardNameMap(mydata);


// 定義一個函數，用於根據 flashcardClass 返回對應的文字描述
function getFlashcardDescription(flashcardClass) {
    return flashcardNameMap[flashcardClass] || flashcardClass;
}


function generateFlashcardOptions(selectedFlashcard) {
    const flashcardSelectOptgroup = document.getElementById('flashcardSelectOptgroup');
    flashcardSelectOptgroup.innerHTML = '';

    for (const flashcardClass in flashcards) {
        const option = document.createElement('option');
        option.value = flashcardClass;
        option.textContent = getFlashcardDescription(flashcardClass);
        if (flashcardClass === selectedFlashcard) {
            option.selected = true;
        }
        flashcardSelectOptgroup.appendChild(option);
    }
}


// 頁面載入完成時呼叫函數來動態生成選項;
//document.addEventListener('DOMContentLoaded', generateFlashcardOptions);
var selectedFlashcard;
document.addEventListener('DOMContentLoaded', function () {
    //var selectedFlashcard = getSavedFlashcard();
    selectedFlashcard = getLocalStorage("selectedFlashcard");
    generateFlashcardOptions(selectedFlashcard);
});



function getObject(obj, number) {
	//取得物件,的第幾個元素;
  return obj[Object.keys(obj)[number]]; 
}

var currentFlashcard = flashcards[getLocalStorage("selectedFlashcard")]  || getObject(flashcards, 0); //閃示卡初始化;

//=================================;
// 計算 flashcards 物件內有多少個 flashcard 屬性，若小於1個，表示沒有分類，就隱藏;
if(Object.keys(flashcards).length <= 1){
		flashcardSelect.style.display = "none";
	}else{
		flashcardSelect.style.display = "inline-block";
}



var currentCardIndex = 0;
var autoplaySoundEnabled;
var defaultLanguage = "TH"; // 預設顯示中文;
var flipLanguage = "pinyin"; // ？翻轉後顯示中文;
var buttonCount = 4;
var score = 0;
var quizCardsAll = 0;
//creatButton();

function toggleCheckbox(element, itemName){
	        // 切換勾選框(物件, 儲存名, 狀態);
            const savedState = localStorage.getItem(itemName);
            if (savedState !== null) {
                element.checked = savedState === 'true';
            }
            element.addEventListener('change', function() {
                localStorage.setItem(itemName, element.checked);
				autoplaySoundEnabled = element.checked;
            });
			return element.checked;
}



// 翻轉閃示卡;
function flipCard() {
    if (frontCard.style.display === "none") {
        frontCard.style.display = "block";
        backCard.style.display = "none";
    } else {
        frontCard.style.display = "none";
        backCard.style.display = "block";
    }
    document.activeElement.blur(); 
}

// 顯示總閃示卡數和目前閃示卡索引;
function showCardStatus() {    
    var totalCards = currentFlashcard.length;
    var currentCard = currentCardIndex + 1;
    cardStatus.textContent = currentCard + "/" + totalCards;
}


var currentElement = null;
var currentAudio = null;
// 播放音訊;
function playAudio(element, myAudio) {
	let ka = "https://oikasu.com/file/mp3/";
	let kasu = "https://oikasu.com/file/mp3kasu/";
	let audioTxt = currentFlashcard[currentCardIndex].audio;

    if (myAudio == undefined) {
        myAudio = audioTxt;
    }
    if (!myAudio) {return;}

	let audioUrl = "";

	if (myAudio.endsWith(".kasu")) {
	  myAudio = myAudio.slice(0, -5); // 移除 .kasu
	  audioUrl = kasu + myAudio + ".mp3";
	} else if (myAudio.endsWith(".ka")) {
	  myAudio = myAudio.slice(0, -3); // 移除 .ka
	  audioUrl = ka + myAudio + ".mp3";
	} else if (myAudio.endsWith(".mp3") || myAudio.endsWith(".wav") || myAudio.endsWith(".ogg")) {
	  audioUrl = myAudio;
	} else {
	  audioUrl = myAudio + ".mp3";
	}

	if (currentElement === element && currentAudio && !currentAudio.paused){
		// 同個元素，未停止，就被點，所以要停止它;
		currentAudio.pause();
		currentAudio.currentTime = 0;
		if(currentElement.textContent == 'pause_circle'){
			currentElement.textContent = 'play_circle';
		}
	}else	 if (currentElement !== element && currentAudio && !currentAudio.paused){
		// 不個元素，原未停止，就點新的，所以要停舊播新;
		if(currentElement.textContent == 'pause_circle'){
			currentElement.textContent = 'play_circle';
		}
		currentAudio.pause();
		currentAudio.currentTime = 0;
		currentAudio = new Audio(audioUrl);
		currentElement = element;
		currentAudio.play();
		if(currentElement.textContent == 'play_circle'){
			currentElement.textContent = 'pause_circle';
		}
	}else	{
		currentAudio = new Audio(audioUrl);
		currentElement = element;
		currentAudio.play();
		if(currentElement.textContent == 'play_circle'){
			currentElement.textContent = 'pause_circle';
		}
	}
	
	currentAudio.addEventListener('ended', function() {
		// 播完時;
		if(currentElement.textContent == 'pause_circle'){
			currentElement.textContent = 'play_circle';
		}
	});    
	currentAudio.onerror = function() {
		// 如果播放出現錯誤(無網址)，則顏色改灰色;
		if(currentElement.textContent == 'pause_circle'){
			currentElement.textContent = 'play_circle';
		}
		if(currentElement.classList.contains("material-icons")){
			currentElement.classList.add('w-disabled');
		}
	}
}



// 切換預設顯示語言;
function changeDefaultLanguage() {
    defaultLanguage = defaultLanguageSelect.value;
	var learningMode = document.getElementById("learningModeSelect").value;

	if(learningMode === "match"){
		matchReset();
	}else{	
		showCurrentCard();
    	buttonCorrectWrong();
    }
    document.activeElement.blur(); 
}


// 顯示下一張閃示卡;
function nextCard() {	
	nextButton2.style.display = "none";
    currentCardIndex = (currentCardIndex + 1) % currentFlashcard.length;
    showCurrentCard();
    buttonCorrectWrong();
    buttonDefaultStyle();
    buttonEnable();
    if (frontCard.style.display === "none") {
        frontCard.style.display = "block";
        backCard.style.display = "none";
    }
	audioBtnClass();
	document.removeEventListener("keydown", keydownQuiz);
}

function audioBtnClass(){
	// 無音檔網址則禁止案播放;
	let audioTxt = currentFlashcard[currentCardIndex].audio;
	let audioBtn = document.getElementById("cardAudio");
	if (!audioTxt){
		// 如果沒有音檔網址，則禁止按 ;
		audioBtn.className = 'w-disabled material-icons';
	}else{
		audioBtn.className = 'material-icons t-blue';
	}
}

// 顯示前一張閃示卡;
function prevCard() {
    currentCardIndex = (currentCardIndex - 1 + currentFlashcard.length) % currentFlashcard.length;
    showCurrentCard();
    buttonCorrectWrong();
    buttonDefaultStyle();
    buttonEnable();

    if (frontCard.style.display === "none") {
        frontCard.style.display = "block";
        backCard.style.display = "none";
    }
	audioBtnClass();
}

function changeFlashcard() {
    var select = document.getElementById("flashcardSelect");
    var selectedValue = select.value;
	//saveFlashcard(selectedValue); // 儲存閃示卡組選項;
	setLocalStorage("selectedFlashcard", selectedValue);

	currentFlashcard = flashcards[selectedValue];

	var learningMode = document.getElementById("learningModeSelect").value;

	if(learningMode == "list"){
		var selectedOption = select.options[select.selectedIndex];
		wordListTitle.innerHTML = selectedOption.innerHTML;
		showWordList(); // 顯示語詞清單內容;
	}else if(learningMode == "table"){
		var selectedOption = select.options[select.selectedIndex];
		wordListTitle.innerHTML = selectedOption.innerHTML;
		// 清單顯示的標題;
		showTable(); // 顯示語詞表格內容;
	}else if(learningMode == "quiz"){
		quizReset();
	}else if(learningMode == "match"){
		var selectedOption = select.options[select.selectedIndex];
		matchTitle.innerHTML = selectedOption.innerHTML;
		matchReset();
	}	

	showCurrentCard();
	tableSort();
    document.activeElement.blur(); 
}

// 顯示目前的閃示卡;
function showCurrentCard() {
	let card = currentFlashcard[currentCardIndex];
    if (defaultLanguage === "TH") {
        frontCard.textContent = card.front;
        backCard.textContent = card.back;
        //pinyinCard.textContent = card.pinyin;
    } else if (defaultLanguage === "TP") {
        frontCard.textContent = card.front;
        backCard.textContent = card.pinyin;
        //pinyinCard.textContent = card.pinyin;
    } else if (defaultLanguage === "HT") {
        frontCard.textContent = card.back;
        backCard.textContent = card.front;
        //pinyinCard.textContent = card.pinyin;
    } else if (defaultLanguage === "PT") {
        frontCard.textContent = card.pinyin;
        backCard.textContent = card.front;
        //pinyinCard.textContent = card.back;
    } else if (defaultLanguage === "TPH") {
        //frontCard.innerHTML = card.front + "<br />" + card.pinyin;
        frontCard.innerHTML = "<ruby>" + card.front + "<rp>(</rp><rt>" + card.pinyin + "</rt><rp>)</rp></ruby>";
        backCard.textContent = card.back;
        //pinyinCard.textContent = card.back;
    } else if (defaultLanguage === "HTP") {
        frontCard.textContent = card.back;
        backCard.innerHTML = "<ruby>" + card.front + "<rp>(</rp><rt>" + card.pinyin + "</rt><rp>)</rp></ruby>";
        //pinyinCard.textContent = card.back;
    }

    frontCard.style.display = "block";
    backCard.style.display = "none";

	//let autoplaySoundValue = toggleCheckbox(autoplaySound, "autoplaySound")
	if (autoplaySoundEnabled) {
        playAudio("", card.audio); // 若自動播放聲音，則播放聲音;
    }
    showCardStatus(); // 閃示卡狀態;
}


// 鍵盤事件處理
function keydownFlashcards(event){
		if (event.keyCode === 37) { // 左箭頭鍵 (前一張);
			prevCard();
		} else if (event.keyCode === 39) { // 右箭頭鍵 (下一張);
			nextCard();
		} else if (event.keyCode === 40) { // 下箭頭鍵 (下一張);
			nextCard();
		} else if (event.keyCode === 32) { // 空白鍵 (播放聲音);
			playAudio(this);
		} else if (event.keyCode === 38) { // 上箭頭鍵 (翻轉);
			flipCard();
		}
}


// 鍵盤事件處理; 
function keydownQuiz(event){
		if (event.keyCode === 39) { // 右箭頭鍵 (下一張);
			nextCard();
		} else if (event.keyCode === 32) { // 空白鍵 (播放聲音);
			playAudio(this);
/*
		} else if (event.keyCode === 49) { // 1;			
			let x = document.getElementById("button1");
			checkButton(x);
		} else if (event.keyCode === 50) { // 2;			
			let x = document.getElementById("button2");
			checkButton(x);
		} else if (event.keyCode === 51) { // 3;			
			let x = document.getElementById("button3");
			checkButton(x);
		} else if (event.keyCode === 52) { // 4;			
			let x = document.getElementById("button4");
			checkButton(x);
*/
		}
}


/*
// 取得儲存的閃示卡組選項;
function getSavedFlashcard() {	
    var selectedFlashcard = localStorage.getItem("selectedFlashcard");
	return selectedFlashcard;
}

// 儲存閃示卡組選項;
function saveFlashcard(selectedValue) {
    localStorage.setItem("selectedFlashcard", selectedValue);
}
*/


// 取得儲存;here;
function getLocalStorage(name) {	
    var value = localStorage.getItem(name);
	return value;
}

// 儲存;
function setLocalStorage(name, value) {
    localStorage.setItem(name, value);
}


// 初始化預設語言選項;
function initDefaultLanguageSelect() {
    defaultLanguageSelect.addEventListener("change", changeDefaultLanguage);
    defaultLanguageSelect.value = defaultLanguage;
}

// 初始化翻轉語言選項;
function initFlipLanguageSelect() {
    var flipLanguageSelect = document.getElementById("flipLanguageSelect");
    flipLanguageSelect.addEventListener("change", changeFlipLanguage);
    flipLanguageSelect.value = flipLanguage;
}

// 初始化閃示卡選項;
function initFlashcardSelect() {
    var flashcardSelect = document.getElementById("flashcardSelect");
    flashcardSelect.addEventListener("change", changeFlashcard);
    flashcardSelect.value = getSavedFlashcardKey();
}

// 取得儲存的閃示卡組選項的鍵值;
function getSavedFlashcardKey() {
    var selectedFlashcard = localStorage.getItem("selectedFlashcard");
    return Object.keys(flashcards).find(function(key) {
        return flashcards[key] === flashcards[selectedFlashcard];
    });
}


// 初始化;
function init() {
    initDefaultLanguageSelect();
    //initFlipLanguageSelect();
    initFlashcardSelect();
    showCurrentCard();
    showCardStatus();
    buttonCorrectWrong();
	audioBtnClass();
	
	toggleCheckbox(autoplaySound, "autoplaySound");
	autoplaySoundEnabled = toggleCheckbox(autoplaySound, "autoplaySound")

	toggleCheckbox(toggleRandomCheckbox, "toggleRandomCheckbox");
	tableSort();

}
// 執行初始化;
init();


var autoPlayInterval; // 用於存放自動播放的間隔 ID;
var autoRandomPlayInterval; // 用於存放亂數自動播放的間隔 ID;

// 切換自動播放;
function toggleAutoPlay() {
    if (autoplayIntervalInput.value < 1) {
        autoplayIntervalInput.value = 1;
    }
    var autoplayInterval = parseInt(autoplayIntervalInput.value) * 1000;

    if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
        autoPlayButton.textContent = "自動播放⏯️";
        toggleRandomCheckbox.disabled = false;
    } else {
        autoPlayInterval = setInterval(nextCard, autoplayInterval);
        autoPlayButton.textContent = "停止播放⏸️";
        toggleRandomCheckbox.disabled = true;
    }
}

// 切換亂數自動播放;
function toggleAutoRandomPlay() {
    if (autoplayIntervalInput.value < 1) {
        autoplayIntervalInput.value = 1;
    }
    var autoRandomPlayInterval = parseInt(autoplayIntervalInput.value) * 1000;

    if (autoRandomPlayInterval) {
        clearInterval(autoRandomPlayInterval);
        autoRandomPlayInterval = null;
        autoRandomPlayButton.textContent = "隨機播放⏯️";
        toggleRandomCheckbox.disabled = false; // 啟用 toggleRandomCheckbox;
    } else {
        autoRandomPlayInterval = setInterval(playRandomCard, autoRandomPlayInterval);
        autoRandomPlayButton.textContent = "停止播放⏸️";
        toggleRandomCheckbox.disabled = true; // 禁用 toggleRandomCheckbox;
    }
}

// 播放亂數閃示卡;
function playRandomCard() {
    var totalCards = currentFlashcard.length;
    var remainingCards = getRemainingCards();
    if (remainingCards.length === 0) {
        resetCardStatus(); // 所有閃示卡已播放完畢，重置閃示卡狀態;
        remainingCards = getRemainingCards(); // 重新獲取剩餘閃示卡;
    }
    var randomIndex = Math.floor(Math.random() * remainingCards.length);
    var randomCardIndex = remainingCards[randomIndex];
    currentCardIndex = randomCardIndex;
    showCurrentCard();
    markCardAsPlayed(randomCardIndex);
    buttonDefaultStyle();
    buttonCorrectWrong();
}

// 取得尚未播放的閃示卡索引;
function getRemainingCards() {
    var remainingCards = [];
    for (var i = 0; i < currentFlashcard.length; i++) {
        if (!playedCards.includes(i)) {
            remainingCards.push(i);
        }
    }
    return remainingCards;
}

// 標記已播放的閃示卡;
function markCardAsPlayed(cardIndex) {
    playedCards.push(cardIndex);
}

// 重置閃示卡狀態;
function resetCardStatus() {
    playedCards = []; // 清空已播放閃示卡的列表;
}

// 初始化
var playedCards = []; // 已播放的閃示卡索引列表;

// 取得隨機索引;
function getRandomIndex(max) {
    return Math.floor(Math.random() * max);
}

// 根據checkbox勾選狀態來控制按鈕的顯示和隱藏;
function toggleButtonRandom() {
    if (toggleRandomCheckbox.checked) {
        nextButton.onclick = playRandomCard;
        autoPlayButton.style.display = "none";
        autoRandomPlayButton.style.display = "inline-block";
        prevButton.style.display = "none";
    } else {
        nextButton.onclick = nextCard;
        autoPlayButton.style.display = "inline-block";
        autoRandomPlayButton.style.display = "none";
        prevButton.style.display = "inline-block";
    }
}

function buttonCorrectWrong() {
	// 按鈕填放正確與錯誤答案;
    var arr = [];
	var wrongNumbers = ramdomArrWithoutNum(currentFlashcard, currentCardIndex);
	var card = currentFlashcard[currentCardIndex];
    buttonDefaultStyle();

    if (defaultLanguage === "TH") {
        arr.push(card.back);
        for (let i = 0; i < buttonCount - 1; i++) {
            arr.push(currentFlashcard[wrongNumbers.numArr[i]].back);
        }

    } else if (defaultLanguage === "TP") {
        arr.push(card.pinyin);
        for (let i = 0; i < buttonCount - 1; i++) {
            arr.push(currentFlashcard[wrongNumbers.numArr[i]].pinyin);
        }

    } else if (defaultLanguage === "HT") {
        arr.push(card.front);
        for (let i = 0; i < buttonCount - 1; i++) {
            arr.push(currentFlashcard[wrongNumbers.numArr[i]].front);
        }

    } else if (defaultLanguage === "PT") {
        arr.push(card.front);
        for (let i = 0; i < buttonCount - 1; i++) {
            arr.push(currentFlashcard[wrongNumbers.numArr[i]].front);
        }

    } else if (defaultLanguage === "TPH") {
        arr.push(card.back);
        for (let i = 0; i < buttonCount - 1; i++) {
            arr.push(currentFlashcard[wrongNumbers.numArr[i]].back);
        }
    } else if (defaultLanguage === "HTP") {
        arr.push(card.front);
        for (let i = 0; i < buttonCount - 1; i++) {
            arr.push(currentFlashcard[wrongNumbers.numArr[i]].front);
        }
    }

    arr.sort(getRandomNumber);

    var buttons = buttonContainer.querySelectorAll("button");
	let len = buttons.length;
    for (var i = 0; i < len; i++) {
        var button = buttons[i];
        button.innerText = arr[i];
    }
}

// 按鈕正確錯誤檢查;
function checkButton(event) {
	quizCardsAll = quizCardsAll +1; //已答題數;
	var buttonText;    
    try {
          buttonText = event.target.innerText;
          var backButton = document.getElementById("back");	
          buttonDisable();
		  buttonColor(event.target)
        } catch (error) {
          buttonText = event.innerText;
          var backButton = document.getElementById("back");	
          buttonDisable();
		  buttonColor(event)
        }

		function buttonColor(e){
			if (buttonText === backButton.innerText) {
				// 正確的按鈕;
				e.style.backgroundColor = "green";
				e.style.color = "white";
				score = score + 1;				
			} else {
				// 錯誤的按鈕;
				e.style.backgroundColor = "red";
				e.style.color = "white";
				var buttons = buttonContainer.querySelectorAll("button");
				buttons.forEach(function(button) {
					if (button.innerText === backButton.innerText) {
						button.style.backgroundColor = "green";
						button.style.color = "white";
					}
				});
			}
		}
	let rate = (score / quizCardsAll) * 100;
    let rateString = rate.toFixed(0) + '%'; // 保留兩位小數，並加上百分號;
	quizScore.innerText = "分(" + score + "/" + quizCardsAll + ") 正("+ rateString +")";

	document.addEventListener("keydown", keydownQuiz);
	nextButton2.style.display = "block";
}

function ramdomArrWithoutNum(arr, myNum) {
    const n = arr[myNum];
    const numArr = Array.from({
        length: arr.length
    }, (_, index) => index);

    numArr.splice(myNum, 1);

    for (let i = numArr.length - 1; i > 0; i--) {
        const x = Math.floor(Math.random() * (i + 1));
        [numArr[i], numArr[x]] = [numArr[x], numArr[i]];
    }
    const n1 = numArr[0];
    const n2 = numArr[1];
    const n3 = numArr[2];
    const n4 = numArr[3];
    const n5 = numArr[4];

    return {
        numArr: numArr,
        n: n,
        n1: n1,
        n2: n2,
        n3: n3,
        n4: n4,
        n5: n5
    };
}

function getRandomNumber() {
    return Math.random() - 0.5;
}


// 獲取選擇語言框元素;
//const defaultLanguageSelectBox = document.getElementById('defaultLanguageSelect');

// 在頁面載入時，檢查是否存在儲存的值;
window.addEventListener('load', function() {
    // 檢查 localStorage 是否有儲存的值;
    if (localStorage.getItem('defaultLanguageSelect')) {
        // 獲取儲存的值;
        const storedValue = localStorage.getItem('defaultLanguageSelect');
        // 設定選擇框的值為儲存的值;
        defaultLanguageSelect.value = storedValue;
        defaultLanguage = storedValue;
    } else {
        defaultLanguageSelect.value = "TH";
        defaultLanguage = "TH"; // 預設顯示中文;
    }
});

// 監聽選擇框的變化事件;
defaultLanguageSelect.addEventListener('change', function() {
    // 獲取選擇框的當前值;
    const selectedValue = defaultLanguageSelect.value;
    // 將選擇框的值儲存到 localStorage 中;
    localStorage.setItem('defaultLanguageSelect', selectedValue);
});

function buttonDefaultStyle() {
    if (buttonContainer) {
        var buttons = buttonContainer.querySelectorAll("button");
        buttons.forEach(function(button) {
            button.style.backgroundColor = "white";
            button.style.color = "black";
        });
        buttonEnable();
    }
}

function buttonDisable() {
    // 禁用 button-container 內的所有按鈕;
    var buttons = buttonContainer.querySelectorAll("button");
    buttons.forEach(function(button) {
        button.disabled = true;
    });
}

function buttonEnable() {
    // 禁用 button-container 內的所有按鈕;
    var buttons = buttonContainer.querySelectorAll("button");
    buttons.forEach(function(button) {
        button.disabled = false;
    });
}
 
// 建立選項按鈕;
function creatButton() {
	buttonContainer.innerHTML = "";
    for (var i = 1; i <= buttonCount; i++) {
        let buttonElement = document.createElement("button");
        buttonElement.id = "button" + i;
        buttonElement.className = "button";
        buttonElement.textContent = "Button " + i;
        buttonElement.addEventListener("click", checkButton);
        buttonContainer.appendChild(buttonElement);
    }
}

// 預設字體大小;
var fontSizeSelect = document.getElementById("font-size-select");
var cardElement = document.querySelector(".card");

fontSizeSelect.addEventListener("change", function() {
    var selectedValue = this.value;
    frontCard.style.fontSize = selectedValue + "px";
	back.style.fontSize = selectedValue + "px";
	document.activeElement.blur(); 
});

/*
	if(learningMode == "list"){
		var selectedOption = select.options[select.selectedIndex];
		wordListTitle.innerHTML = selectedOption.innerHTML;
		showWordList(); // 顯示語詞清單內容;
	}else if(learningMode == "table"){



var fontSizeSelect = document.getElementById("font-size-select");
var cardElement = document.querySelector(".card");

function updateFontSize(element) {
  return function() {
    var selectedValue = fontSizeSelect.value;
    element.style.fontSize = selectedValue + "px";
    document.activeElement.blur();
  };
}

*/












//**************************************************************;
// 假設您已經有轉換後的 flashcards 和 flashcardNameMap 變數
// 獲取選擇學習模式框元素;
const learningModeSelectBox = document.getElementById('learningModeSelect');
const wordList = document.getElementById('wordList');
const wordListItems = document.getElementById('wordListItems');

// 在頁面載入時，檢查是否存在儲存的值;
window.addEventListener('load', function() {
    // 檢查 localStorage 是否有儲存的值;
    if (localStorage.getItem('learningModeSelect')) {
        // 獲取儲存的值;
        const storedValue = localStorage.getItem('learningModeSelect');
        // 設定選擇框的值為儲存的值;
        learningModeSelectBox.value = storedValue;
        handleLearningModeChange(storedValue); // 根據儲存的值處理不同學習模式;
    } else {
        learningModeSelectBox.value = "flashcards";
        handleLearningModeChange("flashcards"); // 預設處理閃示卡模式;
    }
});

// 監聽學習模式選擇框的變化事件;
learningModeSelectBox.addEventListener('change', function() {
    // 獲取選擇框的當前值;
    const selectedValue = learningModeSelectBox.value;
    // 將選擇框的值儲存到 localStorage 中;
    localStorage.setItem('learningModeSelect', selectedValue);
    // 根據選擇的值處理不同學習模式;
    handleLearningModeChange(selectedValue);
	document.activeElement.blur(); 
});

// 處理不同的學習模式;
function handleLearningModeChange(mode) {
	
    if (mode === "flashcards") {
        // 隱藏語詞清單，顯示閃示卡
		cardContainer.style.display = "block";               
        buttonContainer.style.display = "none";
		wordList.style.display = "none"; 
		controlsContainer.style.display = "block"; 
		prevButton.style.display = "block";
		nextButton.style.display = "block";
		nextButton2.style.display = "none";
		cardStatus.style.display = "block"; 
		defaultLanguageSelect.disabled = false;
        frontBack.addEventListener("click", flipCard);
		document.addEventListener("keydown", keydownFlashcards);
		document.removeEventListener("keydown", keydownQuiz);
		cardStatus.style.display = "block"; 
		quizScore.style.display = "none"; 
		wordListMatch.style.display = "none"; // 配對區域;
		matchPairs.disabled = true;
		autoPlayIntervalClear(); //停止自動播放;
		autoRandomPlayButton.disabled = false;
		autoPlayButton.disabled = false;
		toggleRandomCheckbox.disabled = false;
		frontCard.style.fontSize = 80 + "px";
		backCard.style.fontSize = 80 + "px";

    } else if (mode === "quiz") {
		quizReset(); // 重設;
		cardContainer.style.display = "block";               
        buttonContainer.style.display = "block";
		wordList.style.display = "none"; 
		controlsContainer.style.display = "block"; 
		prevButton.style.display = "none";
		nextButton.style.display = "none";
		nextButton2.style.display = "none";
		cardStatus.style.display = "block"; 
		defaultLanguageSelect.disabled = false;
		frontBack.removeEventListener("click", flipCard);		
		document.removeEventListener("keydown", keydownFlashcards);
		document.removeEventListener("keydown", keydownQuiz);
		cardStatus.style.display = "block"; 
		quizScore.style.display = "block"; 
		wordListMatch.style.display = "none"; // 配對區域;
		matchPairs.disabled = true;
		autoPlayIntervalClear(); //停止自動播放;
		autoRandomPlayButton.disabled = false;
		autoPlayButton.disabled = false;
		toggleRandomCheckbox.disabled = false;
		frontCard.style.fontSize = 50 + "px";
		backCard.style.fontSize = 50 + "px";

    } else if (mode === "list") {
        // 顯示語詞清單，隱藏閃示卡
		cardContainer.style.display = "none";               
        buttonContainer.style.display = "none";
		wordList.style.display = "block"; 
		controlsContainer.style.display = "none"; 
		cardStatus.style.display = "none"; 		
        defaultLanguageSelect.disabled = true;
		frontBack.removeEventListener("click", flipCard);
		document.removeEventListener("keydown", keydownFlashcards);
		document.removeEventListener("keydown", keydownQuiz);
		cardStatus.style.display = "none"; 
		quizScore.style.display = "none"; 
		wordListMatch.style.display = "none"; // 配對區域;
		matchPairs.disabled = true;

        var select = document.getElementById("flashcardSelect");
		var selectedOption = select.options[select.selectedIndex];
		wordListTitle.innerHTML = selectedOption.innerHTML;

		showWordList(); // 顯示語詞清單內容;
		autoPlayIntervalClear(); //停止自動播放;
		autoRandomPlayButton.disabled = true;
		autoPlayButton.disabled = true;
		toggleRandomCheckbox.disabled = true;

    } else if (mode === "table") {
        // 顯示語詞清單，隱藏閃示卡
		cardContainer.style.display = "none";               
        buttonContainer.style.display = "none";
		wordList.style.display = "block"; 
		controlsContainer.style.display = "none"; 
		cardStatus.style.display = "none"; 		
        defaultLanguageSelect.disabled = true;
		frontBack.removeEventListener("click", flipCard);
		document.removeEventListener("keydown", keydownFlashcards);
		document.removeEventListener("keydown", keydownQuiz);
		cardStatus.style.display = "none"; 
		quizScore.style.display = "none"; 
		wordListMatch.style.display = "none"; // 配對區域;
		matchPairs.disabled = true;

        var select = document.getElementById("flashcardSelect");
		var selectedOption = select.options[select.selectedIndex];
		wordListTitle.innerHTML = selectedOption.innerHTML;

		showTable(); // 顯示語詞表格內容;
		tableSort();
		autoPlayIntervalClear(); //停止自動播放;
		autoRandomPlayButton.disabled = true;
		autoPlayButton.disabled = true;
		toggleRandomCheckbox.disabled = true;

    }else if (mode === "match") {
        // 顯示語詞清單，隱藏閃示卡
		cardContainer.style.display = "none";               
        buttonContainer.style.display = "none";
		wordList.style.display = "none"; 
		controlsContainer.style.display = "none"; 
		cardStatus.style.display = "none"; 		
        defaultLanguageSelect.disabled = false;
		frontBack.removeEventListener("click", flipCard);
		document.removeEventListener("keydown", keydownFlashcards);
		document.removeEventListener("keydown", keydownQuiz);
		cardStatus.style.display = "block"; 
		quizScore.style.display = "block"; 
		wordListMatch.style.display = "block"; // 配對區域;
		matchPairs.disabled = false;
		matchReset();
		autoPlayIntervalClear(); //停止自動播放;
		autoRandomPlayButton.disabled = true;
		autoPlayButton.disabled = true;
		toggleRandomCheckbox.disabled = true;
	}
}


function autoPlayIntervalClear(){
	// 停止自動播放;
    if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
        autoPlayButton.textContent = "自動播放⏯️";
        toggleRandomCheckbox.disabled = false;
    }

    if (autoRandomPlayInterval) {
        clearInterval(autoRandomPlayInterval);
        autoRandomPlayInterval = null;
        autoRandomPlayButton.textContent = "隨機播放⏯️";
        toggleRandomCheckbox.disabled = false;
    }
}

// 定義一個函數，用於根據 flashcardClass 返回對應的文字描述;
function getFlashcardDescription(flashcardClass) {
    return flashcardNameMap[flashcardClass] || flashcardClass;
}

function quizReset(){
	let rate = (score / quizCardsAll) * 100;
    let rateString = 0;
	quizCardsAll = 0;
	currentCardIndex = 0;
	score = 0;
	creatButton();
    showCurrentCard();
    buttonCorrectWrong();
	quizScore.innerText = "分(" + score + "/" + quizCardsAll + ") 正("+ rateString +")";
}

function matchReset(){
	matchingList = [];
	matchingTryNum = 0;
	matchingTryRightNum = 0;
	let rate = (matchingTryNum / matchingNum) * 100;
    let rateString = 0;
	quizCardsAll = 0;
	currentCardIndex = 0;
	score = 0;
	quizScore.innerText = "分(" + score + ") 正("+ rateString +")";
	startMatchingGame();
}





// 顯示語詞清單內容
function showWordList() {
    // 清空語詞清單
    wordListItems.innerHTML = '';

    // 獲取所選的語詞清單的 flashcards
    const selectedFlashcards = flashcards[document.getElementById('flashcardSelect').value];
	let len = selectedFlashcards.length;

    if (selectedFlashcards) {
        // 生成語詞清單內容
        for (let i = 0; i < len; i++) {
            const word = selectedFlashcards[i];

            // 創建語詞卡元素
            const wordCard = document.createElement('div');
            wordCard.className = 'word-card';

            // 添加 audio 按鈕;

                const audioBtn = document.createElement('span');
				
                audioBtn.textContent = 'play_circle';
				audioBtn.className = 'material-icons t-blue';

				if (!word.audio){
				  // 如果沒有音檔網址，則禁止按 ;
					audioBtn.className = 'w-disabled material-icons';				
				}else{
					const audioPath = word.audio;
					audioBtn.addEventListener("click", function() {
                      playAudio(this, audioPath); 
                    });
				}
                wordCard.appendChild(audioBtn);       

            // 添加 front 語詞;
            const frontWord = document.createElement('span');
            frontWord.textContent = word.front;
            wordCard.appendChild(frontWord);

            // 添加 pinyin;
            const pinyin = document.createElement('div');
            pinyin.textContent = word.pinyin;
            wordCard.appendChild(pinyin);

            // 添加 back;
            const backWord = document.createElement('div');
            backWord.textContent = word.back;
            wordCard.appendChild(backWord);

            wordListItems.appendChild(wordCard);
        }
    }
}


// 顯示資料表格
function showTable() {
    // 清空資料表格內容
    wordListItems.innerHTML = '';

    // 獲取所選的語詞清單的 flashcards
    const selectedFlashcards = flashcards[document.getElementById('flashcardSelect').value];
    let len = selectedFlashcards.length;

    if (selectedFlashcards) {
        // 創建表格元素
        const table = document.createElement('table');
        table.className = 'word-table';

        // 創建表頭
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');

        // 編號欄位
        const numberHeader = document.createElement('th');
        numberHeader.textContent = '號';
        headerRow.appendChild(numberHeader);

        // 播放聲音按鈕欄位
        const audioHeader = document.createElement('th');
        audioHeader.textContent = '聲';
        headerRow.appendChild(audioHeader);

        // 前、拼、後 欄位
        const headers = ['客語', '拼音', '華語'];
        headers.forEach((header) => {
            const th = document.createElement('th');
            th.textContent = header;
            headerRow.appendChild(th);
        });

        thead.appendChild(headerRow);
        table.appendChild(thead);

        // 創建表格內容
        const tbody = document.createElement('tbody');
        for (let i = 0; i < len; i++) {
            const word = selectedFlashcards[i];
            const row = document.createElement('tr');

            // 編號欄位
            const numberCell = document.createElement('td');
            numberCell.textContent = i + 1;
            row.appendChild(numberCell);

            // 播放聲音按鈕欄位
            const audioCell = document.createElement('td');
            const audioBtn = document.createElement('span');
            audioBtn.textContent = 'play_circle';
            audioBtn.className = 'material-icons t-blue';
            if (!word.audio) {
                // 如果沒有音檔網址，則禁止按鈕
                audioBtn.className = 'w-disabled material-icons';
            } else {
                const audioPath = word.audio;
                audioBtn.addEventListener("click", function() {
                    playAudio(this, audioPath);
                });
            }
            audioCell.appendChild(audioBtn);
            row.appendChild(audioCell);

            // 前、拼、後 欄位
            const frontCell = document.createElement('td');
            frontCell.textContent = word.front;
            row.appendChild(frontCell);

            const pinyinCell = document.createElement('td');
            pinyinCell.textContent = word.pinyin;
            row.appendChild(pinyinCell);

            const backCell = document.createElement('td');
            backCell.textContent = word.back;
            row.appendChild(backCell);

            tbody.appendChild(row);
        }
        table.appendChild(tbody);

        wordListItems.appendChild(table);
    }
}



// 開合;
function w_acc(me, color = "w-red") {
  var x = me.nextElementSibling;

  if (me.className.indexOf("i-minus") == -1) {
    me.className += " i-minus";
    me.className = me.className.replace("i-plus", "");
  } else {
    me.className = me.className.replace("i-minus", "");
    me.className += " i-plus";
  }

  if (x.className.indexOf("w-show") == -1) {
    x.className += " w-show";
    me.className += " " + color;
  } else {
    x.className = x.className.replace("w-show", "");
    me.className = me.className.replace(color, "");
  }
}

function tableSort() {
    // 表格點標題，自動排序;
    // 在網頁底部加 <script>tableSort();</script>
    // window.onload = () => tableSort();
    const getCellValue = (tableRow, columnIndex) => tableRow.children[columnIndex].innerText || tableRow.children[columnIndex].textContent;

    const comparer = (idx, asc) => (r1, r2) => ((el1, el2) =>
        el1 !== '' && el2 !== '' && !isNaN(el1) && !isNaN(el2) ? el1 - el2 : el1.toString().localeCompare(el2)
    )(getCellValue(asc ? r1 : r2, idx), getCellValue(asc ? r2 : r1, idx));

    document.querySelectorAll('th').forEach(th => th.addEventListener('click', (() => {
        const table = th.closest('table');
        const tbody = table.querySelector('tbody');  // 获取表格的 tbody
        Array.from(tbody.querySelectorAll('tr'))
            .sort(comparer(Array.from(th.parentNode.children).indexOf(th), this.asc = !this.asc))
            .forEach(tr => tbody.appendChild(tr));  // 在 tbody 中重新排列行
    })));
}



// 閃示卡組;
/*
var flashcards = {
    flashcard1: [
        { front: "A狗", back: "1dog", pinyin: "gou", audio: "dog.mp3" },
		{ front: "B貓", back: "2cat", pinyin: "mao", audio: "cat.mp3" },
		{ front: "C蘋果", back: "3apple",  pinyin: "pingguo", audio: "apple.mp3"  },
    ],
    flashcard2: [
        { front: "XA狗", back: "1dog", pinyin: "gou", audio: "dog.mp3" },
		{ front: "XB貓", back: "2cat", pinyin: "mao", audio: "cat.mp3" },
		{ front: "XC蘋果", back: "3apple",  pinyin: "pingguo", audio: "apple.mp3"  },
    ]
};
*/

var matchingNum; // 宣告 matchingNum 變數;

window.onload = function () {
  matchingNum = parseInt(matchPairs.value, 10);
};

function updateMatchingNum() {
  matchingNum = parseInt(matchPairs.value, 10);
  matchReset(); // 更新 matchingNum 後，重新生成配對清單並顯示配對遊戲
  document.activeElement.blur(); 
}



var matchingGameCards = document.getElementById('matchingGameCards');

function startMatchingGame() {
 //matchingNum = 8; // 每次配對的卡片數量
 if(matchingNum == undefined){matchingNum = 6;}
 
  matchingGameActive = true;
  cardContainer.style.display = "none"; // 隱藏閃示卡區域
  wordListMatch.style.display = "block"; // 顯示配對遊戲區域
  resetCardStatus(); // 重置閃示卡狀態

  var myList = generateMatchingList(); // 生成配對清單
  showMatchingGame(myList); // 顯示配對遊戲內容
}






function resetMatchingGame() {
  // 重置配對正確答案的陣列
  matchingList = [];
  startMatchingGame();
}

var matchingList = []; // 存放所有可選配對的卡片
var matchingNum; 
var matchingTryNum = 0; // 嘗試配對次數
var matchingTryRightNum = 0; // 配對正確的次數

function generateMatchingList() {
  var myList = []; // 存放當前配對的卡片
  var remainingCards = getRemainingCards();

  // 將matchingNum設定為不超過配對清單的卡片數量
  if (matchingNum > remainingCards.length) {
    matchingNum = remainingCards.length;
	matchPairs.value = matchingNum;
	// 知會最多組數，以免循環;
  }

  // 隨機選取matchingNum個卡片的索引
  var selectedIndexes = [];
  while (selectedIndexes.length < matchingNum) {
    var randomIndex = Math.floor(Math.random() * remainingCards.length);
    if (!selectedIndexes.includes(randomIndex)) {
      selectedIndexes.push(randomIndex);
    }
  }

  // 從 currentFlashcard 中獲取選取的卡片 front 與 pinyin，並添加到配對清單中
  selectedIndexes.forEach(function (index) {
    var card = currentFlashcard[remainingCards[index]];
	let lang = defaultLanguage;
    let a = "";
	let b = "";
	let c = "";
    if( lang === "TH"){
		a = card.front;  b = card.back;	
	}else if( lang === "HT"){
		a = card.front;  b = card.back;
	}else if( lang === "TP" || lang === "PT"){
		a = card.front;  b = card.pinyin;	
	}else if( lang === "TPH"){
        a = card.pinyin + "<br />" + card.front;
		b = card.back;	
	}else if( lang === "HTP"){
        a = card.back
		b = card.pinyin + "<br />" + card.front;
	}else{
		a = card.front;  b = card.pinyin;	
	}	 
	c = card.audio;
    myList.push({ front: a + "|" + c, pinyin: b});
	a = a.replace(/<br \/>/g, "");
	b = b.replace(/<br \/>/g, "");
    matchingList.push({ front: a, pinyin: b});
  });

  return myList;
}



function showMatchingGame(myList) {
  matchingGameCards.innerHTML = ""; // 清空配對遊戲區域

  shuffleArray(myList); // 將配對清單隨機排序

  myList.forEach(function (word) {
    var frontCardContainer = document.createElement('div');
    frontCardContainer.classList.add('word-card', 'matching-card');

    var frontCard = document.createElement('div');
    frontCard.classList.add('cards', 'front');

	let wordFrontArr = word.front.split("|");
	let myHTML ='▶' + `<a class="w-hide">` + wordFrontArr[0] + `</a>`;
	let myHTML2 ='▶' + `<a class="w-hide">` + wordFrontArr[2] + `</a>`;
	if(defaultLanguage == "HT" || defaultLanguage == "PT" || defaultLanguage == "HTP"){
		// 純聽音檔;
		frontCard.innerHTML = myHTML; 
		frontCard.classList.add('t-green');
	}else{
		frontCard.innerHTML = wordFrontArr[0];	
	}

    frontCardContainer.appendChild(frontCard);

    matchingGameCards.appendChild(frontCardContainer);
	//---;


    var pinyinCardContainer = document.createElement('div');
    pinyinCardContainer.classList.add('word-card', 'matching-card');

    var pinyinCard = document.createElement('div');
    pinyinCard.classList.add('cards', 't-blue', 'back');

	pinyinCard.innerHTML = word.pinyin;	

    pinyinCardContainer.appendChild(pinyinCard);
    matchingGameCards.appendChild(pinyinCardContainer);

    // 添加事件監聽器，點擊時觸發 playMatchingCard 函數
    frontCardContainer.addEventListener('click', function () {
		
	  if (autoplaySoundEnabled || frontCard.textContent.includes('▶')) {		  
        playAudio(this, wordFrontArr[1]); // 若自動播放已啟用，則播放聲音;
      }
      // 翻轉卡片
      this.classList.toggle('flipped');
      // 嘗試進行配對
      playMatchingCard(this);
    });

    pinyinCardContainer.addEventListener('click', function () {
      // 翻轉卡片
      this.classList.toggle('flipped');
      // 嘗試進行配對
      playMatchingCard(this);
    });
  });
}
		
function shuffleArray(array) {
  // 對 front 屬性進行隨機排序
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i].front, array[j].front] = [array[j].front, array[i].front];
  }

  // 對 pinyin 屬性進行隨機排序
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i].pinyin, array[j].pinyin] = [array[j].pinyin, array[i].pinyin];
  }

  return array;
}

function playMatchingCard(card) {
  var flippedCards = document.querySelectorAll('.flipped');
  var matchingNumAll = matchingNum * 2;matchingNumAll

  if (flippedCards.length === 2) {
	  matchingTryNum = matchingTryNum + 1;
    var card1 = flippedCards[0];
    var card2 = flippedCards[1];

	var a = card1.textContent.replace(/▶/, '');
	var b = card2.textContent.replace(/▶/, '');

    const exists = matchingList.some(obj => (obj.front === a && obj.pinyin === b) || 
		                        (obj.front === b && obj.pinyin === a));
    if(exists){
		score = score + 100;
		matchingTryRightNum = matchingTryRightNum + 1;
      card1.removeEventListener('click', flipCard);
      card2.removeEventListener('click', flipCard);
      card1.classList.add('matched');
      card2.classList.add('matched');
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
	  // 檢查是否全部配對完成
	  var matchedCards = document.querySelectorAll('.matched');
	  if (matchedCards.length === matchingNumAll) {
		//alert('恭喜你完成配對遊戲！');
		//matchReset();
	  }
    } else {
		score = score - 50;
      // 配對失敗，重新翻回背面
      setTimeout(function () {
	    card1.classList.remove('flipped');
        card2.classList.remove('flipped');
      }, 400);
    }
	let rate = (matchingTryRightNum / matchingTryNum) * 100;
    let rateString = rate.toFixed(0) + '%'; // 保留兩位小數，並加上百分號;
	if(score <= 0){score=0;}
	quizScore.innerText = "分(" + score + ") 正("+ rateString +")";
  }
}




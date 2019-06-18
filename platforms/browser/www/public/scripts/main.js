onload = function () {

    // 각 픽토그램
    var pictograms = document.querySelectorAll(".pictogram");

    // 확대 버튼
    var fullScreenButton = document.querySelector("#full-screen-button");
    var fullScreen = 1;

    // 확대시킨 횟수 카운트
    var count = 0;
    // 선택된 픽토그램을 담는 배열리스트
    var fullScreenIcon = [];



    for (let pictogram of pictograms) {
        pictogram.addEventListener("click", function () {
            if (pictogram.classList.contains("selected")) {
                (pictogram.querySelector(".sequence")).textContent = "";
                pictogram.classList.remove("selected");
                fullScreenIconRemove(pictogram.id);
                (pictogram.querySelector("div")).classList.remove("sequence");
                selectederReordering();
                count--;
            } else {
                // 만약 선택된 이미지의 개수가 6개 이하라면 '참' 그렇지 않으면 '거짓'
                if (count < 6) {
                    pictogram.classList.add("selected");
                    fullScreenIcon[count] = pictogram.id;
                    (pictogram.querySelector("div")).classList.add("sequence");
                    // alert(fullScreenIcon[count]);
                    count++;
                    (pictogram.querySelector(".sequence")).textContent = count;
                } else {
                    // 이미지 확대(선택)는 최대 6개 까지밖에 안된다고 알람 뜸
                    alert("이미지 선택은 6개가 최대입니다.");
                }
            }
        })
    }

    // 검색 함수
    function search(query) {
        for (let pictogram of pictograms) {
            // 각 픽토그램이 가진 클레스를 문자열로 변환
            var pictogramClass = (pictogram.classList).toString();

            // 만약 문자열이 query를 포함하고있지 않다면
            if (pictogramClass.includes(query) != 1) {

                // 없에버림
                pictogram.classList.add("display-none");
            } else {
                pictogram.classList.remove("display-none");
            }
        }
    }
    function reset() {
        for (let pictogram of pictograms) {
            pictogram.classList.remove("display-none");
        }
    }

    // form의 서브밋이 눌리면 실행됨
    (document.querySelector("#search-field")).addEventListener("submit", function(event) {
        // form의 기본 동작을 막아줌
        event.preventDefault();

        var query = document.querySelector("#search-bar").value;
        if (query == "") {
            reset();
        } else {
            search(query);
        }
    })
    
    // 메뉴 버튼 누름
    var menuButton = document.querySelector("#menu-button");
    var category = document.querySelector("#category");
    var categoryBg = document.querySelector("#category-bg");

    var CDO = "category-descendant-on";
    
    var trafficButton = document.querySelector("#traffic-button");    // 교통
    var trafficCategory = document.querySelector("#traffic-category");

    var placeButton = document.querySelector("#place-button");    //장소
    var placeCategory = document.querySelector("#place-category");

    menuButton.addEventListener("click", function() {
        category.classList.add("category-on");
        categoryBg.classList.add("category-bg-on");
    });
    
    // 배경쪽을 클릭
    categoryBg.addEventListener("click", function() {
        category.classList.remove("category-on");
        categoryBg.classList.remove("category-bg-on");

        trafficCategory.classList.remove(CDO);
        placeCategory.classList.remove(CDO);
    })
    
    // 교통 클릭
    trafficButton.addEventListener("click", function() {
        placeCategory.classList.remove(CDO);
        trafficCategory.classList.add(CDO);
    })

    //장소 클릭
    placeButton.addEventListener("click", function() {
        trafficCategory.classList.remove(CDO);
        placeCategory.classList.add(CDO);
    })

    //버스 클릭
    var busButton = document.querySelector("#bus-button");
    busButton.addEventListener("click", function() {
        search("버스");
        categoryBg.click();
    })




    // 확대 버튼 누름
    fullScreenButton.addEventListener("click", function () {
        var selecteds = document.querySelectorAll(".selected");
        var selectedsStack = [];
        var selectedsCount = 0;
        
        for (let selected of selecteds) {
            selectedsStack[selectedsCount] = selected;
            selectedsCount++;

        }
        selectedsStack.sort(function(a, b) { // 오름차순
            return a.textContent - b.textContent;
        });
        if (selectedsCount == 1) {
            var imgUrl = getComputedStyle(selectedsStack[0]).getPropertyValue('background-image');
            var oneImg = document.querySelector("#one-img");
            var oneImgIconBox = document.querySelector("#one-img-icon-box");
            oneImgIconBox.style.backgroundImage = imgUrl;
            oneImg.classList.remove("display-none");
            oneImg.addEventListener("click", function() {
                oneImg.classList.add("display-none");
            })

        } else if (selectedsCount == 2) {

            var imgUrl1 = getComputedStyle(selectedsStack[0]).getPropertyValue('background-image');
            var imgUrl2 = getComputedStyle(selectedsStack[1]).getPropertyValue('background-image');
            var twoImg = document.querySelector("#two-img");
            var twoImgIconBox1 = document.querySelector("#two-img-icon-box1");
            var twoImgIconBox2 = document.querySelector("#two-img-icon-box2");
            twoImgIconBox1.style.backgroundImage = imgUrl1;
            twoImgIconBox2.style.backgroundImage = imgUrl2;
            twoImg.classList.remove("display-none");
            twoImg.addEventListener("click", function() {
                twoImg.classList.add("display-none");
            })
        } else if (selectedsCount == 3) {
            var imgUrl1 = getComputedStyle(selectedsStack[0]).getPropertyValue('background-image');
            var imgUrl2 = getComputedStyle(selectedsStack[1]).getPropertyValue('background-image');
            var imgUrl3 = getComputedStyle(selectedsStack[2]).getPropertyValue('background-image');
            var threeImg = document.querySelector("#three-img");
            var threeImgIconBox1 = document.querySelector("#three-img-icon-box1");
            var threeImgIconBox2 = document.querySelector("#three-img-icon-box2");
            var threeImgIconBox3 = document.querySelector("#three-img-icon-box3");
            threeImgIconBox1.style.backgroundImage = imgUrl1;
            threeImgIconBox2.style.backgroundImage = imgUrl2;
            threeImgIconBox3.style.backgroundImage = imgUrl3;
            threeImg.classList.remove("display-none");
            threeImg.addEventListener("click", function() {
                threeImg.classList.add("display-none");
            })
        } else if (selectedsCount == 4) {
            var imgUrl1 = getComputedStyle(selectedsStack[0]).getPropertyValue('background-image');
            var imgUrl2 = getComputedStyle(selectedsStack[1]).getPropertyValue('background-image');
            var imgUrl3 = getComputedStyle(selectedsStack[2]).getPropertyValue('background-image');
            var imgUrl4 = getComputedStyle(selectedsStack[3]).getPropertyValue('background-image');
            var fourImg = document.querySelector("#four-img");
            var fourImgIconBox1 = document.querySelector("#four-img-icon-box1");
            var fourImgIconBox2 = document.querySelector("#four-img-icon-box2");
            var fourImgIconBox3 = document.querySelector("#four-img-icon-box3");
            var fourImgIconBox4 = document.querySelector("#four-img-icon-box4");
            fourImgIconBox1.style.backgroundImage = imgUrl1;
            fourImgIconBox2.style.backgroundImage = imgUrl2;
            fourImgIconBox3.style.backgroundImage = imgUrl3;
            fourImgIconBox4.style.backgroundImage = imgUrl4;
            fourImg.classList.remove("display-none");
            fourImg.addEventListener("click", function() {
                fourImg.classList.add("display-none");
            })
        } else if (selectedsCount == 5) {
            var imgUrl1 = getComputedStyle(selectedsStack[0]).getPropertyValue('background-image');
            var imgUrl2 = getComputedStyle(selectedsStack[1]).getPropertyValue('background-image');
            var imgUrl3 = getComputedStyle(selectedsStack[2]).getPropertyValue('background-image');
            var imgUrl4 = getComputedStyle(selectedsStack[3]).getPropertyValue('background-image');
            var imgUrl5 = getComputedStyle(selectedsStack[4]).getPropertyValue('background-image');
            var fiveImg = document.querySelector("#five-img");
            var fiveImgIconBox1 = document.querySelector("#five-img-icon-box1");
            var fiveImgIconBox2 = document.querySelector("#five-img-icon-box2");
            var fiveImgIconBox3 = document.querySelector("#five-img-icon-box3");
            var fiveImgIconBox4 = document.querySelector("#five-img-icon-box4");
            var fiveImgIconBox5 = document.querySelector("#five-img-icon-box5");
            fiveImgIconBox1.style.backgroundImage = imgUrl1;
            fiveImgIconBox2.style.backgroundImage = imgUrl2;
            fiveImgIconBox3.style.backgroundImage = imgUrl3;
            fiveImgIconBox4.style.backgroundImage = imgUrl4;
            fiveImgIconBox5.style.backgroundImage = imgUrl5;
            fiveImg.classList.remove("display-none");
            fiveImg.addEventListener("click", function() {
                fiveImg.classList.add("display-none");
            })
        } else if (selectedsCount == 6) {
            var imgUrl1 = getComputedStyle(selectedsStack[0]).getPropertyValue('background-image');
            var imgUrl2 = getComputedStyle(selectedsStack[1]).getPropertyValue('background-image');
            var imgUrl3 = getComputedStyle(selectedsStack[2]).getPropertyValue('background-image');
            var imgUrl4 = getComputedStyle(selectedsStack[3]).getPropertyValue('background-image');
            var imgUrl5 = getComputedStyle(selectedsStack[4]).getPropertyValue('background-image');
            var imgUrl6 = getComputedStyle(selectedsStack[5]).getPropertyValue('background-image');
            var sixImg = document.querySelector("#six-img");
            var sixImgIconBox1 = document.querySelector("#six-img-icon-box1");
            var sixImgIconBox2 = document.querySelector("#six-img-icon-box2");
            var sixImgIconBox3 = document.querySelector("#six-img-icon-box3");
            var sixImgIconBox4 = document.querySelector("#six-img-icon-box4");
            var sixImgIconBox5 = document.querySelector("#six-img-icon-box5");
            var sixImgIconBox6 = document.querySelector("#six-img-icon-box6");
            sixImgIconBox1.style.backgroundImage = imgUrl1;
            sixImgIconBox2.style.backgroundImage = imgUrl2;
            sixImgIconBox3.style.backgroundImage = imgUrl3;
            sixImgIconBox4.style.backgroundImage = imgUrl4;
            sixImgIconBox5.style.backgroundImage = imgUrl5;
            sixImgIconBox6.style.backgroundImage = imgUrl6;
            sixImg.classList.remove("display-none");
            sixImg.addEventListener("click", function() {
                sixImg.classList.add("display-none");
            })
        }
    })




    // 배열리스트의 지워진 부분부터 한칸씩 앞당겨줌
    function fullScreenIconRemove(id) {
        for (var i = 0; i < count; i++) {
            if (fullScreenIcon[i] == id) {
                for (i; i < count; i++) {
                    fullScreenIcon[i] = fullScreenIcon[i + 1];
                }
                break;
            }
        }
    }

    

    // 순서 스티커를 재정렬 시켜줌
    function selectederReordering() {
        var index = [];
        var selecteds = document.querySelectorAll(".selected");
        var i = 1;
        for (let selected of selecteds) {
            index[selected.querySelector(".sequence").textContent] = selected;
            i++;
        }
        for (let i = 1; i <= index.length; i++) {
            if (index[i] == undefined) {
                for (let j = i + 1; j < index.length; j++) {
                    // if (index[j].querySelector(".sequence").textContent > 1) {
                        index[j].querySelector(".sequence").textContent--;
                    // }
                }
            }
        }
    }







    // 테스트 버튼
    // var TEST = document.querySelector("#TEST");
    // TEST.addEventListener("click", function() {
    //     // for (var i = 1; i <= 6; i++) {
    //     //     alert(index[i]);
    //     // }
    //     // for (var i = 0; i < 6; i++) {
    //     //     alert(fullScreenIcon[i] + ", " + i);
    //     // }
        
    // })







    var recognition = new SpeechRecognition();
    recognition.lang = 'ko-KR';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    // var diagnostic = document.querySelector('.output');
    // var bg = document.querySelector('html');
    // var hints = document.querySelector('.hints');

    document.querySelector("#microphone").onclick = function() {
        recognition.start();
        console.log('Ready to receive a color command.');
    }

    recognition.onresult = function(event) {
        // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
        // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
        // It has a getter so it can be accessed like an array
        // The [last] returns the SpeechRecognitionResult at the last position.
        // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
        // These also have getters so they can be accessed like arrays.
        // The [0] returns the SpeechRecognitionAlternative at position 0.
        // We then return the transcript property of the SpeechRecognitionAlternative object

        var last = event.results.length - 1;
        var word = event.results[last][0].transcript;

        // diagnostic.textContent = 'Result received: ' + word + '.';
        console.log('Result received: ' + word + '.');
        // console.log('Confidence: ' + event.results[0][0].confidence);

        var replacedWord = word.replace(/\s/g, "");

        document.querySelector("#search-bar").value = replacedWord;
        search(replacedWord);
    }

    recognition.onspeechend = function() {
        recognition.stop();
    }

    recognition.onnomatch = function(event) {
        // diagnostic.textContent = "I didn't recognise that color.";
        console.log("I didn't recognise that word.");
    }

    recognition.onerror = function(event) {
        // diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
        console.log('Error occurred in recognition: ' + event.error);
    }


};
var appBarHeight = "50px";
var botNavHeight = "60px";
var pointColor = "rgb(255, 129, 167)";
var supColor = "rgb(255, 40, 105)";
var subColor = "rgb(255, 178, 201)";
var fullScreenIcoColor = "rgb(255, 232, 239)";

var historyPictogram = [];
var favoritePictogram = [];
historyPictogram = JSON.parse(localStorage.getItem("historyPictogram"));
favoritePictogram = JSON.parse(localStorage.getItem("favoritePictogram"));
if (historyPictogram == null) {
    historyPictogram = [{id : "0"}];
    favoritePictogram = [{id : "0", count : 0}];
}

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
                    M.toast({html: "이미지 선택은 6개가 최대입니다."})
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

    // 마이크 누름
    (document.querySelector("#microphone")).addEventListener("click", function(event) {
        // form의 기본 동작을 막아줌
        // event.preventDefault();

        var query = document.querySelector("#search-bar").value;
        if (query == "") {
            reset();
        } else {
            search(query);
        }
    })
    

    // 바텀 네브 클릭
    var history = document.querySelector("#history");
    var historyIcon = document.querySelector("#history-icon");
    var favorite = document.querySelector("#favorite");
    var favoriteIcon = document.querySelector("#favorite-icon");
    var gungsileong = document.querySelector("#gungsileong");
    var gungsileongIcon = document.querySelector("#gungsileong-icon");

    // 최근 선택 클릭
    history.addEventListener("click", function () {
        historyIcon.src = "public/images/history-on.svg";
        history.classList.add("bottom-nav-buttons-item-selected");

        favoriteIcon.src = "public/images/favorite.svg";
        favorite.classList.remove("bottom-nav-buttons-item-selected");
        gungsileongIcon.src = "public/images/gungsileong.svg";
        gungsileong.classList.remove("bottom-nav-buttons-item-selected");

        for (var pictogram of pictograms) {
            pictogram.classList.remove("history");
        }

        for (var pictogram of pictograms) {
            for (var i = 0; i < historyPictogram.length; i++) {
                if (pictogram.id == historyPictogram[i].id) {
                    pictogram.classList.add("history");
                }
            }
        }

        search("history");
    });

    // 자주 선택 클릭
    favorite.addEventListener("click", function () {
        favoriteIcon.src = "public/images/favorite-on.svg";
        favorite.classList.add("bottom-nav-buttons-item-selected");

        historyIcon.src = "public/images/history.svg";
        history.classList.remove("bottom-nav-buttons-item-selected");
        gungsileongIcon.src = "public/images/gungsileong.svg";
        gungsileong.classList.remove("bottom-nav-buttons-item-selected");

        for (var pictogram of pictograms) {
            pictogram.classList.remove("favorite");
        }

        for (var pictogram of pictograms) {

            if (favoritePictogram.length < 13) {
                for (var i = 0; i < favoritePictogram.length; i++) {
                    if (pictogram.id == favoritePictogram[i].id) {
                        pictogram.classList.add("favorite");
                    }
                }
            } else {
                for (var i = 0; i < 13; i++) {
                    if (pictogram.id == favoritePictogram[i].id) {
                        pictogram.classList.add("favorite");
                    }
                }
            }
        }

        search("favorite");
    });
    gungsileong.addEventListener("click", function () {
        gungsileongIcon.src = "public/images/gungsileong-on.svg";
        gungsileong.classList.add("bottom-nav-buttons-item-selected");

        historyIcon.src = "public/images/history.svg";
        history.classList.remove("bottom-nav-buttons-item-selected");
        favoriteIcon.src = "public/images/favorite.svg";
        favorite.classList.remove("bottom-nav-buttons-item-selected");

        search("");
    });






// 교통 버튼들
    document.querySelector("#traffic-button").addEventListener("click", function () {
        search("교통");
    })
    // document.querySelector("#taxi-button").addEventListener("click", function () {
    //     search("택시");
    // });
    // document.querySelector("#airplane-button").addEventListener("click", function () {
    //     search("비행기");
    // });
    // document.querySelector("#subway-button").addEventListener("click", function () {
    //     search("지하철");
    // });
    // document.querySelector("#bus-button").addEventListener("click", function () {
    //     search("버스");
    // });
    // document.querySelector("#ship-button").addEventListener("click", function () {
    //     search("배");
    // });
    // document.querySelector("#etc-button").addEventListener("click", function () {
    //     search("자동차");
    // });

// 통신 버튼
    document.querySelector("#communication-button").addEventListener("click", function () {
        search("통신");
    });

// 숫자 버튼들
    document.querySelector("#number-button").addEventListener("click", function () {
        search("숫자");
    });
    // document.querySelector("#money-button").addEventListener("click", function () {
    //     search("돈");
    // });
    // document.querySelector("#count-button").addEventListener("click", function () {
    //     search("개수");
    // });

// 상태 버튼들
    document.querySelector("#emotion-button").addEventListener("click", function () {
        search("감정");
    });
    // document.querySelector("#positive-button").addEventListener("click", function () {
    //     search("긍정");
    // });
    // document.querySelector("#denial-button").addEventListener("click", function () {
    //     search("부정");
    // });

// 장소 버튼들
    document.querySelector("#places-button").addEventListener("click", function () {
        search("장소");
    });
    // document.querySelector("#public-places-button").addEventListener("click", function () {
    //     search("공공장소");
    // });
    // document.querySelector("#religion-button").addEventListener("click", function () {
    //     search("종교");
    // });
    // document.querySelector("#tourist-destination-button").addEventListener("click", function () {
    //     search("관광지");
    // });
    // document.querySelector("#way-button").addEventListener("click", function () {
    //     search("길");
    // });

// 도구 버튼들
    document.querySelector("#tool-button").addEventListener("click", function () {
        search("도구");
    });
    // document.querySelector("#cloth-button").addEventListener("click", function () {
    //     search("천");
    // });
    // document.querySelector("#ironware-button").addEventListener("click", function () {
    //     search("쇠붙이");
    // });





    // 확대 버튼 누름
    fullScreenButton.addEventListener("click", function () {
        var selecteds = document.querySelectorAll(".selected");
        var selectedsStack = [];
        var selectedsCount = 0;
        


        
        for (let selected of selecteds) {
            selectedsStack[selectedsCount] = selected;
            selectedsCount++;



            // historyPictogram배열을 모두 검사하는데 historyPictogram.id와 selected.id가 같은게 아무것도 없으면 historyPictogram에 {id : selected.id}를 집어넣음
            if (historyPictogram.find(function (element) {
                return element.id == selected.id;
            }) == undefined) {
                historyPictogram.unshift({
                    id : selected.id,
                });
            }

            

            // favoritePictogram.id와  selected.id가 다르다면 foundPictogram에 undefined를 저장하고 favoritePictogram에 {id : selected.id, count : 0,}를 추가함
            // favoritePictogram.id와  selected.id가 같다면 foundPictogram에 selected.id를 저장하고 favoritePictogram에 count++ 해줌;
            var foundPictogram = favoritePictogram.find(function (element) {
                return element.id == selected.id;
            });
            if (foundPictogram == undefined) {
                favoritePictogram.push({
                    id : selected.id,
                    count : 0,
                })
            } else {
                foundPictogram.count++;
            }
        }



        historyPictogram = historyPictogram.slice(0, 12);

        favoritePictogram.sort(function (a, b) {
            return b["age"] - a["age"];
        });




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
        localStorage.setItem("historyPictogram", JSON.stringify(historyPictogram));
        localStorage.setItem("favoritePictogram", JSON.stringify(favoritePictogram));
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





    // // 오픈소스 버튼 클릭함
    // var openSources = document.querySelector("open-sources");
    // openSources.addEventListener("click", function () {

    // })


};
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
});

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
});
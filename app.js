//selecting all required elements
window.addEventListener("load", () => {
    const selectBox = document.querySelector(".select-box");
    const selectXBtn = selectBox.querySelector(".playerX");
    const selectOBtn = selectBox.querySelector(".playerO");
    const playBoard = document.querySelector(".play-board");
    const allBox = document.querySelectorAll("section span");
    const players = document.querySelector(".players");
    const result = document.querySelector(".result-box");
    const rePlayBtn = result.querySelector("button");
    const text = document.querySelector(".won-text");
    //addd event click for button
    // selectXBtn.onclick = () => {
    //     selectBox.classList.add("hidden");
    // }
    selectXBtn.addEventListener("click", () => {
        //hide the select box by use classList
        selectBox.classList.add("hidden");
        //show the play board by use classList
        playBoard.classList.add("show");
    });
    selectOBtn.addEventListener("click", () => {
        //hide the select box by use classList
        selectBox.classList.add("hidden");
        //show the play board by use classList
        playBoard.classList.add("show");
        players.setAttribute("class", "players active player");
    });
    //class name with icon 
    let playerXIcon = "fas fa-times";
    let playerOIcon = "fas fa-circle";
    let runBot = true;
    playerSign = "X";
    //add event click for all box
    [...allBox].forEach(item => {
        item.addEventListener("click", (e) => {
            if (players.classList.contains("player")) { //if player is active
                e.target.innerHTML = `<i class="${playerOIcon}"></i>`;
                players.classList.add("active");
                playerSign = "O";
                e.target.setAttribute("id", playerSign);
            } else {
                e.target.innerHTML = `<i class="${playerXIcon}"></i>`;
                players.classList.add("active");
                e.target.setAttribute("id", playerSign);
            }
            selectWinner();
            playBoard.style.pointerEvents = "auto";
            // (players.classList.contains("player")) ? e.target.innerHTML = `<i class="${playerOIcon}"></i>`: e.target.innerHTML = `<i class="${playerXIcon}"></i>`;
            e.target.style.pointerEvents = 'none';
            let randomDelayTime = ((Math.random() * 1000) + 200).toFixed(); //tạo random delay time 
            setTimeout(() => {
                botPlayer(runBot); //gọi ham botPlayer
            }, randomDelayTime);
        });
    });
    /// bot click function
    function botPlayer(runBot) {
        //create emty array to store all box
        if (runBot) {
            playerSign = "O";
            let array = [];
            for (let i = 0; i < allBox.length; i++) {
                // if the array don't have the box
                if (allBox[i].childElementCount === 0) {
                    //push the box to array
                    array.push(i);
                }
            }
            var random = array[Math.floor(Math.random() * array.length)]; //create random number
            if (array.length > 0) {
                if (players.classList.contains("player")) {
                    allBox[random].innerHTML = `<i class="${playerXIcon}"></i>`;
                    players.classList.remove("active");
                    playerSign = "X";
                    allBox[random].setAttribute("id", playerSign);
                } else {
                    allBox[random].innerHTML = `<i class="${playerOIcon}"></i>`;
                    players.classList.remove("active");
                    allBox[random].setAttribute("id", playerSign);
                }
                selectWinner();
            }
            allBox[random].style.pointerEvents = 'none';
            playBoard.style.pointerEvents = "auto";
            playerSign = "X";
        }
    }
    // work with the winner
    function getIdWinner(idname) {
        return document.querySelector(".box" + idname).id; //return the class
    }

    function checkWinner(val1, val2, val3, sign) {
        if (getIdWinner(val1) === sign && getIdWinner(val2) === sign && getIdWinner(val3) === sign) {
            return true;
        }
    }

    function selectWinner() {
        if (checkWinner(1, 2, 3, playerSign) || checkWinner(4, 5, 6, playerSign) || checkWinner(7, 8, 9, playerSign) || checkWinner(1, 4, 7, playerSign) || checkWinner(2, 5, 8, playerSign) || checkWinner(3, 6, 9, playerSign) || checkWinner(1, 5, 9, playerSign) || checkWinner(3, 5, 7, playerSign)) {
            console.log(`${playerSign} is winner`);
            runBot = false;
            botPlayer(runBot);
            setTimeout(() => {
                playBoard.classList.remove("show");
                result.classList.add("show");
            }, 700);
            text.innerHTML = `Player <p>${playerSign}</p> is winner :333`;
        } else {
            if (getIdWinner(1) !== "" && getIdWinner(2) != "" && getIdWinner(3) != "" && getIdWinner(4) != "" && getIdWinner(5) != "" && getIdWinner(6) != "" && getIdWinner(7) != "" && getIdWinner(8) != "" && getIdWinner(9) != "") {
                // console.log("draw");
                runBot = false;
                botPlayer(runBot);
                setTimeout(() => {
                    playBoard.classList.remove("show");
                    result.classList.add("show");
                }, 700);
                text.textContent = "Match has been draw";
            }

        }
    }
    //replaygame
    rePlayBtn.addEventListener("click", () => {
        window.location.reload();
    })
});
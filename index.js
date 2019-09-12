let startY = $("#rabbit").css('top')
let startX = $("#rabbit").offset().left
let formLink = false;




$('#start').click(function(){
    $("body").keydown(function(e) {
        if(e.keyCode == 32) { // jump
            let position = $("#rabbit").css('top')
            let num = position.substring(0,position.length-2)
            let result = Number(num) - 240
            if (position == startY) {
                $("#rabbit").animate({top: `${result}px`},350).animate({top: '60%'},350);
            }
        }
    });
    $("body").on('touchstart',function(e) {
        let position = $("#rabbit").css('top')
        let num = position.substring(0,position.length-2)
        let result = Number(num) - 240
        if (position == startY) {
            $("#rabbit").animate({top: `${result}px`},350).animate({top: '60%'},350);
        }
    });
    start()
});

function randomY (){
    const top = Math.floor(Math.random()*65);
    if (top<30){
        return 30+'vh'
    }
    return top+'vh'
}

function randomSpeed (){
    const speed = Math.floor(Math.random()*6);
    if (speed<2){
        return 2500
    }
    return Number(speed+'000')
}

function start() {
    let seconds = 30
    show(seconds+2)
    show(seconds+1)
    $("#countdown").text(seconds);;
    $("#start").remove()
    $("#intro").remove()
    let countdown = setInterval(function() {
        show(seconds)
        seconds--;
        $("#countdown").text(seconds);
        let selected = seconds+6
        $(`#${selected}`).remove()
        if (seconds <= 0) {
            clearInterval(countdown);
            $("#board").append(`<div id="restart" class="button" onClick="restart()">Play again</div>`)
            if ($("#score").text() >= 20 ){
                $('#showModal').click()
            }
        }
    }, 1000);
};
$('#form').click(function(){
    $("#showModal").click();
    formLink = true;
});
function restart(){
    if (formLink == true ){
        $("#gameModal").remove();
    }
    $(".container").html("")
    $("#score").text(0)
    $("#restart").remove()
    list = []
    start()
};
function show(i){
    if (i>2){
        $(".container").append(`<img id="${i}" class="mooncake" src="colorcake.png">`)
        $(`#${i}`).css({'top':randomY()})
        $(`#${i}`).animate({left:'-30vw'},{
            duration:randomSpeed(),
            step: function() {
                if ( $(this).css('left') >= (`${startX+40}px`) && $(this).css('left') <= (`${startX+110}px`)) {
                    let y = $(this).offset().top
                    let rabStart = $('#rabbit').offset().top
                    let rabEnd = rabStart+120
                    if ( (rabStart+15) <= y && y <= rabEnd ){
                        $(this).remove()
                        scoreAdd($(this).attr('id'))
                    }
                }
            }
        })
    }
}
let list = []
function scoreAdd(id){
    if (list.indexOf(id)==-1){
        list.push(id)
        let score = $("#score").text()
        score++
        $("#score").text(score);
    } 
}

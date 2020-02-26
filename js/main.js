let player1Name="" , player2Name="", turn = "";
let grid =  [[0,0,0],[0,0,0],[0,0,0]];
let hasWinner = 0, moveCount=0;

function boardMsg(x){
	return $("#board").text(x);
}

function setTurn(){
	var r = Math.floor((Math.random() * 2) + 1);
	hasWinner=0;
	if(r==1){
		turn = player1Name;
		boardMsg(player1Name+"'s turn now!");
	}
	else{
		turn = player2Name;
		boardMsg(player2Name+"'s turn now!");
	}
}

function init(){
		turn = "";
		grid =  [[0,0,0],[0,0,0],[0,0,0]];
		boardMsg("");
		$(".col").map(function() {
    		$(this).text("");
		}).get();
		hasWinner = 0;
		moveCount=0;
}

$("#playButton").click(function (){

	if(hasWinner==1){
		init();
	}

	player1Name = $("#player-1-inp").val();
	player2Name = $("#player-2-inp").val();

	if(player1Name=="" || player2Name==""){
		alert("Please set player all the names.");
		return;
	}

	setTurn();


	

});

$(".col").click(function (){

	if(player1Name=="" || player2Name==""){
		alert("Please set player all the names.");
		return;
	}

	let row = $(this).parent().index();
	let  col = $(this).index();

	if(grid[row][col]!==0){
		alert("This position is taken. Please try other position.");
		return;
	}
	if(hasWinner==1){
		alert("Please click play again");
		return;
	}

	if(turn==player1Name){
		moveCount++;
		$(this).text("O");
		grid[row][col] = 1;
		let ifWon = winnerCheck(1,player1Name);
		if(!ifWon){
			if(moveCount>=9){
				boardMsg("Match Drawn!");
				moveCount=0;
				$("#playButton").text("Play again");
				hasWinner=1;
				return;
			}else{
				turn = player2Name;
				boardMsg(player2Name+"'s turn now!");
			}
			return;	
		}
		else{
			return;
		}
		
	}
	else if(turn==player2Name){
		moveCount++;
		$(this).text("X");
		grid[row][col] = 2;
		let ifWon = winnerCheck(2,player2Name);
		if(!ifWon){
			if(moveCount>=9){
				boardMsg("Match Drawn!");
				moveCount=0;
				$("#playButton").text("Play again");
				hasWinner=1;
				return;
			}else{
				turn = player1Name;
				boardMsg(player1Name+"'s turn now!");
			}
			return;	
		}
		else{
			return;
		}
		
	}

});

function winnerCheck(n,playerName){
	if(

		(grid[0][0]==n && grid[0][1]==n && grid[0][2]==n) ||
		(grid[1][0]==n && grid[1][1]==n && grid[1][2]==n) ||
		(grid[2][0]==n && grid[2][1]==n && grid[2][2]==n) ||

		(grid[0][0]==n && grid[1][0]==n && grid[2][0]==n) ||
		(grid[0][1]==n && grid[1][1]==n && grid[2][1]==n) ||
		(grid[0][2]==n && grid[1][2]==n && grid[2][2]==n) ||

		(grid[0][0]==n && grid[1][1]==n && grid[2][2]==n)||
		(grid[0][2]==n && grid[1][1]==n && grid[2][0]==n)


		){
		boardMsg(playerName+" won the game!");
		hasWinner = 1;
		moveCount=0;
		$("#playButton").text("Play again");
		return true;
	}
	return false;
}


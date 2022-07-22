$("#restart").click(function(){
	location.reload();
})

$(document).ready(function(){
	setTimeout(function(){
		$(".container").removeClass("fadeIn");
		$("#Mstats").removeClass("fadeIn");
		$("#Hstats").removeClass("fadeIn");
	},2000);

})

$("#fight").click(function(){

	$("#result").addClass("hidden");
		setTimeout(function(){
			$("#result").removeClass("hidden");
		},500);

	var Aluckbox = $("#Aluckbox").prop("checked");
	var Dluckbox = $("#Dluckbox").prop("checked");

	console.log(Aluckbox);
	console.log(Dluckbox);
	$(this).prop("disabled", "true");

	var decompte1 = new Audio('assets/sounds/decompte1.wav');
	var decompte2 = new Audio('assets/sounds/decompte2.wav');
	var decomptefail = new Audio('assets/sounds/decomptefail.wav');
	var decomptesuccess = new Audio('assets/sounds/decomptesuccess.wav');

	$("#Hstats").removeClass("flash");
	$("#Mstats").removeClass("flash");

	$("#Hstamina").removeClass("animated");
	$("#Hstamina").removeClass("bounce");
	$("#Mstamina").removeClass("animated");
	$("#Mstamina").removeClass("bounce");

	$("#Hhability").prop("disabled", true);
	$("#Mhability").prop("disabled", true);
	$("#Hstamina").prop("disabled", true);
	$("#Mstamina").prop("disabled", true);

	var Hdice = parseInt(Math.floor((Math.random() * 12) + 1));
	var Hhability = $("#Hhability").val();
	var Hstamina = $("#Hstamina").val();
	var Hluck = $("#Hluck").val();
	var Hresultat = (+Hdice)+(+Hhability);

	var Mdice = parseInt(Math.floor((Math.random() * 12) + 1));
	var Mhability = $("#Mhability").val();
	var Mstamina = $("#Mstamina").val();
	var Mluck =$("#Mluck").val();
	var Mresultat = (+Mdice)+(+Mhability);

	$("#result").html("<hr>");
	setTimeout(function(){
		decompte1.play();
		$("#result").append("Vous frappez pour un score de combat de (" +Hhability + " + " + Hdice + ") :<strong> "+Hresultat+"</strong><br>");
	},500);
	setTimeout(function(){
		decompte2.play();
		$("#result").append("L'adversaire vous frappe pour un score de combat de (" +Mhability+ " + " + Mdice  + ") :<strong> "+Mresultat+"</strong><br>");
	},1500);

	if (Hresultat > Mresultat) {
		setTimeout(function(){
		decomptesuccess.play();

		if ($("#Aluckbox").prop("checked") == false){
			var newMstamina = Mstamina-2;
			$("#result").append("L'adversaire perd 2 PV.<br>");
		}
		else{
			var Luck_dice = parseInt(Math.floor((Math.random() * 12) + 1));
			console.log("dé chance = " + Luck_dice);
			if (Luck_dice < Hluck){
				var newMstamina = Mstamina-4;
				var newHluck = Hluck - 1;
				$("#result").append("Un coup chanceux ! L'adversaire perd 4 PV. Vous utilisez 1 point de chance<br>");
				document.getElementById("Aluckbox").checked = false;
				document.getElementById("Dluckbox").checked = false;
				$("#Hluck").val(newHluck);
			}
			else{
				var newMstamina = Mstamina-1;
				var newHluck = Hluck - 1;
				$("#result").append("PAS DE CHANCE, l'adversaire ne perd que 1 PV. Vous utilisez 1 point de chance<br>");
				document.getElementById("Aluckbox").checked = false;
				document.getElementById("Dluckbox").checked = false;
				$("#Hluck").val(newHluck);
			};
			
		};

		$("#Mstamina").val(newMstamina);
		
		$("#Mstamina").addClass("animated");
		$("#Mstamina").addClass("bounce");
		$("#Mstats").addClass("flash");
		},2500);

	}
	else if (Hresultat < Mresultat) {
		setTimeout(function(){
		decomptefail.play();

		if ($("#Dluckbox").prop("checked") == false){
			var newHstamina = Hstamina-2;
			$("#result").append("Vous perdez 2 PV.<br>");
			document.getElementById("Aluckbox").checked = false;
			document.getElementById("Dluckbox").checked = false;
			$("#Hstamina").val(newHstamina);
		}
		else{
			var Luck_dice = parseInt(Math.floor((Math.random() * 12) + 1));
			console.log("dé chance = " + Luck_dice);
			if (Luck_dice < Hluck){
				var newHstamina = Hstamina-1;
				var newHluck = Hluck - 1;
				$("#result").append("CHANCE ! Vous esquivez partiellement le coup et ne perdez qu'1 pv. Vous utilisez 1 point de chance<br>");
				document.getElementById("Aluckbox").checked = false;
				document.getElementById("Dluckbox").checked = false;
				$("#Hluck").val(newHluck);
			}
			else{
				var newHstamina = Hstamina-3;
				var newHluck = Hluck - 1;
				$("#result").append("PAS DE CHANCE, vous perdez 3 PV. Vous utilisez 1 point de chance<br>");
				document.getElementById("Aluckbox").checked = false;
				document.getElementById("Dluckbox").checked = false;
				$("#Hluck").val(newHluck);
			};
		};

		$("#Hstamina").val(newHstamina);
		$("#Hstamina").addClass("animated");
		$("#Hstamina").addClass("bounce");
		$("#Hstats").addClass("flash");
		},2500);
	}
	else if (Hresultat == Mresultat){
		setTimeout(function(){
		$("#result").append("Égalité, le combat continue...<br>");
		},2500);
	}



	setTimeout(function(){
			$("#result").append("<hr>");
			$("#fight").prop("disabled", "");			
		},2500);
});
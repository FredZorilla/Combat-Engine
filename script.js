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

	$(this).prop("disabled", "true");

	var decompte1 = new Audio('decompte1.wav');
	var decompte2 = new Audio('decompte2.wav');
	var decomptefail = new Audio('decomptefail.wav');
	var decomptesuccess = new Audio('decomptesuccess.wav');

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
	var Hresultat = (+Hdice)+(+Hhability);

	var Mdice = parseInt(Math.floor((Math.random() * 12) + 1));
	var Mhability = $("#Mhability").val();
	var Mstamina = $("#Mstamina").val();
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
		var newMstamina = Mstamina-2;
		$("#Mstamina").val(newMstamina);
		$("#result").append("L'adversaire perd 2 points de vie.<br>");
		$("#Mstamina").addClass("animated");
		$("#Mstamina").addClass("bounce");
		$("#Mstats").addClass("flash");
		},2500);
	}
	else if (Hresultat < Mresultat) {
		setTimeout(function(){
		decomptefail.play();
		var newHstamina = Hstamina-2;
		$("#Hstamina").val(newHstamina);
		$("#result").append("Vous perdez 2 points de vie.<br>");
		$("#Hstamina").addClass("animated");
		$("#Hstamina").addClass("bounce");
		$("#Hstats").addClass("flash");
		},2500);
	}
	else if (Hresultat == Mresultat){
		setTimeout(function(){
		$("#result").append("Égalité, le combat continu.<br>");
		},2500);
	}

	setTimeout(function(){
			$("#result").append("<hr>");
			$("#fight").prop("disabled", "");			
		},2500);

});
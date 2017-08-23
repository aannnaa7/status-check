var APP = (function () {
	var model = {
		accounts:[],
		controllerData:[],
		orederOptions:[
			{
				title: "Name",
				value: "fullName"
			},
			{
				title: "Status",
				value: "lastStatusChange"
			}
		],
		selectedOption: "fullName"
	};

	var statusController = {
		init: function(params){
			view.loader();

			var xhttp = new XMLHttpRequest();
			xhttp.open("GET", "api/staff", true);
			xhttp.send();
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {

					model.accounts = JSON.parse(this.responseText);
					model.controllerData = model.accounts.filter(function(account){
						return account.status == params.status;
					});
					view.render();
				}
			};
		},

		subscribe: function(id){
			for(index = 0; index < model.accounts.length; index++){
				if(model.accounts[index].id == id){
					model.accounts[index].subscribed = !model.accounts[index].subscribed;
					break;
				}
			}
			view.render();
		},

		updateOrdering: function(sortBy){
			model.selectedOption = sortBy;

			var arr = model.controllerData;
			model.controllerData.sort(function (a, b) {
			  return a[sortBy] > b[sortBy] ? 1 : a[sortBy] == b[sortBy] ? 0 : -1;
			});
			view.render();
		},

		getOrderOptions: function(){
			return model.orederOptions;
		}
	};

	var view = {
		formatDate: function(milliseconds) {
			var date = new Date(milliseconds);
			var monthNames = [
				"January", "February", "March",
				"April", "May", "June", "July",
				"August", "September", "October",
				"November", "December"
			];

			var day = date.getDate();
			var monthIndex = date.getMonth();
			var year = date.getFullYear();
			var hours = date.getHours();
			var minutes = date.getMinutes();
			var seconds =  date.getSeconds();

			if(hours < 10) hours = "0"+hours;
			if(minutes < 10) minutes = "0"+minutes;
			if(seconds < 10) seconds = "0"+seconds;

			return day + ' ' + monthNames[monthIndex] + ' ' + year + ' ' + hours + ":"  + minutes + ":"  + seconds;
		},

		createArticle: function(account){
			var article = document.createElement('article');
			article.classList.add("employee");

			var div = document.createElement('div');
			div.classList.add("employee__wrapper");
			article.appendChild( div );

			var img = document.createElement('img');
			img.classList.add("employee__avatar");
			img.src = "assets/staff/tatev.jpg";
			div.appendChild(img);

			var h2 = document.createElement('h2');
			h2.classList.add("employee__name");
			h2.textContent = account.fullName;
			div.appendChild(h2);

			var p = document.createElement('p');
			p.classList.add("employee__date");
			p.textContent = view.formatDate(account.lastStatusChange);
			div.appendChild(p);

			var button = document.createElement('button');
			button.classList.add("employee__subscribe");
			var icon = account.subscribed ? "checkmark":"bell";
			button.innerHTML = '<svg class="icon icon-'+icon+'"><use xlink:href="#icon-'+icon+'"></use></svg>';
			button.addEventListener("click", function(){
				statusController.subscribe(account.id);
			});
			div.appendChild(button);

			return article;
		},

		createSelect: function(){
			var select = document.createElement('select');

			var options = statusController.getOrderOptions();
			for(index = 0; index < options.length; index++){
				var option = document.createElement('option');
				option.textContent = options[index].title;
				option.setAttribute('value', options[index].value);
				if(model.selectedOption == options[index].value) option.setAttribute('selected','selected');
				select.appendChild(option);
			}

			select.addEventListener("change", function(){
				statusController.updateOrdering(select.options[select.selectedIndex].value);
			});

			return select;
		},

		render: function(accounts){
			main.innerHTML = "";

			var select = view.createSelect();
			main.appendChild(select);

			var div = document.createElement('div');
			for(index = 0; index < model.controllerData.length; index++){
				var article = view.createArticle(model.controllerData[index]);
				div.appendChild( article );
			}
			var clear = document.createElement('div');
			clear.classList.add("clear");
			div.appendChild(clear);
			main.appendChild(div);
		},

		loader: function(){
			main.innerHTML = 
			'<div style="text-align:center"><svg width="200px"  height="200px"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="lds-rolling" style="background: none; margin:50px auto">'+
				'<circle cx="50" cy="50" fill="none" stroke="#fbba1f" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138" transform="rotate(257.418 50 50)">'+
					'<animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animateTransform>'+
				'</circle>'+
			'</svg></div>';
		}
	};

	return {statusController};
}());
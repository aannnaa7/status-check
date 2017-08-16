var APP = (function () {
	var model = {
		accounts:[],
		controllerData:[]
	};

	var statusController = {
		init: function(params){
			var xhttp = new XMLHttpRequest();
			xhttp.open("GET", "api/staff", true);
			xhttp.send();
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					model.accounts = JSON.parse(this.responseText);
					model.controllerData = model.accounts.filter(function(account){
						return account.status == params.status.toUpperCase();
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
			var time = date.getHours() + ":"  + date.getMinutes() + ":" + date.getSeconds();

			return day + ' ' + monthNames[monthIndex] + ' ' + year + ' ' + time;
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
			h2.textContent = account.name+' '+account.lastName;
			div.appendChild(h2);

			var p = document.createElement('p');
			p.classList.add("employee__date");
			p.textContent = view.formatDate(account.statusChangeDate);
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

		render: function(accounts){
			main.innerHTML = "";
			for(index = 0; index < model.controllerData.length; index++){
				article = view.createArticle(model.controllerData[index]);
				main.appendChild( article );
			}
		}
	};

	return {statusController};
}());
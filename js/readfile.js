(function(window, document, undefined) {

	$(document).ready(function() {

		$(':file').change(function() {
			var file = this.files[0];
			//var name = file.name;
			//var size = file.size;
			var type = file.type;

			//NO CSV!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
			if (!type.match(/application\/vnd.ms-excel|application\/csv/))
				return;

			var fReader = new FileReader();
			fReader.onload = function(event) {
				var data = event.target.result;


				data = data.split('\n');
				data.splice(0, 1);
				data.forEach(function(item, index){
					var tem = data[index].split(',');
					tem.forEach(function(item_, index_){
						tem[index_] = tem[index_].trim() - 0;
					});
					tem.pop();
					data[index] = tem;
				});

				document.querySelector('[name=Text1]').innerHTML = '模擬天數：' + data[data.length - 1][0] + ' 天';

				window.data = data;

				window.plot = new window.Charts.Line('#plot', data);
				//plot.line(1);
			};

			fReader.readAsText(file);

		});

		$('#plotGo').click(function(){
			var line = document.querySelector('#line option:checked').value - 0;
			window.plot.linrre(line);

		});
	})



	$(window).on('load', function(e) {

	})

})(window, document);
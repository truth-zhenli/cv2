
var TemplateEngine = function (html, options) {
    var re = /<%([^%>]+)?%>/g,
        reExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g,
        code = 'var r=[];\n',
        cursor = 0;
    var add = function (line, js) {
        js ? (code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n') :
            (code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
        return add;
    }
    while (match = re.exec(html)) {
        add(html.slice(cursor, match.index))(match[1], true);
        cursor = match.index + match[0].length;
    }
    add(html.substr(cursor, html.length - cursor));
    code += 'return r.join("");';
    return new Function(code.replace(/[\r\t\n]/g, '')).apply(options);
}

$(function () {
	for (var i = 0; i <= 9; i++ ){
		var slide_item2 = $('<li></li>');
		$(slide_item2).append ('<div style="height:400px; background-image:url('+slide_list2[i].source+');background-repeat:no-repeat; background-position:center;background-size:contain;"></div>');
		$(slide_item2).append ('<p>'+slide_list2[i].title+'</p>');
		
		$('#highlight2 .slides').append(slide_item2);
	}
	

	readHash();//in case load all
	function readHash() {
		var hashStr = location.hash.substr(1).toLowerCase();
		if (hashStr === '') {hashStr = "2017";}
		$('tr[data-cate]').hide();
		$('tr[data-cate=' + hashStr + ']').fadeIn(0);
		if (hashStr === '2012') {
			hashStr = "2012 and before";
			for ( var year=2002; year < 2012; year++){
				$('tr[data-cate=' + year + ']').fadeIn(0);
			}
		}
		if (hashStr === '0') {hashStr = "Book chapters";}
		$('#publication-category').text(hashStr);
	}
	window.onhashchange = readHash;//> IE 7
	if (navigator.appVersion.indexOf("MSIE 7.") != -1){
		$('.changehash').click(function(){window.setTimeout(readHash, 100)}) //deal with IE 7
	}

});




$(window).load(function(){
	$('#highlight2.flex2slider').flex2slider({
		animation: "slide",
		start: function(slider){
			$('body').removeClass('loading');
		}
	});


	$('#gallery.flex2slider').flex2slider({
        animation: "slide",
        controlNav: "thumbnails",
		smoothHeight: true,
        start: function(slider){
          $('body').removeClass('loading');
		}
	});
});

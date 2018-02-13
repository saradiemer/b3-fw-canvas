function rgb2hex(orig){
 var rgb = orig.replace(/\s/g,'').match(/^rgba?\((\d+),(\d+),(\d+)/i);
 return (rgb && rgb.length === 4) ? "#" +
  ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : orig;
}

$(".grid-square").each(function() {
	var name = $(this).data("id");
	var color = $(this).css("background-color");
	var hexed = (rgb2hex(color));
  $(this).html("<p class='grid-square-content'><span class='color-name'>" + name + "</span><span class='hex'>" + hexed + "</span></p>");
});
(function() {
})();
window.onscroll = function() {myFunction();};

function myFunction() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        document.getElementById("hidden-menu").className = "show-menu";
    } else {
        document.getElementById("hidden-menu").className = "";
    }
}
/**
 * stacktable.js
 * Author & copyright (c) 2012: John Polacek
 * CardTable by: Justin McNally (2015)
 * Dual MIT & GPL license
 *
 * Page: http://johnpolacek.github.com/stacktable.js
 * Repo: https://github.com/johnpolacek/stacktable.js/
 *
 * jQuery plugin for stacking tables on small screens
 * Requires jQuery version 1.7 or above
 *
 */
;(function($) {
  $.fn.cardtable = function(options) {
    var $tables = this,
        defaults = {headIndex:0},
        settings = $.extend({}, defaults, options),
        headIndex;

    // checking the "headIndex" option presence... or defaults it to 0
    if(options && options.headIndex)
      headIndex = options.headIndex;
    else
      headIndex = 0;

    return $tables.each(function() {
      var $table = $(this);
      if ($table.hasClass('stacktable')) {
        return;
      }
      var table_css = $(this).prop('class');
      var $stacktable = $('<div></div>');
      if (typeof settings.myClass !== 'undefined') $stacktable.addClass(settings.myClass);
      var markup = '';
      var $caption, $topRow, headMarkup, bodyMarkup, tr_class;

      $table.addClass('stacktable large-only');
      $caption = $table.find("caption").clone();
      $topRow = $table.find('tr').eq(0);

      // using rowIndex and cellIndex in order to reduce ambiguity
      $table.find('tbody tr').each(function() {

        // declaring headMarkup and bodyMarkup, to be used for separately head and body of single records
        headMarkup = '';
        bodyMarkup = '';
        tr_class = $(this).prop('class');
        // for the first row, "headIndex" cell is the head of the table
        // for the other rows, put the "headIndex" cell as the head for that row
        // then iterate through the key/values
        $(this).find('td,th').each(function(cellIndex) {
          if ($(this).html() !== ''){
            bodyMarkup += '<tr class="' + tr_class +'">';
            if ($topRow.find('td,th').eq(cellIndex).html()){
              bodyMarkup += '<td class="st-key">'+$topRow.find('td,th').eq(cellIndex).html()+'</td>';
            } else {
              bodyMarkup += '<td class="st-key"></td>';
            }
            bodyMarkup += '<td class="st-val '+$(this).prop('class')  +'">'+$(this).html()+'</td>';
            bodyMarkup += '</tr>';
          }
        });

        markup += '<table class=" '+ table_css +' stacktable small-only"><tbody>' + headMarkup + bodyMarkup + '</tbody></table>';
      });

      $table.find('tfoot tr td').each(function(rowIndex,value) {
        if ($.trim($(value).text()) !== '') {
          markup += '<table class="'+ table_css + ' stacktable small-only"><tbody><tr><td>' + $(value).html() + '</td></tr></tbody></table>';
        }
      });

      $stacktable.prepend($caption);
      $stacktable.append($(markup));
      $table.before($stacktable);
    });
  };

  $.fn.stacktable = function(options) {
    var $tables = this,
        defaults = {headIndex:0},
        settings = $.extend({}, defaults, options),
        headIndex;

    // checking the "headIndex" option presence... or defaults it to 0
    if(options && options.headIndex)
      headIndex = options.headIndex;
    else
      headIndex = 0;

    return $tables.each(function() {
      var table_css = $(this).prop('class');
      var $stacktable = $('<table class="'+ table_css +' stacktable small-only"><tbody></tbody></table>');
      if (typeof settings.myClass !== 'undefined') $stacktable.addClass(settings.myClass);
      var markup = '';
      var $table, $caption, $topRow, headMarkup, bodyMarkup, tr_class;

      $table = $(this);
      $table.addClass('stacktable large-only');
      $caption = $table.find("caption").clone();
      $topRow = $table.find('tr').eq(0);

      // using rowIndex and cellIndex in order to reduce ambiguity
      $table.find('tr').each(function(rowIndex) {

        // declaring headMarkup and bodyMarkup, to be used for separately head and body of single records
        headMarkup = '';
        bodyMarkup = '';
        tr_class = $(this).prop('class');
        // for the first row, "headIndex" cell is the head of the table
        if (rowIndex === 0) {
          // the main heading goes into the markup variable
          markup += '<tr class=" '+tr_class +' "><th class="st-head-row st-head-row-main" colspan="2">'+$(this).find('th,td').eq(headIndex).html()+'</th></tr>';
        }
        else {
          // for the other rows, put the "headIndex" cell as the head for that row
          // then iterate through the key/values
          $(this).find('td,th').each(function(cellIndex) {
            if (cellIndex === headIndex) {
              headMarkup = '<tr class="'+ tr_class+'"><th class="st-head-row" colspan="2">'+$(this).html()+'</th></tr>';
            } else {
              if ($(this).html() !== ''){
                bodyMarkup += '<tr class="' + tr_class +'">';
                if ($topRow.find('td,th').eq(cellIndex).html()){
                  bodyMarkup += '<td class="st-key">'+$topRow.find('td,th').eq(cellIndex).html()+'</td>';
                } else {
                  bodyMarkup += '<td class="st-key"></td>';
                }
                bodyMarkup += '<td class="st-val '+$(this).prop('class')  +'">'+$(this).html()+'</td>';
                bodyMarkup += '</tr>';
              }
            }
          });

          markup += headMarkup + bodyMarkup;
        }
      });

      $stacktable.prepend($caption);
      $stacktable.append($(markup));
      $table.before($stacktable);
    });
  };

 $.fn.stackcolumns = function(options) {
    var $tables = this,
        defaults = {},
        settings = $.extend({}, defaults, options);

    return $tables.each(function() {
      var $table = $(this);
      var num_cols = $table.find('tr').eq(0).find('td,th').length; //first table <tr> must not contain colspans, or add sum(colspan-1) here.
      if(num_cols<3) //stackcolumns has no effect on tables with less than 3 columns
        return;

      var $stackcolumns = $('<table class="stacktable small-only"></table>');
      if (typeof settings.myClass !== 'undefined') $stackcolumns.addClass(settings.myClass);
      $table.addClass('stacktable large-only');
      var tb = $('<tbody></tbody>');
      var col_i = 1; //col index starts at 0 -> start copy at second column.

      while (col_i < num_cols) {
        $table.find('tr').each(function(index) {
          var tem = $('<tr></tr>'); // todo opt. copy styles of $this; todo check if parent is thead or tfoot to handle accordingly
          if(index === 0) tem.addClass("st-head-row st-head-row-main");
          var first = $(this).find('td,th').eq(0).clone().addClass("st-key");
          var target = col_i;
          // if colspan apply, recompute target for second cell.
          if ($(this).find("*[colspan]").length) {
            var i =0;
            $(this).find('td,th').each(function() {
                var cs = $(this).attr("colspan");
                if (cs) {
                  cs = parseInt(cs, 10);
                  target -= cs-1;
                  if ((i+cs) > (col_i)) //out of current bounds
                    target += i + cs - col_i -1;
                  i += cs;
                }
                else
                  i++;

                if (i > col_i)
                  return false; //target is set; break.
            });
          }
          var second = $(this).find('td,th').eq(target).clone().addClass("st-val").removeAttr("colspan");
          tem.append(first, second);
          tb.append(tem);
        });
        ++col_i;
      }

      $stackcolumns.append($(tb));
      $table.before($stackcolumns);
    });
  };

}(jQuery));
$( "#nav li:nth-child(4) a" ).html('Other <span class="hidden-md"> Applicants</span>');
$( "#navbar-footer li:nth-child(1) a" ).html('<span class="hidden-md">Come </span>Visit');
$( "#navbar-footer li:nth-child(2) a" ).html('Apply<span class="hidden-md"> Now</span>');
$( "#navbar-footer li:nth-child(3) a" ).html('<span class="hidden-md">Get </span>Info</a>');
$( "#navbar-footer li:nth-child(4) a" ).html('<span class="hidden-md">Check </span>Status</a>');

// Built by kilian_sweeney@yahoo.com 07/15/2014.
// To debug the html in order to see if any questions are assigned
// to colleges that don't exist or to see if any of the colleges listed
// are not represented in the questions add the following query string to the url
// "?debug=true"

window.twttr = (function (d,s,id) {
    var t, js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return; js=d.createElement(s); js.id=id;
    js.src="//platform.twitter.com/widgets.js"; fjs.parentNode.insertBefore(js, fjs);
    return window.twttr || (t = { _e: [], ready: function(f){ t._e.push(f); } });
  }(document, "script", "twitter-wjs"));

function trackTwitter(intent_event) {
  if (intent_event) {
    var opt_pagePath;
    if (intent_event.target && intent_event.target.nodeName == 'IFRAME') {
          opt_target = extractParamFromUri(intent_event.target.src, 'url');
    }
    _gaq.push(['_trackSocial', 'twitter', 'tweet', opt_pagePath]);
  }
}

//Wrap event bindings - Wait for async js to load
//twttr.ready(function (twttr) {
//  twttr.events.bind('tweet', trackTwitter);
//});

$.fn.randomize = function(selector){
    var $elems = selector ? $(this).find(selector) : $(this).children(),
        $parents = $elems.parent();

    $parents.each(function(){
        $(this).children(selector).sort(function(){
            return Math.round(Math.random()) - 0.5;
        }).detach().appendTo(this);
    });

    return this;
};
$(function(){

    //Gear animation start
	var gears = [$('#gears-left'),$('#gears-right')],
		gearsCount = gears.length,
		gearFrameSizes = [275,300],
        gearImageWidths = [3300,3600],
        gearFrames = [[],[]],
		frameInterval = 50,
		gearsInMotion = false,
		rotateGearsForward = true,
		gearFrame = [0,0],
		gearPosition = 0,
		gearNextPosition = 0,
		randomBoolean = function(){
			var randomB = Math.random() >= 0.5;
			return randomB;
		},
		setFrames = function(index){
            var i = gearFrameSizes[index];
			gearFrames[index].push('0px');
            while(i + gearFrameSizes[index] <= gearImageWidths[index]){
                gearFrames[index].push((i*-1) + 'px');
                i += gearFrameSizes[index];
            }
            if(index===0)setFrames(1);
        },
		randomIntFromInterval = function()
		{
			var max = 11, min = 0,tmpPosition = Math.floor(Math.random()*(max-min+1)+min);
			if(rotateGearsForward){
				if(tmpPosition <= gearPosition)tmpPosition = gearFrames[0].length;
			}
			else {
				if(tmpPosition >= gearPosition)tmpPosition = 0;
			}
			return tmpPosition;
		},
		rotateGears = function(index){
			var numberOfFrames = gearFrames[0].length;
			if(typeof index == 'undefined'){
				index = rotateGearsForward ? gearPosition + 1 : gearPosition - 1;
				if(index < 0){
					rotateGearsFoward = true;
					index = 1;
				}

				if(index == numberOfFrames){
					rotateGearsForward = false;
					index = numberOfFrames - 2;
				}
				if(rotateGearsForward){
					if(index == gearNextPosition - 1){
						gearNextPosition = randomIntFromInterval();
						rotateGears();
						return;
					}
				}
				else {
					if(index == gearNextPosition + 1){
						if(gearNextPosition === 0)rotateGearsForward = true;
						else gearNextPosition = randomIntFromInterval();
						rotateGears();
						return;
					}
				}
				//console.log('gearPosition,index,gearNextPosition,rotateGearsForward',gearPosition,index,gearNextPosition,rotateGearsForward);
			}
			for(var i = 0; i < gearsCount; i++){
				gears[i].css('background-position',gearFrames[i][index] + ' 0px');
			}
			if(rotateGearsForward){
				index++;
				if(index == numberOfFrames || index == gearNextPosition){
					rotateGearsForward = index == numberOfFrames ? false : randomBoolean();
					gearsInMotion = false;
					gearPosition = index == numberOfFrames ? index -1 : index;
					return;
				}
			}
			else {
				index--;
				if(index < 0 || index == gearNextPosition){
					rotateGearsForward = index < 0 ? true : randomBoolean();
					gearsInMotion = false;
					gearPosition = index < 0 ? 0 : index;
					return;
				}
			}
			setTimeout(function(){rotateGears(index);},frameInterval);
		};
		setFrames(0);
	//Gear animation end

    var questions = $('.question'),qCount = questions.length,
        _global_posIndex = 0,
        _global_interval = 500,
        _global_pause = false,
        reset = function(){
            _global_posIndex = 0;
            _global_pause = false;
            _global_scores = [];
            $('ul.colleges li').prop('class','selected-0');
            randomizeColleges();
            setPos();
            $('#social-share-modal').hide();
            $('#quiz-results').hide();
            $('#major-image').hide();
        },
        getQueryString = function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r !== null) return unescape(r[2]); return '';
        },
        debug = function (){
            var debug = getQueryString('debug'),
                testQuestions = function(){
                    var associatedColleges,cCount,cId,cName, aCStr,tmpStr;
                    questions.each(function(){
                        aCStr = $(this).data('associatedColleges');
                        associatedColleges = typeof aCStr == 'undefined' ? '' : aCStr.split(',');
                        cCount = associatedColleges.length;
                        tmpStr = $(this).html();
                        if(cCount === 0)console.log('debug Questions: ','The question "' + tmpStr + '" has no associated colleges.');
                        if(cCount == 1 && associatedColleges[0].length === 0){
                            console.log('debug Questions: ','The question "' + tmpStr + '" has no associated colleges.');
                            return;
                        }
                        for(var college in associatedColleges){
                            cName = associatedColleges[college];
                            cId = getCollegeId(cName);
                            if(!$('#' + cId).length)console.log('debug Questions: ','The question "' + tmpStr + '" has an associated college (' + cName + ') that does not appear in the list of colleges.');
                        }
                    });
                    cCount = associatedColleges.length;
                },
                testColleges = function(){
                    var colleges = $('ul.colleges').children('li');
                    colleges.each(function(){
                        var college =$('a',this).html(), tmpStr = ',' + college + ',',usage = 0;
                        questions.each(function(){
                           var associatedColleges = $(this).data('associatedColleges');
                           if(typeof associatedColleges == 'undefined')return;
                           associatedColleges = ',' + associatedColleges + ',';
                           if(associatedColleges.indexOf(tmpStr) > -1)usage++;
                        });
                        if(usage === 0)console.log('debug Colleges: ','The college "' + college + '" is not associated with any questions.');
                    });
                };
            if(debug == 'true'){
                testQuestions();
                testColleges();
                return true;
            }
            return false;
        },
        setPos = function(){
			if(gearsInMotion){
				setTimeout(function(){setPos();},50);
				return;
			}
            setTimeout(function(){
                $('.question.active').removeClass('active');
                $(questions).eq(_global_posIndex).addClass('active');
                _global_posIndex++;
                var posBox = $('#position');
                posBox.html(_global_posIndex + '<span>/</span>' + qCount );
                $('input[type="radio"]').prop('checked',false);
                _global_pause = false;
            },_global_interval);
        },
        getCollegeId = function(cName){
            return cName.toLowerCase().replace(/\s+/g, '-');
        },
        updateClass = function(collegeId){
            var college = $('#' + collegeId);
            if(!college.length){
                return;
            }
            var cClass = college.prop('class'),selNum = cClass.indexOf('selected-') == -1 ? 0 : cClass.substring(9) * 1;
            college.prop('class','');
            college.addClass('selected-' + (selNum + 1));
        },
        setColleges = function(){
          var colleges = $('.colleges li'),
              cCount = colleges.length,

              collegeId ='',college,aTmp;
              console.log(cCount);
            for(var i = 0; i < cCount; i++){
                college = colleges.eq(i);
                aTmp = $(college).children('a');
                aTmp.removeAttr('class');
                aTmp.prop('class','selected-0');
                collegeId = getCollegeId(aTmp.html());
                $(college).prop('id',collegeId);
            }
        },
        setControls = function(){
            var progress = function(isYes){
                if(_global_pause)return;
                _global_pause = true;
                if(_global_posIndex > qCount)return;
                var updateColleges = function(){
                  var updateList = typeof $('.question.active').eq(0).data('associatedColleges') != 'undefined' ? $('.question.active').eq(0).data('associatedColleges').split(',') : [],
                      listCount = updateList.length,collegeId='';
                    for(var i = 0; i < listCount; i++){
                        collegeId = getCollegeId(updateList[i]);
                        updateClass(collegeId);
                        keepScore(updateList[i]);
                    }
                };
                if(isYes)updateColleges();
//                if(_global_posIndex == 3)setResultsAndShare();
                if(_global_posIndex == qCount - 1)setResultsAndShare();
                if(_global_posIndex ==qCount)return;
                setPos();
            };
            $('#yes').click(function(){
                if(_global_pause){
                    if(!$(this).hasClass('active-input'))$(this).prop('checked',false);
                    return false;
                }
				gearNextPosition = randomIntFromInterval();
				gearsInMotion = true;
				rotateGears();
                progress(true);
                $('.active-input').removeClass('active-input');
                $(this).addClass('active-input');
            });
            $('#no').click(function(){
                if(_global_pause){
                    if(!$(this).hasClass('active-input'))$(this).prop('checked',false);
                    return false;
                }
				gearNextPosition = randomIntFromInterval();
				gearsInMotion = true;
				rotateGears();
                progress(false);
                $('.active-input').removeClass('active-input');
                $(this).addClass('active-input');
            });
            $('#reset').click(function(){
                reset();
                return false;
            });
            setPos();
        },
        randomizeColleges = function(){
            var colleges = $('.colleges');
            colleges.fadeOut(50);
            setTimeout(function(){colleges.randomize('li');},50);
            colleges.fadeIn(50);
        },
        _global_scores = [],
        keepScore = function(collegeName){
            if(typeof _global_scores[collegeName] == 'undefined')_global_scores[collegeName] = {name:collegeName,quizScore:1};
            else _global_scores[collegeName].quizScore ++;
        },
        setResultsAndShare = function(){
            var tmpScore = 0,tmpName = '',
                topScore,
                getTiedList = function(name,score){
                    var tiedList = [];
                    for(var index in _global_scores){
                        if(typeof _global_scores[index].quizScore != 'undefined'){
                            if(_global_scores[index].quizScore == score && _global_scores[index].name != name)tiedList.push(_global_scores[index].name);
                        }
                    }
                    return tiedList;
                },
                buildSocialLinks = function(){
                    var urlStr = 'https://twitter.com/intent/tweet?',
                        amperStr = '&',
                        messageStr = 'text=' + encodeURI("Loyola University Chicago's, Choose your Major Quiz pointed me to " + topScore.name + ". What should your major be?"),
                        redirectStr = 'url=http://www.luc.edu/undergrad/academiclife/whatsmymajorquiz/index.html',
                        hrefStr = urlStr + redirectStr + amperStr + messageStr,
                        aTwitter = $('a#twitter');
                    aTwitter.attr('href',hrefStr);
                    aTwitter.click(function(e){
                        _gaq.push(['_trackEvent', 'Whats My Major', 'Shared on Twitter']);
                    });
                    $('a#facebook').click(function(e){
                        e.preventDefault();
                        _gaq.push(['_trackEvent', 'Whats My Major', 'Shared on Facebook']);
                        FB.ui({
                            method: 'feed',
                            link: 'http://www.luc.edu/undergrad/academiclife/whatsmymajorquiz/index.html',
                            picture: 'http://www.luc.edu/undergrad/media/prospectivestudents/mrose/major-quiz-images/luc-shield.png',
                            caption: '"What\'s My Major" Quiz',
                            description: "Loyola University Chicago's, Choose your Major Quiz pointed me to " +
                                topScore.name +
                                ". What should your major be?"
                            }, function(response){
                                if (response && response.post_id) {
                                 // _gaq.push(['_trackSocial', 'facebook', 'share']);
                                }
                            }
                        );
                    });
                },
                buildCollegeInfoAndImage = function(){
                    var newImage = new Image(),
                        majorImage = $('#major-image'),
                        quizResults = $('#quiz-results'),
                        quizResultsStr = '',
                        tmpItem,
                        tiedListCount = topScore.tiedList.length;
                    newImage.src = topScore.getCollegeImage();

                    if(typeof newImage.src == 'undefined')return;
                    newImage.onload = function(){
                        majorImage.attr('src',newImage.src).fadeIn(200);
                        quizResults.show();
                        $('#social-share-modal').fadeIn(200);
                    };
                    quizResultsStr = '<p><a href="' +
                        topScore.getCollegeLink() +
                        '" target="_blank">' + topScore.name + '</a>' +
                        '<br>Your unique talents are a great fit for '+ topScore.getCollegeInfo()+' ' +
                        '</p>';
                    if(tiedListCount > 0){
                        quizResultsStr += '<h4>Other Possibilties</h4><ul>';
                        for(var i = 0; i < tiedListCount; i++){
                            tmpItem = topScore.getTiedListItemInfo(i);
                            quizResultsStr += '<li><a href="' + tmpItem.href + '" target="_blank">' + tmpItem.name + '</a></li>';
                        }
                        quizResultsStr += '</ul>';
                    }

                    quizResults.html(quizResultsStr);
                };

            for(var index in _global_scores){
                if(typeof _global_scores[index].quizScore != 'undefined'){
                    if(_global_scores[index].quizScore > tmpScore){
                        if($('#' + getCollegeId(_global_scores[index].name)).length){
                            tmpScore = _global_scores[index].quizScore;
                            tmpName = _global_scores[index].name;
                        }
                    }
                }
            }

            if(tmpName.length === 0){
                $('#social-share-modal').fadeIn(200);
                return;
            }

            topScore = {
                name: tmpName,
                score:tmpScore,
                id:getCollegeId(tmpName),
                getCollegeImage: function(){
                    return $('#' + this.id + ' a').data('collegeImage');
                },
                getCollegeInfo: function(){
                    return $('#' + this.id + ' a').data('collegeInfo');
                },
                getCollegeLink: function(){
                    return $('#' + this.id + ' a').attr('href');
                },
                tiedList:getTiedList(tmpName,tmpScore),
                getTiedListItemInfo: function(index){
                    var collegeId = getCollegeId(this.tiedList[index]),
                        infoArr = {name: this.tiedList[index], href: $('#' + collegeId + ' a').attr('href')};
                    return infoArr;
                }
            };
            buildCollegeInfoAndImage();
            buildSocialLinks();

        };
    setColleges();
    randomizeColleges();
    setControls();
    debug();

});

/*!
 * simpler-sidebar - A simple side nav in jQuery.
 * @version v2.2.0
 * @link https://github.com/simple-sidebar/simpler-sidebar#readme
 * @copyright (c) 2015 - 2016 Davide Di Criscito
 * @license MIT AND GPL-2.0
 */
// Uses CommonJS, AMD or browser globals to create a jQuery plugin.
( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [ "jquery" ], factory );
	} else if ( typeof module === "object" && module.exports ) {

		// Node/CommonJS
		module.exports = function( root, jQuery ) {
			if ( jQuery === undefined ) {
				if ( typeof window !== "undefined" ) {
					jQuery = require( "jquery" );
				}			else {
					jQuery = require( "jquery" )( root );
				}
			}
			factory( jQuery );
			return jQuery;
		};
	} else {

		// Browser globals
		factory( jQuery );
	}
}( function( $ ) {

	// Set the plugin name
	var pluginName = "simplerSidebar";

	$.fn[ pluginName ] = function( options ) {

		// Default settings
		var cfg = $.extend( true, {
			attr: "simplersidebar",
			top: 0,
			gap: 64,
			zIndex: 3000,

			sidebar: {
				width: 300
			},

			animation: {
				duration: 500,
				easing: "swing"
			},

			// Changing these options will break the plugin
			events: {
				on: {
					animation: {
						open: function() {},
						close: function() {},
						both: function() {}
					}
				},
				callbacks: {
					animation: {
						open: function() {},
						close: function() {},
						both: function() {},
						freezePage: true
					}
				}
			},

			mask: {
				display: true,
				css: {
					backgroundColor: "black",
					opacity: 0.5,
					filter: "Alpha(opacity=50)"
				}
			}
		}, options );

		// Keep chainability
		return this.each( function() {
			var sbStyle, pvtMaskStyle, maskStyle,
				attr = "data-" + cfg.attr,

				// Set anything else than "opened" to "closed"
				init = ( "opened" === cfg.init ) ? "opened" : "closed",

				// Set anything else than "left" to "right"
				align = ( "left" === cfg.align ) ? "left" : "right",

				duration = cfg.animation.duration,
				easing = cfg.animation.easing,
				animation = {},

				// Set anything else then true to false
				scrollCfg = ( true === cfg.events.callbacks.animation.freezePage ) ?
										true :
										false,
				freezePage = function() {
					$( "body, html" ).css( "overflow", "hidden" );
				},
				unfreezePage = function() {
					$( "body, html" ).css( "overflow", "auto" );
				},

				// Sidebar helpers
				$sidebar = $( this ),
				setSidebarWidth = function( w ) {

					// Calculate sidebar width
					if ( w < ( cfg.sidebar.width + cfg.gap ) ) {
                        var sWidth = w - cfg.gap;
                        sWidth = sWidth < 320 ? 320 : sWidth;
                        return sWidth;
					} else {
                        return cfg.sidebar.width;
					}
				},
				sidebarStatus = function() {

					// Check if the sidebar attribute is set to "opened" or "closed"
					return $sidebar.attr( attr );
				},
				changeSidebarStatus = function( status ) {
					$sidebar.attr( attr, status );
				},

				// Mask helpers
				$mask = $( "<div>" ).attr( attr, "mask" ),
				createMask = function() {

					// Create mask
					$mask.appendTo( "body" )
				.css( maskStyle );
				},
				showMask = function() {
					$mask.fadeIn( duration );
				},
				hideMask = function() {
					$mask.fadeOut( duration/2 );
				},

				$trigger = $( cfg.selectors.trigger ),
				quitter = !cfg.selectors.quitter ? "a" : cfg.selectors.quitter,

				w = $( window ).width(),

				// Other functions that must be run along the animation
				events = {

				// Events triggered with the animations
					on: {
						animation: {
							open: function() {
								showMask();
								changeSidebarStatus( "opened" );

								cfg.events.on.animation.open();
							},
							close: function() {
								hideMask();
								changeSidebarStatus( "closed" );

								cfg.events.on.animation.close();
							},
							both: function() {
								cfg.events.on.animation.both();
							}
						}
					},

					// Events triggered after the animations
					callbacks: {
						animation: {
							open: function() {
								if ( scrollCfg ) {
									freezePage();
								}

								cfg.events.callbacks.animation.open();
							},
							close: function() {
								if ( scrollCfg ) {
									unfreezePage();
								}

								cfg.events.callbacks.animation.close();
							},
							both: function() {
								cfg.events.callbacks.animation.both();
							}
						}
					}
				},

				// Create animations
				animateOpen = function() {
					var callbacks = function() {
						events.callbacks.animation.open();
						events.callbacks.animation.both();
					};
                    console.log('in simpler',_navOffSet);
                    $sidebar.css('top',_navOffSet + 'px');
                    $mask.css('top',_navOffSet + 'px');
					// Define the animation
					animation[ align ] = 0;

					// Apply the animation, the options and the callbacks
					$sidebar.animate( animation, duration, easing, callbacks );

					events.on.animation.open();
					events.on.animation.both();
				},
				animateClose = function() {
					var callbacks = function() {
						events.callbacks.animation.close();
						events.callbacks.animation.both();
					},
                        sideBarWidth = $sidebar.width(),
                        durationClose = duration/2;

					// Define the animation
					animation[ align ] = -$sidebar.width();

					// Apply the animation, the options and the callbacks
					$sidebar.animate( animation, durationClose, easing, callbacks );

					events.on.animation.close();
					events.on.animation.both();
				};

			// Create the sidebar style
			sbStyle = {
				position: "fixed",
				top: parseInt( cfg.top ),
				bottom: 0,
				width: setSidebarWidth( w ),
				zIndex: cfg.zIndex
			};

			// Set initial position
			sbStyle[ align ] = ( "closed" === init ) ? -setSidebarWidth( w ) : 0;

			// freeze page if sidebar is opened
			if ( scrollCfg && "opened" === init ) {
				freezePage();
			}

			// Apply style to the sidebar
			$sidebar.css( sbStyle )
			.attr( attr, init ); // apply init

			// Create the private mask style
			pvtMaskStyle = {
				position: "fixed",
				top: parseInt( cfg.top ),
				right: 0,
				bottom: 0,
				left: 0,
				zIndex: cfg.zIndex - 1,
				display: "none"
			};

			// Hide or show the mask
			// according to the chosen init option
			pvtMaskStyle.display = ( "opened" === init ) ?
				"block" :
				"none";

			// Merge the Mask private and custom style but keep private style unchangeable
			maskStyle = $.extend( true, pvtMaskStyle, cfg.mask.css );

			// Create Mask if required
			// Mask is appended to body
			if ( cfg.mask.display ) {
				createMask();
			}

			// Apply animations
			$trigger.click( function() {
				switch ( sidebarStatus() ) {
				case "opened":
					animateClose();
					break;
				case "closed":
					animateOpen();
					break;
				}
			} );

			$mask.click( animateClose );
			$sidebar.on( "click", quitter, animateClose );

			// Make the sidebar responsive
			$( window ).resize( function() {
				var w = $( window ).width();

				// Fix width on resize
				$sidebar.css( "width", setSidebarWidth( w ) );

				if ( "closed" === sidebarStatus() ) {
					$sidebar.css( align, -$sidebar.width() );
				}
			} );
		} );
	};
} ) );

var all_questions = [{
  question_string: "What year was the Society of Jesus formed?",
  choices: {
    correct: "1540",
    wrong: ["1534", "1546", "1550"]
  }
}, {
  question_string: 'What does "cura personalis" mean?',
  choices: {
    correct: "Care for the entire person",
    wrong: ["Care for all people", "Care for the poor", "Care for the world"]
  }
}, {
  question_string: "When Loyola was founded, what was the official name of the University?",
  choices: {
    correct: "St. Ignatius College",
    wrong: ["The Jesuit University of Chicago", "Loyola University Chicago", "Loyola Chicago Jesuit College"]
  }
}, {
  question_string: "Which of these are a central goal of a Jesuit education?",
  choices: {
    correct: "All statements are true",
    wrong: ["Form men and women for and with others", "Form graduates open to growth", "Form students commited to justice"]
  }
}, {
  question_string: "How many Jesuit saints are there?",
  choices: {
    correct: "53",
    wrong: ["42", "68", "77"]
  }
}, {
  question_string: 'What does "magis" mean?',
  choices: {
    correct: "More or better",
    wrong: ["Magic or surprise", "Spirit or meaning", "Magnificent or large"]
  }
}, {
  question_string: 'When was the tradition of holding the Convocation walk through the Cudahy Library’s green doors started?',
  choices: {
    correct: "2009",
    wrong: ["1870", "1929", "1978"]
  }
}, {
  question_string: 'How many Jesuit universities exist in the United States?',
  choices: {
    correct: "28",
    wrong: ["17", "43", "60"]
  }
}, {
  question_string: 'Along with educating the students of Loyola University Chicago, the Jesuits are responsible for the education of all but one of the following individuals:',
  choices: {
    correct: "Liam Neeson",
    wrong: ["Amy Poehler", "Denzel Washington", "Chris Farley"]
  }
}, {
  question_string: 'Which one of these inventions is the Society of Jesus credited with creating?',
  choices: {
    correct: "Trapdoor",
    wrong: ["Barstool", "Kneeling pew", "Chalkboard"]
  }
}, {
  question_string: 'What is Loyola’s motto?',
  choices: {
    correct: "Ad Majorem Dei Gloriam",
    wrong: ["Cogito ergo sum", "Fortuna audaces iuvat", "Dormiens Nunquam Titillandus"]
  }
}];

// An object for a Quiz, which will contain Question objects.
var Quiz = function(quiz_name) {
  // Private fields for an instance of a Quiz object.
  this.quiz_name = quiz_name;

  // This one will contain an array of Question objects in the order that the questions will be presented.
  this.questions = [];
}

// A function that you can enact on an instance of a quiz object. This function is called add_question() and takes in a Question object which it will add to the questions field.
Quiz.prototype.add_question = function(question) {
  // Randomly choose where to add question
  var index_to_add_question = Math.floor(Math.random() * this.questions.length);
  this.questions.splice(index_to_add_question, 0, question);
}

// A function that you can enact on an instance of a quiz object. This function is called render() and takes in a variable called the container, which is the <div> that I will render the quiz in.
Quiz.prototype.render = function(container) {
  // For when we're out of scope
  var self = this;

  // Hide the quiz results modal
  $('#quiz-results').hide();

  // Write the name of the quiz
  $('#quiz-name').text(this.quiz_name);

  // Create a container for questions
  var question_container = $('<div>').attr('id', 'question').insertAfter('#quiz-name');

  // Helper function for changing the question and updating the buttons
  function change_question() {
    self.questions[current_question_index].render(question_container);
    $('#prev-question-button').prop('disabled', current_question_index === 0);
    $('#next-question-button').prop('disabled', current_question_index === self.questions.length - 1);

    // Determine if all questions have been answered
    var all_questions_answered = true;
    for (var i = 0; i < self.questions.length; i++) {
      if (self.questions[i].user_choice_index === null) {
        all_questions_answered = false;
        break;
      }
    }
    $('#submit-button').prop('disabled', !all_questions_answered);
  }

  // Render the first question
  var current_question_index = 0;
  change_question();

  // Add listener for the previous question button
  $('#prev-question-button').click(function() {
    if (current_question_index > 0) {
      current_question_index--;
      change_question();
    }
  });

  // Add listener for the next question button
  $('#next-question-button').click(function() {
    if (current_question_index < self.questions.length - 1) {
      current_question_index++;
      change_question();
    }
  });

  // Add listener for the submit answers button
  $('#submit-button').click(function() {
    // Determine how many questions the user got right
    var score = 0;
    for (var i = 0; i < self.questions.length; i++) {
      if (self.questions[i].user_choice_index === self.questions[i].correct_choice_index) {
        score++;
      }
    }

    // Display the score with the appropriate message
    var percentage = score / self.questions.length;
    console.log(percentage);
    var message;
    if (percentage === 1) {
      message = 'You are 100% Jesuit! Explore your Jesuit prowess by reading the Spiritual Exercises of Ignatius of Loyola for insight into his faith journey, join a retreat, or research a “Retreat in Daily Life” program.'
    } else if (percentage >= .8) {
      message = 'You are 80% Jesuit. You are part of the Jesuit family! Reward yourself by embarking on traditions like Taize prayer. At Loyola’s Lake Shore Campus, Taize prayer is offered every Wednesday at 9:30 p.m. in Madonna della Strada. If you’re not near campus, find a daily dose of Ignatian spirituality at ignatianspirituality.com.'
    } else if (percentage >= .6) {
      message = 'You are 60% Jesuit. Try attending some of Loyola’s November events listed above. If you’re not near Chicago though, check out your nearby Jesuit university or parish—or visit Ignatian Solidarity Network at ignatiansolidarity.net.'
    } else if (percentage >= .3) {
      message = 'You are 40% Jesuit. Pick up a copy of “The Jesuit Guide to (Almost) Everything” by James Martin, S.J. The book is a handy reference on how the life and teachings of St. Ignatius can impact your life.'
    } else {
      message = 'You are 20% Jesuit (or maybe less). To increase your Jesuitical know-how, check out our #FollowFriday recommendations. The list is filled with inspiring Jesuits and impactful organizations sharing Ignatian spirituality on social media.'
    }
    $('#quiz-results-message').text(message);
    $('#quiz-results-score').html('You got <b>' + score + '/' + self.questions.length + '</b> questions correct.');
    $('#quiz-results').slideDown();
    $('#quiz button').slideUp();
  });

  // Add a listener on the questions container to listen for user select changes. This is for determining whether we can submit answers or not.
  question_container.bind('user-select-change', function() {
    var all_questions_answered = true;
    for (var i = 0; i < self.questions.length; i++) {
      if (self.questions[i].user_choice_index === null) {
        all_questions_answered = false;
        break;
      }
    }
    $('#submit-button').prop('disabled', !all_questions_answered);
  });
}

// An object for a Question, which contains the question, the correct choice, and wrong choices. This block is the constructor.
var Question = function(question_string, correct_choice, wrong_choices) {
  // Private fields for an instance of a Question object.
  this.question_string = question_string;
  this.choices = [];
  this.user_choice_index = null; // Index of the user's choice selection

  // Random assign the correct choice an index
  this.correct_choice_index = Math.floor(Math.random() * wrong_choices.length + 1);

  // Fill in this.choices with the choices
  var number_of_choices = wrong_choices.length + 1;
  for (var i = 0; i < number_of_choices; i++) {
    if (i === this.correct_choice_index) {
      this.choices[i] = correct_choice;
    } else {
      // Randomly pick a wrong choice to put in this index
      var wrong_choice_index = Math.floor(Math.random(0, wrong_choices.length));
      this.choices[i] = wrong_choices[wrong_choice_index];

      // Remove the wrong choice from the wrong choice array so that we don't pick it again
      wrong_choices.splice(wrong_choice_index, 1);
    }
  }
}

// A function that you can enact on an instance of a question object. This function is called render() and takes in a variable called the container, which is the <div> that I will render the question in. This question will "return" with the score when the question has been answered.
Question.prototype.render = function(container) {
  // For when we're out of scope
  var self = this;

  // Fill out the question label
  var question_string_h2;
  if (container.children('h2').length === 0) {
    question_string_h2 = $('<h2>').appendTo(container);
  } else {
    question_string_h2 = container.children('h2').first();
  }
  question_string_h2.text(this.question_string);

  // Clear any radio buttons and create new ones
  if (container.children('input[type=radio]').length > 0) {
    container.children('input[type=radio]').each(function() {
      var radio_button_id = $(this).attr('id');
      $(this).remove();
      container.children('label[for=' + radio_button_id + ']').remove();
    });
  }
  for (var i = 0; i < this.choices.length; i++) {
    // Create the radio button
    var choice_radio_button = $('<input>')
      .attr('id', 'choices-' + i)
      .attr('type', 'radio')
      .attr('name', 'choices')
      .attr('value', 'choices-' + i)
      .attr('checked', i === this.user_choice_index)
      .appendTo(container);

    // Create the label
    var choice_label = $('<label>')
      .text(this.choices[i])
      .attr('for', 'choices-' + i)
      .appendTo(container);
  }

  // Add a listener for the radio button to change which one the user has clicked on
  $('input[name=choices]').change(function(index) {
    var selected_radio_button_value = $('input[name=choices]:checked').val();

    // Change the user choice index
    self.user_choice_index = parseInt(selected_radio_button_value.substr(selected_radio_button_value.length - 1, 1));

    // Trigger a user-select-change
    container.trigger('user-select-change');
  });
}

// "Main method" which will create all the objects and render the Quiz.
$(document).ready(function() {
  // Create an instance of the Quiz object
  var quiz = new Quiz('');

  // Create Question objects from all_questions and add them to the Quiz object
  for (var i = 0; i < all_questions.length; i++) {
    // Create a new Question object
    var question = new Question(all_questions[i].question_string, all_questions[i].choices.correct, all_questions[i].choices.wrong);

    // Add the question to the instance of the Quiz object that we created previously
    quiz.add_question(question);
  }

  // Render the quiz
  var quiz_container = $('#quiz');
  quiz.render(quiz_container);
});

$(window).load(function() {
 $("#loader-wrapper").fadeOut(500);
})

window.onscroll = function() {myFunction();};

function myFunction() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        document.getElementById("hidden-menu").className = "show-menu";
    } else {
        document.getElementById("hidden-menu").className = "";
    }
}
$("#canvas-navbar ul li a[href^='#']").on('click', function(e) {
   // prevent default anchor click behavior
   e.preventDefault();
   // store hash
   var hash = this.hash;
   // animate
   $('html, body').animate({
       scrollTop: $(hash).offset().top
     }, 600, function(){
       // when done, add hash to url
       // (default click behaviour)
       window.location.hash = hash;
     });
});

/**
 * stacktable.js
 * Author & copyright (c) 2012: John Polacek
 * CardTable by: Justin McNally (2015)
 * Dual MIT & GPL license
 *
 * Page: http://johnpolacek.github.com/stacktable.js
 * Repo: https://github.com/johnpolacek/stacktable.js/
 *
 * jQuery plugin for stacking tables on small screens
 * Requires jQuery version 1.7 or above
 *
 */
;(function($) {
  $.fn.cardtable = function(options) {
    var $tables = this,
        defaults = {headIndex:0},
        settings = $.extend({}, defaults, options),
        headIndex;

    // checking the "headIndex" option presence... or defaults it to 0
    if(options && options.headIndex)
      headIndex = options.headIndex;
    else
      headIndex = 0;

    return $tables.each(function() {
      var $table = $(this);
      if ($table.hasClass('stacktable')) {
        return;
      }
      var table_css = $(this).prop('class');
      var $stacktable = $('<div></div>');
      if (typeof settings.myClass !== 'undefined') $stacktable.addClass(settings.myClass);
      var markup = '';
      var $caption, $topRow, headMarkup, bodyMarkup, tr_class;

      $table.addClass('stacktable large-only');
      $caption = $table.find("caption").clone();
      $topRow = $table.find('tr').eq(0);

      // using rowIndex and cellIndex in order to reduce ambiguity
      $table.find('tbody tr').each(function() {

        // declaring headMarkup and bodyMarkup, to be used for separately head and body of single records
        headMarkup = '';
        bodyMarkup = '';
        tr_class = $(this).prop('class');
        // for the first row, "headIndex" cell is the head of the table
        // for the other rows, put the "headIndex" cell as the head for that row
        // then iterate through the key/values
        $(this).find('td,th').each(function(cellIndex) {
          if ($(this).html() !== ''){
            bodyMarkup += '<tr class="' + tr_class +'">';
            if ($topRow.find('td,th').eq(cellIndex).html()){
              bodyMarkup += '<td class="st-key">'+$topRow.find('td,th').eq(cellIndex).html()+'</td>';
            } else {
              bodyMarkup += '<td class="st-key"></td>';
            }
            bodyMarkup += '<td class="st-val '+$(this).prop('class')  +'">'+$(this).html()+'</td>';
            bodyMarkup += '</tr>';
          }
        });

        markup += '<table class=" '+ table_css +' stacktable small-only"><tbody>' + headMarkup + bodyMarkup + '</tbody></table>';
      });

      $table.find('tfoot tr td').each(function(rowIndex,value) {
        if ($.trim($(value).text()) !== '') {
          markup += '<table class="'+ table_css + ' stacktable small-only"><tbody><tr><td>' + $(value).html() + '</td></tr></tbody></table>';
        }
      });

      $stacktable.prepend($caption);
      $stacktable.append($(markup));
      $table.before($stacktable);
    });
  };

  $.fn.stacktable = function(options) {
    var $tables = this,
        defaults = {headIndex:0},
        settings = $.extend({}, defaults, options),
        headIndex;

    // checking the "headIndex" option presence... or defaults it to 0
    if(options && options.headIndex)
      headIndex = options.headIndex;
    else
      headIndex = 0;

    return $tables.each(function() {
      var table_css = $(this).prop('class');
      var $stacktable = $('<table class="'+ table_css +' stacktable small-only"><tbody></tbody></table>');
      if (typeof settings.myClass !== 'undefined') $stacktable.addClass(settings.myClass);
      var markup = '';
      var $table, $caption, $topRow, headMarkup, bodyMarkup, tr_class;

      $table = $(this);
      $table.addClass('stacktable large-only');
      $caption = $table.find("caption").clone();
      $topRow = $table.find('tr').eq(0);

      // using rowIndex and cellIndex in order to reduce ambiguity
      $table.find('tr').each(function(rowIndex) {

        // declaring headMarkup and bodyMarkup, to be used for separately head and body of single records
        headMarkup = '';
        bodyMarkup = '';
        tr_class = $(this).prop('class');
        // for the first row, "headIndex" cell is the head of the table
        if (rowIndex === 0) {
          // the main heading goes into the markup variable
          markup += '<tr class=" '+tr_class +' "><th class="st-head-row st-head-row-main" colspan="2">'+$(this).find('th,td').eq(headIndex).html()+'</th></tr>';
        }
        else {
          // for the other rows, put the "headIndex" cell as the head for that row
          // then iterate through the key/values
          $(this).find('td,th').each(function(cellIndex) {
            if (cellIndex === headIndex) {
              headMarkup = '<tr class="'+ tr_class+'"><th class="st-head-row" colspan="2">'+$(this).html()+'</th></tr>';
            } else {
              if ($(this).html() !== ''){
                bodyMarkup += '<tr class="' + tr_class +'">';
                if ($topRow.find('td,th').eq(cellIndex).html()){
                  bodyMarkup += '<td class="st-key">'+$topRow.find('td,th').eq(cellIndex).html()+'</td>';
                } else {
                  bodyMarkup += '<td class="st-key"></td>';
                }
                bodyMarkup += '<td class="st-val '+$(this).prop('class')  +'">'+$(this).html()+'</td>';
                bodyMarkup += '</tr>';
              }
            }
          });

          markup += headMarkup + bodyMarkup;
        }
      });

      $stacktable.prepend($caption);
      $stacktable.append($(markup));
      $table.before($stacktable);
    });
  };

 $.fn.stackcolumns = function(options) {
    var $tables = this,
        defaults = {},
        settings = $.extend({}, defaults, options);

    return $tables.each(function() {
      var $table = $(this);
      var num_cols = $table.find('tr').eq(0).find('td,th').length; //first table <tr> must not contain colspans, or add sum(colspan-1) here.
      if(num_cols<3) //stackcolumns has no effect on tables with less than 3 columns
        return;

      var $stackcolumns = $('<table class="stacktable small-only"></table>');
      if (typeof settings.myClass !== 'undefined') $stackcolumns.addClass(settings.myClass);
      $table.addClass('stacktable large-only');
      var tb = $('<tbody></tbody>');
      var col_i = 1; //col index starts at 0 -> start copy at second column.

      while (col_i < num_cols) {
        $table.find('tr').each(function(index) {
          var tem = $('<tr></tr>'); // todo opt. copy styles of $this; todo check if parent is thead or tfoot to handle accordingly
          if(index === 0) tem.addClass("st-head-row st-head-row-main");
          var first = $(this).find('td,th').eq(0).clone().addClass("st-key");
          var target = col_i;
          // if colspan apply, recompute target for second cell.
          if ($(this).find("*[colspan]").length) {
            var i =0;
            $(this).find('td,th').each(function() {
                var cs = $(this).attr("colspan");
                if (cs) {
                  cs = parseInt(cs, 10);
                  target -= cs-1;
                  if ((i+cs) > (col_i)) //out of current bounds
                    target += i + cs - col_i -1;
                  i += cs;
                }
                else
                  i++;

                if (i > col_i)
                  return false; //target is set; break.
            });
          }
          var second = $(this).find('td,th').eq(target).clone().addClass("st-val").removeAttr("colspan");
          tem.append(first, second);
          tb.append(tem);
        });
        ++col_i;
      }

      $stackcolumns.append($(tb));
      $table.before($stackcolumns);
    });
  };

}(jQuery));

!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.videojs=e()}(this,function(){"use strict";function t(t,e){return e={exports:{}},t(e,e.exports),e.exports}function e(t,e){Fe(t).forEach(function(n){return e(t[n],n)})}function n(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;return Fe(t).reduce(function(n,r){return e(n,t[r],r)},n)}function r(t){for(var n=arguments.length,r=Array(n>1?n-1:0),i=1;i<n;i++)r[i-1]=arguments[i];return Object.assign?Object.assign.apply(Object,[t].concat(r)):(r.forEach(function(n){n&&e(n,function(e,n){t[n]=e})}),t)}function i(t){return!!t&&"object"===(void 0===t?"undefined":Me(t))}function o(t){return i(t)&&"[object Object]"===Be.call(t)&&t.constructor===Object}function s(t){return t.replace(/\n\r?\s*/g,"")}function a(t,e){if(!t||!e)return"";if("function"==typeof ie.getComputedStyle){var n=ie.getComputedStyle(t);return n?n[e]:""}return t.currentStyle[e]||""}function l(t){return"string"==typeof t&&/\S/.test(t)}function c(t){if(/\s/.test(t))throw new Error("class has illegal whitespace characters")}function u(t){return new RegExp("(^|\\s)"+t+"($|\\s)")}function h(){return ce===ie.document&&void 0!==ce.createElement}function p(t){return i(t)&&1===t.nodeType}function d(t){return function(e,n){if(!l(e))return ce[t](null);l(n)&&(n=ce.querySelector(n));var r=p(n)?n:ce;return r[t]&&r[t](e)}}function f(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"div",e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=arguments[3],i=ce.createElement(t);return Object.getOwnPropertyNames(e).forEach(function(t){var n=e[t];-1!==t.indexOf("aria-")||"role"===t||"type"===t?(Ue.warn(Xe(qe,t,n)),i.setAttribute(t,n)):"textContent"===t?v(i,n):i[t]=n}),Object.getOwnPropertyNames(n).forEach(function(t){i.setAttribute(t,n[t])}),r&&I(i,r),i}function v(t,e){return void 0===t.textContent?t.innerText=e:t.textContent=e,t}function y(t,e){e.firstChild?e.insertBefore(t,e.firstChild):e.appendChild(t)}function g(t,e){return c(e),t.classList?t.classList.contains(e):u(e).test(t.className)}function m(t,e){return t.classList?t.classList.add(e):g(t,e)||(t.className=(t.className+" "+e).trim()),t}function _(t,e){return t.classList?t.classList.remove(e):(c(e),t.className=t.className.split(/\s+/).filter(function(t){return t!==e}).join(" ")),t}function b(t,e,n){var r=g(t,e);if("function"==typeof n&&(n=n(t,e)),"boolean"!=typeof n&&(n=!r),n!==r)return n?m(t,e):_(t,e),t}function T(t,e){Object.getOwnPropertyNames(e).forEach(function(n){var r=e[n];null===r||void 0===r||!1===r?t.removeAttribute(n):t.setAttribute(n,!0===r?"":r)})}function C(t){var e={};if(t&&t.attributes&&t.attributes.length>0)for(var n=t.attributes,r=n.length-1;r>=0;r--){var i=n[r].name,o=n[r].value;"boolean"!=typeof t[i]&&-1===",autoplay,controls,loop,muted,default,".indexOf(","+i+",")||(o=null!==o),e[i]=o}return e}function k(t,e){return t.getAttribute(e)}function w(t,e,n){t.setAttribute(e,n)}function E(t,e){t.removeAttribute(e)}function S(){ce.body.focus(),ce.onselectstart=function(){return!1}}function x(){ce.onselectstart=function(){return!0}}function j(t){if(t&&t.getBoundingClientRect&&t.parentNode){var e=t.getBoundingClientRect(),n={};return["bottom","height","left","right","top","width"].forEach(function(t){void 0!==e[t]&&(n[t]=e[t])}),n.height||(n.height=parseFloat(a(t,"height"))),n.width||(n.width=parseFloat(a(t,"width"))),n}}function A(t){var e=void 0;if(t.getBoundingClientRect&&t.parentNode&&(e=t.getBoundingClientRect()),!e)return{left:0,top:0};var n=ce.documentElement,r=ce.body,i=n.clientLeft||r.clientLeft||0,o=ie.pageXOffset||r.scrollLeft,s=e.left+o-i,a=n.clientTop||r.clientTop||0,l=ie.pageYOffset||r.scrollTop,c=e.top+l-a;return{left:Math.round(s),top:Math.round(c)}}function P(t,e){var n={},r=A(t),i=t.offsetWidth,o=t.offsetHeight,s=r.top,a=r.left,l=e.pageY,c=e.pageX;return e.changedTouches&&(c=e.changedTouches[0].pageX,l=e.changedTouches[0].pageY),n.y=Math.max(0,Math.min(1,(s-l+o)/o)),n.x=Math.max(0,Math.min(1,(c-a)/i)),n}function N(t){return i(t)&&3===t.nodeType}function O(t){for(;t.firstChild;)t.removeChild(t.firstChild);return t}function M(t){return"function"==typeof t&&(t=t()),(Array.isArray(t)?t:[t]).map(function(t){return"function"==typeof t&&(t=t()),p(t)||N(t)?t:"string"==typeof t&&/\S/.test(t)?ce.createTextNode(t):void 0}).filter(function(t){return t})}function I(t,e){return M(e).forEach(function(e){return t.appendChild(e)}),t}function D(t,e){return I(O(t),e)}function R(){return $e++}function L(t){var e=t[Qe];return e||(e=t[Qe]=R()),Je[e]||(Je[e]={}),Je[e]}function B(t){var e=t[Qe];return!!e&&!!Object.getOwnPropertyNames(Je[e]).length}function F(t){var e=t[Qe];if(e){delete Je[e];try{delete t[Qe]}catch(e){t.removeAttribute?t.removeAttribute(Qe):t[Qe]=null}}}function H(t,e){var n=L(t);0===n.handlers[e].length&&(delete n.handlers[e],t.removeEventListener?t.removeEventListener(e,n.dispatcher,!1):t.detachEvent&&t.detachEvent("on"+e,n.dispatcher)),Object.getOwnPropertyNames(n.handlers).length<=0&&(delete n.handlers,delete n.dispatcher,delete n.disabled),0===Object.getOwnPropertyNames(n).length&&F(t)}function V(t,e,n,r){n.forEach(function(n){t(e,n,r)})}function z(t){function e(){return!0}function n(){return!1}if(!t||!t.isPropagationStopped){var r=t||ie.event;t={};for(var i in r)"layerX"!==i&&"layerY"!==i&&"keyLocation"!==i&&"webkitMovementX"!==i&&"webkitMovementY"!==i&&("returnValue"===i&&r.preventDefault||(t[i]=r[i]));if(t.target||(t.target=t.srcElement||ce),t.relatedTarget||(t.relatedTarget=t.fromElement===t.target?t.toElement:t.fromElement),t.preventDefault=function(){r.preventDefault&&r.preventDefault(),t.returnValue=!1,r.returnValue=!1,t.defaultPrevented=!0},t.defaultPrevented=!1,t.stopPropagation=function(){r.stopPropagation&&r.stopPropagation(),t.cancelBubble=!0,r.cancelBubble=!0,t.isPropagationStopped=e},t.isPropagationStopped=n,t.stopImmediatePropagation=function(){r.stopImmediatePropagation&&r.stopImmediatePropagation(),t.isImmediatePropagationStopped=e,t.stopPropagation()},t.isImmediatePropagationStopped=n,null!==t.clientX&&void 0!==t.clientX){var o=ce.documentElement,s=ce.body;t.pageX=t.clientX+(o&&o.scrollLeft||s&&s.scrollLeft||0)-(o&&o.clientLeft||s&&s.clientLeft||0),t.pageY=t.clientY+(o&&o.scrollTop||s&&s.scrollTop||0)-(o&&o.clientTop||s&&s.clientTop||0)}t.which=t.charCode||t.keyCode,null!==t.button&&void 0!==t.button&&(t.button=1&t.button?0:4&t.button?1:2&t.button?2:0)}return t}function W(t,e,n){if(Array.isArray(e))return V(W,t,e,n);var r=L(t);r.handlers||(r.handlers={}),r.handlers[e]||(r.handlers[e]=[]),n.guid||(n.guid=R()),r.handlers[e].push(n),r.dispatcher||(r.disabled=!1,r.dispatcher=function(e,n){if(!r.disabled){e=z(e);var i=r.handlers[e.type];if(i)for(var o=i.slice(0),s=0,a=o.length;s<a&&!e.isImmediatePropagationStopped();s++)try{o[s].call(t,e,n)}catch(t){Ue.error(t)}}}),1===r.handlers[e].length&&(t.addEventListener?t.addEventListener(e,r.dispatcher,!1):t.attachEvent&&t.attachEvent("on"+e,r.dispatcher))}function U(t,e,n){if(B(t)){var r=L(t);if(r.handlers){if(Array.isArray(e))return V(U,t,e,n);var i=function(e){r.handlers[e]=[],H(t,e)};if(e){var o=r.handlers[e];if(o){if(!n)return void i(e);if(n.guid)for(var s=0;s<o.length;s++)o[s].guid===n.guid&&o.splice(s--,1);H(t,e)}}else for(var a in r.handlers)i(a)}}}function X(t,e,n){var r=B(t)?L(t):{},i=t.parentNode||t.ownerDocument;if("string"==typeof e&&(e={type:e,target:t}),e=z(e),r.dispatcher&&r.dispatcher.call(t,e,n),i&&!e.isPropagationStopped()&&!0===e.bubbles)X.call(null,i,e,n);else if(!i&&!e.defaultPrevented){var o=L(e.target);e.target[e.type]&&(o.disabled=!0,"function"==typeof e.target[e.type]&&e.target[e.type](),o.disabled=!1)}return!e.defaultPrevented}function q(t,e,n){if(Array.isArray(e))return V(q,t,e,n);var r=function r(){U(t,e,r),n.apply(this,arguments)};r.guid=n.guid=n.guid||R(),W(t,e,r)}function K(t,e){e&&(en=e),ie.setTimeout(nn,t)}function G(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=e.eventBusKey;if(n){if(!t[n].nodeName)throw new Error('The eventBusKey "'+n+'" does not refer to an element.');t.eventBusEl_=t[n]}else t.eventBusEl_=f("span",{className:"vjs-event-bus"});return r(t,yn),t.on("dispose",function(){return t.off()}),t}function Y(t,e){return r(t,gn),t.state=r({},t.state,e),"function"==typeof t.handleStateChanged&&cn(t)&&t.on("statechanged",t.handleStateChanged),t}function $(t){return"string"!=typeof t?t:t.charAt(0).toUpperCase()+t.slice(1)}function J(t,e){return $(t)===$(e)}function Q(){for(var t={},n=arguments.length,r=Array(n),i=0;i<n;i++)r[i]=arguments[i];return r.forEach(function(n){n&&e(n,function(e,n){if(!o(e))return void(t[n]=e);o(t[n])||(t[n]={}),t[n]=Q(t[n],e)})}),t}function Z(t,e,n){if("number"!=typeof e||e<0||e>n)throw new Error("Failed to execute '"+t+"' on 'TimeRanges': The index provided ("+e+") is non-numeric or out of bounds (0-"+n+").")}function tt(t,e,n,r){return Z(t,r,n.length-1),n[r][e]}function et(t){return void 0===t||0===t.length?{length:0,start:function(){throw new Error("This TimeRanges object is empty")},end:function(){throw new Error("This TimeRanges object is empty")}}:{length:t.length,start:tt.bind(null,"start",0,t),end:tt.bind(null,"end",1,t)}}function nt(t,e){return Array.isArray(t)?et(t):void 0===t||void 0===e?et():et([[t,e]])}function rt(t,e){var n=0,r=void 0,i=void 0;if(!e)return 0;t&&t.length||(t=nt(0,0));for(var o=0;o<t.length;o++)r=t.start(o),i=t.end(o),i>e&&(i=e),n+=i-r;return n/e}function it(t){if(t instanceof it)return t;"number"==typeof t?this.code=t:"string"==typeof t?this.message=t:i(t)&&("number"==typeof t.code&&(this.code=t.code),r(this,t)),this.message||(this.message=it.defaultMessages[this.code]||"")}function ot(t,e){var n,r=null;try{n=JSON.parse(t,e)}catch(t){r=t}return[r,n]}function st(t){var e=Zn.call(t);return"[object Function]"===e||"function"==typeof t&&"[object RegExp]"!==e||"undefined"!=typeof window&&(t===window.setTimeout||t===window.alert||t===window.confirm||t===window.prompt)}function at(t,e,n){if(!Qn(e))throw new TypeError("iterator must be a function");arguments.length<3&&(n=this),"[object Array]"===nr.call(t)?lt(t,e,n):"string"==typeof t?ct(t,e,n):ut(t,e,n)}function lt(t,e,n){for(var r=0,i=t.length;r<i;r++)rr.call(t,r)&&e.call(n,t[r],r,t)}function ct(t,e,n){for(var r=0,i=t.length;r<i;r++)e.call(n,t.charAt(r),r,t)}function ut(t,e,n){for(var r in t)rr.call(t,r)&&e.call(n,t[r],r,t)}function ht(){for(var t={},e=0;e<arguments.length;e++){var n=arguments[e];for(var r in n)ar.call(n,r)&&(t[r]=n[r])}return t}function pt(t){for(var e in t)if(t.hasOwnProperty(e))return!1;return!0}function dt(t,e,n){var r=t;return Qn(e)?(n=e,"string"==typeof t&&(r={uri:t})):r=sr(e,{uri:t}),r.callback=n,r}function ft(t,e,n){return e=dt(t,e,n),vt(e)}function vt(t){function e(){4===a.readyState&&setTimeout(i,0)}function n(){var t=void 0;if(t=a.response?a.response:a.responseText||yt(a),y)try{t=JSON.parse(t)}catch(t){}return t}function r(t){return clearTimeout(u),t instanceof Error||(t=new Error(""+(t||"Unknown XMLHttpRequest Error"))),t.statusCode=0,s(t,g)}function i(){if(!c){var e;clearTimeout(u),e=t.useXDR&&void 0===a.status?200:1223===a.status?204:a.status;var r=g,i=null;return 0!==e?(r={body:n(),statusCode:e,method:p,headers:{},url:h,rawRequest:a},a.getAllResponseHeaders&&(r.headers=or(a.getAllResponseHeaders()))):i=new Error("Internal XMLHttpRequest Error"),s(i,r,r.body)}}if(void 0===t.callback)throw new Error("callback argument missing");var o=!1,s=function(e,n,r){o||(o=!0,t.callback(e,n,r))},a=t.xhr||null;a||(a=t.cors||t.useXDR?new ft.XDomainRequest:new ft.XMLHttpRequest);var l,c,u,h=a.url=t.uri||t.url,p=a.method=t.method||"GET",d=t.body||t.data,f=a.headers=t.headers||{},v=!!t.sync,y=!1,g={body:void 0,headers:{},statusCode:0,method:p,url:h,rawRequest:a};if("json"in t&&!1!==t.json&&(y=!0,f.accept||f.Accept||(f.Accept="application/json"),"GET"!==p&&"HEAD"!==p&&(f["content-type"]||f["Content-Type"]||(f["Content-Type"]="application/json"),d=JSON.stringify(!0===t.json?d:t.json))),a.onreadystatechange=e,a.onload=i,a.onerror=r,a.onprogress=function(){},a.onabort=function(){c=!0},a.ontimeout=r,a.open(p,h,!v,t.username,t.password),v||(a.withCredentials=!!t.withCredentials),!v&&t.timeout>0&&(u=setTimeout(function(){if(!c){c=!0,a.abort("timeout");var t=new Error("XMLHttpRequest timeout");t.code="ETIMEDOUT",r(t)}},t.timeout)),a.setRequestHeader)for(l in f)f.hasOwnProperty(l)&&a.setRequestHeader(l,f[l]);else if(t.headers&&!pt(t.headers))throw new Error("Headers cannot be set on an XDomainRequest object");return"responseType"in t&&(a.responseType=t.responseType),"beforeSend"in t&&"function"==typeof t.beforeSend&&t.beforeSend(a),a.send(d||null),a}function yt(t){if("document"===t.responseType)return t.responseXML;var e=t.responseXML&&"parsererror"===t.responseXML.documentElement.nodeName;return""!==t.responseType||e?null:t.responseXML}function gt(){}function mt(t,e){this.name="ParsingError",this.code=t.code,this.message=e||t.message}function _t(t){function e(t,e,n,r){return 3600*(0|t)+60*(0|e)+(0|n)+(0|r)/1e3}var n=t.match(/^(\d+):(\d{2})(:\d{2})?\.(\d{3})/);return n?n[3]?e(n[1],n[2],n[3].replace(":",""),n[4]):n[1]>59?e(n[1],n[2],0,n[4]):e(0,n[1],n[2],n[4]):null}function bt(){this.values=br(null)}function Tt(t,e,n,r){var i=r?t.split(r):[t];for(var o in i)if("string"==typeof i[o]){var s=i[o].split(n);if(2===s.length){var a=s[0],l=s[1];e(a,l)}}}function Ct(t,e,n){function r(){var e=_t(t);if(null===e)throw new mt(mt.Errors.BadTimeStamp,"Malformed timestamp: "+o);return t=t.replace(/^[^\sa-zA-Z-]+/,""),e}function i(){t=t.replace(/^\s+/,"")}var o=t;if(i(),e.startTime=r(),i(),"--\x3e"!==t.substr(0,3))throw new mt(mt.Errors.BadTimeStamp,"Malformed time stamp (time stamps must be separated by '--\x3e'): "+o);t=t.substr(3),i(),e.endTime=r(),i(),function(t,e){var r=new bt;Tt(t,function(t,e){switch(t){case"region":for(var i=n.length-1;i>=0;i--)if(n[i].id===e){r.set(t,n[i].region);break}break;case"vertical":r.alt(t,e,["rl","lr"]);break;case"line":var o=e.split(","),s=o[0];r.integer(t,s),r.percent(t,s)&&r.set("snapToLines",!1),r.alt(t,s,["auto"]),2===o.length&&r.alt("lineAlign",o[1],["start","middle","end"]);break;case"position":o=e.split(","),r.percent(t,o[0]),2===o.length&&r.alt("positionAlign",o[1],["start","middle","end"]);break;case"size":r.percent(t,e);break;case"align":r.alt(t,e,["start","middle","end","left","right"])}},/:/,/\s/),e.region=r.get("region",null),e.vertical=r.get("vertical",""),e.line=r.get("line","auto"),e.lineAlign=r.get("lineAlign","start"),e.snapToLines=r.get("snapToLines",!0),e.size=r.get("size",100),e.align=r.get("align","middle"),e.position=r.get("position",{start:0,left:0,middle:50,end:100,right:100},e.align),e.positionAlign=r.get("positionAlign",{start:"start",left:"start",middle:"middle",end:"end",right:"end"},e.align)}(t,e)}function kt(t,e){function n(t){return Tr[t]}for(var r,i=t.document.createElement("div"),o=i,s=[];null!==(r=function(){if(!e)return null;var t=e.match(/^([^<]*)(<[^>]+>?)?/);return function(t){return e=e.substr(t.length),t}(t[1]?t[1]:t[2])}());)if("<"!==r[0])o.appendChild(t.document.createTextNode(function(t){for(;c=t.match(/&(amp|lt|gt|lrm|rlm|nbsp);/);)t=t.replace(c[0],n);return t}(r)));else{if("/"===r[1]){s.length&&s[s.length-1]===r.substr(2).replace(">","")&&(s.pop(),o=o.parentNode);continue}var a,l=_t(r.substr(1,r.length-2));if(l){a=t.document.createProcessingInstruction("timestamp",l),o.appendChild(a);continue}var c=r.match(/^<([^.\s\/0-9>]+)(\.[^\s\\>]+)?([^>\\]+)?(\\?)>?$/);if(!c)continue;if(!(a=function(e,n){var r=Cr[e];if(!r)return null;var i=t.document.createElement(r);i.localName=r;var o=kr[e];return o&&n&&(i[o]=n.trim()),i}(c[1],c[3])))continue;if(!function(t,e){return!wr[e.localName]||wr[e.localName]===t.localName}(o,a))continue;c[2]&&(a.className=c[2].substr(1).replace("."," ")),s.push(c[1]),o.appendChild(a),o=a}return i}function wt(t){for(var e=0;e<Er.length;e++){var n=Er[e];if(t>=n[0]&&t<=n[1])return!0}return!1}function Et(t){function e(t,e){for(var n=e.childNodes.length-1;n>=0;n--)t.push(e.childNodes[n])}function n(t){if(!t||!t.length)return null;var r=t.pop(),i=r.textContent||r.innerText;if(i){var o=i.match(/^.*(\n|\r)/);return o?(t.length=0,o[0]):i}return"ruby"===r.tagName?n(t):r.childNodes?(e(t,r),n(t)):void 0}var r,i=[],o="";if(!t||!t.childNodes)return"ltr";for(e(i,t);o=n(i);)for(var s=0;s<o.length;s++)if(r=o.charCodeAt(s),wt(r))return"rtl";return"ltr"}function St(t){if("number"==typeof t.line&&(t.snapToLines||t.line>=0&&t.line<=100))return t.line;if(!t.track||!t.track.textTrackList||!t.track.textTrackList.mediaElement)return-1;for(var e=t.track,n=e.textTrackList,r=0,i=0;i<n.length&&n[i]!==e;i++)"showing"===n[i].mode&&r++;return-1*++r}function xt(){}function jt(t,e,n){var r=/MSIE\s8\.0/.test(navigator.userAgent),i="rgba(255, 255, 255, 1)",o="rgba(0, 0, 0, 0.8)";r&&(i="rgb(255, 255, 255)",o="rgb(0, 0, 0)"),xt.call(this),this.cue=e,this.cueDiv=kt(t,e.text);var s={color:i,backgroundColor:o,position:"relative",left:0,right:0,top:0,bottom:0,display:"inline"};r||(s.writingMode=""===e.vertical?"horizontal-tb":"lr"===e.vertical?"vertical-lr":"vertical-rl",s.unicodeBidi="plaintext"),this.applyStyles(s,this.cueDiv),this.div=t.document.createElement("div"),s={textAlign:"middle"===e.align?"center":e.align,font:n.font,whiteSpace:"pre-line",position:"absolute"},r||(s.direction=Et(this.cueDiv),s.writingMode=""===e.vertical?"horizontal-tb":"lr"===e.vertical?"vertical-lr":"vertical-rl".stylesunicodeBidi="plaintext"),this.applyStyles(s),this.div.appendChild(this.cueDiv);var a=0;switch(e.positionAlign){case"start":a=e.position;break;case"middle":a=e.position-e.size/2;break;case"end":a=e.position-e.size}""===e.vertical?this.applyStyles({left:this.formatStyle(a,"%"),width:this.formatStyle(e.size,"%")}):this.applyStyles({top:this.formatStyle(a,"%"),height:this.formatStyle(e.size,"%")}),this.move=function(t){this.applyStyles({top:this.formatStyle(t.top,"px"),bottom:this.formatStyle(t.bottom,"px"),left:this.formatStyle(t.left,"px"),right:this.formatStyle(t.right,"px"),height:this.formatStyle(t.height,"px"),width:this.formatStyle(t.width,"px")})}}function At(t){var e,n,r,i,o=/MSIE\s8\.0/.test(navigator.userAgent);if(t.div){n=t.div.offsetHeight,r=t.div.offsetWidth,i=t.div.offsetTop;var s=(s=t.div.childNodes)&&(s=s[0])&&s.getClientRects&&s.getClientRects();t=t.div.getBoundingClientRect(),e=s?Math.max(s[0]&&s[0].height||0,t.height/s.length):0}this.left=t.left,this.right=t.right,this.top=t.top||i,this.height=t.height||n,this.bottom=t.bottom||i+(t.height||n),this.width=t.width||r,this.lineHeight=void 0!==e?e:t.lineHeight,o&&!this.lineHeight&&(this.lineHeight=13)}function Pt(t,e,n,r){var i=new At(e),o=e.cue,s=St(o),a=[];if(o.snapToLines){var l;switch(o.vertical){case"":a=["+y","-y"],l="height";break;case"rl":a=["+x","-x"],l="width";break;case"lr":a=["-x","+x"],l="width"}var c=i.lineHeight,u=c*Math.round(s),h=n[l]+c,p=a[0];Math.abs(u)>h&&(u=u<0?-1:1,u*=Math.ceil(h/c)*c),s<0&&(u+=""===o.vertical?n.height:n.width,a=a.reverse()),i.move(p,u)}else{var d=i.lineHeight/n.height*100;switch(o.lineAlign){case"middle":s-=d/2;break;case"end":s-=d}switch(o.vertical){case"":e.applyStyles({top:e.formatStyle(s,"%")});break;case"rl":e.applyStyles({left:e.formatStyle(s,"%")});break;case"lr":e.applyStyles({right:e.formatStyle(s,"%")})}a=["+y","-x","+x","-y"],i=new At(e)}var f=function(t,e){for(var i,o=new At(t),s=1,a=0;a<e.length;a++){for(;t.overlapsOppositeAxis(n,e[a])||t.within(n)&&t.overlapsAny(r);)t.move(e[a]);if(t.within(n))return t;var l=t.intersectPercentage(n);s>l&&(i=new At(t),s=l),t=new At(o)}return i||o}(i,a);e.move(f.toCSSCompatValues(n))}function Nt(){}function Ot(t){return"string"==typeof t&&(!!jr[t.toLowerCase()]&&t.toLowerCase())}function Mt(t){return"string"==typeof t&&(!!Ar[t.toLowerCase()]&&t.toLowerCase())}function It(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)t[r]=n[r]}return t}function Dt(t,e,n){var r=this,i=/MSIE\s8\.0/.test(navigator.userAgent),o={};i?r=document.createElement("custom"):o.enumerable=!0,r.hasBeenReset=!1;var s="",a=!1,l=t,c=e,u=n,h=null,p="",d=!0,f="auto",v="start",y=50,g="middle",m=50,_="middle";if(Object.defineProperty(r,"id",It({},o,{get:function(){return s},set:function(t){s=""+t}})),Object.defineProperty(r,"pauseOnExit",It({},o,{get:function(){return a},set:function(t){a=!!t}})),Object.defineProperty(r,"startTime",It({},o,{get:function(){return l},set:function(t){if("number"!=typeof t)throw new TypeError("Start time must be set to a number.");l=t,this.hasBeenReset=!0}})),Object.defineProperty(r,"endTime",It({},o,{get:function(){return c},set:function(t){if("number"!=typeof t)throw new TypeError("End time must be set to a number.");c=t,this.hasBeenReset=!0}})),Object.defineProperty(r,"text",It({},o,{get:function(){return u},set:function(t){u=""+t,this.hasBeenReset=!0}})),Object.defineProperty(r,"region",It({},o,{get:function(){return h},set:function(t){h=t,this.hasBeenReset=!0}})),Object.defineProperty(r,"vertical",It({},o,{get:function(){return p},set:function(t){var e=Ot(t);if(!1===e)throw new SyntaxError("An invalid or illegal string was specified.");p=e,this.hasBeenReset=!0}})),Object.defineProperty(r,"snapToLines",It({},o,{get:function(){return d},set:function(t){d=!!t,this.hasBeenReset=!0}})),Object.defineProperty(r,"line",It({},o,{get:function(){return f},set:function(t){if("number"!=typeof t&&t!==xr)throw new SyntaxError("An invalid number or illegal string was specified.");f=t,this.hasBeenReset=!0}})),Object.defineProperty(r,"lineAlign",It({},o,{get:function(){return v},set:function(t){var e=Mt(t);if(!e)throw new SyntaxError("An invalid or illegal string was specified.");v=e,this.hasBeenReset=!0}})),Object.defineProperty(r,"position",It({},o,{get:function(){return y},set:function(t){if(t<0||t>100)throw new Error("Position must be between 0 and 100.");y=t,this.hasBeenReset=!0}})),Object.defineProperty(r,"positionAlign",It({},o,{get:function(){return g},set:function(t){var e=Mt(t);if(!e)throw new SyntaxError("An invalid or illegal string was specified.");g=e,this.hasBeenReset=!0}})),Object.defineProperty(r,"size",It({},o,{get:function(){return m},set:function(t){if(t<0||t>100)throw new Error("Size must be between 0 and 100.");m=t,this.hasBeenReset=!0}})),Object.defineProperty(r,"align",It({},o,{get:function(){return _},set:function(t){var e=Mt(t);if(!e)throw new SyntaxError("An invalid or illegal string was specified.");_=e,this.hasBeenReset=!0}})),r.displayState=void 0,i)return r}function Rt(t){return"string"==typeof t&&(!!Nr[t.toLowerCase()]&&t.toLowerCase())}function Lt(t){return"number"==typeof t&&t>=0&&t<=100}function Bt(){var t=100,e=3,n=0,r=100,i=0,o=100,s="";Object.defineProperties(this,{width:{enumerable:!0,get:function(){return t},set:function(e){if(!Lt(e))throw new Error("Width must be between 0 and 100.");t=e}},lines:{enumerable:!0,get:function(){return e},set:function(t){if("number"!=typeof t)throw new TypeError("Lines must be set to a number.");e=t}},regionAnchorY:{enumerable:!0,get:function(){return r},set:function(t){if(!Lt(t))throw new Error("RegionAnchorX must be between 0 and 100.");r=t}},regionAnchorX:{enumerable:!0,get:function(){return n},set:function(t){if(!Lt(t))throw new Error("RegionAnchorY must be between 0 and 100.");n=t}},viewportAnchorY:{enumerable:!0,get:function(){return o},set:function(t){if(!Lt(t))throw new Error("ViewportAnchorY must be between 0 and 100.");o=t}},viewportAnchorX:{enumerable:!0,get:function(){return i},set:function(t){if(!Lt(t))throw new Error("ViewportAnchorX must be between 0 and 100.");i=t}},scroll:{enumerable:!0,get:function(){return s},set:function(t){var e=Rt(t);if(!1===e)throw new SyntaxError("An invalid or illegal string was specified.");s=e}}})}function Ft(t,e,n,r){var i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:{},o=t.textTracks();i.kind=e,n&&(i.label=n),r&&(i.language=r),i.tech=t;var s=new _r.text.TrackClass(i);return o.addTrack(s),s}function Ht(t,e){Dr[t]=Dr[t]||[],Dr[t].push(e)}function Vt(t,e,n){t.setTimeout(function(){return qt(e,Dr[e.type],n,t)},1)}function zt(t,e){t.forEach(function(t){return t.setTech&&t.setTech(e)})}function Wt(t,e,n){return t.reduceRight(Xt(n),e[n]())}function Ut(t,e,n,r){return e[n](t.reduce(Xt(n),r))}function Xt(t){return function(e,n){return n[t]?n[t](e):e}}function qt(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],n=arguments[2],i=arguments[3],o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:[],s=arguments.length>5&&void 0!==arguments[5]&&arguments[5],a=e[0],l=e.slice(1);if("string"==typeof a)qt(t,Dr[a],n,i,o,s);else if(a){var c=a(i);c.setSource(r({},t),function(e,r){if(e)return qt(t,l,n,i,o,s);o.push(c),qt(r,t.type===r.type?l:Dr[r.type],n,i,o,s)})}else l.length?qt(t,l,n,i,o,s):s?n(t,o):qt(t,Dr["*"],n,i,o,!0)}function Kt(t,e){return"rgba("+parseInt(t[1]+t[1],16)+","+parseInt(t[2]+t[2],16)+","+parseInt(t[3]+t[3],16)+","+e+")"}function Gt(t,e,n){try{t.style[e]=n}catch(t){return}}function Yt(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:t;t=t<0?0:t;var n=Math.floor(t%60),r=Math.floor(t/60%60),i=Math.floor(t/3600),o=Math.floor(e/60%60),s=Math.floor(e/3600);return(isNaN(t)||t===1/0)&&(i=r=n="-"),i=i>0||s>0?i+":":"",r=((i||o>=10)&&r<10?"0"+r:r)+":",n=n<10?"0"+n:n,i+r+n}function $t(t,e){if(e&&(t=e(t)),t&&"none"!==t)return t}function Jt(t,e){return $t(t.options[t.options.selectedIndex].value,e)}function Qt(t,e,n){if(e)for(var r=0;r<t.options.length;r++)if($t(t.options[r].value,n)===e){t.selectedIndex=r;break}}function Zt(t,e,n){var r=void 0;if("string"==typeof t){var o=Zt.getPlayers();if(0===t.indexOf("#")&&(t=t.slice(1)),o[t])return e&&Ue.warn('Player "'+t+'" is already initialised. Options will not be applied.'),n&&o[t].ready(n),o[t];r=Ke("#"+t)}else r=t;if(!r||!r.nodeName)throw new TypeError("The element or ID supplied is not valid. (videojs)");if(r.player||io.players[r.playerId])return r.player||io.players[r.playerId];e=e||{},Zt.hooks("beforesetup").forEach(function(t){var n=t(r,Q(e));if(!i(n)||Array.isArray(n))return void Ue.error("please return an object in beforesetup hooks");e=Q(e,n)});var s=mn.getComponent("Player"),a=new s(r,e,n);return Zt.hooks("setup").forEach(function(t){return t(a)}),a}var te,ee="6.2.0",ne="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};te="undefined"!=typeof window?window:void 0!==ne?ne:"undefined"!=typeof self?self:{};var re,ie=te,oe={},se=(Object.freeze||Object)({default:oe}),ae=se&&oe||se,le=void 0!==ne?ne:"undefined"!=typeof window?window:{};"undefined"!=typeof document?re=document:(re=le["__GLOBAL_DOCUMENT_CACHE@4"])||(re=le["__GLOBAL_DOCUMENT_CACHE@4"]=ae);var ce=re,ue=ie.navigator&&ie.navigator.userAgent||"",he=/AppleWebKit\/([\d.]+)/i.exec(ue),pe=he?parseFloat(he.pop()):null,de=/iPad/i.test(ue),fe=/iPhone/i.test(ue)&&!de,ve=/iPod/i.test(ue),ye=fe||de||ve,ge=function(){var t=ue.match(/OS (\d+)_/i);return t&&t[1]?t[1]:null}(),me=/Android/i.test(ue),_e=function(){var t=ue.match(/Android (\d+)(?:\.(\d+))?(?:\.(\d+))*/i);if(!t)return null;var e=t[1]&&parseFloat(t[1]),n=t[2]&&parseFloat(t[2]);return e&&n?parseFloat(t[1]+"."+t[2]):e||null}(),be=me&&/webkit/i.test(ue)&&_e<2.3,Te=me&&_e<5&&pe<537,Ce=/Firefox/i.test(ue),ke=/Edge/i.test(ue),we=!ke&&/Chrome/i.test(ue),Ee=function(){var t=ue.match(/Chrome\/(\d+)/);return t&&t[1]?parseFloat(t[1]):null}(),Se=/MSIE\s8\.0/.test(ue),xe=function(){var t=/MSIE\s(\d+)\.\d/.exec(ue),e=t&&parseFloat(t[1]);return!e&&/Trident\/7.0/i.test(ue)&&/rv:11.0/.test(ue)&&(e=11),e}(),je=/Safari/i.test(ue)&&!we&&!me&&!ke,Ae=je||ye,Pe=h()&&("ontouchstart"in ie||ie.DocumentTouch&&ie.document instanceof ie.DocumentTouch),Ne=h()&&"backgroundSize"in ie.document.createElement("video").style,Oe=(Object.freeze||Object)({IS_IPAD:de,IS_IPHONE:fe,IS_IPOD:ve,IS_IOS:ye,IOS_VERSION:ge,IS_ANDROID:me,ANDROID_VERSION:_e,IS_OLD_ANDROID:be,IS_NATIVE_ANDROID:Te,IS_FIREFOX:Ce,IS_EDGE:ke,IS_CHROME:we,CHROME_VERSION:Ee,IS_IE8:Se,IE_VERSION:xe,IS_SAFARI:je,IS_ANY_SAFARI:Ae,TOUCH_ENABLED:Pe,BACKGROUND_SIZE_SUPPORTED:Ne}),Me="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Ie=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},De=function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)},Re=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e},Le=function(t,e){return t.raw=e,t},Be=Object.prototype.toString,Fe=function(t){return i(t)?Object.keys(t):[]},He=void 0,Ve="all",ze=[],We=function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:!!xe&&xe<11,r=He.levels[Ve],o=new RegExp("^("+r+")$");"log"!==t&&e.unshift(t.toUpperCase()+":"),ze&&ze.push([].concat(e)),e.unshift("VIDEOJS:");var s=ie.console&&ie.console[t];s&&r&&o.test(t)&&(n&&(e=e.map(function(t){if(i(t)||Array.isArray(t))try{return JSON.stringify(t)}catch(e){return String(t)}return String(t)}).join(" ")),s.apply?s[Array.isArray(e)?"apply":"call"](ie.console,e):s(e))};He=function(){for(var t=arguments.length,e=Array(t),n=0;n<t;n++)e[n]=arguments[n];We("log",e)},He.levels={all:"log|warn|error",error:"error",off:"",warn:"warn|error",DEFAULT:Ve},He.level=function(t){if("string"==typeof t){if(!He.levels.hasOwnProperty(t))throw new Error('"'+t+'" in not a valid log level');Ve=t}return Ve},He.history=function(){return ze?[].concat(ze):[]},He.history.clear=function(){ze&&(ze.length=0)},He.history.disable=function(){null!==ze&&(ze.length=0,ze=null)},He.history.enable=function(){null===ze&&(ze=[])},He.error=function(){for(var t=arguments.length,e=Array(t),n=0;n<t;n++)e[n]=arguments[n];return We("error",e)},He.warn=function(){for(var t=arguments.length,e=Array(t),n=0;n<t;n++)e[n]=arguments[n];return We("warn",e)};var Ue=He,Xe=function(t){for(var e="",n=0;n<arguments.length;n++)e+=s(t[n])+(arguments[n+1]||"");return e},qe=Le(["Setting attributes in the second argument of createEl()\n                has been deprecated. Use the third argument instead.\n                createEl(type, properties, attributes). Attempting to set "," to ","."],["Setting attributes in the second argument of createEl()\n                has been deprecated. Use the third argument instead.\n                createEl(type, properties, attributes). Attempting to set "," to ","."]),Ke=d("querySelector"),Ge=d("querySelectorAll"),Ye=(Object.freeze||Object)({isReal:h,isEl:p,createEl:f,textContent:v,prependTo:y,hasClass:g,addClass:m,removeClass:_,toggleClass:b,setAttributes:T,getAttributes:C,getAttribute:k,setAttribute:w,removeAttribute:E,blockTextSelection:S,unblockTextSelection:x,getBoundingClientRect:j,findPosition:A,getPointerPosition:P,isTextNode:N,emptyEl:O,normalizeContent:M,appendContent:I,insertContent:D,$:Ke,$$:Ge}),$e=1,Je={},Qe="vdata"+(new Date).getTime(),Ze=(Object.freeze||Object)({fixEvent:z,on:W,off:U,trigger:X,one:q}),tn=!1,en=void 0,nn=function(){if(h()){var t=ce.getElementsByTagName("video"),e=ce.getElementsByTagName("audio"),n=[];if(t&&t.length>0)for(var r=0,i=t.length;r<i;r++)n.push(t[r]);if(e&&e.length>0)for(var o=0,s=e.length;o<s;o++)n.push(e[o]);if(n&&n.length>0)for(var a=0,l=n.length;a<l;a++){var c=n[a];if(!c||!c.getAttribute){K(1);break}if(void 0===c.player){var u=c.getAttribute("data-setup");null!==u&&en(c)}}else tn||K(1)}};h()&&"complete"===ce.readyState?tn=!0:q(ie,"load",function(){tn=!0});var rn=function(t){var e=ce.createElement("style")
;return e.className=t,e},on=function(t,e){t.styleSheet?t.styleSheet.cssText=e:t.textContent=e},sn=function(t,e,n){e.guid||(e.guid=R());var r=function(){return e.apply(t,arguments)};return r.guid=n?n+"_"+e.guid:e.guid,r},an=function(t,e){var n=Date.now();return function(){var r=Date.now();r-n>=e&&(t.apply(void 0,arguments),n=r)}},ln=function(){};ln.prototype.allowedEvents_={},ln.prototype.on=function(t,e){var n=this.addEventListener;this.addEventListener=function(){},W(this,t,e),this.addEventListener=n},ln.prototype.addEventListener=ln.prototype.on,ln.prototype.off=function(t,e){U(this,t,e)},ln.prototype.removeEventListener=ln.prototype.off,ln.prototype.one=function(t,e){var n=this.addEventListener;this.addEventListener=function(){},q(this,t,e),this.addEventListener=n},ln.prototype.trigger=function(t){var e=t.type||t;"string"==typeof t&&(t={type:e}),t=z(t),this.allowedEvents_[e]&&this["on"+e]&&this["on"+e](t),X(this,t)},ln.prototype.dispatchEvent=ln.prototype.trigger;var cn=function(t){return t instanceof ln||!!t.eventBusEl_&&["on","one","off","trigger"].every(function(e){return"function"==typeof t[e]})},un=function(t){return"string"==typeof t&&/\S/.test(t)||Array.isArray(t)&&!!t.length},hn=function(t){if(!t.nodeName&&!cn(t))throw new Error("Invalid target; must be a DOM node or evented object.")},pn=function(t){if(!un(t))throw new Error("Invalid event type; must be a non-empty string or array.")},dn=function(t){if("function"!=typeof t)throw new Error("Invalid listener; must be a function.")},fn=function(t,e){var n=e.length<3||e[0]===t||e[0]===t.eventBusEl_,r=void 0,i=void 0,o=void 0;return n?(r=t.eventBusEl_,e.length>=3&&e.shift(),i=e[0],o=e[1]):(r=e[0],i=e[1],o=e[2]),hn(r),pn(i),dn(o),o=sn(t,o),{isTargetingSelf:n,target:r,type:i,listener:o}},vn=function(t,e,n,r){hn(t),t.nodeName?Ze[e](t,n,r):t[e](n,r)},yn={on:function(){for(var t=this,e=arguments.length,n=Array(e),r=0;r<e;r++)n[r]=arguments[r];var i=fn(this,n),o=i.isTargetingSelf,s=i.target,a=i.type,l=i.listener;if(vn(s,"on",a,l),!o){var c=function(){return t.off(s,a,l)};c.guid=l.guid;var u=function(){return t.off("dispose",c)};u.guid=l.guid,vn(this,"on","dispose",c),vn(s,"on","dispose",u)}},one:function(){for(var t=this,e=arguments.length,n=Array(e),r=0;r<e;r++)n[r]=arguments[r];var i=fn(this,n),o=i.isTargetingSelf,s=i.target,a=i.type,l=i.listener;if(o)vn(s,"one",a,l);else{var c=function e(){for(var n=arguments.length,r=Array(n),i=0;i<n;i++)r[i]=arguments[i];t.off(s,a,e),l.apply(null,r)};c.guid=l.guid,vn(s,"one",a,c)}},off:function(t,e,n){if(!t||un(t))U(this.eventBusEl_,t,e);else{var r=t,i=e;hn(r),pn(i),dn(n),n=sn(this,n),this.off("dispose",n),r.nodeName?(U(r,i,n),U(r,"dispose",n)):cn(r)&&(r.off(i,n),r.off("dispose",n))}},trigger:function(t,e){return X(this.eventBusEl_,t,e)}},gn={state:{},setState:function(t){var n=this;"function"==typeof t&&(t=t());var r=void 0;return e(t,function(t,e){n.state[e]!==t&&(r=r||{},r[e]={from:n.state[e],to:t}),n.state[e]=t}),r&&cn(this)&&this.trigger({changes:r,type:"statechanged"}),r}},mn=function(){function t(e,n,r){if(Ie(this,t),!e&&this.play?this.player_=e=this:this.player_=e,this.options_=Q({},this.options_),n=this.options_=Q(this.options_,n),this.id_=n.id||n.el&&n.el.id,!this.id_){var i=e&&e.id&&e.id()||"no_player";this.id_=i+"_component_"+R()}this.name_=n.name||null,n.el?this.el_=n.el:!1!==n.createEl&&(this.el_=this.createEl()),G(this,{eventBusKey:this.el_?"el_":null}),Y(this,this.constructor.defaultState),this.children_=[],this.childIndex_={},this.childNameIndex_={},!1!==n.initChildren&&this.initChildren(),this.ready(r),!1!==n.reportTouchActivity&&this.enableTouchActivity()}return t.prototype.dispose=function(){if(this.trigger({type:"dispose",bubbles:!1}),this.children_)for(var t=this.children_.length-1;t>=0;t--)this.children_[t].dispose&&this.children_[t].dispose();this.children_=null,this.childIndex_=null,this.childNameIndex_=null,this.el_&&(this.el_.parentNode&&this.el_.parentNode.removeChild(this.el_),F(this.el_),this.el_=null)},t.prototype.player=function(){return this.player_},t.prototype.options=function(t){return Ue.warn("this.options() has been deprecated and will be moved to the constructor in 6.0"),t?(this.options_=Q(this.options_,t),this.options_):this.options_},t.prototype.el=function(){return this.el_},t.prototype.createEl=function(t,e,n){return f(t,e,n)},t.prototype.localize=function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:t,r=this.player_.language&&this.player_.language(),i=this.player_.languages&&this.player_.languages(),o=i&&i[r],s=r&&r.split("-")[0],a=i&&i[s],l=n;return o&&o[t]?l=o[t]:a&&a[t]&&(l=a[t]),e&&(l=l.replace(/\{(\d+)\}/g,function(t,n){var r=e[n-1],i=r;return void 0===r&&(i=t),i})),l},t.prototype.contentEl=function(){return this.contentEl_||this.el_},t.prototype.id=function(){return this.id_},t.prototype.name=function(){return this.name_},t.prototype.children=function(){return this.children_},t.prototype.getChildById=function(t){return this.childIndex_[t]},t.prototype.getChild=function(t){if(t)return t=$(t),this.childNameIndex_[t]},t.prototype.addChild=function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:this.children_.length,i=void 0,o=void 0;if("string"==typeof e){o=$(e);var s=n.componentClass||o;n.name=o;var a=t.getComponent(s);if(!a)throw new Error("Component "+s+" does not exist");if("function"!=typeof a)return null;i=new a(this.player_||this,n)}else i=e;if(this.children_.splice(r,0,i),"function"==typeof i.id&&(this.childIndex_[i.id()]=i),o=o||i.name&&$(i.name()),o&&(this.childNameIndex_[o]=i),"function"==typeof i.el&&i.el()){var l=this.contentEl().children,c=l[r]||null;this.contentEl().insertBefore(i.el(),c)}return i},t.prototype.removeChild=function(t){if("string"==typeof t&&(t=this.getChild(t)),t&&this.children_){for(var e=!1,n=this.children_.length-1;n>=0;n--)if(this.children_[n]===t){e=!0,this.children_.splice(n,1);break}if(e){this.childIndex_[t.id()]=null,this.childNameIndex_[t.name()]=null;var r=t.el();r&&r.parentNode===this.contentEl()&&this.contentEl().removeChild(t.el())}}},t.prototype.initChildren=function(){var e=this,n=this.options_.children;if(n){var r=this.options_,i=function(t){var n=t.name,i=t.opts;if(void 0!==r[n]&&(i=r[n]),!1!==i){!0===i&&(i={}),i.playerOptions=e.options_.playerOptions;var o=e.addChild(n,i);o&&(e[n]=o)}},o=void 0,s=t.getComponent("Tech");o=Array.isArray(n)?n:Object.keys(n),o.concat(Object.keys(this.options_).filter(function(t){return!o.some(function(e){return"string"==typeof e?t===e:t===e.name})})).map(function(t){var r=void 0,i=void 0;return"string"==typeof t?(r=t,i=n[r]||e.options_[r]||{}):(r=t.name,i=t),{name:r,opts:i}}).filter(function(e){var n=t.getComponent(e.opts.componentClass||$(e.name));return n&&!s.isTech(n)}).forEach(i)}},t.prototype.buildCSSClass=function(){return""},t.prototype.ready=function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];t&&(this.isReady_?e?t.call(this):this.setTimeout(t,1):(this.readyQueue_=this.readyQueue_||[],this.readyQueue_.push(t)))},t.prototype.triggerReady=function(){this.isReady_=!0,this.setTimeout(function(){var t=this.readyQueue_;this.readyQueue_=[],t&&t.length>0&&t.forEach(function(t){t.call(this)},this),this.trigger("ready")},1)},t.prototype.$=function(t,e){return Ke(t,e||this.contentEl())},t.prototype.$$=function(t,e){return Ge(t,e||this.contentEl())},t.prototype.hasClass=function(t){return g(this.el_,t)},t.prototype.addClass=function(t){m(this.el_,t)},t.prototype.removeClass=function(t){_(this.el_,t)},t.prototype.toggleClass=function(t,e){b(this.el_,t,e)},t.prototype.show=function(){this.removeClass("vjs-hidden")},t.prototype.hide=function(){this.addClass("vjs-hidden")},t.prototype.lockShowing=function(){this.addClass("vjs-lock-showing")},t.prototype.unlockShowing=function(){this.removeClass("vjs-lock-showing")},t.prototype.getAttribute=function(t){return k(this.el_,t)},t.prototype.setAttribute=function(t,e){w(this.el_,t,e)},t.prototype.removeAttribute=function(t){E(this.el_,t)},t.prototype.width=function(t,e){return this.dimension("width",t,e)},t.prototype.height=function(t,e){return this.dimension("height",t,e)},t.prototype.dimensions=function(t,e){this.width(t,!0),this.height(e)},t.prototype.dimension=function(t,e,n){if(void 0!==e)return null!==e&&e===e||(e=0),-1!==(""+e).indexOf("%")||-1!==(""+e).indexOf("px")?this.el_.style[t]=e:this.el_.style[t]="auto"===e?"":e+"px",void(n||this.trigger("componentresize"));if(!this.el_)return 0;var r=this.el_.style[t],i=r.indexOf("px");return-1!==i?parseInt(r.slice(0,i),10):parseInt(this.el_["offset"+$(t)],10)},t.prototype.currentDimension=function(t){var e=0;if("width"!==t&&"height"!==t)throw new Error("currentDimension only accepts width or height value");if("function"==typeof ie.getComputedStyle){var n=ie.getComputedStyle(this.el_);e=n.getPropertyValue(t)||n[t]}if(0===(e=parseFloat(e))){var r="offset"+$(t);e=this.el_[r]}return e},t.prototype.currentDimensions=function(){return{width:this.currentDimension("width"),height:this.currentDimension("height")}},t.prototype.currentWidth=function(){return this.currentDimension("width")},t.prototype.currentHeight=function(){return this.currentDimension("height")},t.prototype.focus=function(){this.el_.focus()},t.prototype.blur=function(){this.el_.blur()},t.prototype.emitTapEvents=function(){var t=0,e=null,n=void 0;this.on("touchstart",function(r){1===r.touches.length&&(e={pageX:r.touches[0].pageX,pageY:r.touches[0].pageY},t=(new Date).getTime(),n=!0)}),this.on("touchmove",function(t){if(t.touches.length>1)n=!1;else if(e){var r=t.touches[0].pageX-e.pageX,i=t.touches[0].pageY-e.pageY,o=Math.sqrt(r*r+i*i);o>10&&(n=!1)}});var r=function(){n=!1};this.on("touchleave",r),this.on("touchcancel",r),this.on("touchend",function(r){if(e=null,!0===n){(new Date).getTime()-t<200&&(r.preventDefault(),this.trigger("tap"))}})},t.prototype.enableTouchActivity=function(){if(this.player()&&this.player().reportUserActivity){var t=sn(this.player(),this.player().reportUserActivity),e=void 0;this.on("touchstart",function(){t(),this.clearInterval(e),e=this.setInterval(t,250)});var n=function(n){t(),this.clearInterval(e)};this.on("touchmove",t),this.on("touchend",n),this.on("touchcancel",n)}},t.prototype.setTimeout=function(t,e){t=sn(this,t);var n=ie.setTimeout(t,e),r=function(){this.clearTimeout(n)};return r.guid="vjs-timeout-"+n,this.on("dispose",r),n},t.prototype.clearTimeout=function(t){ie.clearTimeout(t);var e=function(){};return e.guid="vjs-timeout-"+t,this.off("dispose",e),t},t.prototype.setInterval=function(t,e){t=sn(this,t);var n=ie.setInterval(t,e),r=function(){this.clearInterval(n)};return r.guid="vjs-interval-"+n,this.on("dispose",r),n},t.prototype.clearInterval=function(t){ie.clearInterval(t);var e=function(){};return e.guid="vjs-interval-"+t,this.off("dispose",e),t},t.prototype.requestAnimationFrame=function(t){var e=this;if(this.supportsRaf_){t=sn(this,t);var n=ie.requestAnimationFrame(t),r=function(){return e.cancelAnimationFrame(n)};return r.guid="vjs-raf-"+n,this.on("dispose",r),n}return this.setTimeout(t,1e3/60)},t.prototype.cancelAnimationFrame=function(t){if(this.supportsRaf_){ie.cancelAnimationFrame(t);var e=function(){};return e.guid="vjs-raf-"+t,this.off("dispose",e),t}return this.clearTimeout(t)},t.registerComponent=function(e,n){if("string"!=typeof e||!e)throw new Error('Illegal component name, "'+e+'"; must be a non-empty string.');var r=t.getComponent("Tech"),i=r&&r.isTech(n),o=t===n||t.prototype.isPrototypeOf(n.prototype);if(i||!o){var s=void 0;throw s=i?"techs must be registered using Tech.registerTech()":"must be a Component subclass",new Error('Illegal component, "'+e+'"; '+s+".")}e=$(e),t.components_||(t.components_={});var a=t.getComponent("Player");if("Player"===e&&a&&a.players){var l=a.players,c=Object.keys(l);if(l&&c.length>0&&c.map(function(t){return l[t]}).every(Boolean))throw new Error("Can not register Player component after player has been created.")}return t.components_[e]=n,n},t.getComponent=function(e){if(e)return e=$(e),t.components_&&t.components_[e]?t.components_[e]:void 0},t}();mn.prototype.supportsRaf_="function"==typeof ie.requestAnimationFrame&&"function"==typeof ie.cancelAnimationFrame,mn.registerComponent("Component",mn);for(var _n={},bn=[["requestFullscreen","exitFullscreen","fullscreenElement","fullscreenEnabled","fullscreenchange","fullscreenerror"],["webkitRequestFullscreen","webkitExitFullscreen","webkitFullscreenElement","webkitFullscreenEnabled","webkitfullscreenchange","webkitfullscreenerror"],["webkitRequestFullScreen","webkitCancelFullScreen","webkitCurrentFullScreenElement","webkitCancelFullScreen","webkitfullscreenchange","webkitfullscreenerror"],["mozRequestFullScreen","mozCancelFullScreen","mozFullScreenElement","mozFullScreenEnabled","mozfullscreenchange","mozfullscreenerror"],["msRequestFullscreen","msExitFullscreen","msFullscreenElement","msFullscreenEnabled","MSFullscreenChange","MSFullscreenError"]],Tn=bn[0],Cn=void 0,kn=0;kn<bn.length;kn++)if(bn[kn][1]in ce){Cn=bn[kn];break}if(Cn)for(var wn=0;wn<Cn.length;wn++)_n[Tn[wn]]=Cn[wn];it.prototype.code=0,it.prototype.message="",it.prototype.status=null,it.errorTypes=["MEDIA_ERR_CUSTOM","MEDIA_ERR_ABORTED","MEDIA_ERR_NETWORK","MEDIA_ERR_DECODE","MEDIA_ERR_SRC_NOT_SUPPORTED","MEDIA_ERR_ENCRYPTED"],it.defaultMessages={1:"You aborted the media playback",2:"A network error caused the media download to fail part-way.",3:"The media playback was aborted due to a corruption problem or because the media used features your browser did not support.",4:"The media could not be loaded, either because the server or network failed or because the format is not supported.",5:"The media is encrypted and we do not have the keys to decrypt it."};for(var En=0;En<it.errorTypes.length;En++)it[it.errorTypes[En]]=En,it.prototype[it.errorTypes[En]]=En;var Sn=ot,xn=function(t){return["kind","label","language","id","inBandMetadataTrackDispatchType","mode","src"].reduce(function(e,n,r){return t[n]&&(e[n]=t[n]),e},{cues:t.cues&&Array.prototype.map.call(t.cues,function(t){return{startTime:t.startTime,endTime:t.endTime,text:t.text,id:t.id}})})},jn=function(t){var e=t.$$("track"),n=Array.prototype.map.call(e,function(t){return t.track});return Array.prototype.map.call(e,function(t){var e=xn(t.track);return t.src&&(e.src=t.src),e}).concat(Array.prototype.filter.call(t.textTracks(),function(t){return-1===n.indexOf(t)}).map(xn))},An=function(t,e){return t.forEach(function(t){var n=e.addRemoteTextTrack(t).track;!t.src&&t.cues&&t.cues.forEach(function(t){return n.addCue(t)})}),e.textTracks()},Pn={textTracksToJson:jn,jsonToTextTracks:An,trackToJson_:xn},Nn="vjs-modal-dialog",On=function(t){function e(n,r){Ie(this,e);var i=Re(this,t.call(this,n,r));return i.opened_=i.hasBeenOpened_=i.hasBeenFilled_=!1,i.closeable(!i.options_.uncloseable),i.content(i.options_.content),i.contentEl_=f("div",{className:Nn+"-content"},{role:"document"}),i.descEl_=f("p",{className:Nn+"-description vjs-control-text",id:i.el().getAttribute("aria-describedby")}),v(i.descEl_,i.description()),i.el_.appendChild(i.descEl_),i.el_.appendChild(i.contentEl_),i}return De(e,t),e.prototype.createEl=function(){return t.prototype.createEl.call(this,"div",{className:this.buildCSSClass(),tabIndex:-1},{"aria-describedby":this.id()+"_description","aria-hidden":"true","aria-label":this.label(),role:"dialog"})},e.prototype.buildCSSClass=function(){return Nn+" vjs-hidden "+t.prototype.buildCSSClass.call(this)},e.prototype.handleKeyPress=function(t){27===t.which&&this.closeable()&&this.close()},e.prototype.label=function(){return this.localize(this.options_.label||"Modal Window")},e.prototype.description=function(){var t=this.options_.description||this.localize("This is a modal window.");return this.closeable()&&(t+=" "+this.localize("This modal can be closed by pressing the Escape key or activating the close button.")),t},e.prototype.open=function(){if(!this.opened_){var t=this.player();this.trigger("beforemodalopen"),this.opened_=!0,(this.options_.fillAlways||!this.hasBeenOpened_&&!this.hasBeenFilled_)&&this.fill(),this.wasPlaying_=!t.paused(),this.options_.pauseOnOpen&&this.wasPlaying_&&t.pause(),this.closeable()&&this.on(this.el_.ownerDocument,"keydown",sn(this,this.handleKeyPress)),t.controls(!1),this.show(),this.conditionalFocus_(),this.el().setAttribute("aria-hidden","false"),this.trigger("modalopen"),this.hasBeenOpened_=!0}},e.prototype.opened=function(t){return"boolean"==typeof t&&this[t?"open":"close"](),this.opened_},e.prototype.close=function(){if(this.opened_){var t=this.player();this.trigger("beforemodalclose"),this.opened_=!1,this.wasPlaying_&&this.options_.pauseOnOpen&&t.play(),this.closeable()&&this.off(this.el_.ownerDocument,"keydown",sn(this,this.handleKeyPress)),t.controls(!0),this.hide(),this.el().setAttribute("aria-hidden","true"),this.trigger("modalclose"),this.conditionalBlur_(),this.options_.temporary&&this.dispose()}},e.prototype.closeable=function(t){if("boolean"==typeof t){var e=this.closeable_=!!t,n=this.getChild("closeButton");if(e&&!n){var r=this.contentEl_;this.contentEl_=this.el_,n=this.addChild("closeButton",{controlText:"Close Modal Dialog"}),this.contentEl_=r,this.on(n,"close",this.close)}!e&&n&&(this.off(n,"close",this.close),this.removeChild(n),n.dispose())}return this.closeable_},e.prototype.fill=function(){this.fillWith(this.content())},e.prototype.fillWith=function(t){var e=this.contentEl(),n=e.parentNode,r=e.nextSibling;this.trigger("beforemodalfill"),this.hasBeenFilled_=!0,n.removeChild(e),this.empty(),D(e,t),this.trigger("modalfill"),r?n.insertBefore(e,r):n.appendChild(e);var i=this.getChild("closeButton");i&&n.appendChild(i.el_)},e.prototype.empty=function(){this.trigger("beforemodalempty"),O(this.contentEl()),this.trigger("modalempty")},e.prototype.content=function(t){return void 0!==t&&(this.content_=t),this.content_},e.prototype.conditionalFocus_=function(){var t=ce.activeElement,e=this.player_.el_;this.previouslyActiveEl_=null,(e.contains(t)||e===t)&&(this.previouslyActiveEl_=t,this.focus(),this.on(ce,"keydown",this.handleKeyDown))},e.prototype.conditionalBlur_=function(){this.previouslyActiveEl_&&(this.previouslyActiveEl_.focus(),this.previouslyActiveEl_=null),this.off(ce,"keydown",this.handleKeyDown)},e.prototype.handleKeyDown=function(t){if(9===t.which){for(var e=this.focusableEls_(),n=this.el_.querySelector(":focus"),r=void 0,i=0;i<e.length;i++)if(n===e[i]){r=i;break}ce.activeElement===this.el_&&(r=0),t.shiftKey&&0===r?(e[e.length-1].focus(),t.preventDefault()):t.shiftKey||r!==e.length-1||(e[0].focus(),t.preventDefault())}},e.prototype.focusableEls_=function(){var t=this.el_.querySelectorAll("*");return Array.prototype.filter.call(t,function(t){return(t instanceof ie.HTMLAnchorElement||t instanceof ie.HTMLAreaElement)&&t.hasAttribute("href")||(t instanceof ie.HTMLInputElement||t instanceof ie.HTMLSelectElement||t instanceof ie.HTMLTextAreaElement||t instanceof ie.HTMLButtonElement)&&!t.hasAttribute("disabled")||t instanceof ie.HTMLIFrameElement||t instanceof ie.HTMLObjectElement||t instanceof ie.HTMLEmbedElement||t.hasAttribute("tabindex")&&-1!==t.getAttribute("tabindex")||t.hasAttribute("contenteditable")})},e}(mn);On.prototype.options_={pauseOnOpen:!0,temporary:!0},mn.registerComponent("ModalDialog",On);var Mn=function(t){function e(){var n,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;Ie(this,e);var o=Re(this,t.call(this));if(!i&&(i=o,Se)){i=ce.createElement("custom");for(var s in e.prototype)"constructor"!==s&&(i[s]=e.prototype[s])}i.tracks_=[],Object.defineProperty(i,"length",{get:function(){return this.tracks_.length}});for(var a=0;a<r.length;a++)i.addTrack(r[a]);return n=i,Re(o,n)}return De(e,t),e.prototype.addTrack=function(t){var e=this.tracks_.length;""+e in this||Object.defineProperty(this,e,{get:function(){return this.tracks_[e]}}),-1===this.tracks_.indexOf(t)&&(this.tracks_.push(t),this.trigger({track:t,type:"addtrack"}))},e.prototype.removeTrack=function(t){for(var e=void 0,n=0,r=this.length;n<r;n++)if(this[n]===t){e=this[n],e.off&&e.off(),this.tracks_.splice(n,1);break}e&&this.trigger({track:e,type:"removetrack"})},e.prototype.getTrackById=function(t){for(var e=null,n=0,r=this.length;n<r;n++){var i=this[n];if(i.id===t){e=i;break}}return e},e}(ln);Mn.prototype.allowedEvents_={change:"change",addtrack:"addtrack",removetrack:"removetrack"};for(var In in Mn.prototype.allowedEvents_)Mn.prototype["on"+In]=null;var Dn=function(t,e){for(var n=0;n<t.length;n++)e.id!==t[n].id&&(t[n].enabled=!1)},Rn=function(t){function e(){var n,r,i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];Ie(this,e);for(var o=void 0,s=i.length-1;s>=0;s--)if(i[s].enabled){Dn(i,i[s]);break}if(Se){o=ce.createElement("custom");for(var a in Mn.prototype)"constructor"!==a&&(o[a]=Mn.prototype[a]);for(var l in e.prototype)"constructor"!==l&&(o[l]=e.prototype[l])}return o=n=Re(this,t.call(this,i,o)),o.changing_=!1,r=o,Re(n,r)}return De(e,t),e.prototype.addTrack=function(e){var n=this;e.enabled&&Dn(this,e),t.prototype.addTrack.call(this,e),e.addEventListener&&e.addEventListener("enabledchange",function(){n.changing_||(n.changing_=!0,Dn(n,e),n.changing_=!1,n.trigger("change"))})},e}(Mn),Ln=function(t,e){for(var n=0;n<t.length;n++)e.id!==t[n].id&&(t[n].selected=!1)},Bn=function(t){function e(){var n,r,i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];Ie(this,e);for(var o=void 0,s=i.length-1;s>=0;s--)if(i[s].selected){Ln(i,i[s]);break}if(Se){o=ce.createElement("custom");for(var a in Mn.prototype)"constructor"!==a&&(o[a]=Mn.prototype[a]);for(var l in e.prototype)"constructor"!==l&&(o[l]=e.prototype[l])}return o=n=Re(this,t.call(this,i,o)),o.changing_=!1,Object.defineProperty(o,"selectedIndex",{get:function(){for(var t=0;t<this.length;t++)if(this[t].selected)return t;return-1},set:function(){}}),r=o,Re(n,r)}return De(e,t),e.prototype.addTrack=function(e){var n=this;e.selected&&Ln(this,e),t.prototype.addTrack.call(this,e),e.addEventListener&&e.addEventListener("selectedchange",function(){n.changing_||(n.changing_=!0,Ln(n,e),n.changing_=!1,n.trigger("change"))})},e}(Mn),Fn=function(t){function e(){var n,r,i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];Ie(this,e);var o=void 0;if(Se){o=ce.createElement("custom");for(var s in Mn.prototype)"constructor"!==s&&(o[s]=Mn.prototype[s]);for(var a in e.prototype)"constructor"!==a&&(o[a]=e.prototype[a])}return o=n=Re(this,t.call(this,i,o)),r=o,Re(n,r)}return De(e,t),e.prototype.addTrack=function(e){t.prototype.addTrack.call(this,e),e.addEventListener("modechange",sn(this,function(){this.trigger("change")})),-1===["metadata","chapters"].indexOf(e.kind)&&e.addEventListener("modechange",sn(this,function(){this.trigger("selectedlanguagechange")}))},e}(Mn),Hn=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];Ie(this,t);var n=this;if(Se){n=ce.createElement("custom");for(var r in t.prototype)"constructor"!==r&&(n[r]=t.prototype[r])}n.trackElements_=[],Object.defineProperty(n,"length",{get:function(){return this.trackElements_.length}});for(var i=0,o=e.length;i<o;i++)n.addTrackElement_(e[i]);if(Se)return n}return t.prototype.addTrackElement_=function(t){var e=this.trackElements_.length;""+e in this||Object.defineProperty(this,e,{get:function(){return this.trackElements_[e]}}),-1===this.trackElements_.indexOf(t)&&this.trackElements_.push(t)},t.prototype.getTrackElementByTrack_=function(t){for(var e=void 0,n=0,r=this.trackElements_.length;n<r;n++)if(t===this.trackElements_[n].track){e=this.trackElements_[n];break}return e},t.prototype.removeTrackElement_=function(t){for(var e=0,n=this.trackElements_.length;e<n;e++)if(t===this.trackElements_[e]){this.trackElements_.splice(e,1);break}},t}(),Vn=function(){function t(e){Ie(this,t);var n=this;if(Se){n=ce.createElement("custom");for(var r in t.prototype)"constructor"!==r&&(n[r]=t.prototype[r])}if(t.prototype.setCues_.call(n,e),Object.defineProperty(n,"length",{get:function(){return this.length_}}),Se)return n}return t.prototype.setCues_=function(t){var e=this.length||0,n=0,r=t.length;this.cues_=t,this.length_=t.length;var i=function(t){""+t in this||Object.defineProperty(this,""+t,{get:function(){return this.cues_[t]}})};if(e<r)for(n=e;n<r;n++)i.call(this,n)},t.prototype.getCueById=function(t){for(var e=null,n=0,r=this.length;n<r;n++){var i=this[n];if(i.id===t){e=i;break}}return e},t}(),zn={alternative:"alternative",captions:"captions",main:"main",sign:"sign",subtitles:"subtitles",commentary:"commentary"},Wn={alternative:"alternative",descriptions:"descriptions",main:"main","main-desc":"main-desc",translation:"translation",commentary:"commentary"},Un={subtitles:"subtitles",captions:"captions",descriptions:"descriptions",chapters:"chapters",metadata:"metadata"},Xn={disabled:"disabled",hidden:"hidden",showing:"showing"},qn=function(t){function e(){var n,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};Ie(this,e);var i=Re(this,t.call(this)),o=i;if(Se){o=ce.createElement("custom");for(var s in e.prototype)"constructor"!==s&&(o[s]=e.prototype[s])}var a={id:r.id||"vjs_track_"+R(),kind:r.kind||"",label:r.label||"",language:r.language||""};for(var l in a)!function(t){Object.defineProperty(o,t,{get:function(){return a[t]},set:function(){}})}(l);return n=o,Re(i,n)}return De(e,t),e}(ln),Kn=function(t){var e=["protocol","hostname","port","pathname","search","hash","host"],n=ce.createElement("a");n.href=t;var r=""===n.host&&"file:"!==n.protocol,i=void 0;r&&(i=ce.createElement("div"),i.innerHTML='<a href="'+t+'"></a>',n=i.firstChild,i.setAttribute("style","display:none; position:absolute;"),ce.body.appendChild(i));for(var o={},s=0;s<e.length;s++)o[e[s]]=n[e[s]];return"http:"===o.protocol&&(o.host=o.host.replace(/:80$/,"")),"https:"===o.protocol&&(o.host=o.host.replace(/:443$/,"")),r&&ce.body.removeChild(i),o},Gn=function(t){if(!t.match(/^https?:\/\//)){var e=ce.createElement("div");e.innerHTML='<a href="'+t+'">x</a>',t=e.firstChild.href}return t},Yn=function(t){if("string"==typeof t){var e=/^(\/?)([\s\S]*?)((?:\.{1,2}|[^\/]+?)(\.([^\.\/\?]+)))(?:[\/]*|[\?].*)$/i,n=e.exec(t);if(n)return n.pop().toLowerCase()}return""},$n=function(t){var e=ie.location,n=Kn(t);return(":"===n.protocol?e.protocol:n.protocol)+n.host!==e.protocol+e.host},Jn=(Object.freeze||Object)({parseUrl:Kn,getAbsoluteURL:Gn,getFileExtension:Yn,isCrossOrigin:$n}),Qn=st,Zn=Object.prototype.toString,tr=t(function(t,e){function n(t){return t.replace(/^\s*|\s*$/g,"")}e=t.exports=n,e.left=function(t){return t.replace(/^\s*/,"")},e.right=function(t){return t.replace(/\s*$/,"")}}),er=at,nr=Object.prototype.toString,rr=Object.prototype.hasOwnProperty,ir=function(t){return"[object Array]"===Object.prototype.toString.call(t)},or=function(t){if(!t)return{};var e={};return er(tr(t).split("\n"),function(t){var n=t.indexOf(":"),r=tr(t.slice(0,n)).toLowerCase(),i=tr(t.slice(n+1));void 0===e[r]?e[r]=i:ir(e[r])?e[r].push(i):e[r]=[e[r],i]}),e},sr=ht,ar=Object.prototype.hasOwnProperty,lr=ft;ft.XMLHttpRequest=ie.XMLHttpRequest||gt,ft.XDomainRequest="withCredentials"in new ft.XMLHttpRequest?ft.XMLHttpRequest:ie.XDomainRequest,function(t,e){for(var n=0;n<t.length;n++)e(t[n])}(["get","put","post","patch","head","delete"],function(t){ft["delete"===t?"del":t]=function(e,n,r){return n=dt(e,n,r),n.method=t.toUpperCase(),vt(n)}});var cr=function(t,e){var n=new ie.WebVTT.Parser(ie,ie.vttjs,ie.WebVTT.StringDecoder()),r=[];n.oncue=function(t){e.addCue(t)},n.onparsingerror=function(t){r.push(t)},n.onflush=function(){e.trigger({type:"loadeddata",target:e})},n.parse(t),r.length>0&&(ie.console&&ie.console.groupCollapsed&&ie.console.groupCollapsed("Text Track parsing errors for "+e.src),r.forEach(function(t){return Ue.error(t)}),ie.console&&ie.console.groupEnd&&ie.console.groupEnd()),n.flush()},ur=function(t,e){var n={uri:t},r=$n(t);r&&(n.cors=r),lr(n,sn(this,function(t,n,r){if(t)return Ue.error(t,n);if(e.loaded_=!0,"function"!=typeof ie.WebVTT){if(e.tech_){var i=function(){return cr(r,e)};e.tech_.on("vttjsloaded",i),e.tech_.on("vttjserror",function(){Ue.error("vttjs failed to load, stopping trying to process "+e.src),e.tech_.off("vttjsloaded",i)})}}else cr(r,e)}))},hr=function(t){function e(){var n,r,i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(Ie(this,e),!i.tech)throw new Error("A tech was not provided.");var o=Q(i,{kind:Un[i.kind]||"subtitles",language:i.language||i.srclang||""}),s=Xn[o.mode]||"disabled",a=o.default;"metadata"!==o.kind&&"chapters"!==o.kind||(s="hidden");var l=n=Re(this,t.call(this,o));if(l.tech_=o.tech,Se)for(var c in e.prototype)"constructor"!==c&&(l[c]=e.prototype[c]);l.cues_=[],l.activeCues_=[];var u=new Vn(l.cues_),h=new Vn(l.activeCues_),p=!1,d=sn(l,function(){this.activeCues,p&&(this.trigger("cuechange"),p=!1)});return"disabled"!==s&&l.tech_.ready(function(){l.tech_.on("timeupdate",d)},!0),Object.defineProperty(l,"default",{get:function(){return a},set:function(){}}),Object.defineProperty(l,"mode",{get:function(){return s},set:function(t){var e=this;Xn[t]&&(s=t,"showing"===s&&this.tech_.ready(function(){e.tech_.on("timeupdate",d)},!0),this.trigger("modechange"))}}),Object.defineProperty(l,"cues",{get:function(){return this.loaded_?u:null},set:function(){}}),Object.defineProperty(l,"activeCues",{get:function(){if(!this.loaded_)return null;if(0===this.cues.length)return h;for(var t=this.tech_.currentTime(),e=[],n=0,r=this.cues.length;n<r;n++){var i=this.cues[n];i.startTime<=t&&i.endTime>=t?e.push(i):i.startTime===i.endTime&&i.startTime<=t&&i.startTime+.5>=t&&e.push(i)}if(p=!1,e.length!==this.activeCues_.length)p=!0;else for(var o=0;o<e.length;o++)-1===this.activeCues_.indexOf(e[o])&&(p=!0);return this.activeCues_=e,h.setCues_(this.activeCues_),h},set:function(){}}),o.src?(l.src=o.src,ur(o.src,l)):l.loaded_=!0,r=l,Re(n,r)}return De(e,t),e.prototype.addCue=function(t){var e=t;if(ie.vttjs&&!(t instanceof ie.vttjs.VTTCue)){e=new ie.vttjs.VTTCue(t.startTime,t.endTime,t.text);for(var n in t)n in e||(e[n]=t[n]);e.id=t.id,e.originalCue_=t}for(var r=this.tech_.textTracks(),i=0;i<r.length;i++)r[i]!==this&&r[i].removeCue(e);this.cues_.push(e),this.cues.setCues_(this.cues_)},e.prototype.removeCue=function(t){for(var e=this.cues_.length;e--;){var n=this.cues_[e];if(n===t||n.originalCue_&&n.originalCue_===t){this.cues_.splice(e,1),this.cues.setCues_(this.cues_);break}}},e}(qn);hr.prototype.allowedEvents_={cuechange:"cuechange"};var pr=function(t){function e(){var n,r,i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};Ie(this,e);var o=Q(i,{kind:Wn[i.kind]||""}),s=n=Re(this,t.call(this,o)),a=!1;if(Se)for(var l in e.prototype)"constructor"!==l&&(s[l]=e.prototype[l]);return Object.defineProperty(s,"enabled",{get:function(){return a},set:function(t){"boolean"==typeof t&&t!==a&&(a=t,this.trigger("enabledchange"))}}),o.enabled&&(s.enabled=o.enabled),s.loaded_=!0,r=s,Re(n,r)}return De(e,t),e}(qn),dr=function(t){function e(){var n,r,i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};Ie(this,e);var o=Q(i,{kind:zn[i.kind]||""}),s=n=Re(this,t.call(this,o)),a=!1;if(Se)for(var l in e.prototype)"constructor"!==l&&(s[l]=e.prototype[l]);return Object.defineProperty(s,"selected",{get:function(){return a},set:function(t){"boolean"==typeof t&&t!==a&&(a=t,this.trigger("selectedchange"))}}),o.selected&&(s.selected=o.selected),r=s,Re(n,r)}return De(e,t),e}(qn),fr=0,vr=2,yr=function(t){function e(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};Ie(this,e);var r=Re(this,t.call(this)),i=void 0,o=r;if(Se){o=ce.createElement("custom");for(var s in e.prototype)"constructor"!==s&&(o[s]=e.prototype[s])}var a=new hr(n);if(o.kind=a.kind,o.src=a.src,o.srclang=a.language,o.label=a.label,o.default=a.default,Object.defineProperty(o,"readyState",{get:function(){return i}}),Object.defineProperty(o,"track",{get:function(){return a}}),i=fr,a.addEventListener("loadeddata",function(){i=vr,
o.trigger({type:"load",target:o})}),Se){var l;return l=o,Re(r,l)}return r}return De(e,t),e}(ln);yr.prototype.allowedEvents_={load:"load"},yr.NONE=fr,yr.LOADING=1,yr.LOADED=vr,yr.ERROR=3;var gr={audio:{ListClass:Rn,TrackClass:pr,capitalName:"Audio"},video:{ListClass:Bn,TrackClass:dr,capitalName:"Video"},text:{ListClass:Fn,TrackClass:hr,capitalName:"Text"}};Object.keys(gr).forEach(function(t){gr[t].getterName=t+"Tracks",gr[t].privateName=t+"Tracks_"});var mr={remoteText:{ListClass:Fn,TrackClass:hr,capitalName:"RemoteText",getterName:"remoteTextTracks",privateName:"remoteTextTracks_"},remoteTextEl:{ListClass:Hn,TrackClass:yr,capitalName:"RemoteTextTrackEls",getterName:"remoteTextTrackEls",privateName:"remoteTextTrackEls_"}},_r=Q(gr,mr);mr.names=Object.keys(mr),gr.names=Object.keys(gr),_r.names=[].concat(mr.names).concat(gr.names);var br=Object.create||function(){function t(){}return function(e){if(1!==arguments.length)throw new Error("Object.create shim only accepts one parameter.");return t.prototype=e,new t}}();mt.prototype=br(Error.prototype),mt.prototype.constructor=mt,mt.Errors={BadSignature:{code:0,message:"Malformed WebVTT signature."},BadTimeStamp:{code:1,message:"Malformed time stamp."}},bt.prototype={set:function(t,e){this.get(t)||""===e||(this.values[t]=e)},get:function(t,e,n){return n?this.has(t)?this.values[t]:e[n]:this.has(t)?this.values[t]:e},has:function(t){return t in this.values},alt:function(t,e,n){for(var r=0;r<n.length;++r)if(e===n[r]){this.set(t,e);break}},integer:function(t,e){/^-?\d+$/.test(e)&&this.set(t,parseInt(e,10))},percent:function(t,e){return!!(e.match(/^([\d]{1,3})(\.[\d]*)?%$/)&&(e=parseFloat(e))>=0&&e<=100)&&(this.set(t,e),!0)}};var Tr={"&amp;":"&","&lt;":"<","&gt;":">","&lrm;":"‎","&rlm;":"‏","&nbsp;":" "},Cr={c:"span",i:"i",b:"b",u:"u",ruby:"ruby",rt:"rt",v:"span",lang:"span"},kr={v:"title",lang:"lang"},wr={rt:"ruby"},Er=[[1470,1470],[1472,1472],[1475,1475],[1478,1478],[1488,1514],[1520,1524],[1544,1544],[1547,1547],[1549,1549],[1563,1563],[1566,1610],[1645,1647],[1649,1749],[1765,1766],[1774,1775],[1786,1805],[1807,1808],[1810,1839],[1869,1957],[1969,1969],[1984,2026],[2036,2037],[2042,2042],[2048,2069],[2074,2074],[2084,2084],[2088,2088],[2096,2110],[2112,2136],[2142,2142],[2208,2208],[2210,2220],[8207,8207],[64285,64285],[64287,64296],[64298,64310],[64312,64316],[64318,64318],[64320,64321],[64323,64324],[64326,64449],[64467,64829],[64848,64911],[64914,64967],[65008,65020],[65136,65140],[65142,65276],[67584,67589],[67592,67592],[67594,67637],[67639,67640],[67644,67644],[67647,67669],[67671,67679],[67840,67867],[67872,67897],[67903,67903],[67968,68023],[68030,68031],[68096,68096],[68112,68115],[68117,68119],[68121,68147],[68160,68167],[68176,68184],[68192,68223],[68352,68405],[68416,68437],[68440,68466],[68472,68479],[68608,68680],[126464,126467],[126469,126495],[126497,126498],[126500,126500],[126503,126503],[126505,126514],[126516,126519],[126521,126521],[126523,126523],[126530,126530],[126535,126535],[126537,126537],[126539,126539],[126541,126543],[126545,126546],[126548,126548],[126551,126551],[126553,126553],[126555,126555],[126557,126557],[126559,126559],[126561,126562],[126564,126564],[126567,126570],[126572,126578],[126580,126583],[126585,126588],[126590,126590],[126592,126601],[126603,126619],[126625,126627],[126629,126633],[126635,126651],[1114109,1114109]];xt.prototype.applyStyles=function(t,e){e=e||this.div;for(var n in t)t.hasOwnProperty(n)&&(e.style[n]=t[n])},xt.prototype.formatStyle=function(t,e){return 0===t?0:t+e},jt.prototype=br(xt.prototype),jt.prototype.constructor=jt,At.prototype.move=function(t,e){switch(e=void 0!==e?e:this.lineHeight,t){case"+x":this.left+=e,this.right+=e;break;case"-x":this.left-=e,this.right-=e;break;case"+y":this.top+=e,this.bottom+=e;break;case"-y":this.top-=e,this.bottom-=e}},At.prototype.overlaps=function(t){return this.left<t.right&&this.right>t.left&&this.top<t.bottom&&this.bottom>t.top},At.prototype.overlapsAny=function(t){for(var e=0;e<t.length;e++)if(this.overlaps(t[e]))return!0;return!1},At.prototype.within=function(t){return this.top>=t.top&&this.bottom<=t.bottom&&this.left>=t.left&&this.right<=t.right},At.prototype.overlapsOppositeAxis=function(t,e){switch(e){case"+x":return this.left<t.left;case"-x":return this.right>t.right;case"+y":return this.top<t.top;case"-y":return this.bottom>t.bottom}},At.prototype.intersectPercentage=function(t){return Math.max(0,Math.min(this.right,t.right)-Math.max(this.left,t.left))*Math.max(0,Math.min(this.bottom,t.bottom)-Math.max(this.top,t.top))/(this.height*this.width)},At.prototype.toCSSCompatValues=function(t){return{top:this.top-t.top,bottom:t.bottom-this.bottom,left:this.left-t.left,right:t.right-this.right,height:this.height,width:this.width}},At.getSimpleBoxPosition=function(t){var e=t.div?t.div.offsetHeight:t.tagName?t.offsetHeight:0,n=t.div?t.div.offsetWidth:t.tagName?t.offsetWidth:0,r=t.div?t.div.offsetTop:t.tagName?t.offsetTop:0;return t=t.div?t.div.getBoundingClientRect():t.tagName?t.getBoundingClientRect():t,{left:t.left,right:t.right,top:t.top||r,height:t.height||e,bottom:t.bottom||r+(t.height||e),width:t.width||n}},Nt.StringDecoder=function(){return{decode:function(t){if(!t)return"";if("string"!=typeof t)throw new Error("Error - expected string data.");return decodeURIComponent(encodeURIComponent(t))}}},Nt.convertCueToDOMTree=function(t,e){return t&&e?kt(t,e):null};Nt.processCues=function(t,e,n){if(!t||!e||!n)return null;for(;n.firstChild;)n.removeChild(n.firstChild);var r=t.document.createElement("div");if(r.style.position="absolute",r.style.left="0",r.style.right="0",r.style.top="0",r.style.bottom="0",r.style.margin="1.5%",n.appendChild(r),function(t){for(var e=0;e<t.length;e++)if(t[e].hasBeenReset||!t[e].displayState)return!0;return!1}(e)){var i=[],o=At.getSimpleBoxPosition(r),s=Math.round(.05*o.height*100)/100,a={font:s+"px sans-serif"};!function(){for(var n,s,l=0;l<e.length;l++)s=e[l],n=new jt(t,s,a),r.appendChild(n.div),Pt(t,n,o,i),s.displayState=n.div,i.push(At.getSimpleBoxPosition(n))}()}else for(var l=0;l<e.length;l++)r.appendChild(e[l].displayState)},Nt.Parser=function(t,e,n){n||(n=e,e={}),e||(e={}),this.window=t,this.vttjs=e,this.state="INITIAL",this.buffer="",this.decoder=n||new TextDecoder("utf8"),this.regionList=[]},Nt.Parser.prototype={reportOrThrowError:function(t){if(!(t instanceof mt))throw t;this.onparsingerror&&this.onparsingerror(t)},parse:function(t){function e(){for(var t=i.buffer,e=0;e<t.length&&"\r"!==t[e]&&"\n"!==t[e];)++e;var n=t.substr(0,e);return"\r"===t[e]&&++e,"\n"===t[e]&&++e,i.buffer=t.substr(e),n}function n(t){var e=new bt;if(Tt(t,function(t,n){switch(t){case"id":e.set(t,n);break;case"width":e.percent(t,n);break;case"lines":e.integer(t,n);break;case"regionanchor":case"viewportanchor":var r=n.split(",");if(2!==r.length)break;var i=new bt;if(i.percent("x",r[0]),i.percent("y",r[1]),!i.has("x")||!i.has("y"))break;e.set(t+"X",i.get("x")),e.set(t+"Y",i.get("y"));break;case"scroll":e.alt(t,n,["up"])}},/=/,/\s/),e.has("id")){var n=new(i.vttjs.VTTRegion||i.window.VTTRegion);n.width=e.get("width",100),n.lines=e.get("lines",3),n.regionAnchorX=e.get("regionanchorX",0),n.regionAnchorY=e.get("regionanchorY",100),n.viewportAnchorX=e.get("viewportanchorX",0),n.viewportAnchorY=e.get("viewportanchorY",100),n.scroll=e.get("scroll",""),i.onregion&&i.onregion(n),i.regionList.push({id:e.get("id"),region:n})}}function r(t){var e=new bt;Tt(t,function(t,n){switch(t){case"MPEGT":e.integer(t+"S",n);break;case"LOCA":e.set(t+"L",_t(n))}},/[^\d]:/,/,/),i.ontimestampmap&&i.ontimestampmap({MPEGTS:e.get("MPEGTS"),LOCAL:e.get("LOCAL")})}var i=this;t&&(i.buffer+=i.decoder.decode(t,{stream:!0}));try{var o;if("INITIAL"===i.state){if(!/\r\n|\n/.test(i.buffer))return this;o=e();var s=o.match(/^WEBVTT([ \t].*)?$/);if(!s||!s[0])throw new mt(mt.Errors.BadSignature);i.state="HEADER"}for(var a=!1;i.buffer;){if(!/\r\n|\n/.test(i.buffer))return this;switch(a?a=!1:o=e(),i.state){case"HEADER":/:/.test(o)?function(t){t.match(/X-TIMESTAMP-MAP/)?Tt(t,function(t,e){switch(t){case"X-TIMESTAMP-MAP":r(e)}},/=/):Tt(t,function(t,e){switch(t){case"Region":n(e)}},/:/)}(o):o||(i.state="ID");continue;case"NOTE":o||(i.state="ID");continue;case"ID":if(/^NOTE($|[ \t])/.test(o)){i.state="NOTE";break}if(!o)continue;if(i.cue=new(i.vttjs.VTTCue||i.window.VTTCue)(0,0,""),i.state="CUE",-1===o.indexOf("--\x3e")){i.cue.id=o;continue}case"CUE":try{Ct(o,i.cue,i.regionList)}catch(t){i.reportOrThrowError(t),i.cue=null,i.state="BADCUE";continue}i.state="CUETEXT";continue;case"CUETEXT":var l=-1!==o.indexOf("--\x3e");if(!o||l&&(a=!0)){i.oncue&&i.oncue(i.cue),i.cue=null,i.state="ID";continue}i.cue.text&&(i.cue.text+="\n"),i.cue.text+=o;continue;case"BADCUE":o||(i.state="ID");continue}}}catch(t){i.reportOrThrowError(t),"CUETEXT"===i.state&&i.cue&&i.oncue&&i.oncue(i.cue),i.cue=null,i.state="INITIAL"===i.state?"BADWEBVTT":"BADCUE"}return this},flush:function(){var t=this;try{if(t.buffer+=t.decoder.decode(),(t.cue||"HEADER"===t.state)&&(t.buffer+="\n\n",t.parse()),"INITIAL"===t.state)throw new mt(mt.Errors.BadSignature)}catch(e){t.reportOrThrowError(e)}return t.onflush&&t.onflush(),this}};var Sr=Nt,xr="auto",jr={"":!0,lr:!0,rl:!0},Ar={start:!0,middle:!0,end:!0,left:!0,right:!0};Dt.prototype.getCueAsHTML=function(){return WebVTT.convertCueToDOMTree(window,this.text)};var Pr=Dt,Nr={"":!0,up:!0},Or=Bt,Mr=t(function(t){var e=t.exports={WebVTT:Sr,VTTCue:Pr,VTTRegion:Or};ie.vttjs=e,ie.WebVTT=e.WebVTT;var n=e.VTTCue,r=e.VTTRegion,i=ie.VTTCue,o=ie.VTTRegion;e.shim=function(){ie.VTTCue=n,ie.VTTRegion=r},e.restore=function(){ie.VTTCue=i,ie.VTTRegion=o},ie.VTTCue||e.shim()}),Ir=function(t){function e(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){};Ie(this,e),n.reportTouchActivity=!1;var i=Re(this,t.call(this,null,n,r));return i.hasStarted_=!1,i.on("playing",function(){this.hasStarted_=!0}),i.on("loadstart",function(){this.hasStarted_=!1}),_r.names.forEach(function(t){var e=_r[t];n&&n[e.getterName]&&(i[e.privateName]=n[e.getterName])}),i.featuresProgressEvents||i.manualProgressOn(),i.featuresTimeupdateEvents||i.manualTimeUpdatesOn(),["Text","Audio","Video"].forEach(function(t){!1===n["native"+t+"Tracks"]&&(i["featuresNative"+t+"Tracks"]=!1)}),!1===n.nativeCaptions||!1===n.nativeTextTracks?i.featuresNativeTextTracks=!1:!0!==n.nativeCaptions&&!0!==n.nativeTextTracks||(i.featuresNativeTextTracks=!0),i.featuresNativeTextTracks||i.emulateTextTracks(),i.autoRemoteTextTracks_=new _r.text.ListClass,i.initTrackListeners(),n.nativeControlsForTouch||i.emitTapEvents(),i.constructor&&(i.name_=i.constructor.name||"Unknown Tech"),i}return De(e,t),e.prototype.manualProgressOn=function(){this.on("durationchange",this.onDurationChange),this.manualProgress=!0,this.one("ready",this.trackProgress)},e.prototype.manualProgressOff=function(){this.manualProgress=!1,this.stopTrackingProgress(),this.off("durationchange",this.onDurationChange)},e.prototype.trackProgress=function(t){this.stopTrackingProgress(),this.progressInterval=this.setInterval(sn(this,function(){var t=this.bufferedPercent();this.bufferedPercent_!==t&&this.trigger("progress"),this.bufferedPercent_=t,1===t&&this.stopTrackingProgress()}),500)},e.prototype.onDurationChange=function(t){this.duration_=this.duration()},e.prototype.buffered=function(){return nt(0,0)},e.prototype.bufferedPercent=function(){return rt(this.buffered(),this.duration_)},e.prototype.stopTrackingProgress=function(){this.clearInterval(this.progressInterval)},e.prototype.manualTimeUpdatesOn=function(){this.manualTimeUpdates=!0,this.on("play",this.trackCurrentTime),this.on("pause",this.stopTrackingCurrentTime)},e.prototype.manualTimeUpdatesOff=function(){this.manualTimeUpdates=!1,this.stopTrackingCurrentTime(),this.off("play",this.trackCurrentTime),this.off("pause",this.stopTrackingCurrentTime)},e.prototype.trackCurrentTime=function(){this.currentTimeInterval&&this.stopTrackingCurrentTime(),this.currentTimeInterval=this.setInterval(function(){this.trigger({type:"timeupdate",target:this,manuallyTriggered:!0})},250)},e.prototype.stopTrackingCurrentTime=function(){this.clearInterval(this.currentTimeInterval),this.trigger({type:"timeupdate",target:this,manuallyTriggered:!0})},e.prototype.dispose=function(){this.clearTracks(gr.names),this.manualProgress&&this.manualProgressOff(),this.manualTimeUpdates&&this.manualTimeUpdatesOff(),t.prototype.dispose.call(this)},e.prototype.clearTracks=function(t){var e=this;t=[].concat(t),t.forEach(function(t){for(var n=e[t+"Tracks"]()||[],r=n.length;r--;){var i=n[r];"text"===t&&e.removeRemoteTextTrack(i),n.removeTrack(i)}})},e.prototype.cleanupAutoTextTracks=function(){for(var t=this.autoRemoteTextTracks_||[],e=t.length;e--;){var n=t[e];this.removeRemoteTextTrack(n)}},e.prototype.reset=function(){},e.prototype.error=function(t){return void 0!==t&&(this.error_=new it(t),this.trigger("error")),this.error_},e.prototype.played=function(){return this.hasStarted_?nt(0,0):nt()},e.prototype.setCurrentTime=function(){this.manualTimeUpdates&&this.trigger({type:"timeupdate",target:this,manuallyTriggered:!0})},e.prototype.initTrackListeners=function(){var t=this;gr.names.forEach(function(e){var n=gr[e],r=function(){t.trigger(e+"trackchange")},i=t[n.getterName]();i.addEventListener("removetrack",r),i.addEventListener("addtrack",r),t.on("dispose",function(){i.removeEventListener("removetrack",r),i.removeEventListener("addtrack",r)})})},e.prototype.addWebVttScript_=function(){var t=this;if(!ie.WebVTT)if(ce.body.contains(this.el())){if(!this.options_["vtt.js"]&&o(Mr)&&Object.keys(Mr).length>0)return void this.trigger("vttjsloaded");var e=ce.createElement("script");e.src=this.options_["vtt.js"]||"https://vjs.zencdn.net/vttjs/0.12.4/vtt.min.js",e.onload=function(){t.trigger("vttjsloaded")},e.onerror=function(){t.trigger("vttjserror")},this.on("dispose",function(){e.onload=null,e.onerror=null}),ie.WebVTT=!0,this.el().parentNode.appendChild(e)}else this.ready(this.addWebVttScript_)},e.prototype.emulateTextTracks=function(){var t=this,e=this.textTracks(),n=this.remoteTextTracks(),r=function(t){return e.addTrack(t.track)},i=function(t){return e.removeTrack(t.track)};n.on("addtrack",r),n.on("removetrack",i),this.addWebVttScript_();var o=function(){return t.trigger("texttrackchange")},s=function(){o();for(var t=0;t<e.length;t++){var n=e[t];n.removeEventListener("cuechange",o),"showing"===n.mode&&n.addEventListener("cuechange",o)}};s(),e.addEventListener("change",s),e.addEventListener("addtrack",s),e.addEventListener("removetrack",s),this.on("dispose",function(){n.off("addtrack",r),n.off("removetrack",i),e.removeEventListener("change",s),e.removeEventListener("addtrack",s),e.removeEventListener("removetrack",s);for(var t=0;t<e.length;t++){e[t].removeEventListener("cuechange",o)}})},e.prototype.addTextTrack=function(t,e,n){if(!t)throw new Error("TextTrack kind is required but was not provided");return Ft(this,t,e,n)},e.prototype.createRemoteTextTrack=function(t){var e=Q(t,{tech:this});return new mr.remoteTextEl.TrackClass(e)},e.prototype.addRemoteTextTrack=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=arguments[1],n=this.createRemoteTextTrack(t);return!0!==e&&!1!==e&&(Ue.warn('Calling addRemoteTextTrack without explicitly setting the "manualCleanup" parameter to `true` is deprecated and default to `false` in future version of video.js'),e=!0),this.remoteTextTrackEls().addTrackElement_(n),this.remoteTextTracks().addTrack(n.track),!0!==e&&this.autoRemoteTextTracks_.addTrack(n.track),n},e.prototype.removeRemoteTextTrack=function(t){var e=this.remoteTextTrackEls().getTrackElementByTrack_(t);this.remoteTextTrackEls().removeTrackElement_(e),this.remoteTextTracks().removeTrack(t),this.autoRemoteTextTracks_.removeTrack(t)},e.prototype.getVideoPlaybackQuality=function(){return{}},e.prototype.setPoster=function(){},e.prototype.playsinline=function(){},e.prototype.setPlaysinline=function(){},e.prototype.canPlayType=function(){return""},e.canPlayType=function(){return""},e.canPlaySource=function(t,n){return e.canPlayType(t.type)},e.isTech=function(t){return t.prototype instanceof e||t instanceof e||t===e},e.registerTech=function(t,n){if(e.techs_||(e.techs_={}),!e.isTech(n))throw new Error("Tech "+t+" must be a Tech");if(!e.canPlayType)throw new Error("Techs must have a static canPlayType method on them");if(!e.canPlaySource)throw new Error("Techs must have a static canPlaySource method on them");return t=$(t),e.techs_[t]=n,"Tech"!==t&&e.defaultTechOrder_.push(t),n},e.getTech=function(t){if(t)return t=$(t),e.techs_&&e.techs_[t]?e.techs_[t]:ie&&ie.videojs&&ie.videojs[t]?(Ue.warn("The "+t+" tech was added to the videojs object when it should be registered using videojs.registerTech(name, tech)"),ie.videojs[t]):void 0},e}(mn);_r.names.forEach(function(t){var e=_r[t];Ir.prototype[e.getterName]=function(){return this[e.privateName]=this[e.privateName]||new e.ListClass,this[e.privateName]}}),Ir.prototype.featuresVolumeControl=!0,Ir.prototype.featuresFullscreenResize=!1,Ir.prototype.featuresPlaybackRate=!1,Ir.prototype.featuresProgressEvents=!1,Ir.prototype.featuresTimeupdateEvents=!1,Ir.prototype.featuresNativeTextTracks=!1,Ir.withSourceHandlers=function(t){t.registerSourceHandler=function(e,n){var r=t.sourceHandlers;r||(r=t.sourceHandlers=[]),void 0===n&&(n=r.length),r.splice(n,0,e)},t.canPlayType=function(e){for(var n=t.sourceHandlers||[],r=void 0,i=0;i<n.length;i++)if(r=n[i].canPlayType(e))return r;return""},t.selectSourceHandler=function(e,n){for(var r=t.sourceHandlers||[],i=0;i<r.length;i++)if(r[i].canHandleSource(e,n))return r[i];return null},t.canPlaySource=function(e,n){var r=t.selectSourceHandler(e,n);return r?r.canHandleSource(e,n):""},["seekable","duration"].forEach(function(t){var e=this[t];"function"==typeof e&&(this[t]=function(){return this.sourceHandler_&&this.sourceHandler_[t]?this.sourceHandler_[t].apply(this.sourceHandler_,arguments):e.apply(this,arguments)})},t.prototype),t.prototype.setSource=function(e){var n=t.selectSourceHandler(e,this.options_);n||(t.nativeSourceHandler?n=t.nativeSourceHandler:Ue.error("No source hander found for the current source.")),this.disposeSourceHandler(),this.off("dispose",this.disposeSourceHandler),n!==t.nativeSourceHandler&&(this.currentSource_=e),this.sourceHandler_=n.handleSource(e,this,this.options_),this.on("dispose",this.disposeSourceHandler)},t.prototype.disposeSourceHandler=function(){this.currentSource_&&(this.clearTracks(["audio","video"]),this.currentSource_=null),this.cleanupAutoTextTracks(),this.sourceHandler_&&(this.sourceHandler_.dispose&&this.sourceHandler_.dispose(),this.sourceHandler_=null)}},mn.registerComponent("Tech",Ir),Ir.registerTech("Tech",Ir),Ir.defaultTechOrder_=[];var Dr={},Rr={buffered:1,currentTime:1,duration:1,seekable:1,played:1},Lr={setCurrentTime:1},Br=function t(e){if(Array.isArray(e)){var n=[];e.forEach(function(e){e=t(e),Array.isArray(e)?n=n.concat(e):i(e)&&n.push(e)}),e=n}else e="string"==typeof e&&e.trim()?[{src:e}]:i(e)&&"string"==typeof e.src&&e.src&&e.src.trim()?[e]:[];return e},Fr=function(t){function e(n,r,i){Ie(this,e);var o=Q({createEl:!1},r),s=Re(this,t.call(this,n,o,i));if(r.playerOptions.sources&&0!==r.playerOptions.sources.length)n.src(r.playerOptions.sources);else for(var a=0,l=r.playerOptions.techOrder;a<l.length;a++){var c=$(l[a]),u=Ir.getTech(c);if(c||(u=mn.getComponent(c)),u&&u.isSupported()){n.loadTech_(c);break}}return s}return De(e,t),e}(mn);mn.registerComponent("MediaLoader",Fr);var Hr=function(t){function e(n,r){Ie(this,e);var i=Re(this,t.call(this,n,r));return i.emitTapEvents(),i.enable(),i}return De(e,t),e.prototype.createEl=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"div",n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};n=r({innerHTML:'<span aria-hidden="true" class="vjs-icon-placeholder"></span>',className:this.buildCSSClass(),tabIndex:0},n),"button"===e&&Ue.error("Creating a ClickableComponent with an HTML element of "+e+" is not supported; use a Button instead."),i=r({role:"button","aria-live":"polite"},i),this.tabIndex_=n.tabIndex;var o=t.prototype.createEl.call(this,e,n,i);return this.createControlTextEl(o),o},e.prototype.createControlTextEl=function(t){return this.controlTextEl_=f("span",{className:"vjs-control-text"}),t&&t.appendChild(this.controlTextEl_),this.controlText(this.controlText_,t),this.controlTextEl_},e.prototype.controlText=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.el();if(!t)return this.controlText_||"Need Text";var n=this.localize(t);this.controlText_=t,this.controlTextEl_.innerHTML=n,this.nonIconControl||e.setAttribute("title",n)},e.prototype.buildCSSClass=function(){return"vjs-control vjs-button "+t.prototype.buildCSSClass.call(this)},e.prototype.enable=function(){this.enabled_||(this.enabled_=!0,this.removeClass("vjs-disabled"),this.el_.setAttribute("aria-disabled","false"),void 0!==this.tabIndex_&&this.el_.setAttribute("tabIndex",this.tabIndex_),this.on(["tap","click"],this.handleClick),this.on("focus",this.handleFocus),this.on("blur",this.handleBlur))},e.prototype.disable=function(){this.enabled_=!1,this.addClass("vjs-disabled"),this.el_.setAttribute("aria-disabled","true"),void 0!==this.tabIndex_&&this.el_.removeAttribute("tabIndex"),this.off(["tap","click"],this.handleClick),this.off("focus",this.handleFocus),this.off("blur",this.handleBlur)},e.prototype.handleClick=function(t){},e.prototype.handleFocus=function(t){W(ce,"keydown",sn(this,this.handleKeyPress))},e.prototype.handleKeyPress=function(e){32===e.which||13===e.which?(e.preventDefault(),this.trigger("click")):t.prototype.handleKeyPress&&t.prototype.handleKeyPress.call(this,e)},e.prototype.handleBlur=function(t){U(ce,"keydown",sn(this,this.handleKeyPress))},e}(mn);mn.registerComponent("ClickableComponent",Hr);var Vr=function(t){function e(n,r){Ie(this,e);var i=Re(this,t.call(this,n,r));return i.update(),n.on("posterchange",sn(i,i.update)),i}return De(e,t),e.prototype.dispose=function(){this.player().off("posterchange",this.update),t.prototype.dispose.call(this)},e.prototype.createEl=function(){var t=f("div",{className:"vjs-poster",tabIndex:-1});return Ne||(this.fallbackImg_=f("img"),t.appendChild(this.fallbackImg_)),t},e.prototype.update=function(t){var e=this.player().poster();this.setSrc(e),e?this.show():this.hide()},e.prototype.setSrc=function(t){if(this.fallbackImg_)this.fallbackImg_.src=t;else{var e="";t&&(e='url("'+t+'")'),this.el_.style.backgroundImage=e}},e.prototype.handleClick=function(t){this.player_.controls()&&(this.player_.paused()?this.player_.play():this.player_.pause())},e}(Hr);mn.registerComponent("PosterImage",Vr);var zr={monospace:"monospace",sansSerif:"sans-serif",serif:"serif",monospaceSansSerif:'"Andale Mono", "Lucida Console", monospace',monospaceSerif:'"Courier New", monospace',proportionalSansSerif:"sans-serif",proportionalSerif:"serif",casual:'"Comic Sans MS", Impact, fantasy',script:'"Monotype Corsiva", cursive',smallcaps:'"Andale Mono", "Lucida Console", monospace, sans-serif'},Wr=function(t){function e(n,r,i){Ie(this,e);var o=Re(this,t.call(this,n,r,i));return n.on("loadstart",sn(o,o.toggleDisplay)),n.on("texttrackchange",sn(o,o.updateDisplay)),n.on("loadstart",sn(o,o.preselectTrack)),n.ready(sn(o,function(){if(n.tech_&&n.tech_.featuresNativeTextTracks)return void this.hide();n.on("fullscreenchange",sn(this,this.updateDisplay));for(var t=this.options_.playerOptions.tracks||[],e=0;e<t.length;e++)this.player_.addRemoteTextTrack(t[e],!0);this.preselectTrack()})),o}return De(e,t),e.prototype.preselectTrack=function(){for(var t={captions:1,subtitles:1},e=this.player_.textTracks(),n=this.player_.cache_.selectedLanguage,r=void 0,i=void 0,o=void 0,s=0;s<e.length;s++){var a=e[s];n&&n.enabled&&n.language===a.language?a.kind===n.kind?o=a:o||(o=a):n&&!n.enabled?(o=null,r=null,i=null):a.default&&("descriptions"!==a.kind||r?a.kind in t&&!i&&(i=a):r=a)}o?o.mode="showing":i?i.mode="showing":r&&(r.mode="showing")},e.prototype.toggleDisplay=function(){this.player_.tech_&&this.player_.tech_.featuresNativeTextTracks?this.hide():this.show()},e.prototype.createEl=function(){return t.prototype.createEl.call(this,"div",{className:"vjs-text-track-display"},{"aria-live":"off","aria-atomic":"true"})},e.prototype.clearDisplay=function(){"function"==typeof ie.WebVTT&&ie.WebVTT.processCues(ie,[],this.el_)},e.prototype.updateDisplay=function(){var t=this.player_.textTracks();this.clearDisplay();for(var e=null,n=null,r=t.length;r--;){var i=t[r];"showing"===i.mode&&("descriptions"===i.kind?e=i:n=i)}n?("off"!==this.getAttribute("aria-live")&&this.setAttribute("aria-live","off"),this.updateForTrack(n)):e&&("assertive"!==this.getAttribute("aria-live")&&this.setAttribute("aria-live","assertive"),this.updateForTrack(e))},e.prototype.updateForTrack=function(t){if("function"==typeof ie.WebVTT&&t.activeCues){for(var e=this.player_.textTrackSettings.getValues(),n=[],r=0;r<t.activeCues.length;r++)n.push(t.activeCues[r]);ie.WebVTT.processCues(ie,n,this.el_);for(var i=n.length;i--;){var o=n[i];if(o){var s=o.displayState;if(e.color&&(s.firstChild.style.color=e.color),e.textOpacity&&Gt(s.firstChild,"color",Kt(e.color||"#fff",e.textOpacity)),e.backgroundColor&&(s.firstChild.style.backgroundColor=e.backgroundColor),e.backgroundOpacity&&Gt(s.firstChild,"backgroundColor",Kt(e.backgroundColor||"#000",e.backgroundOpacity)),e.windowColor&&(e.windowOpacity?Gt(s,"backgroundColor",Kt(e.windowColor,e.windowOpacity)):s.style.backgroundColor=e.windowColor),e.edgeStyle&&("dropshadow"===e.edgeStyle?s.firstChild.style.textShadow="2px 2px 3px #222, 2px 2px 4px #222, 2px 2px 5px #222":"raised"===e.edgeStyle?s.firstChild.style.textShadow="1px 1px #222, 2px 2px #222, 3px 3px #222":"depressed"===e.edgeStyle?s.firstChild.style.textShadow="1px 1px #ccc, 0 1px #ccc, -1px -1px #222, 0 -1px #222":"uniform"===e.edgeStyle&&(s.firstChild.style.textShadow="0 0 4px #222, 0 0 4px #222, 0 0 4px #222, 0 0 4px #222")),e.fontPercent&&1!==e.fontPercent){var a=ie.parseFloat(s.style.fontSize);s.style.fontSize=a*e.fontPercent+"px",s.style.height="auto",s.style.top="auto",s.style.bottom="2px"}e.fontFamily&&"default"!==e.fontFamily&&("small-caps"===e.fontFamily?s.firstChild.style.fontVariant="small-caps":s.firstChild.style.fontFamily=zr[e.fontFamily])}}}},e}(mn);mn.registerComponent("TextTrackDisplay",Wr);var Ur=function(t){function e(){return Ie(this,e),Re(this,t.apply(this,arguments))}return De(e,t),e.prototype.createEl=function(){return t.prototype.createEl.call(this,"div",{className:"vjs-loading-spinner",dir:"ltr"})},e}(mn);mn.registerComponent("LoadingSpinner",Ur);var Xr=function(t){function e(){return Ie(this,e),Re(this,t.apply(this,arguments))}return De(e,t),e.prototype.createEl=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};t="button",e=r({innerHTML:'<span aria-hidden="true" class="vjs-icon-placeholder"></span>',className:this.buildCSSClass()},e),n=r({type:"button","aria-live":"polite"},n);var i=mn.prototype.createEl.call(this,t,e,n);return this.createControlTextEl(i),i},e.prototype.addChild=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=this.constructor.name;return Ue.warn("Adding an actionable (user controllable) child to a Button ("+n+") is not supported; use a ClickableComponent instead."),mn.prototype.addChild.call(this,t,e)},e.prototype.enable=function(){t.prototype.enable.call(this),this.el_.removeAttribute("disabled")},e.prototype.disable=function(){t.prototype.disable.call(this),this.el_.setAttribute("disabled","disabled")},e.prototype.handleKeyPress=function(e){32!==e.which&&13!==e.which&&t.prototype.handleKeyPress.call(this,e)},e}(Hr);mn.registerComponent("Button",Xr);var qr=function(t){function e(){return Ie(this,e),Re(this,t.apply(this,arguments))}return De(e,t),e.prototype.buildCSSClass=function(){return"vjs-big-play-button"},e.prototype.handleClick=function(t){var e=this.player_.play(),n=this.player_.getChild("controlBar"),r=n&&n.getChild("playToggle");if(!r)return void this.player_.focus();e?e.then(function(){return r.focus()}):this.setTimeout(function(){r.focus()},1)},e}(Xr);qr.prototype.controlText_="Play Video",mn.registerComponent("BigPlayButton",qr);var Kr=function(t){function e(n,r){Ie(this,e);var i=Re(this,t.call(this,n,r));return i.controlText(r&&r.controlText||i.localize("Close")),i}return De(e,t),e.prototype.buildCSSClass=function(){return"vjs-close-button "+t.prototype.buildCSSClass.call(this)},e.prototype.handleClick=function(t){this.trigger({type:"close",bubbles:!1})},e}(Xr);mn.registerComponent("CloseButton",Kr);var Gr=function(t){function e(n,r){Ie(this,e);var i=Re(this,t.call(this,n,r));return i.on(n,"play",i.handlePlay),i.on(n,"pause",i.handlePause),i.on(n,"ended",i.handleEnded),i}return De(e,t),e.prototype.buildCSSClass=function(){return"vjs-play-control "+t.prototype.buildCSSClass.call(this)},e.prototype.handleClick=function(t){this.player_.paused()?this.player_.play():this.player_.pause()},e.prototype.handlePlay=function(t){this.removeClass("vjs-ended"),this.removeClass("vjs-paused"),this.addClass("vjs-playing"),this.controlText("Pause")},e.prototype.handlePause=function(t){this.removeClass("vjs-playing"),this.addClass("vjs-paused"),this.controlText("Play")},e.prototype.handleEnded=function(t){this.removeClass("vjs-playing"),this.addClass("vjs-ended"),this.controlText("Replay")},e}(Xr);Gr.prototype.controlText_="Play",mn.registerComponent("PlayToggle",Gr);var Yr=function(t){function e(n,r){Ie(this,e);var i=Re(this,t.call(this,n,r));return i.on(n,"timeupdate",i.updateContent),i}return De(e,t),e.prototype.createEl=function(){var e=t.prototype.createEl.call(this,"div",{className:"vjs-current-time vjs-time-control vjs-control"});return this.contentEl_=f("div",{className:"vjs-current-time-display",innerHTML:'<span class="vjs-control-text">Current Time </span>0:00'},{"aria-live":"off"}),e.appendChild(this.contentEl_),e},e.prototype.updateContent=function(t){var e=this.player_.scrubbing()?this.player_.getCache().currentTime:this.player_.currentTime(),n=this.localize("Current Time"),r=Yt(e,this.player_.duration());r!==this.formattedTime_&&(this.formattedTime_=r,this.contentEl_.innerHTML='<span class="vjs-control-text">'+n+"</span> "+r)},e}(mn);mn.registerComponent("CurrentTimeDisplay",Yr);var $r=function(t){function e(n,r){Ie(this,e);var i=Re(this,t.call(this,n,r));return i.on(n,"durationchange",i.updateContent),i.on(n,"timeupdate",i.updateContent),i.on(n,"loadedmetadata",i.updateContent),i}return De(e,t),e.prototype.createEl=function(){var e=t.prototype.createEl.call(this,"div",{className:"vjs-duration vjs-time-control vjs-control"});return this.contentEl_=f("div",{className:"vjs-duration-display",innerHTML:'<span class="vjs-control-text">'+this.localize("Duration Time")+"</span> 0:00"},{"aria-live":"off"}),e.appendChild(this.contentEl_),e},e.prototype.updateContent=function(t){var e=this.player_.duration();if(e&&this.duration_!==e){this.duration_=e;var n=this.localize("Duration Time"),r=Yt(e);this.contentEl_.innerHTML='<span class="vjs-control-text">'+n+"</span> "+r}},e}(mn);mn.registerComponent("DurationDisplay",$r);var Jr=function(t){function e(){return Ie(this,e),Re(this,t.apply(this,arguments))}return De(e,t),e.prototype.createEl=function(){return t.prototype.createEl.call(this,"div",{className:"vjs-time-control vjs-time-divider",innerHTML:"<div><span>/</span></div>"})},e}(mn);mn.registerComponent("TimeDivider",Jr);var Qr=function(t){function e(n,r){Ie(this,e);var i=Re(this,t.call(this,n,r));return i.on(n,"timeupdate",i.updateContent),i.on(n,"durationchange",i.updateContent),i}return De(e,t),e.prototype.createEl=function(){var e=t.prototype.createEl.call(this,"div",{className:"vjs-remaining-time vjs-time-control vjs-control"});return this.contentEl_=f("div",{
className:"vjs-remaining-time-display",innerHTML:'<span class="vjs-control-text">'+this.localize("Remaining Time")+"</span> -0:00"},{"aria-live":"off"}),e.appendChild(this.contentEl_),e},e.prototype.updateContent=function(t){if(this.player_.duration()){var e=this.localize("Remaining Time"),n=Yt(this.player_.remainingTime());n!==this.formattedTime_&&(this.formattedTime_=n,this.contentEl_.innerHTML='<span class="vjs-control-text">'+e+"</span> -"+n)}},e}(mn);mn.registerComponent("RemainingTimeDisplay",Qr);var Zr=function(t){function e(n,r){Ie(this,e);var i=Re(this,t.call(this,n,r));return i.updateShowing(),i.on(i.player(),"durationchange",i.updateShowing),i}return De(e,t),e.prototype.createEl=function(){var e=t.prototype.createEl.call(this,"div",{className:"vjs-live-control vjs-control"});return this.contentEl_=f("div",{className:"vjs-live-display",innerHTML:'<span class="vjs-control-text">'+this.localize("Stream Type")+"</span>"+this.localize("LIVE")},{"aria-live":"off"}),e.appendChild(this.contentEl_),e},e.prototype.updateShowing=function(t){this.player().duration()===1/0?this.show():this.hide()},e}(mn);mn.registerComponent("LiveDisplay",Zr);var ti=function(t){function e(n,r){Ie(this,e);var i=Re(this,t.call(this,n,r));return i.bar=i.getChild(i.options_.barName),i.vertical(!!i.options_.vertical),i.on("mousedown",i.handleMouseDown),i.on("touchstart",i.handleMouseDown),i.on("focus",i.handleFocus),i.on("blur",i.handleBlur),i.on("click",i.handleClick),i.on(n,"controlsvisible",i.update),i.playerEvent&&i.on(n,i.playerEvent,i.update),i}return De(e,t),e.prototype.createEl=function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return n.className=n.className+" vjs-slider",n=r({tabIndex:0},n),i=r({role:"slider","aria-valuenow":0,"aria-valuemin":0,"aria-valuemax":100,tabIndex:0},i),t.prototype.createEl.call(this,e,n,i)},e.prototype.handleMouseDown=function(t){var e=this.bar.el_.ownerDocument;t.preventDefault(),S(),this.addClass("vjs-sliding"),this.trigger("slideractive"),this.on(e,"mousemove",this.handleMouseMove),this.on(e,"mouseup",this.handleMouseUp),this.on(e,"touchmove",this.handleMouseMove),this.on(e,"touchend",this.handleMouseUp),this.handleMouseMove(t)},e.prototype.handleMouseMove=function(t){},e.prototype.handleMouseUp=function(){var t=this.bar.el_.ownerDocument;x(),this.removeClass("vjs-sliding"),this.trigger("sliderinactive"),this.off(t,"mousemove",this.handleMouseMove),this.off(t,"mouseup",this.handleMouseUp),this.off(t,"touchmove",this.handleMouseMove),this.off(t,"touchend",this.handleMouseUp),this.update()},e.prototype.update=function(){if(this.el_){var t=this.getPercent(),e=this.bar;if(e){("number"!=typeof t||t!==t||t<0||t===1/0)&&(t=0);var n=(100*t).toFixed(2)+"%",r=e.el().style;return this.vertical()?r.height=n:r.width=n,t}}},e.prototype.calculateDistance=function(t){var e=P(this.el_,t);return this.vertical()?e.y:e.x},e.prototype.handleFocus=function(){this.on(this.bar.el_.ownerDocument,"keydown",this.handleKeyPress)},e.prototype.handleKeyPress=function(t){37===t.which||40===t.which?(t.preventDefault(),this.stepBack()):38!==t.which&&39!==t.which||(t.preventDefault(),this.stepForward())},e.prototype.handleBlur=function(){this.off(this.bar.el_.ownerDocument,"keydown",this.handleKeyPress)},e.prototype.handleClick=function(t){t.stopImmediatePropagation(),t.preventDefault()},e.prototype.vertical=function(t){if(void 0===t)return this.vertical_||!1;this.vertical_=!!t,this.vertical_?this.addClass("vjs-slider-vertical"):this.addClass("vjs-slider-horizontal")},e}(mn);mn.registerComponent("Slider",ti);var ei=function(t){function e(n,r){Ie(this,e);var i=Re(this,t.call(this,n,r));return i.partEls_=[],i.on(n,"progress",i.update),i}return De(e,t),e.prototype.createEl=function(){return t.prototype.createEl.call(this,"div",{className:"vjs-load-progress",innerHTML:'<span class="vjs-control-text"><span>'+this.localize("Loaded")+"</span>: 0%</span>"})},e.prototype.update=function(t){var e=this.player_.buffered(),n=this.player_.duration(),r=this.player_.bufferedEnd(),i=this.partEls_,o=function(t,e){var n=t/e||0;return 100*(n>=1?1:n)+"%"};this.el_.style.width=o(r,n);for(var s=0;s<e.length;s++){var a=e.start(s),l=e.end(s),c=i[s];c||(c=this.el_.appendChild(f()),i[s]=c),c.style.left=o(a,r),c.style.width=o(l-a,r)}for(var u=i.length;u>e.length;u--)this.el_.removeChild(i[u-1]);i.length=e.length},e}(mn);mn.registerComponent("LoadProgressBar",ei);var ni=function(t){function e(){return Ie(this,e),Re(this,t.apply(this,arguments))}return De(e,t),e.prototype.createEl=function(){return t.prototype.createEl.call(this,"div",{className:"vjs-time-tooltip"})},e.prototype.update=function(t,e,n){var r=j(this.el_),i=j(this.player_.el()),o=t.width*e;if(i&&r){var s=t.left-i.left+o,a=t.width-o+(i.right-t.right),l=r.width/2;s<l?l+=l-s:a<l&&(l=a),l<0?l=0:l>r.width&&(l=r.width),this.el_.style.right="-"+l+"px",v(this.el_,n)}},e}(mn);mn.registerComponent("TimeTooltip",ni);var ri=function(t){function e(){return Ie(this,e),Re(this,t.apply(this,arguments))}return De(e,t),e.prototype.createEl=function(){return t.prototype.createEl.call(this,"div",{className:"vjs-play-progress vjs-slider-bar",innerHTML:'<span class="vjs-control-text"><span>'+this.localize("Progress")+"</span>: 0%</span>"})},e.prototype.update=function(t,e){var n=this;this.rafId_&&this.cancelAnimationFrame(this.rafId_),this.rafId_=this.requestAnimationFrame(function(){var r=n.player_.scrubbing()?n.player_.getCache().currentTime:n.player_.currentTime(),i=Yt(r,n.player_.duration()),o=n.getChild("timeTooltip");o&&o.update(t,e,i)})},e}(mn);ri.prototype.options_={children:[]},xe&&!(xe>8)||ye||me||ri.prototype.options_.children.push("timeTooltip"),mn.registerComponent("PlayProgressBar",ri);var ii=function(t){function e(n,r){Ie(this,e);var i=Re(this,t.call(this,n,r));return i.update=an(sn(i,i.update),25),i}return De(e,t),e.prototype.createEl=function(){return t.prototype.createEl.call(this,"div",{className:"vjs-mouse-display"})},e.prototype.update=function(t,e){var n=this;this.rafId_&&this.cancelAnimationFrame(this.rafId_),this.rafId_=this.requestAnimationFrame(function(){var r=n.player_.duration(),i=Yt(e*r,r);n.el_.style.left=t.width*e+"px",n.getChild("timeTooltip").update(t,e,i)})},e}(mn);ii.prototype.options_={children:["timeTooltip"]},mn.registerComponent("MouseTimeDisplay",ii);var oi=function(t){function e(n,r){Ie(this,e);var i=Re(this,t.call(this,n,r));return i.update=an(sn(i,i.update),50),i.on(n,["timeupdate","ended"],i.update),i}return De(e,t),e.prototype.createEl=function(){return t.prototype.createEl.call(this,"div",{className:"vjs-progress-holder"},{"aria-label":this.localize("Progress Bar")})},e.prototype.update=function(){var e=t.prototype.update.call(this),n=this.player_.duration(),r=this.player_.scrubbing()?this.player_.getCache().currentTime:this.player_.currentTime();return this.el_.setAttribute("aria-valuenow",(100*e).toFixed(2)),this.el_.setAttribute("aria-valuetext",this.localize("progress bar timing: currentTime={1} duration={2}",[Yt(r,n),Yt(n,n)],"{1} of {2}")),this.bar.update(j(this.el_),e),e},e.prototype.getPercent=function(){var t=this.player_.scrubbing()?this.player_.getCache().currentTime:this.player_.currentTime(),e=t/this.player_.duration();return e>=1?1:e},e.prototype.handleMouseDown=function(e){this.player_.scrubbing(!0),this.videoWasPlaying=!this.player_.paused(),this.player_.pause(),t.prototype.handleMouseDown.call(this,e)},e.prototype.handleMouseMove=function(t){var e=this.calculateDistance(t)*this.player_.duration();e===this.player_.duration()&&(e-=.1),this.player_.currentTime(e)},e.prototype.handleMouseUp=function(e){t.prototype.handleMouseUp.call(this,e),this.player_.scrubbing(!1),this.videoWasPlaying&&this.player_.play()},e.prototype.stepForward=function(){this.player_.currentTime(this.player_.currentTime()+5)},e.prototype.stepBack=function(){this.player_.currentTime(this.player_.currentTime()-5)},e.prototype.handleAction=function(t){this.player_.paused()?this.player_.play():this.player_.pause()},e.prototype.handleKeyPress=function(e){32===e.which||13===e.which?(e.preventDefault(),this.handleAction(e)):t.prototype.handleKeyPress&&t.prototype.handleKeyPress.call(this,e)},e}(ti);oi.prototype.options_={children:["loadProgressBar","playProgressBar"],barName:"playProgressBar"},xe&&!(xe>8)||ye||me||oi.prototype.options_.children.splice(1,0,"mouseTimeDisplay"),oi.prototype.playerEvent="timeupdate",mn.registerComponent("SeekBar",oi);var si=function(t){function e(n,r){Ie(this,e);var i=Re(this,t.call(this,n,r));return i.handleMouseMove=an(sn(i,i.handleMouseMove),25),i.on(i.el_,"mousemove",i.handleMouseMove),i.throttledHandleMouseSeek=an(sn(i,i.handleMouseSeek),25),i.on(["mousedown","touchstart"],i.handleMouseDown),i}return De(e,t),e.prototype.createEl=function(){return t.prototype.createEl.call(this,"div",{className:"vjs-progress-control vjs-control"})},e.prototype.handleMouseMove=function(t){var e=this.getChild("seekBar"),n=e.getChild("mouseTimeDisplay"),r=e.el(),i=j(r),o=P(r,t).x;o>1?o=1:o<0&&(o=0),n&&n.update(i,o)},e.prototype.handleMouseSeek=function(t){this.getChild("seekBar").handleMouseMove(t)},e.prototype.handleMouseDown=function(t){var e=this.el_.ownerDocument;this.on(e,"mousemove",this.throttledHandleMouseSeek),this.on(e,"touchmove",this.throttledHandleMouseSeek),this.on(e,"mouseup",this.handleMouseUp),this.on(e,"touchend",this.handleMouseUp)},e.prototype.handleMouseUp=function(t){var e=this.el_.ownerDocument;this.off(e,"mousemove",this.throttledHandleMouseSeek),this.off(e,"touchmove",this.throttledHandleMouseSeek),this.off(e,"mouseup",this.handleMouseUp),this.off(e,"touchend",this.handleMouseUp)},e}(mn);si.prototype.options_={children:["seekBar"]},mn.registerComponent("ProgressControl",si);var ai=function(t){function e(n,r){Ie(this,e);var i=Re(this,t.call(this,n,r));return i.on(n,"fullscreenchange",i.handleFullscreenChange),i}return De(e,t),e.prototype.buildCSSClass=function(){return"vjs-fullscreen-control "+t.prototype.buildCSSClass.call(this)},e.prototype.handleFullscreenChange=function(t){this.player_.isFullscreen()?this.controlText("Non-Fullscreen"):this.controlText("Fullscreen")},e.prototype.handleClick=function(t){this.player_.isFullscreen()?this.player_.exitFullscreen():this.player_.requestFullscreen()},e}(Xr);ai.prototype.controlText_="Fullscreen",mn.registerComponent("FullscreenToggle",ai);var li=function(t,e){e.tech_&&!e.tech_.featuresVolumeControl&&t.addClass("vjs-hidden"),t.on(e,"loadstart",function(){e.tech_.featuresVolumeControl?t.removeClass("vjs-hidden"):t.addClass("vjs-hidden")})},ci=function(t){function e(){return Ie(this,e),Re(this,t.apply(this,arguments))}return De(e,t),e.prototype.createEl=function(){return t.prototype.createEl.call(this,"div",{className:"vjs-volume-level",innerHTML:'<span class="vjs-control-text"></span>'})},e}(mn);mn.registerComponent("VolumeLevel",ci);var ui=function(t){function e(n,r){Ie(this,e);var i=Re(this,t.call(this,n,r));return i.on("slideractive",i.updateLastVolume_),i.on(n,"volumechange",i.updateARIAAttributes),n.ready(function(){return i.updateARIAAttributes()}),i}return De(e,t),e.prototype.createEl=function(){return t.prototype.createEl.call(this,"div",{className:"vjs-volume-bar vjs-slider-bar"},{"aria-label":this.localize("Volume Level"),"aria-live":"polite"})},e.prototype.handleMouseMove=function(t){this.checkMuted(),this.player_.volume(this.calculateDistance(t))},e.prototype.checkMuted=function(){this.player_.muted()&&this.player_.muted(!1)},e.prototype.getPercent=function(){return this.player_.muted()?0:this.player_.volume()},e.prototype.stepForward=function(){this.checkMuted(),this.player_.volume(this.player_.volume()+.1)},e.prototype.stepBack=function(){this.checkMuted(),this.player_.volume(this.player_.volume()-.1)},e.prototype.updateARIAAttributes=function(t){var e=this.player_.muted()?0:this.volumeAsPercentage_();this.el_.setAttribute("aria-valuenow",e),this.el_.setAttribute("aria-valuetext",e+"%")},e.prototype.volumeAsPercentage_=function(){return Math.round(100*this.player_.volume())},e.prototype.updateLastVolume_=function(){var t=this,e=this.player_.volume();this.one("sliderinactive",function(){0===t.player_.volume()&&t.player_.lastVolume_(e)})},e}(ti);ui.prototype.options_={children:["volumeLevel"],barName:"volumeLevel"},ui.prototype.playerEvent="volumechange",mn.registerComponent("VolumeBar",ui);var hi=function(t){function e(n){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};Ie(this,e),r.vertical=r.vertical||!1,(void 0===r.volumeBar||o(r.volumeBar))&&(r.volumeBar=r.volumeBar||{},r.volumeBar.vertical=r.vertical);var i=Re(this,t.call(this,n,r));return li(i,n),i.throttledHandleMouseMove=an(sn(i,i.handleMouseMove),25),i.on("mousedown",i.handleMouseDown),i.on("touchstart",i.handleMouseDown),i.on(i.volumeBar,["focus","slideractive"],function(){i.volumeBar.addClass("vjs-slider-active"),i.addClass("vjs-slider-active"),i.trigger("slideractive")}),i.on(i.volumeBar,["blur","sliderinactive"],function(){i.volumeBar.removeClass("vjs-slider-active"),i.removeClass("vjs-slider-active"),i.trigger("sliderinactive")}),i}return De(e,t),e.prototype.createEl=function(){var e="vjs-volume-horizontal";return this.options_.vertical&&(e="vjs-volume-vertical"),t.prototype.createEl.call(this,"div",{className:"vjs-volume-control vjs-control "+e})},e.prototype.handleMouseDown=function(t){var e=this.el_.ownerDocument;this.on(e,"mousemove",this.throttledHandleMouseMove),this.on(e,"touchmove",this.throttledHandleMouseMove),this.on(e,"mouseup",this.handleMouseUp),this.on(e,"touchend",this.handleMouseUp)},e.prototype.handleMouseUp=function(t){var e=this.el_.ownerDocument;this.off(e,"mousemove",this.throttledHandleMouseMove),this.off(e,"touchmove",this.throttledHandleMouseMove),this.off(e,"mouseup",this.handleMouseUp),this.off(e,"touchend",this.handleMouseUp)},e.prototype.handleMouseMove=function(t){this.volumeBar.handleMouseMove(t)},e}(mn);hi.prototype.options_={children:["volumeBar"]},mn.registerComponent("VolumeControl",hi);var pi=function(t){function e(n,r){Ie(this,e);var i=Re(this,t.call(this,n,r));return li(i,n),i.on(n,["loadstart","volumechange"],i.update),i}return De(e,t),e.prototype.buildCSSClass=function(){return"vjs-mute-control "+t.prototype.buildCSSClass.call(this)},e.prototype.handleClick=function(t){var e=this.player_.volume(),n=this.player_.lastVolume_();if(0===e){var r=n<.1?.1:n;this.player_.volume(r),this.player_.muted(!1)}else this.player_.muted(!this.player_.muted())},e.prototype.update=function(t){this.updateIcon_(),this.updateControlText_()},e.prototype.updateIcon_=function(){var t=this.player_.volume(),e=3;0===t||this.player_.muted()?e=0:t<.33?e=1:t<.67&&(e=2);for(var n=0;n<4;n++)_(this.el_,"vjs-vol-"+n);m(this.el_,"vjs-vol-"+e)},e.prototype.updateControlText_=function(){var t=this.player_.muted()||0===this.player_.volume(),e=t?"Unmute":"Mute";this.controlText()!==e&&this.controlText(e)},e}(Xr);pi.prototype.controlText_="Mute",mn.registerComponent("MuteToggle",pi);var di=function(t){function e(n){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};Ie(this,e),void 0!==r.inline?r.inline=r.inline:r.inline=!0,(void 0===r.volumeControl||o(r.volumeControl))&&(r.volumeControl=r.volumeControl||{},r.volumeControl.vertical=!r.inline);var i=Re(this,t.call(this,n,r));return li(i,n),i.on(i.volumeControl,["slideractive"],i.sliderActive_),i.on(i.muteToggle,"focus",i.sliderActive_),i.on(i.volumeControl,["sliderinactive"],i.sliderInactive_),i.on(i.muteToggle,"blur",i.sliderInactive_),i}return De(e,t),e.prototype.sliderActive_=function(){this.addClass("vjs-slider-active")},e.prototype.sliderInactive_=function(){this.removeClass("vjs-slider-active")},e.prototype.createEl=function(){var e="vjs-volume-panel-horizontal";return this.options_.inline||(e="vjs-volume-panel-vertical"),t.prototype.createEl.call(this,"div",{className:"vjs-volume-panel vjs-control "+e})},e}(mn);di.prototype.options_={children:["muteToggle","volumeControl"]},mn.registerComponent("VolumePanel",di);var fi=function(t){function e(n,r){Ie(this,e);var i=Re(this,t.call(this,n,r));return r&&(i.menuButton_=r.menuButton),i.focusedChild_=-1,i.on("keydown",i.handleKeyPress),i}return De(e,t),e.prototype.addItem=function(t){this.addChild(t),t.on("click",sn(this,function(e){this.menuButton_&&(this.menuButton_.unpressButton(),"CaptionSettingsMenuItem"!==t.name()&&this.menuButton_.focus())}))},e.prototype.createEl=function(){var e=this.options_.contentElType||"ul";this.contentEl_=f(e,{className:"vjs-menu-content"}),this.contentEl_.setAttribute("role","menu");var n=t.prototype.createEl.call(this,"div",{append:this.contentEl_,className:"vjs-menu"});return n.appendChild(this.contentEl_),W(n,"click",function(t){t.preventDefault(),t.stopImmediatePropagation()}),n},e.prototype.handleKeyPress=function(t){37===t.which||40===t.which?(t.preventDefault(),this.stepForward()):38!==t.which&&39!==t.which||(t.preventDefault(),this.stepBack())},e.prototype.stepForward=function(){var t=0;void 0!==this.focusedChild_&&(t=this.focusedChild_+1),this.focus(t)},e.prototype.stepBack=function(){var t=0;void 0!==this.focusedChild_&&(t=this.focusedChild_-1),this.focus(t)},e.prototype.focus=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,e=this.children().slice();e.length&&e[0].className&&/vjs-menu-title/.test(e[0].className)&&e.shift(),e.length>0&&(t<0?t=0:t>=e.length&&(t=e.length-1),this.focusedChild_=t,e[t].el_.focus())},e}(mn);mn.registerComponent("Menu",fi);var vi=function(t){function e(n){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};Ie(this,e);var i=Re(this,t.call(this,n,r));i.menuButton_=new Xr(n,r),i.menuButton_.controlText(i.controlText_),i.menuButton_.el_.setAttribute("aria-haspopup","true");var o=Xr.prototype.buildCSSClass();return i.menuButton_.el_.className=i.buildCSSClass()+" "+o,i.menuButton_.removeClass("vjs-control"),i.addChild(i.menuButton_),i.update(),i.enabled_=!0,i.on(i.menuButton_,"tap",i.handleClick),i.on(i.menuButton_,"click",i.handleClick),i.on(i.menuButton_,"focus",i.handleFocus),i.on(i.menuButton_,"blur",i.handleBlur),i.on("keydown",i.handleSubmenuKeyPress),i}return De(e,t),e.prototype.update=function(){var t=this.createMenu();this.menu&&this.removeChild(this.menu),this.menu=t,this.addChild(t),this.buttonPressed_=!1,this.menuButton_.el_.setAttribute("aria-expanded","false"),this.items&&this.items.length<=this.hideThreshold_?this.hide():this.show()},e.prototype.createMenu=function(){var t=new fi(this.player_,{menuButton:this});if(this.hideThreshold_=0,this.options_.title){var e=f("li",{className:"vjs-menu-title",innerHTML:$(this.options_.title),tabIndex:-1});this.hideThreshold_+=1,t.children_.unshift(e),y(e,t.contentEl())}if(this.items=this.createItems(),this.items)for(var n=0;n<this.items.length;n++)t.addItem(this.items[n]);return t},e.prototype.createItems=function(){},e.prototype.createEl=function(){return t.prototype.createEl.call(this,"div",{className:this.buildWrapperCSSClass()},{})},e.prototype.buildWrapperCSSClass=function(){var e="vjs-menu-button";return!0===this.options_.inline?e+="-inline":e+="-popup","vjs-menu-button "+e+" "+Xr.prototype.buildCSSClass()+" "+t.prototype.buildCSSClass.call(this)},e.prototype.buildCSSClass=function(){var e="vjs-menu-button";return!0===this.options_.inline?e+="-inline":e+="-popup","vjs-menu-button "+e+" "+t.prototype.buildCSSClass.call(this)},e.prototype.controlText=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.menuButton_.el();return this.menuButton_.controlText(t,e)},e.prototype.handleClick=function(t){this.one(this.menu.contentEl(),"mouseleave",sn(this,function(t){this.unpressButton(),this.el_.blur()})),this.buttonPressed_?this.unpressButton():this.pressButton()},e.prototype.focus=function(){this.menuButton_.focus()},e.prototype.blur=function(){this.menuButton_.blur()},e.prototype.handleFocus=function(){W(ce,"keydown",sn(this,this.handleKeyPress))},e.prototype.handleBlur=function(){U(ce,"keydown",sn(this,this.handleKeyPress))},e.prototype.handleKeyPress=function(t){27===t.which||9===t.which?(this.buttonPressed_&&this.unpressButton(),9!==t.which&&(t.preventDefault(),this.menuButton_.el_.focus())):38!==t.which&&40!==t.which||this.buttonPressed_||(this.pressButton(),t.preventDefault())},e.prototype.handleSubmenuKeyPress=function(t){27!==t.which&&9!==t.which||(this.buttonPressed_&&this.unpressButton(),9!==t.which&&(t.preventDefault(),this.menuButton_.el_.focus()))},e.prototype.pressButton=function(){this.enabled_&&(this.buttonPressed_=!0,this.menu.lockShowing(),this.menuButton_.el_.setAttribute("aria-expanded","true"),this.menu.focus())},e.prototype.unpressButton=function(){this.enabled_&&(this.buttonPressed_=!1,this.menu.unlockShowing(),this.menuButton_.el_.setAttribute("aria-expanded","false"))},e.prototype.disable=function(){this.unpressButton(),this.enabled_=!1,this.addClass("vjs-disabled"),this.menuButton_.disable()},e.prototype.enable=function(){this.enabled_=!0,this.removeClass("vjs-disabled"),this.menuButton_.enable()},e}(mn);mn.registerComponent("MenuButton",vi);var yi=function(t){function e(n,r){Ie(this,e);var i=r.tracks,o=Re(this,t.call(this,n,r));if(o.items.length<=1&&o.hide(),!i)return Re(o);var s=sn(o,o.update);return i.addEventListener("removetrack",s),i.addEventListener("addtrack",s),o.player_.on("ready",s),o.player_.on("dispose",function(){i.removeEventListener("removetrack",s),i.removeEventListener("addtrack",s)}),o}return De(e,t),e}(vi);mn.registerComponent("TrackButton",yi);var gi=function(t){function e(n,r){Ie(this,e);var i=Re(this,t.call(this,n,r));return i.selectable=r.selectable,i.selected(r.selected),i.selectable?i.el_.setAttribute("role","menuitemcheckbox"):i.el_.setAttribute("role","menuitem"),i}return De(e,t),e.prototype.createEl=function(e,n,i){return this.nonIconControl=!0,t.prototype.createEl.call(this,"li",r({className:"vjs-menu-item",innerHTML:'<span class="vjs-menu-item-text">'+this.localize(this.options_.label)+"</span>",tabIndex:-1},n),i)},e.prototype.handleClick=function(t){this.selected(!0)},e.prototype.selected=function(t){this.selectable&&(t?(this.addClass("vjs-selected"),this.el_.setAttribute("aria-checked","true"),this.controlText(", selected")):(this.removeClass("vjs-selected"),this.el_.setAttribute("aria-checked","false"),this.controlText(" ")))},e}(Hr);mn.registerComponent("MenuItem",gi);var mi=function(t){function e(n,r){Ie(this,e);var i=r.track,o=n.textTracks();r.label=i.label||i.language||"Unknown",r.selected="showing"===i.mode;var s=Re(this,t.call(this,n,r));s.track=i;var a=sn(s,s.handleTracksChange),l=sn(s,s.handleSelectedLanguageChange);if(n.on(["loadstart","texttrackchange"],a),o.addEventListener("change",a),o.addEventListener("selectedlanguagechange",l),s.on("dispose",function(){o.removeEventListener("change",a),o.removeEventListener("selectedlanguagechange",l)}),void 0===o.onchange){var c=void 0;s.on(["tap","click"],function(){if("object"!==Me(ie.Event))try{c=new ie.Event("change")}catch(t){}c||(c=ce.createEvent("Event"),c.initEvent("change",!0,!0)),o.dispatchEvent(c)})}return s}return De(e,t),e.prototype.handleClick=function(e){var n=this.track.kind,r=this.track.kinds,i=this.player_.textTracks();if(r||(r=[n]),t.prototype.handleClick.call(this,e),i)for(var o=0;o<i.length;o++){var s=i[o];s===this.track&&r.indexOf(s.kind)>-1?"showing"!==s.mode&&(s.mode="showing"):"disabled"!==s.mode&&(s.mode="disabled")}},e.prototype.handleTracksChange=function(t){this.selected("showing"===this.track.mode)},e.prototype.handleSelectedLanguageChange=function(t){if("showing"===this.track.mode){var e=this.player_.cache_.selectedLanguage;if(e&&e.enabled&&e.language===this.track.language&&e.kind!==this.track.kind)return;this.player_.cache_.selectedLanguage={enabled:!0,language:this.track.language,kind:this.track.kind}}},e}(gi);mn.registerComponent("TextTrackMenuItem",mi);var _i=function(t){function e(n,r){Ie(this,e),r.track={player:n,kind:r.kind,kinds:r.kinds,default:!1,mode:"disabled"},r.kinds||(r.kinds=[r.kind]),r.label?r.track.label=r.label:r.track.label=r.kinds.join(" and ")+" off",r.selectable=!0;var i=Re(this,t.call(this,n,r));return i.selected(!0),i}return De(e,t),e.prototype.handleTracksChange=function(t){for(var e=this.player().textTracks(),n=!0,r=0,i=e.length;r<i;r++){var o=e[r];if(this.options_.kinds.indexOf(o.kind)>-1&&"showing"===o.mode){n=!1;break}}this.selected(n)},e.prototype.handleSelectedLanguageChange=function(t){for(var e=this.player().textTracks(),n=!0,r=0,i=e.length;r<i;r++){var o=e[r];if(["captions","descriptions","subtitles"].indexOf(o.kind)>-1&&"showing"===o.mode){n=!1;break}}n&&(this.player_.cache_.selectedLanguage={enabled:!1})},e}(mi);mn.registerComponent("OffTextTrackMenuItem",_i);var bi=function(t){function e(n){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Ie(this,e),r.tracks=n.textTracks(),Re(this,t.call(this,n,r))}return De(e,t),e.prototype.createItems=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:mi,n=void 0;this.label_&&(n=this.label_+" off"),t.push(new _i(this.player_,{kinds:this.kinds_,kind:this.kind_,label:n})),this.hideThreshold_+=1;var r=this.player_.textTracks();Array.isArray(this.kinds_)||(this.kinds_=[this.kind_]);for(var i=0;i<r.length;i++){var o=r[i];if(this.kinds_.indexOf(o.kind)>-1){var s=new e(this.player_,{track:o,selectable:!0});s.addClass("vjs-"+o.kind+"-menu-item"),t.push(s)}}return t},e}(yi);mn.registerComponent("TextTrackButton",bi);var Ti=function(t){function e(n,r){Ie(this,e);var i=r.track,o=r.cue,s=n.currentTime();r.selectable=!0,r.label=o.text,r.selected=o.startTime<=s&&s<o.endTime;var a=Re(this,t.call(this,n,r));return a.track=i,a.cue=o,i.addEventListener("cuechange",sn(a,a.update)),a}return De(e,t),e.prototype.handleClick=function(e){t.prototype.handleClick.call(this),this.player_.currentTime(this.cue.startTime),this.update(this.cue.startTime)},e.prototype.update=function(t){var e=this.cue,n=this.player_.currentTime();this.selected(e.startTime<=n&&n<e.endTime)},e}(gi);mn.registerComponent("ChaptersTrackMenuItem",Ti);var Ci=function(t){function e(n,r,i){return Ie(this,e),Re(this,t.call(this,n,r,i))}return De(e,t),e.prototype.buildCSSClass=function(){return"vjs-chapters-button "+t.prototype.buildCSSClass.call(this)},e.prototype.buildWrapperCSSClass=function(){return"vjs-chapters-button "+t.prototype.buildWrapperCSSClass.call(this)},e.prototype.update=function(e){this.track_&&(!e||"addtrack"!==e.type&&"removetrack"!==e.type)||this.setTrack(this.findChaptersTrack()),t.prototype.update.call(this)},e.prototype.setTrack=function(t){if(this.track_!==t){if(this.updateHandler_||(this.updateHandler_=this.update.bind(this)),this.track_){var e=this.player_.remoteTextTrackEls().getTrackElementByTrack_(this.track_);e&&e.removeEventListener("load",this.updateHandler_),this.track_=null}if(this.track_=t,this.track_){this.track_.mode="hidden";var n=this.player_.remoteTextTrackEls().getTrackElementByTrack_(this.track_);n&&n.addEventListener("load",this.updateHandler_)}}},e.prototype.findChaptersTrack=function(){for(var t=this.player_.textTracks()||[],e=t.length-1;e>=0;e--){var n=t[e];if(n.kind===this.kind_)return n}},e.prototype.getMenuCaption=function(){return this.track_&&this.track_.label?this.track_.label:this.localize($(this.kind_))},e.prototype.createMenu=function(){return this.options_.title=this.getMenuCaption(),t.prototype.createMenu.call(this)},e.prototype.createItems=function(){var t=[];if(!this.track_)return t;var e=this.track_.cues;if(!e)return t;for(var n=0,r=e.length;n<r;n++){var i=e[n],o=new Ti(this.player_,{track:this.track_,cue:i});t.push(o)}return t},e}(bi);Ci.prototype.kind_="chapters",Ci.prototype.controlText_="Chapters",mn.registerComponent("ChaptersButton",Ci);var ki=function(t){function e(n,r,i){Ie(this,e);var o=Re(this,t.call(this,n,r,i)),s=n.textTracks(),a=sn(o,o.handleTracksChange);return s.addEventListener("change",a),o.on("dispose",function(){s.removeEventListener("change",a)}),o}return De(e,t),e.prototype.handleTracksChange=function(t){for(var e=this.player().textTracks(),n=!1,r=0,i=e.length;r<i;r++){var o=e[r];if(o.kind!==this.kind_&&"showing"===o.mode){n=!0;break}}n?this.disable():this.enable()},e.prototype.buildCSSClass=function(){return"vjs-descriptions-button "+t.prototype.buildCSSClass.call(this)},e.prototype.buildWrapperCSSClass=function(){return"vjs-descriptions-button "+t.prototype.buildWrapperCSSClass.call(this)},e}(bi);ki.prototype.kind_="descriptions",ki.prototype.controlText_="Descriptions",mn.registerComponent("DescriptionsButton",ki);var wi=function(t){function e(n,r,i){return Ie(this,e),Re(this,t.call(this,n,r,i))}return De(e,t),e.prototype.buildCSSClass=function(){return"vjs-subtitles-button "+t.prototype.buildCSSClass.call(this)},e.prototype.buildWrapperCSSClass=function(){return"vjs-subtitles-button "+t.prototype.buildWrapperCSSClass.call(this)},e}(bi);wi.prototype.kind_="subtitles",wi.prototype.controlText_="Subtitles",mn.registerComponent("SubtitlesButton",wi);var Ei=function(t){function e(n,r){Ie(this,e),r.track={player:n,kind:r.kind,label:r.kind+" settings",selectable:!1,default:!1,mode:"disabled"},r.selectable=!1,r.name="CaptionSettingsMenuItem";var i=Re(this,t.call(this,n,r));return i.addClass("vjs-texttrack-settings"),i.controlText(", opens "+r.kind+" settings dialog"),i}return De(e,t),e.prototype.handleClick=function(t){this.player().getChild("textTrackSettings").open()},e}(mi);mn.registerComponent("CaptionSettingsMenuItem",Ei);var Si=function(t){function e(n,r,i){return Ie(this,e),Re(this,t.call(this,n,r,i))}return De(e,t),e.prototype.buildCSSClass=function(){return"vjs-captions-button "+t.prototype.buildCSSClass.call(this)},e.prototype.buildWrapperCSSClass=function(){return"vjs-captions-button "+t.prototype.buildWrapperCSSClass.call(this)},e.prototype.createItems=function(){var e=[];return this.player().tech_&&this.player().tech_.featuresNativeTextTracks||(e.push(new Ei(this.player_,{kind:this.kind_})),this.hideThreshold_+=1),t.prototype.createItems.call(this,e)},e}(bi);Si.prototype.kind_="captions",Si.prototype.controlText_="Captions",mn.registerComponent("CaptionsButton",Si);var xi=function(t){function e(){return Ie(this,e),Re(this,t.apply(this,arguments))}return De(e,t),e.prototype.createEl=function(e,n,i){var o='<span class="vjs-menu-item-text">'+this.localize(this.options_.label);return"captions"===this.options_.track.kind&&(o+='\n        <span aria-hidden="true" class="vjs-icon-placeholder"></span>\n        <span class="vjs-control-text"> '+this.localize("Captions")+"</span>\n      "),o+="</span>",t.prototype.createEl.call(this,e,r({innerHTML:o},n),i)},e}(mi);mn.registerComponent("SubsCapsMenuItem",xi);var ji=function(t){function e(n){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};Ie(this,e);var i=Re(this,t.call(this,n,r));return i.label_="subtitles",["en","en-us","en-ca","fr-ca"].indexOf(i.player_.language_)>-1&&(i.label_="captions"),i.menuButton_.controlText($(i.label_)),i}return De(e,t),e.prototype.buildCSSClass=function(){return"vjs-subs-caps-button "+t.prototype.buildCSSClass.call(this)},e.prototype.buildWrapperCSSClass=function(){return"vjs-subs-caps-button "+t.prototype.buildWrapperCSSClass.call(this)},e.prototype.createItems=function(){var e=[];return this.player().tech_&&this.player().tech_.featuresNativeTextTracks||(e.push(new Ei(this.player_,{kind:this.label_})),this.hideThreshold_+=1),e=t.prototype.createItems.call(this,e,xi)},e}(bi);ji.prototype.kinds_=["captions","subtitles"],ji.prototype.controlText_="Subtitles",mn.registerComponent("SubsCapsButton",ji);var Ai=function(t){function e(n,r){Ie(this,e);var i=r.track,o=n.audioTracks();r.label=i.label||i.language||"Unknown",r.selected=i.enabled;var s=Re(this,t.call(this,n,r));s.track=i;var a=sn(s,s.handleTracksChange);return o.addEventListener("change",a),s.on("dispose",function(){
o.removeEventListener("change",a)}),s}return De(e,t),e.prototype.handleClick=function(e){var n=this.player_.audioTracks();t.prototype.handleClick.call(this,e);for(var r=0;r<n.length;r++){var i=n[r];i.enabled=i===this.track}},e.prototype.handleTracksChange=function(t){this.selected(this.track.enabled)},e}(gi);mn.registerComponent("AudioTrackMenuItem",Ai);var Pi=function(t){function e(n){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Ie(this,e),r.tracks=n.audioTracks(),Re(this,t.call(this,n,r))}return De(e,t),e.prototype.buildCSSClass=function(){return"vjs-audio-button "+t.prototype.buildCSSClass.call(this)},e.prototype.buildWrapperCSSClass=function(){return"vjs-audio-button "+t.prototype.buildWrapperCSSClass.call(this)},e.prototype.createItems=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];this.hideThreshold_=1;for(var e=this.player_.audioTracks(),n=0;n<e.length;n++){var r=e[n];t.push(new Ai(this.player_,{track:r,selectable:!0}))}return t},e}(yi);Pi.prototype.controlText_="Audio Track",mn.registerComponent("AudioTrackButton",Pi);var Ni=function(t){function e(n,r){Ie(this,e);var i=r.rate,o=parseFloat(i,10);r.label=i,r.selected=1===o,r.selectable=!0;var s=Re(this,t.call(this,n,r));return s.label=i,s.rate=o,s.on(n,"ratechange",s.update),s}return De(e,t),e.prototype.handleClick=function(e){t.prototype.handleClick.call(this),this.player().playbackRate(this.rate)},e.prototype.update=function(t){this.selected(this.player().playbackRate()===this.rate)},e}(gi);Ni.prototype.contentElType="button",mn.registerComponent("PlaybackRateMenuItem",Ni);var Oi=function(t){function e(n,r){Ie(this,e);var i=Re(this,t.call(this,n,r));return i.updateVisibility(),i.updateLabel(),i.on(n,"loadstart",i.updateVisibility),i.on(n,"ratechange",i.updateLabel),i}return De(e,t),e.prototype.createEl=function(){var e=t.prototype.createEl.call(this);return this.labelEl_=f("div",{className:"vjs-playback-rate-value",innerHTML:1}),e.appendChild(this.labelEl_),e},e.prototype.buildCSSClass=function(){return"vjs-playback-rate "+t.prototype.buildCSSClass.call(this)},e.prototype.buildWrapperCSSClass=function(){return"vjs-playback-rate "+t.prototype.buildWrapperCSSClass.call(this)},e.prototype.createMenu=function(){var t=new fi(this.player()),e=this.playbackRates();if(e)for(var n=e.length-1;n>=0;n--)t.addChild(new Ni(this.player(),{rate:e[n]+"x"}));return t},e.prototype.updateARIAAttributes=function(){this.el().setAttribute("aria-valuenow",this.player().playbackRate())},e.prototype.handleClick=function(t){for(var e=this.player().playbackRate(),n=this.playbackRates(),r=n[0],i=0;i<n.length;i++)if(n[i]>e){r=n[i];break}this.player().playbackRate(r)},e.prototype.playbackRates=function(){return this.options_.playbackRates||this.options_.playerOptions&&this.options_.playerOptions.playbackRates},e.prototype.playbackRateSupported=function(){return this.player().tech_&&this.player().tech_.featuresPlaybackRate&&this.playbackRates()&&this.playbackRates().length>0},e.prototype.updateVisibility=function(t){this.playbackRateSupported()?this.removeClass("vjs-hidden"):this.addClass("vjs-hidden")},e.prototype.updateLabel=function(t){this.playbackRateSupported()&&(this.labelEl_.innerHTML=this.player().playbackRate()+"x")},e}(vi);Oi.prototype.controlText_="Playback Rate",mn.registerComponent("PlaybackRateMenuButton",Oi);var Mi=function(t){function e(){return Ie(this,e),Re(this,t.apply(this,arguments))}return De(e,t),e.prototype.buildCSSClass=function(){return"vjs-spacer "+t.prototype.buildCSSClass.call(this)},e.prototype.createEl=function(){return t.prototype.createEl.call(this,"div",{className:this.buildCSSClass()})},e}(mn);mn.registerComponent("Spacer",Mi);var Ii=function(t){function e(){return Ie(this,e),Re(this,t.apply(this,arguments))}return De(e,t),e.prototype.buildCSSClass=function(){return"vjs-custom-control-spacer "+t.prototype.buildCSSClass.call(this)},e.prototype.createEl=function(){var e=t.prototype.createEl.call(this,{className:this.buildCSSClass()});return e.innerHTML="&nbsp;",e},e}(Mi);mn.registerComponent("CustomControlSpacer",Ii);var Di=function(t){function e(){return Ie(this,e),Re(this,t.apply(this,arguments))}return De(e,t),e.prototype.createEl=function(){return t.prototype.createEl.call(this,"div",{className:"vjs-control-bar",dir:"ltr"},{role:"group"})},e}(mn);Di.prototype.options_={children:["playToggle","volumePanel","currentTimeDisplay","timeDivider","durationDisplay","progressControl","liveDisplay","remainingTimeDisplay","customControlSpacer","playbackRateMenuButton","chaptersButton","descriptionsButton","subsCapsButton","audioTrackButton","fullscreenToggle"]},mn.registerComponent("ControlBar",Di);var Ri=function(t){function e(n,r){Ie(this,e);var i=Re(this,t.call(this,n,r));return i.on(n,"error",i.open),i}return De(e,t),e.prototype.buildCSSClass=function(){return"vjs-error-display "+t.prototype.buildCSSClass.call(this)},e.prototype.content=function(){var t=this.player().error();return t?this.localize(t.message):""},e}(On);Ri.prototype.options_=Q(On.prototype.options_,{pauseOnOpen:!1,fillAlways:!0,temporary:!1,uncloseable:!0}),mn.registerComponent("ErrorDisplay",Ri);var Li=["#000","Black"],Bi=["#00F","Blue"],Fi=["#0FF","Cyan"],Hi=["#0F0","Green"],Vi=["#F0F","Magenta"],zi=["#F00","Red"],Wi=["#FFF","White"],Ui=["#FF0","Yellow"],Xi=["1","Opaque"],qi=["0.5","Semi-Transparent"],Ki=["0","Transparent"],Gi={backgroundColor:{selector:".vjs-bg-color > select",id:"captions-background-color-%s",label:"Color",options:[Li,Wi,zi,Hi,Bi,Ui,Vi,Fi]},backgroundOpacity:{selector:".vjs-bg-opacity > select",id:"captions-background-opacity-%s",label:"Transparency",options:[Xi,qi,Ki]},color:{selector:".vjs-fg-color > select",id:"captions-foreground-color-%s",label:"Color",options:[Wi,Li,zi,Hi,Bi,Ui,Vi,Fi]},edgeStyle:{selector:".vjs-edge-style > select",id:"%s",label:"Text Edge Style",options:[["none","None"],["raised","Raised"],["depressed","Depressed"],["uniform","Uniform"],["dropshadow","Dropshadow"]]},fontFamily:{selector:".vjs-font-family > select",id:"captions-font-family-%s",label:"Font Family",options:[["proportionalSansSerif","Proportional Sans-Serif"],["monospaceSansSerif","Monospace Sans-Serif"],["proportionalSerif","Proportional Serif"],["monospaceSerif","Monospace Serif"],["casual","Casual"],["script","Script"],["small-caps","Small Caps"]]},fontPercent:{selector:".vjs-font-percent > select",id:"captions-font-size-%s",label:"Font Size",options:[["0.50","50%"],["0.75","75%"],["1.00","100%"],["1.25","125%"],["1.50","150%"],["1.75","175%"],["2.00","200%"],["3.00","300%"],["4.00","400%"]],default:2,parser:function(t){return"1.00"===t?null:Number(t)}},textOpacity:{selector:".vjs-text-opacity > select",id:"captions-foreground-opacity-%s",label:"Transparency",options:[Xi,qi]},windowColor:{selector:".vjs-window-color > select",id:"captions-window-color-%s",label:"Color"},windowOpacity:{selector:".vjs-window-opacity > select",id:"captions-window-opacity-%s",label:"Transparency",options:[Ki,qi,Xi]}};Gi.windowColor.options=Gi.backgroundColor.options;var Yi=function(t){function r(n,i){Ie(this,r),i.temporary=!1;var o=Re(this,t.call(this,n,i));return o.updateDisplay=sn(o,o.updateDisplay),o.fill(),o.hasBeenOpened_=o.hasBeenFilled_=!0,o.endDialog=f("p",{className:"vjs-control-text",textContent:o.localize("End of dialog window.")}),o.el().appendChild(o.endDialog),o.setDefaults(),void 0===i.persistTextTrackSettings&&(o.options_.persistTextTrackSettings=o.options_.playerOptions.persistTextTrackSettings),o.on(o.$(".vjs-done-button"),"click",function(){o.saveSettings(),o.close()}),o.on(o.$(".vjs-default-button"),"click",function(){o.setDefaults(),o.updateDisplay()}),e(Gi,function(t){o.on(o.$(t.selector),"change",o.updateDisplay)}),o.options_.persistTextTrackSettings&&o.restoreSettings(),o}return De(r,t),r.prototype.createElSelect_=function(t){var e=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"label",i=Gi[t],o=i.id.replace("%s",this.id_);return[f(r,{id:o,className:"label"===r?"vjs-label":"",textContent:this.localize(i.label)},{}),f("select",{},{"aria-labelledby":n+" "+o},i.options.map(function(t){var r=o+"-"+t[1];return f("option",{id:r,textContent:e.localize(t[1]),value:t[0]},{"aria-labelledby":n+" "+o+" "+r})}))]},r.prototype.createElFgColor_=function(){var t=f("legend",{id:"captions-text-legend-"+this.id_,textContent:this.localize("Text")});return f("fieldset",{className:"vjs-fg-color vjs-track-setting"},void 0,[t].concat(this.createElSelect_("color",t.id),f("span",{className:"vjs-text-opacity vjs-opacity"},void 0,this.createElSelect_("textOpacity",t.id))))},r.prototype.createElBgColor_=function(){var t=f("legend",{id:"captions-background-"+this.id_,textContent:this.localize("Background")});return f("fieldset",{className:"vjs-bg-color vjs-track-setting"},void 0,[t].concat(this.createElSelect_("backgroundColor",t.id),f("span",{className:"vjs-bg-opacity vjs-opacity"},void 0,this.createElSelect_("backgroundOpacity",t.id))))},r.prototype.createElWinColor_=function(){var t=f("legend",{id:"captions-window-"+this.id_,textContent:this.localize("Window")});return f("fieldset",{className:"vjs-window-color vjs-track-setting"},void 0,[t].concat(this.createElSelect_("windowColor",t.id),f("span",{className:"vjs-window-opacity vjs-opacity"},void 0,this.createElSelect_("windowOpacity",t.id))))},r.prototype.createElColors_=function(){return f("div",{className:"vjs-track-settings-colors"},void 0,[this.createElFgColor_(),this.createElBgColor_(),this.createElWinColor_()])},r.prototype.createElFont_=function(){return f("div",{className:"vjs-track-settings-font"},void 0,[f("fieldset",{className:"vjs-font-percent vjs-track-setting"},void 0,this.createElSelect_("fontPercent","","legend")),f("fieldset",{className:"vjs-edge-style vjs-track-setting"},void 0,this.createElSelect_("edgeStyle","","legend")),f("fieldset",{className:"vjs-font-family vjs-track-setting"},void 0,this.createElSelect_("fontFamily","","legend"))])},r.prototype.createElControls_=function(){var t=this.localize("restore all settings to the default values");return f("div",{className:"vjs-track-settings-controls"},void 0,[f("button",{className:"vjs-default-button",title:t,innerHTML:this.localize("Reset")+"<span class='vjs-control-text'> "+t+"</span>"}),f("button",{className:"vjs-done-button",textContent:this.localize("Done")})])},r.prototype.createEl=function(){return t.prototype.createEl.call(this)},r.prototype.content=function(){return[this.createElColors_(),this.createElFont_(),this.createElControls_()]},r.prototype.label=function(){return this.localize("Caption Settings Dialog")},r.prototype.description=function(){return this.localize("Beginning of dialog window. Escape will cancel and close the window.")},r.prototype.buildCSSClass=function(){return t.prototype.buildCSSClass.call(this)+" vjs-text-track-settings"},r.prototype.getValues=function(){var t=this;return n(Gi,function(e,n,r){var i=Jt(t.$(n.selector),n.parser);return void 0!==i&&(e[r]=i),e},{})},r.prototype.setValues=function(t){var n=this;e(Gi,function(e,r){Qt(n.$(e.selector),t[r],e.parser)})},r.prototype.setDefaults=function(){var t=this;e(Gi,function(e){var n=e.hasOwnProperty("default")?e.default:0;t.$(e.selector).selectedIndex=n})},r.prototype.restoreSettings=function(){var t=void 0;try{t=JSON.parse(ie.localStorage.getItem("vjs-text-track-settings"))}catch(t){Ue.warn(t)}t&&this.setValues(t)},r.prototype.saveSettings=function(){if(this.options_.persistTextTrackSettings){var t=this.getValues();try{Object.keys(t).length?ie.localStorage.setItem("vjs-text-track-settings",JSON.stringify(t)):ie.localStorage.removeItem("vjs-text-track-settings")}catch(t){Ue.warn(t)}}},r.prototype.updateDisplay=function(){var t=this.player_.getChild("textTrackDisplay");t&&t.updateDisplay()},r.prototype.conditionalBlur_=function(){this.previouslyActiveEl_=null,this.off(ce,"keydown",this.handleKeyDown);var t=this.player_.controlBar,e=t&&t.subsCapsButton,n=t&&t.captionsButton;e?e.focus():n&&n.focus()},r}(On);mn.registerComponent("TextTrackSettings",Yi);var $i=Le(["Text Tracks are being loaded from another origin but the crossorigin attribute isn't used.\n            This may prevent text tracks from loading."],["Text Tracks are being loaded from another origin but the crossorigin attribute isn't used.\n            This may prevent text tracks from loading."]),Ji=function(t){function e(n,r){Ie(this,e);var i=Re(this,t.call(this,n,r)),o=n.source,s=!1;if(o&&(i.el_.currentSrc!==o.src||n.tag&&3===n.tag.initNetworkState_)?i.setSource(o):i.handleLateInit_(i.el_),i.el_.hasChildNodes()){for(var a=i.el_.childNodes,l=a.length,c=[];l--;){var u=a[l];"track"===u.nodeName.toLowerCase()&&(i.featuresNativeTextTracks?(i.remoteTextTrackEls().addTrackElement_(u),i.remoteTextTracks().addTrack(u.track),i.textTracks().addTrack(u.track),s||i.el_.hasAttribute("crossorigin")||!$n(u.src)||(s=!0)):c.push(u))}for(var h=0;h<c.length;h++)i.el_.removeChild(c[h])}return i.proxyNativeTracks_(),i.featuresNativeTextTracks&&s&&Ue.warn(Xe($i)),(Pe||fe||Te)&&!0===n.nativeControlsForTouch&&i.setControls(!0),i.proxyWebkitFullscreen_(),i.triggerReady(),i}return De(e,t),e.prototype.dispose=function(){e.disposeMediaElement(this.el_),t.prototype.dispose.call(this)},e.prototype.proxyNativeTracks_=function(){var t=this;gr.names.forEach(function(e){var n=gr[e],r=t.el()[n.getterName],i=t[n.getterName]();if(t["featuresNative"+n.capitalName+"Tracks"]&&r&&r.addEventListener){var o={change:function(t){i.trigger({type:"change",target:i,currentTarget:i,srcElement:i})},addtrack:function(t){i.addTrack(t.track)},removetrack:function(t){i.removeTrack(t.track)}},s=function(){for(var t=[],e=0;e<i.length;e++){for(var n=!1,o=0;o<r.length;o++)if(r[o]===i[e]){n=!0;break}n||t.push(i[e])}for(;t.length;)i.removeTrack(t.shift())};Object.keys(o).forEach(function(e){var n=o[e];r.addEventListener(e,n),t.on("dispose",function(t){return r.removeEventListener(e,n)})}),t.on("loadstart",s),t.on("dispose",function(e){return t.off("loadstart",s)})}})},e.prototype.createEl=function(){var t=this.options_.tag;if(!t||!this.options_.playerElIngest&&!this.movingMediaElementInDOM){if(t){var n=t.cloneNode(!0);t.parentNode&&t.parentNode.insertBefore(n,t),e.disposeMediaElement(t),t=n}else{t=ce.createElement("video");var i=this.options_.tag&&C(this.options_.tag),o=Q({},i);Pe&&!0===this.options_.nativeControlsForTouch||delete o.controls,T(t,r(o,{id:this.options_.techId,class:"vjs-tech"}))}t.playerId=this.options_.playerId}for(var s=["autoplay","preload","loop","muted","playsinline"],a=s.length-1;a>=0;a--){var l=s[a],c={};void 0!==this.options_[l]&&(c[l]=this.options_[l]),T(t,c)}return t},e.prototype.handleLateInit_=function(t){if(0!==t.networkState&&3!==t.networkState){if(0===t.readyState){var e=!1,n=function(){e=!0};this.on("loadstart",n);var r=function(){e||this.trigger("loadstart")};return this.on("loadedmetadata",r),void this.ready(function(){this.off("loadstart",n),this.off("loadedmetadata",r),e||this.trigger("loadstart")})}var i=["loadstart"];i.push("loadedmetadata"),t.readyState>=2&&i.push("loadeddata"),t.readyState>=3&&i.push("canplay"),t.readyState>=4&&i.push("canplaythrough"),this.ready(function(){i.forEach(function(t){this.trigger(t)},this)})}},e.prototype.setCurrentTime=function(t){try{this.el_.currentTime=t}catch(t){Ue(t,"Video is not ready. (Video.js)")}},e.prototype.duration=function(){var t=this;if(this.el_.duration===1/0&&me&&we&&0===this.el_.currentTime){var e=function e(){t.el_.currentTime>0&&(t.el_.duration===1/0&&t.trigger("durationchange"),t.off("timeupdate",e))};return this.on("timeupdate",e),NaN}return this.el_.duration||NaN},e.prototype.width=function(){return this.el_.offsetWidth},e.prototype.height=function(){return this.el_.offsetHeight},e.prototype.proxyWebkitFullscreen_=function(){var t=this;if("webkitDisplayingFullscreen"in this.el_){var e=function(){this.trigger("fullscreenchange",{isFullscreen:!1})},n=function(){this.one("webkitendfullscreen",e),this.trigger("fullscreenchange",{isFullscreen:!0})};this.on("webkitbeginfullscreen",n),this.on("dispose",function(){t.off("webkitbeginfullscreen",n),t.off("webkitendfullscreen",e)})}},e.prototype.supportsFullScreen=function(){if("function"==typeof this.el_.webkitEnterFullScreen){var t=ie.navigator&&ie.navigator.userAgent||"";if(/Android/.test(t)||!/Chrome|Mac OS X 10.5/.test(t))return!0}return!1},e.prototype.enterFullScreen=function(){var t=this.el_;t.paused&&t.networkState<=t.HAVE_METADATA?(this.el_.play(),this.setTimeout(function(){t.pause(),t.webkitEnterFullScreen()},0)):t.webkitEnterFullScreen()},e.prototype.exitFullScreen=function(){this.el_.webkitExitFullScreen()},e.prototype.src=function(t){if(void 0===t)return this.el_.src;this.setSrc(t)},e.prototype.reset=function(){e.resetMediaElement(this.el_)},e.prototype.currentSrc=function(){return this.currentSource_?this.currentSource_.src:this.el_.currentSrc},e.prototype.setControls=function(t){this.el_.controls=!!t},e.prototype.addTextTrack=function(e,n,r){return this.featuresNativeTextTracks?this.el_.addTextTrack(e,n,r):t.prototype.addTextTrack.call(this,e,n,r)},e.prototype.createRemoteTextTrack=function(e){if(!this.featuresNativeTextTracks)return t.prototype.createRemoteTextTrack.call(this,e);var n=ce.createElement("track");return e.kind&&(n.kind=e.kind),e.label&&(n.label=e.label),(e.language||e.srclang)&&(n.srclang=e.language||e.srclang),e.default&&(n.default=e.default),e.id&&(n.id=e.id),e.src&&(n.src=e.src),n},e.prototype.addRemoteTextTrack=function(e,n){var r=t.prototype.addRemoteTextTrack.call(this,e,n);return this.featuresNativeTextTracks&&this.el().appendChild(r),r},e.prototype.removeRemoteTextTrack=function(e){if(t.prototype.removeRemoteTextTrack.call(this,e),this.featuresNativeTextTracks)for(var n=this.$$("track"),r=n.length;r--;)e!==n[r]&&e!==n[r].track||this.el().removeChild(n[r])},e.prototype.playsinline=function(){return this.el_.hasAttribute("playsinline")},e.prototype.setPlaysinline=function(t){t?this.el_.setAttribute("playsinline","playsinline"):this.el_.removeAttribute("playsinline")},e.prototype.getVideoPlaybackQuality=function(){if("function"==typeof this.el().getVideoPlaybackQuality)return this.el().getVideoPlaybackQuality();var t={};return void 0!==this.el().webkitDroppedFrameCount&&void 0!==this.el().webkitDecodedFrameCount&&(t.droppedVideoFrames=this.el().webkitDroppedFrameCount,t.totalVideoFrames=this.el().webkitDecodedFrameCount),ie.performance&&"function"==typeof ie.performance.now?t.creationTime=ie.performance.now():ie.performance&&ie.performance.timing&&"number"==typeof ie.performance.timing.navigationStart&&(t.creationTime=ie.Date.now()-ie.performance.timing.navigationStart),t},e}(Ir);if(h()){Ji.TEST_VID=ce.createElement("video");var Qi=ce.createElement("track");Qi.kind="captions",Qi.srclang="en",Qi.label="English",Ji.TEST_VID.appendChild(Qi)}Ji.isSupported=function(){try{Ji.TEST_VID.volume=.5}catch(t){return!1}return!(!Ji.TEST_VID||!Ji.TEST_VID.canPlayType)},Ji.canPlayType=function(t){return Ji.TEST_VID.canPlayType(t)},Ji.canPlaySource=function(t,e){return Ji.canPlayType(t.type)},Ji.canControlVolume=function(){try{var t=Ji.TEST_VID.volume;return Ji.TEST_VID.volume=t/2+.1,t!==Ji.TEST_VID.volume}catch(t){return!1}},Ji.canControlPlaybackRate=function(){if(me&&we&&Ee<58)return!1;try{var t=Ji.TEST_VID.playbackRate;return Ji.TEST_VID.playbackRate=t/2+.1,t!==Ji.TEST_VID.playbackRate}catch(t){return!1}},Ji.supportsNativeTextTracks=function(){return Ae},Ji.supportsNativeVideoTracks=function(){return!(!Ji.TEST_VID||!Ji.TEST_VID.videoTracks)},Ji.supportsNativeAudioTracks=function(){return!(!Ji.TEST_VID||!Ji.TEST_VID.audioTracks)},Ji.Events=["loadstart","suspend","abort","error","emptied","stalled","loadedmetadata","loadeddata","canplay","canplaythrough","playing","waiting","seeking","seeked","ended","durationchange","timeupdate","progress","play","pause","ratechange","resize","volumechange"],Ji.prototype.featuresVolumeControl=Ji.canControlVolume(),Ji.prototype.featuresPlaybackRate=Ji.canControlPlaybackRate(),Ji.prototype.movingMediaElementInDOM=!ye,Ji.prototype.featuresFullscreenResize=!0,Ji.prototype.featuresProgressEvents=!0,Ji.prototype.featuresTimeupdateEvents=!0,Ji.prototype.featuresNativeTextTracks=Ji.supportsNativeTextTracks(),Ji.prototype.featuresNativeVideoTracks=Ji.supportsNativeVideoTracks(),Ji.prototype.featuresNativeAudioTracks=Ji.supportsNativeAudioTracks();var Zi=Ji.TEST_VID&&Ji.TEST_VID.constructor.prototype.canPlayType,to=/^application\/(?:x-|vnd\.apple\.)mpegurl/i,eo=/^video\/mp4/i;Ji.patchCanPlayType=function(){_e>=4&&!Ce?Ji.TEST_VID.constructor.prototype.canPlayType=function(t){return t&&to.test(t)?"maybe":Zi.call(this,t)}:be&&(Ji.TEST_VID.constructor.prototype.canPlayType=function(t){return t&&eo.test(t)?"maybe":Zi.call(this,t)})},Ji.unpatchCanPlayType=function(){var t=Ji.TEST_VID.constructor.prototype.canPlayType;return Ji.TEST_VID.constructor.prototype.canPlayType=Zi,t},Ji.patchCanPlayType(),Ji.disposeMediaElement=function(t){if(t){for(t.parentNode&&t.parentNode.removeChild(t);t.hasChildNodes();)t.removeChild(t.firstChild);t.removeAttribute("src"),"function"==typeof t.load&&function(){try{t.load()}catch(t){}}()}},Ji.resetMediaElement=function(t){if(t){for(var e=t.querySelectorAll("source"),n=e.length;n--;)t.removeChild(e[n]);t.removeAttribute("src"),"function"==typeof t.load&&function(){try{t.load()}catch(t){}}()}},["paused","currentTime","buffered","volume","muted","defaultMuted","poster","preload","autoplay","controls","loop","error","seeking","seekable","ended","defaultMuted","playbackRate","defaultPlaybackRate","played","networkState","readyState","videoWidth","videoHeight"].forEach(function(t){Ji.prototype[t]=function(){return this.el_[t]}}),["volume","muted","defaultMuted","src","poster","preload","autoplay","loop","playbackRate","defaultPlaybackRate"].forEach(function(t){Ji.prototype["set"+$(t)]=function(e){this.el_[t]=e}}),["pause","load","play"].forEach(function(t){Ji.prototype[t]=function(){return this.el_[t]()}}),Ir.withSourceHandlers(Ji),Ji.nativeSourceHandler={},Ji.nativeSourceHandler.canPlayType=function(t){try{return Ji.TEST_VID.canPlayType(t)}catch(t){return""}},Ji.nativeSourceHandler.canHandleSource=function(t,e){if(t.type)return Ji.nativeSourceHandler.canPlayType(t.type);if(t.src){var n=Yn(t.src);return Ji.nativeSourceHandler.canPlayType("video/"+n)}return""},Ji.nativeSourceHandler.handleSource=function(t,e,n){e.setSrc(t.src)},Ji.nativeSourceHandler.dispose=function(){},Ji.registerSourceHandler(Ji.nativeSourceHandler),Ir.registerTech("Html5",Ji);var no=Le(["\n        Using the tech directly can be dangerous. I hope you know what you're doing.\n        See https://github.com/videojs/video.js/issues/2617 for more info.\n      "],["\n        Using the tech directly can be dangerous. I hope you know what you're doing.\n        See https://github.com/videojs/video.js/issues/2617 for more info.\n      "]),ro=["progress","abort","suspend","emptied","stalled","loadedmetadata","loadeddata","timeupdate","ratechange","resize","volumechange","texttrackchange"],io=function(t){function e(n,i,o){if(Ie(this,e),n.id=n.id||"vjs_video_"+R(),i=r(e.getTagSettings(n),i),i.initChildren=!1,i.createEl=!1,i.reportTouchActivity=!1,!i.language)if("function"==typeof n.closest){var s=n.closest("[lang]");s&&(i.language=s.getAttribute("lang"))}else for(var a=n;a&&1===a.nodeType;){if(C(a).hasOwnProperty("lang")){i.language=a.getAttribute("lang");break}a=a.parentNode}var l=Re(this,t.call(this,null,i,o));if(l.isReady_=!1,!l.options_||!l.options_.techOrder||!l.options_.techOrder.length)throw new Error("No techOrder specified. Did you overwrite videojs.options instead of just changing the properties you want to override?");if(l.tag=n,l.tagAttributes=n&&C(n),l.language(l.options_.language),i.languages){var c={};Object.getOwnPropertyNames(i.languages).forEach(function(t){c[t.toLowerCase()]=i.languages[t]}),l.languages_=c}else l.languages_=e.prototype.options_.languages;l.cache_={},l.poster_=i.poster||"",l.controls_=!!i.controls,l.cache_.lastVolume=1,n.controls=!1,l.scrubbing_=!1,l.el_=l.createEl(),G(l,{eventBusKey:"el_"});var u=Q(l.options_);if(i.plugins){var h=i.plugins;Object.keys(h).forEach(function(t){if("function"!=typeof this[t])throw new Error('plugin "'+t+'" does not exist');this[t](h[t])},l)}l.options_.playerOptions=u,l.middleware_=[],l.initChildren(),l.isAudio("audio"===n.nodeName.toLowerCase()),l.controls()?l.addClass("vjs-controls-enabled"):l.addClass("vjs-controls-disabled"),l.el_.setAttribute("role","region"),l.isAudio()?l.el_.setAttribute("aria-label",l.localize("Audio Player")):l.el_.setAttribute("aria-label",l.localize("Video Player")),l.isAudio()&&l.addClass("vjs-audio"),l.flexNotSupported_()&&l.addClass("vjs-no-flex"),ye||l.addClass("vjs-workinghover"),e.players[l.id_]=l;var p=ee.split(".")[0];return l.addClass("vjs-v"+p),l.userActive(!0),l.reportUserActivity(),l.listenForUserActivity_(),l.on("fullscreenchange",l.handleFullscreenChange_),l.on("stageclick",l.handleStageClick_),l.changingSrc_=!1,l}return De(e,t),e.prototype.dispose=function(){this.trigger("dispose"),this.off("dispose"),this.styleEl_&&this.styleEl_.parentNode&&this.styleEl_.parentNode.removeChild(this.styleEl_),e.players[this.id_]=null,this.tag&&this.tag.player&&(this.tag.player=null),this.el_&&this.el_.player&&(this.el_.player=null),this.tech_&&this.tech_.dispose(),t.prototype.dispose.call(this)},e.prototype.createEl=function(){var e=this.tag,n=void 0,r=this.playerElIngest_=e.parentNode&&e.parentNode.hasAttribute&&e.parentNode.hasAttribute("data-vjs-player");n=this.el_=r?e.parentNode:t.prototype.createEl.call(this,"div"),e.setAttribute("tabindex","-1"),e.removeAttribute("width"),e.removeAttribute("height");var i=C(e);if(Object.getOwnPropertyNames(i).forEach(function(t){"class"===t?n.className+=" "+i[t]:n.setAttribute(t,i[t])}),e.playerId=e.id,e.id+="_html5_api",e.className="vjs-tech",e.player=n.player=this,this.addClass("vjs-paused"),!0!==ie.VIDEOJS_NO_DYNAMIC_STYLE){this.styleEl_=rn("vjs-styles-dimensions");var o=Ke(".vjs-styles-defaults"),s=Ke("head");s.insertBefore(this.styleEl_,o?o.nextSibling:s.firstChild)}this.width(this.options_.width),this.height(this.options_.height),this.fluid(this.options_.fluid),this.aspectRatio(this.options_.aspectRatio);for(var a=e.getElementsByTagName("a"),l=0;l<a.length;l++){var c=a.item(l);m(c,"vjs-hidden"),c.setAttribute("hidden","hidden")}return e.initNetworkState_=e.networkState,e.parentNode&&!r&&e.parentNode.insertBefore(n,e),y(e,n),this.children_.unshift(e),this.el_.setAttribute("lang",this.language_),this.el_=n,n},e.prototype.width=function(t){return this.dimension("width",t)},e.prototype.height=function(t){return this.dimension("height",t)},e.prototype.dimension=function(t,e){var n=t+"_";if(void 0===e)return this[n]||0;if(""===e)this[n]=void 0;else{var r=parseFloat(e);if(isNaN(r))return void Ue.error('Improper value "'+e+'" supplied for for '+t);this[n]=r}this.updateStyleEl_()},e.prototype.fluid=function(t){if(void 0===t)return!!this.fluid_;this.fluid_=!!t,t?this.addClass("vjs-fluid"):this.removeClass("vjs-fluid"),this.updateStyleEl_()},e.prototype.aspectRatio=function(t){if(void 0===t)return this.aspectRatio_;if(!/^\d+\:\d+$/.test(t))throw new Error("Improper value supplied for aspect ratio. The format should be width:height, for example 16:9.");this.aspectRatio_=t,this.fluid(!0),this.updateStyleEl_()},e.prototype.updateStyleEl_=function(){if(!0===ie.VIDEOJS_NO_DYNAMIC_STYLE){var t="number"==typeof this.width_?this.width_:this.options_.width,e="number"==typeof this.height_?this.height_:this.options_.height,n=this.tech_&&this.tech_.el();return void(n&&(t>=0&&(n.width=t),e>=0&&(n.height=e)))}var r=void 0,i=void 0,o=void 0,s=void 0;o=void 0!==this.aspectRatio_&&"auto"!==this.aspectRatio_?this.aspectRatio_:this.videoWidth()>0?this.videoWidth()+":"+this.videoHeight():"16:9";var a=o.split(":"),l=a[1]/a[0];r=void 0!==this.width_?this.width_:void 0!==this.height_?this.height_/l:this.videoWidth()||300,i=void 0!==this.height_?this.height_:r*l,s=/^[^a-zA-Z]/.test(this.id())?"dimensions-"+this.id():this.id()+"-dimensions",this.addClass(s),on(this.styleEl_,"\n      ."+s+" {\n        width: "+r+"px;\n        height: "+i+"px;\n      }\n\n      ."+s+".vjs-fluid {\n        padding-top: "+100*l+"%;\n      }\n    ")},e.prototype.loadTech_=function(t,e){var n=this;this.tech_&&this.unloadTech_();var i=$(t),o=t.charAt(0).toLowerCase()+t.slice(1);"Html5"!==i&&this.tag&&(Ir.getTech("Html5").disposeMediaElement(this.tag),this.tag.player=null,this.tag=null),this.techName_=i,this.isReady_=!1;var s={source:e,nativeControlsForTouch:this.options_.nativeControlsForTouch,playerId:this.id(),techId:this.id()+"_"+i+"_api",autoplay:this.options_.autoplay,playsinline:this.options_.playsinline,preload:this.options_.preload,loop:this.options_.loop,muted:this.options_.muted,poster:this.poster(),language:this.language(),playerElIngest:this.playerElIngest_||!1,"vtt.js":this.options_["vtt.js"]};_r.names.forEach(function(t){var e=_r[t];s[e.getterName]=n[e.privateName]}),r(s,this.options_[i]),r(s,this.options_[o]),r(s,this.options_[t.toLowerCase()]),this.tag&&(s.tag=this.tag),e&&e.src===this.cache_.src&&this.cache_.currentTime>0&&(s.startTime=this.cache_.currentTime);var a=Ir.getTech(t);if(!a)throw new Error("No Tech named '"+i+"' exists! '"+i+"' should be registered using videojs.registerTech()'");this.tech_=new a(s),this.tech_.ready(sn(this,this.handleTechReady_),!0),Pn.jsonToTextTracks(this.textTracksJson_||[],this.tech_),ro.forEach(function(t){n.on(n.tech_,t,n["handleTech"+$(t)+"_"])}),this.on(this.tech_,"loadstart",this.handleTechLoadStart_),this.on(this.tech_,"waiting",this.handleTechWaiting_),this.on(this.tech_,"canplay",this.handleTechCanPlay_),this.on(this.tech_,"canplaythrough",this.handleTechCanPlayThrough_),this.on(this.tech_,"playing",this.handleTechPlaying_),this.on(this.tech_,"ended",this.handleTechEnded_),this.on(this.tech_,"seeking",this.handleTechSeeking_),this.on(this.tech_,"seeked",this.handleTechSeeked_),this.on(this.tech_,"play",this.handleTechPlay_),this.on(this.tech_,"firstplay",this.handleTechFirstPlay_),this.on(this.tech_,"pause",this.handleTechPause_),this.on(this.tech_,"durationchange",this.handleTechDurationChange_),this.on(this.tech_,"fullscreenchange",this.handleTechFullscreenChange_),this.on(this.tech_,"error",this.handleTechError_),this.on(this.tech_,"loadedmetadata",this.updateStyleEl_),this.on(this.tech_,"posterchange",this.handleTechPosterChange_),this.on(this.tech_,"textdata",this.handleTechTextData_),this.usingNativeControls(this.techGet_("controls")),this.controls()&&!this.usingNativeControls()&&this.addTechControlsListeners_(),this.tech_.el().parentNode===this.el()||"Html5"===i&&this.tag||y(this.tech_.el(),this.el()),this.tag&&(this.tag.player=null,this.tag=null)},e.prototype.unloadTech_=function(){var t=this;_r.names.forEach(function(e){var n=_r[e];t[n.privateName]=t[n.getterName]()}),this.textTracksJson_=Pn.textTracksToJson(this.tech_),this.isReady_=!1,this.tech_.dispose(),this.tech_=!1},e.prototype.tech=function(t){return void 0===t&&Ue.warn(Xe(no)),this.tech_},e.prototype.addTechControlsListeners_=function(){this.removeTechControlsListeners_(),this.on(this.tech_,"mousedown",this.handleTechClick_),this.on(this.tech_,"touchstart",this.handleTechTouchStart_),this.on(this.tech_,"touchmove",this.handleTechTouchMove_),this.on(this.tech_,"touchend",this.handleTechTouchEnd_),this.on(this.tech_,"tap",this.handleTechTap_)},e.prototype.removeTechControlsListeners_=function(){this.off(this.tech_,"tap",this.handleTechTap_),this.off(this.tech_,"touchstart",this.handleTechTouchStart_),this.off(this.tech_,"touchmove",this.handleTechTouchMove_),this.off(this.tech_,"touchend",this.handleTechTouchEnd_),this.off(this.tech_,"mousedown",this.handleTechClick_)},e.prototype.handleTechReady_=function(){if(this.triggerReady(),this.cache_.volume&&this.techCall_("setVolume",this.cache_.volume),
this.handleTechPosterChange_(),this.handleTechDurationChange_(),(this.src()||this.currentSrc())&&this.tag&&this.options_.autoplay&&this.paused()){try{delete this.tag.poster}catch(t){Ue("deleting tag.poster throws in some browsers",t)}this.play()}},e.prototype.handleTechLoadStart_=function(){this.removeClass("vjs-ended"),this.removeClass("vjs-seeking"),this.error(null),this.paused()?(this.hasStarted(!1),this.trigger("loadstart")):(this.trigger("loadstart"),this.trigger("firstplay"))},e.prototype.hasStarted=function(t){return void 0!==t?void(this.hasStarted_!==t&&(this.hasStarted_=t,t?(this.addClass("vjs-has-started"),this.trigger("firstplay")):this.removeClass("vjs-has-started"))):!!this.hasStarted_},e.prototype.handleTechPlay_=function(){this.removeClass("vjs-ended"),this.removeClass("vjs-paused"),this.addClass("vjs-playing"),this.hasStarted(!0),this.trigger("play")},e.prototype.handleTechWaiting_=function(){var t=this;this.addClass("vjs-waiting"),this.trigger("waiting"),this.one("timeupdate",function(){return t.removeClass("vjs-waiting")})},e.prototype.handleTechCanPlay_=function(){this.removeClass("vjs-waiting"),this.trigger("canplay")},e.prototype.handleTechCanPlayThrough_=function(){this.removeClass("vjs-waiting"),this.trigger("canplaythrough")},e.prototype.handleTechPlaying_=function(){this.removeClass("vjs-waiting"),this.trigger("playing")},e.prototype.handleTechSeeking_=function(){this.addClass("vjs-seeking"),this.trigger("seeking")},e.prototype.handleTechSeeked_=function(){this.removeClass("vjs-seeking"),this.trigger("seeked")},e.prototype.handleTechFirstPlay_=function(){this.options_.starttime&&(Ue.warn("Passing the `starttime` option to the player will be deprecated in 6.0"),this.currentTime(this.options_.starttime)),this.addClass("vjs-has-started"),this.trigger("firstplay")},e.prototype.handleTechPause_=function(){this.removeClass("vjs-playing"),this.addClass("vjs-paused"),this.trigger("pause")},e.prototype.handleTechEnded_=function(){this.addClass("vjs-ended"),this.options_.loop?(this.currentTime(0),this.play()):this.paused()||this.pause(),this.trigger("ended")},e.prototype.handleTechDurationChange_=function(){this.duration(this.techGet_("duration"))},e.prototype.handleTechClick_=function(t){0===t.button&&this.controls()&&(this.paused()?this.play():this.pause())},e.prototype.handleTechTap_=function(){this.userActive(!this.userActive())},e.prototype.handleTechTouchStart_=function(){this.userWasActive=this.userActive()},e.prototype.handleTechTouchMove_=function(){this.userWasActive&&this.reportUserActivity()},e.prototype.handleTechTouchEnd_=function(t){t.preventDefault()},e.prototype.handleFullscreenChange_=function(){this.isFullscreen()?this.addClass("vjs-fullscreen"):this.removeClass("vjs-fullscreen")},e.prototype.handleStageClick_=function(){this.reportUserActivity()},e.prototype.handleTechFullscreenChange_=function(t,e){e&&this.isFullscreen(e.isFullscreen),this.trigger("fullscreenchange")},e.prototype.handleTechError_=function(){var t=this.tech_.error();this.error(t)},e.prototype.handleTechTextData_=function(){var t=null;arguments.length>1&&(t=arguments[1]),this.trigger("textdata",t)},e.prototype.getCache=function(){return this.cache_},e.prototype.techCall_=function(t,e){this.ready(function(){if(t in Lr)return Ut(this.middleware_,this.tech_,t,e);try{this.tech_&&this.tech_[t](e)}catch(t){throw Ue(t),t}},!0)},e.prototype.techGet_=function(t){if(this.tech_&&this.tech_.isReady_){if(t in Rr)return Wt(this.middleware_,this.tech_,t);try{return this.tech_[t]()}catch(e){throw void 0===this.tech_[t]?Ue("Video.js: "+t+" method not defined for "+this.techName_+" playback technology.",e):"TypeError"===e.name?(Ue("Video.js: "+t+" unavailable on "+this.techName_+" playback technology element.",e),this.tech_.isReady_=!1):Ue(e),e}}},e.prototype.play=function(){if(this.changingSrc_)this.ready(function(){var t=this.techGet_("play");void 0!==t&&"function"==typeof t.then&&t.then(null,function(t){})});else{if(this.isReady_&&(this.src()||this.currentSrc()))return this.techGet_("play");this.ready(function(){this.tech_.one("loadstart",function(){var t=this.play();void 0!==t&&"function"==typeof t.then&&t.then(null,function(t){})})})}},e.prototype.pause=function(){this.techCall_("pause")},e.prototype.paused=function(){return!1!==this.techGet_("paused")},e.prototype.played=function(){return this.techGet_("played")||nt(0,0)},e.prototype.scrubbing=function(t){if(void 0===t)return this.scrubbing_;this.scrubbing_=!!t,t?this.addClass("vjs-scrubbing"):this.removeClass("vjs-scrubbing")},e.prototype.currentTime=function(t){return void 0!==t?void this.techCall_("setCurrentTime",t):(this.cache_.currentTime=this.techGet_("currentTime")||0,this.cache_.currentTime)},e.prototype.duration=function(t){if(void 0===t)return this.cache_.duration||0;t=parseFloat(t)||0,t<0&&(t=1/0),t!==this.cache_.duration&&(this.cache_.duration=t,t===1/0?this.addClass("vjs-live"):this.removeClass("vjs-live"),this.trigger("durationchange"))},e.prototype.remainingTime=function(){return this.duration()-this.currentTime()},e.prototype.buffered=function(){var t=this.techGet_("buffered");return t&&t.length||(t=nt(0,0)),t},e.prototype.bufferedPercent=function(){return rt(this.buffered(),this.duration())},e.prototype.bufferedEnd=function(){var t=this.buffered(),e=this.duration(),n=t.end(t.length-1);return n>e&&(n=e),n},e.prototype.volume=function(t){var e=void 0;return void 0!==t?(e=Math.max(0,Math.min(1,parseFloat(t))),this.cache_.volume=e,this.techCall_("setVolume",e),void(e>0&&this.lastVolume_(e))):(e=parseFloat(this.techGet_("volume")),isNaN(e)?1:e)},e.prototype.muted=function(t){return void 0!==t?void this.techCall_("setMuted",t):this.techGet_("muted")||!1},e.prototype.defaultMuted=function(t){return void 0!==t?this.techCall_("setDefaultMuted",t):this.techGet_("defaultMuted")||!1},e.prototype.lastVolume_=function(t){return void 0!==t&&0!==t?void(this.cache_.lastVolume=t):this.cache_.lastVolume},e.prototype.supportsFullScreen=function(){return this.techGet_("supportsFullScreen")||!1},e.prototype.isFullscreen=function(t){return void 0!==t?void(this.isFullscreen_=!!t):!!this.isFullscreen_},e.prototype.requestFullscreen=function(){var t=_n;this.isFullscreen(!0),t.requestFullscreen?(W(ce,t.fullscreenchange,sn(this,function e(n){this.isFullscreen(ce[t.fullscreenElement]),!1===this.isFullscreen()&&U(ce,t.fullscreenchange,e),this.trigger("fullscreenchange")})),this.el_[t.requestFullscreen]()):this.tech_.supportsFullScreen()?this.techCall_("enterFullScreen"):(this.enterFullWindow(),this.trigger("fullscreenchange"))},e.prototype.exitFullscreen=function(){var t=_n;this.isFullscreen(!1),t.requestFullscreen?ce[t.exitFullscreen]():this.tech_.supportsFullScreen()?this.techCall_("exitFullScreen"):(this.exitFullWindow(),this.trigger("fullscreenchange"))},e.prototype.enterFullWindow=function(){this.isFullWindow=!0,this.docOrigOverflow=ce.documentElement.style.overflow,W(ce,"keydown",sn(this,this.fullWindowOnEscKey)),ce.documentElement.style.overflow="hidden",m(ce.body,"vjs-full-window"),this.trigger("enterFullWindow")},e.prototype.fullWindowOnEscKey=function(t){27===t.keyCode&&(!0===this.isFullscreen()?this.exitFullscreen():this.exitFullWindow())},e.prototype.exitFullWindow=function(){this.isFullWindow=!1,U(ce,"keydown",this.fullWindowOnEscKey),ce.documentElement.style.overflow=this.docOrigOverflow,_(ce.body,"vjs-full-window"),this.trigger("exitFullWindow")},e.prototype.canPlayType=function(t){for(var e=void 0,n=0,r=this.options_.techOrder;n<r.length;n++){var i=r[n],o=Ir.getTech(i);if(o||(o=mn.getComponent(i)),o){if(o.isSupported()&&(e=o.canPlayType(t)))return e}else Ue.error('The "'+i+'" tech is undefined. Skipped browser support check for that tech.')}return""},e.prototype.selectSource=function(t){var e=this,n=this.options_.techOrder.map(function(t){return[t,Ir.getTech(t)]}).filter(function(t){var e=t[0],n=t[1];return n?n.isSupported():(Ue.error('The "'+e+'" tech is undefined. Skipped browser support check for that tech.'),!1)}),r=function(t,e,n){var r=void 0;return t.some(function(t){return e.some(function(e){if(r=n(t,e))return!0})}),r},i=function(t,n){var r=t[0];if(t[1].canPlaySource(n,e.options_[r.toLowerCase()]))return{source:n,tech:r}};return(this.options_.sourceOrder?r(t,n,function(t){return function(e,n){return t(n,e)}}(i)):r(n,t,i))||!1},e.prototype.src=function(t){var e=this;if(void 0===t)return this.cache_.src;var n=Br(t);if(!n.length)return void this.setTimeout(function(){this.error({code:4,message:this.localize(this.options_.notSupportedMessage)})},0);this.cache_.sources=n,this.changingSrc_=!0,this.cache_.source=n[0],Vt(this,n[0],function(t,r){if(e.middleware_=r,e.src_(t))return n.length>1?e.src(n.slice(1)):(e.setTimeout(function(){this.error({code:4,message:this.localize(this.options_.notSupportedMessage)})},0),void e.triggerReady());e.changingSrc_=!1,e.cache_.src=t.src,zt(r,e.tech_)})},e.prototype.src_=function(t){var e=this.selectSource([t]);return!e||(J(e.tech,this.techName_)?(this.ready(function(){this.tech_.constructor.prototype.hasOwnProperty("setSource")?this.techCall_("setSource",t):this.techCall_("src",t.src),"auto"===this.options_.preload&&this.load(),this.options_.autoplay&&this.play()},!0),!1):(this.changingSrc_=!0,this.loadTech_(e.tech,e.source),!1))},e.prototype.load=function(){this.techCall_("load")},e.prototype.reset=function(){this.loadTech_(this.options_.techOrder[0],null),this.techCall_("reset")},e.prototype.currentSources=function(){var t=this.currentSource(),e=[];return 0!==Object.keys(t).length&&e.push(t),this.cache_.sources||e},e.prototype.currentSource=function(){return this.cache_.source||{}},e.prototype.currentSrc=function(){return this.currentSource()&&this.currentSource().src||""},e.prototype.currentType=function(){return this.currentSource()&&this.currentSource().type||""},e.prototype.preload=function(t){return void 0!==t?(this.techCall_("setPreload",t),void(this.options_.preload=t)):this.techGet_("preload")},e.prototype.autoplay=function(t){return void 0!==t?(this.techCall_("setAutoplay",t),void(this.options_.autoplay=t)):this.techGet_("autoplay",t)},e.prototype.playsinline=function(t){return void 0!==t?(this.techCall_("setPlaysinline",t),this.options_.playsinline=t,this):this.techGet_("playsinline")},e.prototype.loop=function(t){return void 0!==t?(this.techCall_("setLoop",t),void(this.options_.loop=t)):this.techGet_("loop")},e.prototype.poster=function(t){if(void 0===t)return this.poster_;t||(t=""),this.poster_=t,this.techCall_("setPoster",t),this.trigger("posterchange")},e.prototype.handleTechPosterChange_=function(){!this.poster_&&this.tech_&&this.tech_.poster&&(this.poster_=this.tech_.poster()||"",this.trigger("posterchange"))},e.prototype.controls=function(t){return void 0!==t?(t=!!t,void(this.controls_!==t&&(this.controls_=t,this.usingNativeControls()&&this.techCall_("setControls",t),t?(this.removeClass("vjs-controls-disabled"),this.addClass("vjs-controls-enabled"),this.trigger("controlsenabled"),this.usingNativeControls()||this.addTechControlsListeners_()):(this.removeClass("vjs-controls-enabled"),this.addClass("vjs-controls-disabled"),this.trigger("controlsdisabled"),this.usingNativeControls()||this.removeTechControlsListeners_())))):!!this.controls_},e.prototype.usingNativeControls=function(t){return void 0!==t?(t=!!t,void(this.usingNativeControls_!==t&&(this.usingNativeControls_=t,t?(this.addClass("vjs-using-native-controls"),this.trigger("usingnativecontrols")):(this.removeClass("vjs-using-native-controls"),this.trigger("usingcustomcontrols"))))):!!this.usingNativeControls_},e.prototype.error=function(t){return void 0===t?this.error_||null:null===t?(this.error_=t,this.removeClass("vjs-error"),void(this.errorDisplay&&this.errorDisplay.close())):(this.error_=new it(t),this.addClass("vjs-error"),Ue.error("(CODE:"+this.error_.code+" "+it.errorTypes[this.error_.code]+")",this.error_.message,this.error_),void this.trigger("error"))},e.prototype.reportUserActivity=function(t){this.userActivity_=!0},e.prototype.userActive=function(t){return void 0!==t?void((t=!!t)!==this.userActive_&&(this.userActive_=t,t?(this.userActivity_=!0,this.removeClass("vjs-user-inactive"),this.addClass("vjs-user-active"),this.trigger("useractive")):(this.userActivity_=!1,this.tech_&&this.tech_.one("mousemove",function(t){t.stopPropagation(),t.preventDefault()}),this.removeClass("vjs-user-active"),this.addClass("vjs-user-inactive"),this.trigger("userinactive")))):this.userActive_},e.prototype.listenForUserActivity_=function(){var t=void 0,e=void 0,n=void 0,r=sn(this,this.reportUserActivity),i=function(t){t.screenX===e&&t.screenY===n||(e=t.screenX,n=t.screenY,r())},o=function(){r(),this.clearInterval(t),t=this.setInterval(r,250)},s=function(e){r(),this.clearInterval(t)};this.on("mousedown",o),this.on("mousemove",i),this.on("mouseup",s),this.on("keydown",r),this.on("keyup",r);var a=void 0;this.setInterval(function(){if(this.userActivity_){this.userActivity_=!1,this.userActive(!0),this.clearTimeout(a);var t=this.options_.inactivityTimeout;t>0&&(a=this.setTimeout(function(){this.userActivity_||this.userActive(!1)},t))}},250)},e.prototype.playbackRate=function(t){return void 0!==t?void this.techCall_("setPlaybackRate",t):this.tech_&&this.tech_.featuresPlaybackRate?this.techGet_("playbackRate"):1},e.prototype.defaultPlaybackRate=function(t){return void 0!==t?this.techCall_("setDefaultPlaybackRate",t):this.tech_&&this.tech_.featuresPlaybackRate?this.techGet_("defaultPlaybackRate"):1},e.prototype.isAudio=function(t){return void 0!==t?void(this.isAudio_=!!t):!!this.isAudio_},e.prototype.addTextTrack=function(t,e,n){if(this.tech_)return this.tech_.addTextTrack(t,e,n)},e.prototype.addRemoteTextTrack=function(t,e){if(this.tech_)return this.tech_.addRemoteTextTrack(t,e)},e.prototype.removeRemoteTextTrack=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=t.track,n=void 0===e?arguments[0]:e;if(this.tech_)return this.tech_.removeRemoteTextTrack(n)},e.prototype.getVideoPlaybackQuality=function(){return this.techGet_("getVideoPlaybackQuality")},e.prototype.videoWidth=function(){return this.tech_&&this.tech_.videoWidth&&this.tech_.videoWidth()||0},e.prototype.videoHeight=function(){return this.tech_&&this.tech_.videoHeight&&this.tech_.videoHeight()||0},e.prototype.language=function(t){if(void 0===t)return this.language_;this.language_=String(t).toLowerCase()},e.prototype.languages=function(){return Q(e.prototype.options_.languages,this.languages_)},e.prototype.toJSON=function(){var t=Q(this.options_),e=t.tracks;t.tracks=[];for(var n=0;n<e.length;n++){var r=e[n];r=Q(r),r.player=void 0,t.tracks[n]=r}return t},e.prototype.createModal=function(t,e){var n=this;e=e||{},e.content=t||"";var r=new On(this,e);return this.addChild(r),r.on("dispose",function(){n.removeChild(r)}),r.open(),r},e.getTagSettings=function(t){var e={sources:[],tracks:[]},n=C(t),i=n["data-setup"];if(g(t,"vjs-fluid")&&(n.fluid=!0),null!==i){var o=Sn(i||"{}"),s=o[0],a=o[1];s&&Ue.error(s),r(n,a)}if(r(e,n),t.hasChildNodes())for(var l=t.childNodes,c=0,u=l.length;c<u;c++){var h=l[c],p=h.nodeName.toLowerCase();"source"===p?e.sources.push(C(h)):"track"===p&&e.tracks.push(C(h))}return e},e.prototype.flexNotSupported_=function(){var t=ce.createElement("i");return!("flexBasis"in t.style||"webkitFlexBasis"in t.style||"mozFlexBasis"in t.style||"msFlexBasis"in t.style||"msFlexOrder"in t.style)},e}(mn);_r.names.forEach(function(t){var e=_r[t];io.prototype[e.getterName]=function(){return this.tech_?this.tech_[e.getterName]():(this[e.privateName]=this[e.privateName]||new e.ListClass,this[e.privateName])}}),io.players={};var oo=ie.navigator;io.prototype.options_={techOrder:Ir.defaultTechOrder_,html5:{},flash:{},inactivityTimeout:2e3,playbackRates:[],children:["mediaLoader","posterImage","textTrackDisplay","loadingSpinner","bigPlayButton","controlBar","errorDisplay","textTrackSettings"],language:oo&&(oo.languages&&oo.languages[0]||oo.userLanguage||oo.language)||"en",languages:{},notSupportedMessage:"No compatible source was found for this media."},["ended","seeking","seekable","networkState","readyState"].forEach(function(t){io.prototype[t]=function(){return this.techGet_(t)}}),ro.forEach(function(t){io.prototype["handleTech"+$(t)+"_"]=function(){return this.trigger(t)}}),mn.registerComponent("Player",io);var so={},ao=function(t){return so.hasOwnProperty(t)},lo=function(t){return ao(t)?so[t]:void 0},co=function(t,e){t.activePlugins_=t.activePlugins_||{},t.activePlugins_[e]=!0},uo=function(t,e,n){var r=(n?"before":"")+"pluginsetup";t.trigger(r,e),t.trigger(r+":"+e.name,e)},ho=function(t,e){var n=function(){uo(this,{name:t,plugin:e,instance:null},!0);var n=e.apply(this,arguments);return co(this,t),uo(this,{name:t,plugin:e,instance:n}),n};return Object.keys(e).forEach(function(t){n[t]=e[t]}),n},po=function(t,e){return e.prototype.name=t,function(){uo(this,{name:t,plugin:e,instance:null},!0);for(var n=arguments.length,r=Array(n),i=0;i<n;i++)r[i]=arguments[i];var o=new(Function.prototype.bind.apply(e,[null].concat([this].concat(r))));return this[t]=function(){return o},uo(this,o.getEventHash()),o}},fo=function(){function t(e){if(Ie(this,t),this.constructor===t)throw new Error("Plugin must be sub-classed; not directly instantiated.");this.player=e,G(this),delete this.trigger,Y(this,this.constructor.defaultState),co(e,this.name),this.dispose=sn(this,this.dispose),e.on("dispose",this.dispose)}return t.prototype.getEventHash=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return t.name=this.name,t.plugin=this.constructor,t.instance=this,t},t.prototype.trigger=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return X(this.eventBusEl_,t,this.getEventHash(e))},t.prototype.handleStateChanged=function(t){},t.prototype.dispose=function(){var t=this.name,e=this.player;this.trigger("dispose"),this.off(),e.off("dispose",this.dispose),e.activePlugins_[t]=!1,this.player=this.state=null,e[t]=po(t,so[t])},t.isBasic=function(e){var n="string"==typeof e?lo(e):e;return"function"==typeof n&&!t.prototype.isPrototypeOf(n.prototype)},t.registerPlugin=function(e,n){if("string"!=typeof e)throw new Error('Illegal plugin name, "'+e+'", must be a string, was '+(void 0===e?"undefined":Me(e))+".");if(ao(e))Ue.warn('A plugin named "'+e+'" already exists. You may want to avoid re-registering plugins!');else if(io.prototype.hasOwnProperty(e))throw new Error('Illegal plugin name, "'+e+'", cannot share a name with an existing player method!');if("function"!=typeof n)throw new Error('Illegal plugin for "'+e+'", must be a function, was '+(void 0===n?"undefined":Me(n))+".");return so[e]=n,"plugin"!==e&&(t.isBasic(n)?io.prototype[e]=ho(e,n):io.prototype[e]=po(e,n)),n},t.deregisterPlugin=function(t){if("plugin"===t)throw new Error("Cannot de-register base plugin.");ao(t)&&(delete so[t],delete io.prototype[t])},t.getPlugins=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Object.keys(so),e=void 0;return t.forEach(function(t){var n=lo(t);n&&(e=e||{},e[t]=n)}),e},t.getPluginVersion=function(t){var e=lo(t);return e&&e.VERSION||""},t}();fo.getPlugin=lo,fo.BASE_PLUGIN_NAME="plugin",fo.registerPlugin("plugin",fo),io.prototype.usingPlugin=function(t){return!!this.activePlugins_&&!0===this.activePlugins_[t]},io.prototype.hasPlugin=function(t){return!!ao(t)};var vo=function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+(void 0===e?"undefined":Me(e)));t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(t.super_=e)},yo=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=function(){t.apply(this,arguments)},r={};"object"===(void 0===e?"undefined":Me(e))?(e.constructor!==Object.prototype.constructor&&(n=e.constructor),r=e):"function"==typeof e&&(n=e),vo(n,t);for(var i in r)r.hasOwnProperty(i)&&(n.prototype[i]=r[i]);return n};if("undefined"==typeof HTMLVideoElement&&h()&&(ce.createElement("video"),ce.createElement("audio"),ce.createElement("track")),Zt.hooks_={},Zt.hooks=function(t,e){return Zt.hooks_[t]=Zt.hooks_[t]||[],e&&(Zt.hooks_[t]=Zt.hooks_[t].concat(e)),Zt.hooks_[t]},Zt.hook=function(t,e){Zt.hooks(t,e)},Zt.removeHook=function(t,e){var n=Zt.hooks(t).indexOf(e);return!(n<=-1)&&(Zt.hooks_[t]=Zt.hooks_[t].slice(),Zt.hooks_[t].splice(n,1),!0)},!0!==ie.VIDEOJS_NO_DYNAMIC_STYLE&&h()){var go=Ke(".vjs-styles-defaults");if(!go){go=rn("vjs-styles-defaults");var mo=Ke("head");mo&&mo.insertBefore(go,mo.firstChild),on(go,"\n      .video-js {\n        width: 300px;\n        height: 150px;\n      }\n\n      .vjs-fluid {\n        padding-top: 56.25%\n      }\n    ")}}return K(1,Zt),Zt.VERSION=ee,Zt.options=io.prototype.options_,Zt.getPlayers=function(){return io.players},Zt.players=io.players,Zt.getComponent=mn.getComponent,Zt.registerComponent=function(t,e){Ir.isTech(e)&&Ue.warn("The "+t+" tech was registered as a component. It should instead be registered using videojs.registerTech(name, tech)"),mn.registerComponent.call(mn,t,e)},Zt.getTech=Ir.getTech,Zt.registerTech=Ir.registerTech,Zt.use=Ht,Zt.browser=Oe,Zt.TOUCH_ENABLED=Pe,Zt.extend=yo,Zt.mergeOptions=Q,Zt.bind=sn,Zt.registerPlugin=fo.registerPlugin,Zt.plugin=function(t,e){return Ue.warn("videojs.plugin() is deprecated; use videojs.registerPlugin() instead"),fo.registerPlugin(t,e)},Zt.getPlugins=fo.getPlugins,Zt.getPlugin=fo.getPlugin,Zt.getPluginVersion=fo.getPluginVersion,Zt.addLanguage=function(t,e){var n;return t=(""+t).toLowerCase(),Zt.options.languages=Q(Zt.options.languages,(n={},n[t]=e,n)),Zt.options.languages[t]},Zt.log=Ue,Zt.createTimeRange=Zt.createTimeRanges=nt,Zt.formatTime=Yt,Zt.parseUrl=Kn,Zt.isCrossOrigin=$n,Zt.EventTarget=ln,Zt.on=W,Zt.one=q,Zt.off=U,Zt.trigger=X,Zt.xhr=lr,Zt.TextTrack=hr,Zt.AudioTrack=pr,Zt.VideoTrack=dr,["isEl","isTextNode","createEl","hasClass","addClass","removeClass","toggleClass","setAttributes","getAttributes","emptyEl","appendContent","insertContent"].forEach(function(t){Zt[t]=function(){return Ue.warn("videojs."+t+"() is deprecated; use videojs.dom."+t+"() instead"),Ye[t].apply(null,arguments)}}),Zt.computedStyle=a,Zt.dom=Ye,Zt.url=Jn,Zt});

/**
 * videojs-playlist
 * @version 4.0.0
 * @copyright 2017 Brightcove, Inc.
 * @license Apache-2.0
 */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t(require("video.js")):"function"==typeof define&&define.amd?define(["video.js"],t):e.videojsPlaylist=t(e.videojs)}(this,function(e){"use strict";e="default"in e?e["default"]:e;var t,n="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},r=t="undefined"!=typeof window?window:void 0!==n?n:"undefined"!=typeof self?self:{},i=function(e){return"number"==typeof e&&!isNaN(e)&&e>=0&&e<Infinity},o=function(e){e.playlist.autoadvance_.timeout&&r.clearTimeout(e.playlist.autoadvance_.timeout),e.playlist.autoadvance_.trigger&&e.off("ended",e.playlist.autoadvance_.trigger),e.playlist.autoadvance_.timeout=null,e.playlist.autoadvance_.trigger=null},u=function(e,t){o(e),i(t)&&(e.playlist.autoadvance_.trigger=function(){e.playlist.autoadvance_.timeout=r.setTimeout(function(){o(e),e.playlist.next()},1e3*t)},e.one("ended",e.playlist.autoadvance_.trigger))},a=function(e){for(var t=e.remoteTextTracks(),n=t&&t.length||0;n--;)e.removeRemoteTextTrack(t[n])},c=function(e,t,n){var r=!e.paused()||e.ended();return e.trigger("beforeplaylistitem",n),e.poster(n.poster||""),e.src(n.sources),a(e),(n.textTracks||[]).forEach(e.addRemoteTextTrack.bind(e)),e.trigger("playlistitem",n),r&&e.play(),u(e,t),e},f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},l=function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])},d=function(e,t){var n=e,r=t;return"object"===(void 0===e?"undefined":f(e))&&(n=e.src),"object"===(void 0===t?"undefined":f(t))&&(r=t.src),/^\/\//.test(n)&&(r=r.slice(r.indexOf("//"))),/^\/\//.test(r)&&(n=n.slice(n.indexOf("//"))),n===r},s=function(e,t){for(var n=0;n<e.length;n++){var r=e[n].sources;if(Array.isArray(r))for(var i=0;i<r.length;i++){var o=r[i];if(o&&d(o,t))return n}}return-1},y=function(t,n){var i=arguments.length>2&&arguments[2]!==undefined?arguments[2]:0,a=Array.isArray(n)?n.slice():[],f=t.playlist=function(e){var n=arguments.length>1&&arguments[1]!==undefined?arguments[1]:0;return Array.isArray(e)&&(a=e.slice(),-1!==n&&f.currentItem(n),f.changeTimeout_=r.setTimeout(function(){t.trigger("playlistchange")},0)),a.slice()};return t.on("loadstart",function(){-1===f.currentItem()&&o(t)}),t.on("dispose",function(){r.clearTimeout(f.changeTimeout_)}),l(f,{currentIndex_:-1,player_:t,autoadvance_:{},repeat_:!1,currentItem:function(e){return"number"==typeof e&&f.currentIndex_!==e&&e>=0&&e<a.length?(f.currentIndex_=e,c(f.player_,f.autoadvance_.delay,a[f.currentIndex_])):f.currentIndex_=f.indexOf(f.player_.currentSrc()||""),f.currentIndex_},contains:function(e){return-1!==f.indexOf(e)},indexOf:function(e){if("string"==typeof e)return s(a,e);for(var t=Array.isArray(e)?e:e.sources,n=0;n<t.length;n++){var r=t[n];if("string"==typeof r)return s(a,r);if(r.src)return s(a,r.src)}return-1},first:function(){if(a.length)return a[f.currentItem(0)];f.currentIndex_=-1},last:function(){if(a.length)return a[f.currentItem(a.length-1)];f.currentIndex_=-1},next:function(){var e=void 0;if(f.repeat_?(e=f.currentIndex_+1)>a.length-1&&(e=0):e=Math.min(f.currentIndex_+1,a.length-1),e!==f.currentIndex_)return a[f.currentItem(e)]},previous:function(){var e=Math.max(f.currentIndex_-1,0);if(e!==f.currentIndex_)return a[f.currentItem(e)]},autoadvance:function(e){f.autoadvance_.delay=e,u(f.player_,e)},repeat:function(t){return t!==undefined&&("boolean"!=typeof t?e.log.error("Invalid value for repeat",t):f.repeat_=t),f.repeat_}}),f.currentItem(i),f},p=function(e,t){y(this,e,t)};return(e.registerPlugin||e.plugin)("playlist",p),p});
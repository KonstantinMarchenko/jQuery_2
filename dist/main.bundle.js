!function(t){var e={};function n(o){if(e[o])return e[o].exports;var a=e[o]={i:o,l:!1,exports:{}};return t[o].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)n.d(o,a,function(e){return t[e]}.bind(null,a));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e){let n,o,a,i,c,r,s,l="f6146b5aea320305af01030c6fc04c59",d=!0,_=!0,p=10,u=8;function f(t,e,n,o){i=n,"asc"===t?s.sort((function(t,n){return t[e]>n[e]?1:t[e]<n[e]?-1:0})):"desc"===t?s.sort((function(t,n){return t[e]<n[e]?1:t[e]>n[e]?-1:0})):"default asc"===t?s.sort((function(t,n){return parseInt(t[e])-parseInt(n[e])})):"default desc"===t&&s.sort((function(t,n){return parseInt(n[e])-parseInt(t[e])}));let a=(n-1)*o,c=n*o;$(".table__row").remove();for(let t=a;t<c;t++)void 0!==s[t]&&$('<tr id="tr_'+t+'" class="table__row"><td id="td_photo_set_title_'+t+'" class="table__cell">'+s[t].title._content+"</td></tr>").appendTo("#table_1")}function b(t){if(a=t%p!=0?Math.trunc(t/p)+1:Math.trunc(t/p),$(".page-next").remove(),a>u){$('<button id="btn_next_0" class="page-next" disabled="true">&laquo;</button>').appendTo("#page_container_1");for(let t=1;t<=u;t++)$('<button id="btn_next_'+t+'" class="page-next">'+t+"</button>").appendTo("#page_container_1");$('<button id="btn_next_'+(u+1)+'" class="page-next">&raquo;</button>').appendTo("#page_container_1")}else if(a<=u)for(let t=1;t<=a;t++)$('<button id="btn_next_'+t+'" class="page-next">'+t+"</button>").appendTo("#page_container_1")}function m(t){c=t,fetch("https://farm{0}.staticflickr.com/{1}/{2}_{3}.jpg".format(o[c].farm,o[c].server,o[c].id,o[c].secret)).then(t=>t).then(t=>{$("#modal_content_1").empty(),$('<div id="btn_close_modal" class="div-close"><span class="div-close__button">&times;</span></div>').appendTo("#modal_content_1"),$('<div id="btn_image_back" class="modal__content-forward">&laquo;</div>').appendTo("#modal_content_1"),$('<div class="image-container-single_original-size"></div>').appendTo("#modal_content_1"),$('<div id="btn_image_forward" class="modal__content-forward">&raquo;</div>').appendTo("#modal_content_1"),$('<img id="img_original" src="'+t.url+'" alt="image of original size" class="image_original" style="width: 60%; height: auto">').appendTo(".image-container-single_original-size"),$('<div class="text__field_image">'+o[c].title+"</div>").appendTo(".image-container-single_original-size"),0===parseInt(c)&&$("#btn_image_back").hide(),parseInt(c)===r-1&&$("#btn_image_forward").hide(),$("#modal_1").show()}).catch(t=>{console.log(t)})}$(window).width()<=375&&(u=5,p=5),String.prototype.format=function(){for(var t=this,e=arguments.length;e--;)t=t.replace(new RegExp("\\{"+e+"\\}","gm"),arguments[e]);return t},$(document).ready((function(){fetch("https://www.flickr.com/services/rest/?method=flickr.photosets.getList&api_key={0}&user_id={1}&format=json&nojsoncallback=1".format(l,"48600090482%40N01")).then(t=>t.json()).then(t=>{n=t.photosets.photoset,$('<div class="search-container"></div>').appendTo("body"),$('<div class="text__field">All photo sets</div>').appendTo(".search-container"),$('<input id="search" type="text" class="search-field" style="margin-bottom: 5px;">').appendTo(".search-container"),$('<button id="btn_sort_default" class="button-back" style="display: inline-block">Sort by default</button>').appendTo(".search-container"),$('<button id="btn_sort_title" class="button-back" style="display: inline-block;  margin-left: 0.5em;">Sort by title</button>').appendTo(".search-container"),$('<table id="table_1" class="table"></table>').appendTo("body"),$('<tr id="tr_header" class="table__row-header"></tr>').appendTo("#table_1"),$('<th id="th_1" class="table__header">'+n[0].username+"'s photo sets</th>").appendTo("#tr_header"),$('<div id="page_container_1" class="page-container"></div>').appendTo("body"),$('<div id="img_container_1" class="image-container image-container_hidden"></div>').appendTo("body"),$.each(n,(function(t){n[t].defaultId=t,n[t].photoSetTitle=n[t].title._content})),s=n,f("","",1,p),b(n.length)}).catch(t=>{console.log(t)})})),$("body").on("click",".page-next",(function(){if("btn_next_0"!==$(this).attr("id")&&$(this).attr("id")!=="btn_next_"+(u+1)&&f("","",$(this).text(),p),"btn_next_0"===$(this).attr("id")){for(let t=1;t<=u;t++)$("#btn_next_"+t).text($("#btn_next_"+t).text()-1);"1"===$("#btn_next_1").text()&&$("#btn_next_0").prop("disabled",!0),$("#btn_next_"+(u+1)).prop("disabled",!1)}else if($(this).attr("id")==="btn_next_"+(u+1)){for(let t=1;t<=u;t++)$("#btn_next_"+t).text(parseInt($("#btn_next_"+t).text())+1);parseInt($("#btn_next_"+u).text())===a&&$("#btn_next_"+(u+1)).prop("disabled",!0),$("#btn_next_0").prop("disabled",!1)}})).on("click",".button-back",(function(){$("#table_1").show(),$(".search-container").show(),$("#page_container_1").show(),$("#img_container_1").removeClass("image-container_visible").addClass("image-container_hidden").empty()})).on("click","#btn_sort_default",(function(){!0===_?(f("default asc","defaultId",i,p),_=!1):(f("default desc","defaultId",i,p),_=!0)})).on("click","#btn_sort_title",(function(){!0===d?(f("asc","photoSetTitle",i,p),d=!1):(f("desc","photoSetTitle",i,p),d=!0)})).on("click",".table__cell",(function(){let t=$(this).closest("tr").attr("id").split("_")[1],e=0;r=s[t].count_photos,$(".table").hide(),$("#page_container_1").hide(),$(".search-container").hide(),$('<div class="text__field" style="text-align: center; margin: auto; margin-bottom: 0.5em; ">Selected photo set</div>').appendTo("#img_container_1"),$('<button id="btn_back" class="button-back">Back</button>').appendTo("#img_container_1"),$('<div class="text__field">'+s[t].title._content+"</div>").appendTo("#img_container_1"),$('<div class="text__field" style="font-size: 1em">'+s[t].description._content+"</div>").appendTo("#img_container_1"),$('<div id="photo_count_'+s[t].count_photos+'" class="text__field">Photos: '+s[t].count_photos+"</div>").appendTo("#img_container_1"),fetch("https://www.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key={0}&photoset_id={1}&user_id={2}&format=json&nojsoncallback=1".format(l,s[t].id,s[t].owner)).then(t=>t.json()).then(t=>{o=t.photoset.photo,$.each(o,(function(t){$('<div id="img_cont_'+t+'" class="image-container-single"></div>').appendTo("#img_container_1"),fetch("https://farm{0}.staticflickr.com/{1}/{2}_{3}_s.jpg".format(o[t].farm,o[t].server,o[t].id,o[t].secret)).then(t=>t).then(n=>{$('<img id="img_small_'+e+'" src="'+n.url+'" alt="image" class="image">').appendTo("#img_cont_"+t),e++,e===o.length&&$("#img_container_1").removeClass("image-container_hidden").addClass("image-container image-container_visible")}).catch(t=>{console.log(t)})}))}).catch(t=>{console.log(t)})})).on("click",".image-container-single",(function(){m($(this).attr("id").split("_")[2])})).on("keyup","#search",(function(){!function(){let t=$.trim($("#search").val()).toUpperCase();if(""!==t){let e,o=[];$.each(n,(function(a){e=n[a].photoSetTitle,e.toUpperCase().indexOf(t)>-1&&o.push(n[a])})),b(o.length),s=o,f("","",1,p)}else b(n.length),s=n,f("","",1,p)}()}));let h=document.getElementById("modal_1");window.onclick=function(t){t.target===h&&($("#modal_content_1").empty(),$("#modal_1").hide())},$("#modal_content_1").on("click","#btn_close_modal",(function(){$("#modal_content_1").empty(),$("#modal_1").hide()})).on("click","#btn_image_back",(function(){m(c-1)})).on("click","#btn_image_forward",(function(){m(parseInt(c)+1)}))}]);
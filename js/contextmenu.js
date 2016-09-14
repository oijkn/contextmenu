function hideContextMenu(event) {
	var contextmenu = document.querySelectorAll('.contextmenu-container');
	var contextmenuActive = document.querySelectorAll('.contextmenu-active');
	for (var i = 0; i < contextmenuActive.length; i++) {
		contextmenuActive[i].classList.remove('contextmenu-active');
	}
	for (var i = 0; i < contextmenu.length; i++) {
		contextmenu[i].remove();
	}
}

function addEvents(element, events, handler) {
	var events = events.split(' ');
	for (var i = 0; i < events.length; i++) {
		if (document.addEventListener) {
			element.addEventListener(events[i], function(event) {
				handler(event);
			}, false);
		}
		else {
			element.attachEvent('on' + events[i], function(event) {
				handler(event);
			});
		}
	}
}

function hideContextMenuChild(level) {
	var els = document.querySelectorAll('.contextmenu-container');
	for (var i = 0; i < els.length; i++) {
		if (els[i].dataset.childlevel > level) {
			els[i].remove();
		}
	}
}

var contextMenuImgUp = new Image();
contextMenuImgUp.src = "img/arrow-contextmenu-up.png";
var contextMenuImgDown = new Image();
contextMenuImgDown.src = "img/arrow-contextmenu-down.png";

function showContextMenu(content, e, args) {
	currentContainer = document.querySelectorAll('.contextmenu-container');
	var elementActive = args && args.element && args.element.classList.contains('contextmenu-active');
	var hilightActive = args && args.toggleClass && args.toggleClass.classList.contains('contextmenu-active');
	if ((elementActive || hilightActive) && currentContainer.length > 0) {
		return;
	}
	var containerSubLevel = 0;
	if (!args || !args.isSub) {
		hideContextMenu();
	}
	else {
		containerSubLevel = args.isSub;
	}
	e.stopPropagation();

	var container = document.createElement('div');
	container.className = 'contextmenu-container';
	container.dataset.childlevel = containerSubLevel;
	
	var box = document.createElement('div');
	box.className = 'box';
	
	container.appendChild(box);
	document.body.appendChild(container);
	if (args) {
		el = args.element ? args.element : undefined;
		withArrow = args.arrow ? args.arrow : false;
		if (args.toggleClass) {
			args.toggleClass.classList.add('contextmenu-active');
		}
	}
	else {
		el = withArrow = undefined;
	}

	if (el) {
		el.classList.add('contextmenu-active');
		var rectEl = el.getBoundingClientRect();
		
		if (args && args.width) {
			if (args.width == '100%') {
				box.style.width = rectEl.width + 'px';
			}
			else if (args.width.match(/%$/)) {
				box.style.width = Math.round(rectEl.width / 100 * parseInt(args.width)) + 'px';
			}
			else if (args.width.match(/px$/)) {
				box.style.width = args.width;
			}
		}
	}
	
	var newLine;
	var newSpan;
	var inc = 0;
	for (var i = 0; i < content.length; i++) {
		var sub = content[i].sub ? true : false;
		if (!content[i].hide) {
			var idLine = 'lvl' + containerSubLevel + 'n' + (inc++);
			newLine = document.createElement('li');
			newLine.id = idLine;
			if (content[i].type != 'html' && content[i].type != 'HTML') {
				newSpan = document.createElement('span');
				if (content[i].type == 'infos') {
					newSpan.className = 'infos';
				}
				else {
					newSpan.className = 'contextmenu-btn';
					if (content[i].onclick) {
						newLine.onclick = content[i].onclick;
					}
				}
				newLine.appendChild(newSpan);
				newSpan.innerHTML = (sub ? '<div class="contextmenu-arrow-sub"></div>' : '') + content[i].text;
				if (sub) {
					newSpan.classList.add('context-menu-sub')
					var contentSub = content[i].sub;
					newSpan.onmouseenter = function(e) {
						hideContextMenuChild(containerSubLevel);
						showContextMenu(contentSub, e, {isSub: containerSubLevel+1, idParent: this.parentNode.id});
					}
				}
				else {
					newSpan.onmouseenter = function() {
						hideContextMenuChild(containerSubLevel);
					}
				}
			}
			else {
				newLine.innerHTML = content[i].text;
			}
			box.appendChild(newLine);
		}
	}
	
	if (containerSubLevel) {
		if (args && args.idParent) {
			var gutter = 14;
			var modX = 1;
			var modY = 0;
			var parent = document.getElementById(args.idParent);
			if (parent) {
				var parRect = parent.getBoundingClientRect();
				var boxRect = box.getBoundingClientRect();
				var pos = {};
				pos.height = boxRect.height,
				pos.width = boxRect.width,
				pos.left = parRect.left + parRect.width + modX,
				pos.top = parRect.top - modY,
				pos.right = window.innerWidth - (pos.left + pos.width),
				pos.bottom = window.innerHeight - (pos.top + pos.height);
				if (pos.right < gutter) {
					pos.left = parRect.left - modX - pos.width;
				}
				container.style.left = pos.left + 'px';
				
				if (pos.bottom < gutter) {
					pos.top = window.innerHeight - gutter - pos.height;
				}
				container.style.top = pos.top + 'px';
			} 
		}
	}
	else {
		var gutter = 14;
		var arrowHeight = withArrow ? 10 : 0;
		var arrowWidth = withArrow ? 18 : 0;
		var paddingArrow = arrowWidth ? Math.round(arrowWidth/3) : 0;
		var mod = {
			left: 0,
			right: 0,
			top: 0,
			bottom: 0
		};
		if (args && args.margin) {
			mod = {
				left: args.margin.left ? args.margin.left : 0,
				right: args.margin.right ? args.margin.right : 0,
				top: args.margin.top ? args.margin.top : 0,
				bottom: args.margin.bottom ? args.margin.bottom : 0
			};
		}
		var boxRect = box.getBoundingClientRect();
		
		if (withArrow) {
			var arrow = document.createElement('img');
			arrow.className = 'contextmenu-arrow';
			container.appendChild(arrow);
		}
		
		var pos = {};
		pos.height = boxRect.height,
		pos.width = boxRect.width;
		var eventX = e.clientX;
		if (args) {
			if (args.align) {
				if (args.align == 'center') {
					eventX = rectEl.left + Math.round(rectEl.width/2) - (withArrow ? 0 : Math.round(pos.width/2));
				}
				else if (args.align == 'left') {
					eventX = rectEl.left + (withArrow ? Math.round(pos.width/2) : 0);
				}
				else if (args.align == 'right') {
					eventX = rectEl.left + rectEl.width - pos.width + (withArrow ? Math.round(pos.width/2) : 0);
				}
			}
		}
		pos.midWidth = Math.round(pos.width/2),
		pos.left = eventX - (withArrow ? pos.midWidth : 0),
		pos.top = (el ? rectEl.top + rectEl.height : e.clientY) + arrowHeight + mod.bottom,
		pos.right = window.innerWidth - (pos.left + pos.width),
		pos.bottom = window.innerHeight - (pos.top + pos.height);
		
		if (pos.right < gutter) {
			var newPosX = (withArrow ? window.innerWidth - gutter : eventX) - pos.width;
			var marginArrow = (pos.left - newPosX - Math.round(arrowWidth/2));
			if (marginArrow + arrowWidth + paddingArrow > pos.midWidth) {
				marginArrow = pos.midWidth - arrowWidth - paddingArrow;
			}
			if (withArrow) arrow.style.marginLeft = marginArrow + 'px';
			pos.left = newPosX;
		}
		else if (pos.left < gutter) {
			var marginArrow = -(gutter - pos.left + Math.round(arrowWidth/2));
			if (marginArrow < -pos.midWidth + paddingArrow) {
				marginArrow = -pos.midWidth + paddingArrow;
			}
			if (withArrow) arrow.style.marginLeft = marginArrow + 'px';
			pos.left = gutter;
		}
		else if (withArrow) {
			arrow.style.marginLeft = -Math.round(arrowWidth/2) + 'px';
		}
		container.style.left = pos.left + 'px';
		
		if (pos.bottom < gutter) {
			if (withArrow) arrow.src = 'img/arrow-contextmenu-down.png';
			pos.top = (withArrow ? (el ? rectEl.top : e.clientY) - arrowHeight :  (el ? rectEl.top : e.clientY)) - pos.height - mod.top;
		}
		else if (withArrow) {
			arrow.src = 'img/arrow-contextmenu-up.png';
			arrow.style.top = - arrowHeight + 'px';
		}
		container.style.top = pos.top + 'px';
	}
}

addEvents(window, 'keydown resize dragover click contextmenu DOMMouseScroll wheel mousewheel touch', hideContextMenu);
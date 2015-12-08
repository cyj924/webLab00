"use strict";

document.observe("dom:loaded", function() {
	/* Make necessary elements Dragabble / Droppables (Hint: use $$ function to get all images).
	 * All Droppables should call 'labSelect' function on 'onDrop' event. (Hint: set revert option appropriately!)
	 * 필요한 모든 element들을 Dragabble 혹은 Droppables로 만드시오 (힌트 $$ 함수를 사용하여 모든 image들을 찾으시오).
	 * 모든 Droppables는 'onDrop' 이벤트 발생시 'labSelect' function을 부르도록 작성 하시오. (힌트: revert옵션을 적절히 지정하시오!)
	 */

		var images = $$('img');
		for(var i=0; i<images.length; i++)
		{
			new Draggable(images[i],{revert:true});
		}
		Droppables.add("labs",{onDrop:labSelect});
		Droppables.add("selectpad",{onDrop:labSelect});
		
});

function labSelect(drag, drop, event) {
	/* Complete this event-handler function 
	 * 이 event-handler function을 작성하시오.
	 */
	 	var num = drop.childNodes.length;
		if(drag.parentNode==drop){ // if drop same area
			
		}
		else if(num>4){ //labs
			drag.parentNode.removeChild(drag);
			drop.appendChild(drag);
			var ol = $('selection');
			var li = document.createElement('li');
			var images = $$('img');
			li.innerHTML = drag.readAttribute('alt');
			ol.removeChild(ol.lastChild);
			
		}
		else{ //selectpad
			if(num < 3){
				drag.parentNode.removeChild(drag);
				drop.appendChild(drag);
				var ol = $('selection');
				var li = document.createElement('li');
				var images = $$('img');
				li.innerHTML = drag.readAttribute('alt');
				ol.appendChild(li).pulsate({
					delay:0.5,
					duration:1
				});
			}
		}
	
}
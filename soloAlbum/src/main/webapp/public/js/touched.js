const touched = (clientRect, X, Y, W, H) => {
	if((((clientRect.x > X) && (clientRect.x < X + W)) && ((clientRect.y > Y) && (clientRect.y < Y + H)))
	|| (((clientRect.left > X) && (clientRect.left < X + W)) && ((clientRect.bottom > Y) && (clientRect.bottom < Y + H)))
	|| (((clientRect.right > X) && (clientRect.right < X + W)) && ((clientRect.top > Y) && (clientRect.top < Y + H))) 
	|| (((clientRect.right > X) && (clientRect.right < X + W))&& ((clientRect.bottom > Y) && (clientRect.bottom < Y + H)))){
		return true;
	} else {
		return false;
	}	
}
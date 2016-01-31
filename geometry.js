var MIFFY = { REVISION: '0' };
MIFFY.distance = function (ax,ay,bx,by) {
   return Math.hypot(ax-bx,ay-by);
}

//三角形の外接円を計算する
//@param t...三角形の頂点を示す、6要素の配列。x,y,の順に並ぶ
//@return 円を示す辞書形オブジェクト x,y=円の中心, radius=円の半径
MIFFY.circumcircle = function(t){	
		//各辺の長さを求める
		var ab = MIFFY.distance(t[0],t[1],t[2],t[3]);
		var bc = MIFFY.distance(t[2],t[3],t[4],t[5]);
		var ca = MIFFY.distance(t[4],t[5],t[0],t[1]);
		
		//三角形の面積を求める
		var s = (ab + bc + ca) / 2.0;
		var area = Math.sqrt(s*(s - ab)*(s - bc)*(s - ca));
		
		//三角形の辺の中で一番長い辺を求める
		var maxlength = 0;
		var longestEdge = 'A';
		if (maxlength<ab) { maxlength = ab; longestEdge = 'C'; }
		if (maxlength<bc) { maxlength = bc; longestEdge = 'A'; }
		if (maxlength<ca) { maxlength = ca; longestEdge = 'B'; }

		var angleA, angleB, angleC;
		//三角形の面積の公式 1/2absinθを使って,三角形の角度を求める
		switch (longestEdge) {
		case 'A':
		{
			var sinA = 2 * area / bc;
			angleB = Math.asin(sinA / ab);
			angleC = Math.asin(sinA / ca);
			angleA = Math.PI - angleB - angleC;
		}
			break;
		case 'B':
		{
			var sinB = 2 * area / ca;
			angleA = Math.asin(sinB / ab);
			angleC = Math.asin(sinB / bc);
			angleB = Math.PI - angleC - angleA;
		}
			break;
		case 'C':
		{
			var sinC = 2 * area / ab;
			angleB = Math.asin(sinC / bc);
			angleA = Math.asin(sinC / ca);
			angleC = Math.PI - angleA - angleB;
		}
			break;
		}
		//外心を求めます
		var sin2A = Math.sin(2.0*angleA);
		var sin2B = Math.sin(2.0*angleB);
		var sin2C = Math.sin(2.0*angleC);
		var center_x = (t[0] * sin2A + t[2] * sin2B + t[4] * sin2C) / (sin2A + sin2B + sin2C);
		var center_y = (t[1] * sin2A + t[3] * sin2B + t[5] * sin2C) / (sin2A + sin2B + sin2C);
		//半径の計算(正弦定理より)
		var radius = bc / Math.sin(angleA) / 2.0;
		return {'x':center_x,'y':center_y,'radius':radius};
} 
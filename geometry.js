var MIFFY = { REVISION: '0' };
MIFFY.distance = function (ax,ay,bx,by) {
   return Math.hypot(ax-bx,ay-by);
}
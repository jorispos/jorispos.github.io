var Context = {
  canvas: null,
  ctx: null,
  create: function(canvas_tag){
    this.canvas = document.getElementById(canvas_tag);
    this.ctx = this.canvas.getContext("2d");
    return this.ctx;
  }
};
window.onload = function(){
    Context.create('canvas');
    var i = 0;
    var colors =  ["#F70848", "#F20C4B", "#EE104E", "#EA1451", "#E61855", "#E11C58", "#DD205B", "#D9245F", "#D52862", "#D02C65", "#CC3169", "#C8356C", "#C4396F", "#C03D73", "#BB4176", "#B74579", "#B3497D", "#AF4D80", "#AA5183", "#A65587", "#A25A8A", "#9E5E8D", "#9A6291", "#956694", "#916A97", "#8D6E9B", "#89729E", "#8476A1", "#807AA5", "#7C7EA8", "#7883AB", "#7487AF", "#6F8BB2", "#6B8FB5", "#6793B9", "#6397BC", "#5E9BBF", "#5A9FC3", "#56A3C6", "#52A7C9", "#4EACCD", "#49B0D0", "#45B4D3", "#41B8D7", "#3DBCDA", "#38C0DD", "#34C4E1", "#30C8E4", "#2CCCE7", "#28D1EB"];
    setInterval(function(){
      Context.ctx.beginPath();
      Context.ctx.rect(0,0,Context.canvas.width, Context.canvas.height);
      Context.ctx.fillStyle = colors[i];
      Context.ctx.fill();
      i++;
      if (i == colors.length) {
         i = 0;
      }
    },500);
};
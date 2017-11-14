(function ($, window, document) {

  $(function () {
    app.generateWorld();
  });

  let app = {
    $mario: $('#mario'),
    groundWidth: 125,
    marioPosX: 0,
    marioPosY: 27,
    speed: 10,
    generateWorld: function(){
      this.generateGround();
      this.controlInit();
    },
    generateGround: function(){
      //window.innerWidth / this.groundWidth
      let ground = $('<div/>').addClass('ground');
      let hole = $('<div/>').addClass('hole');

      for (let index = 0; index < 20; index++) {
        if (index%4 || index === 0) {
          $('.footer').append(ground.clone());
        } else {
          $('.footer').append(hole.clone());
        }
      }
    },
    controlInit: function () {
      let movement = {
        right: 39,
        left: 37,
        up: 38,
        down: 40
      }
      $(document).on('keydown', (event)=>{
        switch(event.keyCode) {
          case movement.right: 
            this.$mario.toggleClass('rightmove');
            this.moveMario('right');
            break;
          case movement.left:
            this.$mario.toggleClass('leftmove');
            this.moveMario('left');
            break;
          case movement.up:
            if (this.$mario.hasClass('upmove')) return;
            this.$mario.addClass('upmove');
            this.moveMario('up');
            break;
          default:
            break;
        }
      });
      $(document).on('keyup', ()=>{
        this.$mario.attr('class','');
      });
    },
    moveMario: function (direction) {
      switch (direction) {
        case 'right':
          this.marioPosX += this.speed;
          break;
        case 'left':
          if (this.marioPosX < 0 || this.marioPosX < this.speed) this.marioPosX = this.speed;
          this.marioPosX -= this.speed;
          break;
        case 'up':
          for (let i=0; i< 3; i++){
            this.marioPosY += this.speed;
            this.$mario.css('bottom', this.marioPosY);
          }
          setTimeout(() => {
            for (let i = 0; i < 3; i++) {
              this.marioPosY -= this.speed;
              this.$mario.css('bottom', this.marioPosY);
            }
          }, 300);
          
        default:
          break;
      }

      this.$mario.css('left', this.marioPosX);
    }
  }

}(window.jQuery, window, document));

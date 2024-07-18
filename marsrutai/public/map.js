document.addEventListener('DOMContentLoaded', function() {
    let scale = 1;
    let lastScale = 1;
    let translatePos = { x: 0, y: 0 };
    let lastPos = { x: 0, y: 0 };
    let doubleClickCount = 0;
    const maxDoubleClickCount = 5;
    const canvas = document.getElementById('mapCanvas');

  
    function initializeMap() {
      const ctx = canvas.getContext('2d');
      
      canvas.width = window.innerWidth;
      canvas.height = 1375;
  
      const img = new Image();
      img.src = 'images/MAP.png';
      img.onload = function() {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        addPoints(ctx);
      };
  
      const hammertime = new Hammer(canvas);
  
      hammertime.get('pan').set({ direction: Hammer.DIRECTION_ALL });
      hammertime.get('pinch').set({ enable: true });

      hammertime.on('panstart', function(event) {
        lastPos = { x: translatePos.x, y: translatePos.y };
      });
  
      hammertime.on('panmove', function(event) {
        translatePos.x = lastPos.x + event.deltaX;
        translatePos.y = lastPos.y + event.deltaY;
        draw();
      });
  
      hammertime.on('pinchstart', function(e) {
        lastScale = scale;
      });
  
      hammertime.on('pinch', function(e) {
        scale = Math.max(0.5, Math.min(lastScale * e.scale, 3));
        ctx.setTransform(scale, 0, 0, scale, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        addPoints(ctx);
      });

      hammertime.on('doubletap', function(event) {
        handleDoubleClick(event);
      });
  
      function draw() {
        ctx.save();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.translate(translatePos.x, translatePos.y);
        ctx.scale(scale, scale);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        addPoints(ctx);
        ctx.restore();
      }
    
      function handleDoubleClick(event) {
        doubleClickCount += 1;
        if (doubleClickCount > maxDoubleClickCount) {
          scale = 1;
          translatePos = { x: 0, y: 0 };
          doubleClickCount = 0;
        } else {
          const canvasCenterX = canvas.width / 2;
          const canvasCenterY = canvas.height / 2;
      
          const tapX = (event.center.x - canvas.offsetLeft - translatePos.x) / scale;
          const tapY = (event.center.y - canvas.offsetTop - translatePos.y) / scale;
      
          scale *= 2;
      
          translatePos.x = canvasCenterX - tapX * scale;
          translatePos.y = canvasCenterY - tapY * scale;
      
        }
    
        draw();
      }
    }

    const icons = {};
  
    function addPoints(ctx) {
      const pointsForRender = Object.values(points);
  
      ctx.fillStyle = 'red';
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 2;
  
      pointsForRender.forEach(point => {
        if (point.icon) {
          
          if (icons[point.icon]) {
            const aspectRatio = icons[point.icon].width / icons[point.icon].height;
            const width = point.size || 50;
            const height = width / aspectRatio;
            ctx.drawImage(icons[point.icon], point.x, point.y, width, height);
          } else {
            const icon = new Image();
            icon.src = point.icon;
            icon.onload = () => {
              const aspectRatio = icon.width / icon.height;
              const width = point.size || 50;
              const height = width / aspectRatio;
              if (icon.complete) {
                ctx.drawImage(icon, point.x, point.y, width, height);
              }
            };
            icons[point.icon] = icon
          } 


        } else {
          ctx.beginPath();
          ctx.arc(point.x, point.y, 5, 0, Math.PI * 2, true);
          ctx.fill();
          ctx.stroke();
        }
      });
    }
  
    initializeMap();
  });
  
document.addEventListener('DOMContentLoaded', () => {
    function openFullscreen(elem) {
        if (elem.requestFullscreen) {
            elem.requestFullscreen().catch(console.log);
        } else if (elem.webkitRequestFullscreen) { /* Safari */
            document.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE11 */
            elem.msRequestFullscreen();
        }
      }
      const main = document.querySelector('main')
      main.addEventListener('click', () => openFullscreen(main));

      main.click()
})
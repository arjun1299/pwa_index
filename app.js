class PWAConfApp {
  constructor() {
    this.init();
  }

  async init() {
    //alert('came here in init function')
    this.registerSW();
  }
  async registerSW() {
    if ('serviceWorker' in navigator) {
      try {
        await navigator.serviceWorker.register('./sw.js');
        //alert('SW registration successful')
      } catch (e) {
        alert('ServiceWorker registration failed. Sorry about that.');
      }
    } else {
      console.log('Error in sw');//document.querySelector('.alert').removeAttribute('hidden');
    }
  }
}

window.addEventListener('load', e => {
try{
new PWAConfApp();
console.log('successful creation of an instance');
}
catch(err)
{
  console.log('error creating an instance');
  console.log(err);
}
}
);

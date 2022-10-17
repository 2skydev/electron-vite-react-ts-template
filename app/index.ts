import MyApp from './app';

(async () => {
  const myApp = new MyApp();
  await myApp.bootstrap();
})();

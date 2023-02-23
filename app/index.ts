import AppContext from './app';

(async () => {
  const context = new AppContext();
  await context.bootstrap();
})();

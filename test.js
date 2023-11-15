export function dadJoke() {
  return new Promise(function (resolve, reject) {
    joker.getRandomDadJoke(resolve);
  });
}


import http from "k6/http";
import { check, sleep } from "k6";


const numberGenerator = () => Math.floor(Math.random() * 24);


const tickerGenerator = () => {
  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X'];
  return letters[numberGenerator()] + letters[numberGenerator()] + letters[numberGenerator()] + letters[numberGenerator()] + letters[numberGenerator()];
};

export let options = {
  vus: 100,
  duration: "5m"
};

export default function() {
  let res = http.get(`http://localhost:3000/api/stocks/${tickerGenerator()}`);
  check(res, {
    "status was 200": (r) => r.status == 200,
    "transaction time OK": (r) => r.timings.duration < 200
  });
  sleep(1);
};

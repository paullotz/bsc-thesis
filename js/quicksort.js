import { quicksort_20_integers, quicksort_1000_integers } from "./const.js";
import { quicksort_wrapper } from "../../rust/pkg/rust.js";

function quicksort_js(array, left, right) {
  if (left < right) {
    const pivotIndex = partition(array, left, right);
    quicksort_js(array, left, pivotIndex - 1);
    quicksort_js(array, pivotIndex + 1, right);
  }
}

function partition(array, left, right) {
  const pivotValue = array[right];
  let storeIndex = left;
  for (let i = left; i < right; i++) {
    if (array[i] <= pivotValue) {
      [array[i], array[storeIndex]] = [array[storeIndex], array[i]];
      storeIndex++;
    }
  }
  [array[storeIndex], array[right]] = [array[right], array[storeIndex]];
  return storeIndex;
}

export async function quickSortTest() {
  console.log("Running Quicksort test");

  const array = quicksort_20_integers;

  const quicksortTest = new Benchmark.Suite();
  quicksortTest
    .add("Quicksort (Rust - WASM)", () => {
      quicksort_wrapper(array, 0, array.length - 1);
    })
    .add("Quicksort (JS)", () => {
      quicksort_js(array, 0, array.length - 1);
    })
    .on("cycle", (event) => {
      console.log(String(event.target));
    })
    .on("complete", () => {
      console.log("Fastest is " + quicksortTest.filter("fastest").map("name"));
    });

  quicksortTest.run({ async: true });
}

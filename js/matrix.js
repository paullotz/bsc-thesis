import { matrix_multiply } from "../../rust/pkg/rust.js";
import { matrix_20_50, matrix_50_20, matrix_2_5, matrix_5_2 } from "./const.js";

function matrix_multiply_js(a, b) {
  const a_len = a.length;
  const b_len = b.length;

  const result = [];

  for (let i = 0; i < a_len; i++) {
    const row = [];

    for (let j = 0; j < b[0].length; j++) {
      let sum = 0;

      for (let k = 0; k < b_len; k++) {
        sum += a[i][k] * b[k][j];
      }

      row.push(sum);
    }

    result.push(row);
  }

  return result;
}

export async function matrixTest() {
  console.log("Running matrices test");

  const a = matrix_50_20;
  const b = matrix_20_50;

  const matrixTest = new Benchmark.Suite();
  matrixTest
    .add("Matrix multiplication (JS)", () => {
      matrix_multiply_js(a, b);
    })
    .add("Matrix multiplication (Rust - WASM)", () => {
      matrix_multiply(a, b);
    })
    .on("cycle", (event) => {
      console.log(String(event.target));
    })
    .on("complete", () => {
      console.log("Fastest is " + matrixTest.filter("fastest").map("name"));
    });

  matrixTest.run({ async: true });
}

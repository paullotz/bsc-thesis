import { grayscale_filter } from "../../rust/pkg/rust.js";

function grayscale_filter_js(data) {
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const avg = (r + g + b) / 3;

    data[i] = avg;
    data[i + 1] = avg;
    data[i + 2] = avg;
  }
}

export async function grayscaleTest(data) {
  console.log("Running grayscale test");

  const grayscaleTest = new Benchmark.Suite();
  grayscaleTest
    .add("Gray scale (Rust - WASM)", () => {
      grayscale_filter(data);
    })
    .add("Gray scale (JS)", () => {
      grayscale_filter_js(data);
    })
    .on("cycle", (event) => {
      console.log(String(event.target));
    });

  grayscaleTest.run({ async: true });
}

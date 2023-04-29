import { hash as hash_wasm } from "../../rust/pkg/rust.js";
import { book_string, fhtw_string } from "./const.js";

async function hash_js(data) {
  const encoded = new TextEncoder().encode(data);
  crypto.subtle.digest("SHA-256", encoded);
}

export async function shaTest() {
  console.log("Running SHA test");

  const shaTest = new Benchmark.Suite();
  shaTest
    .add("SHA (JS)", () => {
      hash_js(book_string);
    })
    .add("SHA (Rust - Wasm)", () => {
      hash_wasm(book_string);
    })
    .on("cycle", (event) => {
      console.log(String(event.target));
    });

  shaTest.run({ async: true });
}

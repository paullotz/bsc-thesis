use sha256::{digest};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn hash(input: &str) {
    let val = digest(input);
}

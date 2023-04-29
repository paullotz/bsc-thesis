use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn grayscale_filter(image_data: &mut [u8]) {
    for i in (0..image_data.len()).step_by(4) {
        let r = image_data[i];
        let g = image_data[i + 1];
        let b = image_data[i + 2];
        
        let avg = (r + g + b) / 3;

        image_data[i] = avg;
        image_data[i + 1] = avg;
        image_data[i + 2] = avg;
    }
}

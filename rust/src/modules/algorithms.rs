use wasm_bindgen::prelude::*;
use js_sys::Array;

fn partition(array: &mut Vec<JsValue>, left: usize, right: usize) -> usize {
    let pivot = array[right].as_f64().unwrap() as i32;
    let mut store_index = left;
    for i in left..right {
        if array[i].as_f64().unwrap() as i32 <= pivot {
            array.swap(i, store_index);
            store_index += 1;
        }
    }
    array.swap(store_index, right);
    store_index
}

fn quicksort(array: &mut Vec<JsValue>, left: usize, right: usize) {
    if left < right {
        let p = partition(array, left, right);
        if p > 0 {
            quicksort(array, left, p - 1);
        }
        quicksort(array, p + 1, right);
    }
}

#[wasm_bindgen]
pub fn quicksort_wrapper(array: Array, left: usize, right: usize) {
 let mut array_copy: Vec<JsValue> = array.to_vec();
 quicksort(&mut array_copy, left, right);
}

#[wasm_bindgen]
pub fn matrix_multiply(a: &js_sys::Array, b: &js_sys::Array) -> Option<js_sys::Array> {
    let a_len = a.length() as usize;
    let b_len = b.length() as usize;

    if a_len == 0 || b_len == 0 {
        return None;
    }

    let a_cols = get_cols(&a, a_len)?;
    let b_cols = get_cols(&b, b_len)?;

    if a_cols != b_len {
        return None;
    }

    let mut result = js_sys::Array::new();

    for i in 0..a_len {
        let row = js_sys::Array::new();

        for j in 0..b_cols {
            let mut sum = 0.0;

            for k in 0..a_cols {
                let a_value = get_element(&a, i, k, a_len, a_cols)?;
                let b_value = get_element(&b, k, j, b_len, b_cols)?;
                sum += a_value * b_value;
            }

            row.push(&JsValue::from_f64(sum));
        }

        result.push(&row);
    }

    Some(result)
}

fn get_cols(array: &js_sys::Array, len: usize) -> Option<usize> {
    if len == 0 {
        return None;
    }

    let first_row = array.get(0).dyn_into::<js_sys::Array>().ok()?;
    Some(first_row.length() as usize)
}

fn get_element(array: &js_sys::Array, i: usize, j: usize, rows: usize, cols: usize) -> Option<f64> {
    let index = i * cols + j;
    if index >= array.length() as usize {
        return None;
    }
    let value = array.get(index as u32).as_f64();
    match value {
        Some(v) => Some(v),
        None => None,
    }
}
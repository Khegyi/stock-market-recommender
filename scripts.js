import { stringifyDate, handleSubmit } from "./methods.js";

const timeTableLength = 10;

const now = new Date(Date.now());
const past = new Date(Date.now() + -(timeTableLength - 1) * 24 * 3600 * 1000);
document.getElementById("from_date").value = stringifyDate(past);
document.getElementById("to_date").value = stringifyDate(now);
document.getElementById("submit_btn").addEventListener("click", handleSubmit);

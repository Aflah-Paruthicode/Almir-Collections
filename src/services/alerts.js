import Swal from "sweetalert2";

let timerInterval;
export const timerAlert = (time,heading,description) => { Swal.fire({
  icon : "info",
  title: heading,
  html: description,
  timer: time,
  timerProgressBar: true,
  allowOutsideClick: false,
  allowEscapeKey : false,
  allowEnterKey : false,
  didOpen: () => {
    Swal.showLoading();
    const timer = Swal.getPopup().querySelector("b");
    timerInterval = setInterval(() => {
      timer.textContent = `${Swal.getTimerLeft()}`;
    }, 100);
  },
  willClose: () => {
    clearInterval(timerInterval);
  }
}).then((result) => {
  /* Read more about handling dismissals below */
  if (result.dismiss === Swal.DismissReason.timer) {
    console.log("I was closed by the timer");
  }
})}
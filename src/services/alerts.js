import Swal from "sweetalert2";

let timerInterval;
export const timerAlert = (time, heading, description) => {
  Swal.fire({
    icon: "info",
    title: heading,
    html: description,
    timer: time,
    timerProgressBar: true,
    backdrop: true,
    allowOutsideClick: () => false,
    allowEscapeKey: false,

    didOpen: () => {
      Swal.showLoading();
      const timer = Swal.getPopup().querySelector("b");
      timerInterval = setInterval(() => {
        timer.textContent = `${Swal.getTimerLeft()}`;
      }, 100);
    },
    willClose: () => {
      clearInterval(timerInterval);
    },
  }).then((result) => {
    if (result.dismiss === Swal.DismissReason.timer) {
    }
  });
};

export const confirmAlert = async () => {
  try {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });
      return true;
    }
    return false;
  } catch (err) {
    console.error(err);
  }
};

export const warningAlert = (mesg) => {
  Swal.fire({
    title: mesg ? mesg : "Enter Details!",
    text: "Enter proper details.",
    icon: "info",
  });
};

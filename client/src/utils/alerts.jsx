import Swal from 'sweetalert2';
const alerts = () => {
  const basicAlert = (title, message, type) => {
    Swal.fire({
      title: title,
      text: message,
      icon: type,
    });
  };

  const confirmAlert = (title) => {
    const swalWithTailwindButtons = Swal.mixin({
      customClass: {
        confirmButton: 'ml-3 bg-green-500 text-white px-4 py-2 rounded',
        cancelButton: 'bg-red-500 text-white px-4 py-2 rounded',
      },
      buttonsStyling: false,
    });

    return swalWithTailwindButtons.fire({
      title: 'Are you sure?',
      text: `${title}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true,
    });
  };

  return { basicAlert, confirmAlert };
};

export default alerts;

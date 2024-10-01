import Swal from "sweetalert2";

export async function toast (type, message) {
    return await Swal.fire({
        position: "top-end",
        icon: type,
        showConfirmButton: false,
        timer: 3000,
        toast: true,
        title: message
    });
}
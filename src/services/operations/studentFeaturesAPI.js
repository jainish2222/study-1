import { toast } from "react-hot-toast";
import { studentEndpoints } from "../apis";
import { apiConnector } from "../operations/apiconnector";
import rzpLogo from "../../assets/Logo/rzp_logo.png"
import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";


const {COURSE_PAYMENT_API ,COURSE_ENROLL_API, COURSE_VERIFY_API, SEND_PAYMENT_SUCCESS_EMAIL_API} = studentEndpoints;


// function loadScript(src) {
//     return new Promise((resolve) => {
//         const script = document.createElement("script");
//         script.src = src;

//         script.onload = () => {
//             resolve(true);
//         }
//         script.onerror= () =>{
//             resolve(false);
//         }
//         document.body.appendChild(script);
//     })
// }


export async function buyCourse(token, courses, userDetails, navigate, dispatch) {
    const toastId = toast.loading("Loading...");
    try{
      
        //initiate the order
        console.log("i am in buy course function");
        const orderResponse = await apiConnector("POST", COURSE_ENROLL_API,   {courses}, {Authorization: `Bearer ${token}`, })
        console.log("PRINTING orderResponse", orderResponse);
                                
        if(!orderResponse.data.success){
            throw new Error(orderResponse.data.message);
        }
        dispatch(resetCart());

        toast.success("Student Enrolled Successfully");

    }
    catch(error) {
        console.log("PAYMENT API ERROR.....", error);
        toast.error("Could not make Payment");
    }
    toast.dismiss(toastId);
}



// async function sendPaymentSuccessEmail(response, amount, token) {
//     try{
//         await apiConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API, {
//             orderId: response.razorpay_order_id,
//             paymentId: response.razorpay_payment_id,
//             amount,
//         },{
//             Authorization: `Bearer ${token}`
//         })
//     }
//     catch(error) {
//         console.log("PAYMENT SUCCESS EMAIL ERROR....", error);
//     }
// }


// //verify payment
// async function verifyPayment(bodyData, token, navigate, dispatch) {
//     const toastId = toast.loading("Verifying Payment....");
//     dispatch(setPaymentLoading(true));
//     try{
//         const response  = await apiConnector("POST", COURSE_VERIFY_API, bodyData, { Authorization:`Bearer ${token}`,})

//         if(!response.data.success) {
//             throw new Error(response.data.message);
//         }
//         toast.success("payment Successful, ypou are addded to the course");
//         navigate("/dashboard/enrolled-courses");
//         dispatch(resetCart());
//     }   
//     catch(error) {
//         console.log("PAYMENT VERIFY ERROR....", error);
//         toast.error("Could not verify Payment");
//     }
//     toast.dismiss(toastId);
//     dispatch(setPaymentLoading(false));
// }
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


function ToastContainerAbs() {
  return (
    <ToastContainer
      position="bottom-left"
      autoClose={2000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover={false}
      theme="dark"
    />
  )
}

export default ToastContainerAbs
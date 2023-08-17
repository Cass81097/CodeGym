// import { Field, Formik, Form } from "formik";

// export default function Login() {
//     return (
//         <>
//             <Formik
//                 initialValues={{
//                     name: "",
//                     password: "",
//                 }}
//                 // onSubmit={handleSubmit}   
//             >
//                 <Form className="form-1">
//                     <div className="align">
//                         <div className="grid">
//                             <div className="form" id="form-1">
//                                 <div className="form login">
//                                     <div className="form-user">
//                                         <div className="user">
//                                             <i className="fa-solid fa-user icon"></i>
//                                             <h6>Username</h6>
//                                         </div>
//                                         <Field id="username" type="text" name="name" className="form__input form-label" placeholder="VD: Lê Văn A" />
//                                         <span className="form-message"></span>
//                                     </div>

//                                     <div className="form-pw">
//                                         <div className="password">
//                                             <i className="fa-solid fa-lock icon"></i>
//                                             <h6>Mật khẩu</h6>
//                                         </div>
//                                         <Field id="password" type="password" name="password" className="form__input form-label" placeholder="Mật khẩu" />
//                                         <span className="form-message"></span>
//                                     </div>

//                                     <div className="form__field">
//                                         <button type="submit" className="btn btn-primary">Đăng nhập</button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </Form>
//             </Formik>
//         </>
//     )
// }
import { useState, useEffect } from "react";
import { useUser } from "../../contexts/userContext";
import { useFormik } from 'formik';
import { registerSchema } from "../../schemas/AuthForms";
import { useNavigate } from "react-router-dom";
import liv from "../../assets/images/help.jpg";


const SignUp = () => {
  const {user, setUser, register} = useUser();
  const [ message,setMessage] = useState('');

  const onSubmit = (values,actions) => {
    console.log(values);
    setUser({
      email : values.email,
      full_name : values.full_name,
      password : values.password,
      password_confirmation : values.password_confirmation,
      phone_number : values.phone_number,
      role
    });
    setMakeRegister(true);
  }

  const formik = useFormik({
    initialValues : {
      email : "",
      full_name : "",
      password : "",
      password_confirmation : "",
      phone_number:""
    },
    validationSchema: registerSchema,
    onSubmit
  });

  const [role, setRole] = useState('Client');
  const [makeRegister, setMakeRegister] = useState(false);

  const handleRoleChange = e => {
    setRole(e.target.value);
  };


  useEffect(() => {
    if(makeRegister) {
      handleRegister();
    }
  }, [user]);

  const navigate = useNavigate();
  const handleRegister = async ()=>{
    let response = await register();
    console.log(response);
    if(response.status && response.status == 201) navigate("/registerSuccess");
    else {
      setMessage(response.data.message)
      console.log(response.message);
    }
  }


  return (
    <div className="relative w-full h-full flex flex-col gap-2  justify-center items-center ">
      <img src={liv} className="absolute top-0 left-0 w-full h-full z-[-1]" />

      <form
        onSubmit={formik.handleSubmit}
        action=""
        className="W-full p-16 rounded-2xl flex flex-col gap-6 shadow-2xl shadow-[#a3a3a3] mt-5 bg-orange-600 bg-opacity-30"
      >
        <h3 className="text-white font-bold text-4xl">Sign Up</h3>
        {message && (
          <div className=" text-red-700 bg-red-200 p-2 border border-red text-center text-bold  w-full leading-3">
            {message}
          </div>
        )}
        {formik.errors.full_name && (
          <div className="text-red-400 w-full text-start leading-3">
            {formik.errors.full_name}
          </div>
        )}
        <input
          type="text"
          value={formik.values.full_name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="full_name"
          className={
            formik.errors.full_name
              ? "invalid bg-red-300"
              : "border-2 border-orange-600"
          }
          // onChange={()=>{handleFullNameChange(event)}}
          placeholder="Full Name"
        />
        {formik.errors.email && (
          <div className="text-red-400 w-full text-start leading-3">
            {formik.errors.email}
          </div>
        )}
        <input
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="email"
          className={
            formik.errors.email
              ? "invalid bg-red-300"
              : "border-2 border-orange-600"
          }
          // onChange={()=>{handleEmailChange(event)}}
          placeholder="Email"
        />
        <div className="flex gap-3 w-full">
          <input
            className="hidden"
            type="radio"
            value="Client"
            id="client-check"
            checked={role === "Client"}
            onChange={handleRoleChange}
          />
          <label
            className={
              role +
              " flex-1 text-center cursor-pointer hover:bg-orange-900  transition-all checked-client rounded-lg py-3 text-white bg-orange-600"
            }
            htmlFor="client-check"
          >
            Client
          </label>

          <input
            className="hidden"
            type="radio"
            value="DeliveryMan"
            id="delivery-check"
            checked={role === "DeliveryMan"}
            onChange={handleRoleChange}
          />

          <label
            className={
              role +
              " flex-1 text-center bg-slate-50 cursor-pointer hover:bg-orange-900 transition-all checked-delivery rounded-lg py-3 text-orange-800 font-bold"
            }
            htmlFor="delivery-check"
          >
            Delivery Man
          </label>
        </div>
        {formik.errors.phone_number && (
          <div className="text-red-400 w-full text-start leading-3">
            {formik.errors.phone_number}
          </div>
        )}
        <input
          type="text"
          value={formik.values.phone_number}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="phone_number"
          className={
            formik.errors.phone_number
              ? "invalid bg-red-300"
              : "border-2 border-orange-600"
          }
          // onChange={()=> handlephone_numberChange(event)}
          placeholder="Phone Number"
        />
        {formik.errors.password && (
          <div className="text-red-400 w-full text-start leading-3">
            {formik.errors.password}
          </div>
        )}
        <input
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="password"
          className={
            formik.errors.password
              ? "invalid bg-red-300"
              : "border-2 border-orange-600"
          }
          // onChange={()=> handlePasswordChange(event)}
          placeholder="Password"
        />
        {formik.errors.password_confirmation && (
          <div className="text-red-400 w-full text-start leading-3">
            {formik.errors.password_confirmation}
          </div>
        )}
        <input
          type="password"
          // onChange={()=> handlePasswordConfirmationChange(event)}
          value={formik.values.password_confirmation}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="password_confirmation"
          className={
            formik.errors.password_confirmation
              ? "invalid bg-red-300"
              : "border-2 border-orange-600"
          }
          placeholder="Repeat Password"
        />
        <button type="submit" className="w-full text-white bg-orange-600">
          Register
        </button>
      </form>
    </div>
  );
}

export default SignUp
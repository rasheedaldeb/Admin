import AdminSignInForm from "../Components/AdminSignInForm";
const AdminSignin = () => {
  return (
    <div className="relative flex h-screen items-center justify-center">
      <img
        src="/images/register-signin.jpg"
        alt=""
        className="absolute top-0 left-0 z-[-1] h-full w-full"
        loading="lazy"
      />
      <AdminSignInForm />
    </div>
  );
};

export default AdminSignin;

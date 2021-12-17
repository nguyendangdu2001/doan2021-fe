import React from "react";
import useLogin from "@modules/auth/hooks/useLogin";
import { useGoogleLogin as useGoogleLoginApi } from "react-google-login";
import { Link } from "react-router-dom";
import useRedirect from "@hooks/useRedirect";
import { useAppSelector } from "@hooks/reduxHook";
import { useForm } from "react-hook-form";
import useGoogleLogin from "@modules/auth/hooks/useGoogleLogin";
import * as yup from "yup";
import FormErrors from "@components/FormErrors";
import useRegister from "@modules/auth/hooks/useRegister";
const Register = () => {
  const { mutate: registerAccount, isLoading } = useRegister();
  const { register, handleSubmit, getValues, formState } = useForm({
    resolver: yup.object().shape({
      email: yup.string().required().email(),
      password: yup.string().required(),
      rePassword: yup
        .string()
        .required()
        .test("rePassword-test", "", (data) => {
          return data === getValues("password");
        }),
    }),
  });
  const onFinish = (values) => {
    registerAccount(values);
  };
  const { mutate: loginWithGoogle } = useGoogleLogin();

  const isAuth = useAppSelector((state) => state?.auth?.isAuth);
  const responseGoogle = (res) => {
    console.log(res);
    loginWithGoogle({ id_token: res?.tokenId });
  };
  // useRedirect([{ condition: isAuth, to: "/" }]);
  const { signIn } = useGoogleLoginApi({
    clientId:
      "273628985067-j8hb4td82dvf1cj2sjc0hsjijlp92kla.apps.googleusercontent.com",
    cookiePolicy: "single_host_origin",
    onSuccess: responseGoogle,
    onFailure: (err) => console.log(err),
  });
  return (
    <div className="flex items-center justify-center h-full">
      <form
        className="max-w-lg p-12 space-y-10 bg-white rounded-lg shadow-lg"
        onSubmit={handleSubmit(onFinish)}
      >
        <div className="text-4xl font-bold font-actor">Đăng ký</div>
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <div className="w-1/6 h-0.5 bg-gray-500"></div>
            <div className="font-semibold text-gray-600 font-actor">
              Sign up with
            </div>
          </div>

          <div className="flex space-x-6">
            <button
              type="button"
              className="flex-auto p-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg shadow text-gray-70"
              onClick={signIn}
            >
              Sign up with google
            </button>
            <div className="flex-auto p-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg shadow">
              Sign up with facebook
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <input
            {...register("email")}
            type="text"
            placeholder="Email"
            className="w-full px-6 py-4 font-medium transition-colors bg-gray-100 border-0 rounded-xl dark:bg-gray-800 dark:text-gray-50"
          />
          <input
            {...register("password")}
            type="password"
            placeholder="Mật khẩu"
            className="w-full px-6 py-4 font-medium transition-colors bg-gray-100 border-0 rounded-xl dark:bg-gray-800 dark:text-gray-50"
          />
          <input
            {...register("rePassword")}
            type="password"
            placeholder="Nhập lại mật khẩu"
            className="w-full px-6 py-4 font-medium transition-colors bg-gray-100 border-0 rounded-xl dark:bg-gray-800 dark:text-gray-50"
          />
          <FormErrors errors={formState.errors} />
          {/* <div className="font-medium">
            <label>
              <input type="checkbox" className="rounded" /> I aggree with policy
            </label>
          </div> */}
        </div>

        <div className="grid place-content-center">
          <button
            type="submit"
            className="px-5 py-3 text-2xl font-medium tracking-widest bg-blue-500 rounded text-gray-50 font-actor"
          >
            Đăng ký
          </button>
        </div>
      </form>
    </div>
  );
};
export default Register;

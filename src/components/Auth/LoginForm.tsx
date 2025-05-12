import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";

type Input = {
  email: string;
  pass: string;
};

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>();

  const onSubmit: SubmitHandler<Input> = (data) => console.log(data);

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
      <form
        className="p-10 bg-white rounded flex justify-center items-center flex-col shadow-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-20 h-20 text-gray-600 mb-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
            clipRule="evenodd"
          />
        </svg>
        <p className="mb-5 text-3xl uppercase text-gray-600">Login</p>
        <div className="mb-5">
          <input
            className="p-3 w-80 focus:border-purple-700 rounded border-2 outline-none"
            autoComplete="off"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
                message: "Invalid email format",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-5">
          <input
            className="p-3 w-80 focus:border-purple-700 rounded border-2 outline-none"
            autoComplete="off"
            placeholder="Password"
            {...register("pass", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
              pattern: {
                value: /^[A-Za-z\d@$!%*?&]{6,}$/,
                message:
                  "Password must contain at least one letter and one number",
              },
            })}
          />
          {errors.pass && <p className="text-red-500">{errors.pass.message}</p>}
        </div>
        <button
          className="bg-purple-600 hover:bg-purple-900 text-white font-bold p-2 rounded w-80"
          type="submit"
        >
          <span>SUBMIT</span>
        </button>
      </form>
    </div>
  );
}

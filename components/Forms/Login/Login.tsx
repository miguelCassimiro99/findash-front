"use client";

import { FormProvider, useForm } from "react-hook-form";
import {
  CreateAccountFormData,
  LoginFormData,
  loginFormSchema,
  createAccountSchema,
} from "../../../types/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { Form } from "../Composition/Index";
import Button from "../Button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useStore } from "../../../store/login";

// TODO: the form needs to have both login and signIn by global var

export default function Login() {
  const router = useRouter();

  const { formIndex } = useStore((store) => store.state);
  const { setFormIndex } = useStore((store) => store.actions);

  const [errorMessageVisible, setErrorMessageVisible] =
    useState<boolean>(false);

  const [errorMessage, setErrorMessage] = useState<string>("");

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    mode: "all",
  });

  const {
    handleSubmit,
    formState: { errors },
  } = loginForm;

  const createAccountForm = useForm<CreateAccountFormData>({
    resolver: zodResolver(createAccountSchema),
    mode: "all",
  });

  const {
    handleSubmit: handleSubmitCreate,
    formState: { errors: createAccountErrors },
  } = createAccountForm;

  async function handleLoginForm(data: any) {
    event?.preventDefault();
    if (errors.email || errors.password) return;
    try {
      const result = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (result?.error || !result?.ok)
        throw new Error(result?.error || "Invalid login");

      router.push("/dashboard");
    } catch (error) {
      console.log(error);
      setErrorMessage("Error during the Login. Check your credentials");
      setErrorMessageVisible(true);
    }
  }

  async function handleCreateAccountForm(data: any) {
    event?.preventDefault();
    if (
      createAccountErrors.name ||
      createAccountErrors.email ||
      createAccountErrors.password
    )
      return;

    try {
      const result = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
        },
        body: JSON.stringify(data),
      });

      if (!result.ok) throw Error("Error for creating account");

      setFormIndex(1);
      router.push("/");
    } catch (error) {
      console.log(error);
      setErrorMessage("Error for creating account");
      setErrorMessageVisible(true);
    }
  }

  return (
    <div className="w-full md:max-w-sm lg:max-w-md">
      {formIndex == 1 && (
        <FormProvider {...loginForm}>
          <form
            onSubmit={handleSubmit(handleLoginForm)}
            className="py-4 md:py-6 overflow-hidden max-w-md"
          >
            <h2 className="text-2xl font-semibold md:font-bold text-gray-200 mb-4">
              Login on our platform
            </h2>

            <p className="text-sm text-gray-300 mb-4 max-w-xs">
              Use your e-mail and password to access the Dashboard
            </p>

            <div className="flex flex-col items-center justify-start gap-y-2">
              <div className="flex flex-col justify-start items-start w-full gap-2">
                <Form.Field className="w-full">
                  <Form.Label htmlFor="email">E-mail</Form.Label>
                  <Form.Input type="text" name="email" />
                  <Form.ErrorMessage field="email" />
                </Form.Field>

                <Form.Field className="w-full">
                  <Form.Label htmlFor="password">Password</Form.Label>
                  <Form.Input type="password" name="password" />
                  <Form.ErrorMessage field="password" />
                </Form.Field>

                <button
                  onClick={() => setFormIndex(2)}
                  className="text-sm text-gray-200"
                >
                  New here?{" "}
                  <span className="underline md:no-underline md:hover:underline transition-all">
                    Create an account
                  </span>
                </button>

                {/* disabled: !data || erros */}
                <Button
                  label="Entrar"
                  className="ml-auto"
                  disabled={Object.keys(errors).length > 0}
                />
              </div>
            </div>
          </form>
        </FormProvider>
      )}

      {formIndex == 2 && (
        <FormProvider {...createAccountForm}>
          <form
            onSubmit={handleSubmitCreate(handleCreateAccountForm)}
            className="py-4 md:py-6 overflow-hidden max-w-md"
          >
            <h2 className="text-2xl font-semibold md:font-bold text-gray-200 mb-4">
              Welcome
            </h2>

            <p className="text-sm text-gray-300 mb-4 max-w-xs">
              Wonderfull to have you here! Create your new account and we take
              care of everything for you. We just need your...
            </p>

            <div className="flex flex-col items-center justify-start gap-y-1">
              <div className="flex flex-col justify-start items-start w-full gap-1">
                <Form.Field className="w-full">
                  <Form.Label htmlFor="name">Name</Form.Label>
                  <Form.Input type="text" name="name" />
                  <Form.ErrorMessage field="email" />
                </Form.Field>
                <Form.Field className="w-full">
                  <Form.Label htmlFor="email">E-mail</Form.Label>
                  <Form.Input type="text" name="email" />
                  <Form.ErrorMessage field="email" />
                </Form.Field>

                <Form.Field className="w-full">
                  <Form.Label htmlFor="password">Password</Form.Label>
                  <Form.Input type="password" name="password" />
                  <Form.ErrorMessage field="password" />
                </Form.Field>

                <button
                  onClick={() => setFormIndex(1)}
                  className="text-sm text-gray-200 transition-all"
                >
                  Already have an account?{" "}
                  <span className="underline md:no-underline md:hover:underline">
                    Log In
                  </span>
                </button>

                {/* disabled: !data || erros */}
                <Button
                  label="Entrar"
                  className="ml-auto"
                  disabled={Object.keys(errors).length > 0}
                />
              </div>
            </div>
          </form>
        </FormProvider>
      )}

      {errorMessageVisible && (
        <span className="text-[#f9818e] text-sm">{errorMessage}</span>
      )}
    </div>
  );
}

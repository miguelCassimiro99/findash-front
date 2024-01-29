"use client";

import { FormProvider, useForm } from "react-hook-form";
import { LoginFormData, loginFormSchema } from "../../../types/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { Form } from "../Composition/Index";
import Button from "../Button";
import { useRouter } from "next/navigation";

// TODO: the form needs to have both login and signIn by global var

export default function Login() {
  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    mode: "all",
  });

  const {
    handleSubmit,
    formState: { errors },
  } = loginForm;

  const router = useRouter();

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
    }
  }

  return (
    <div className="w-full md:max-w-sm lg:max-w-md">
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
                <Form.Label htmlFor="phone">E-mail</Form.Label>
                <Form.Input type="text" name="email" />
                <Form.ErrorMessage field="email" />
              </Form.Field>

              <Form.Field className="w-full">
                <Form.Label htmlFor="phone">Password</Form.Label>
                <Form.Input type="password" name="password" />
                <Form.ErrorMessage field="password" />
              </Form.Field>

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
    </div>
  );
}

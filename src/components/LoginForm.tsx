import { LoginData } from "@/interfaces/auth";
import { login } from "@/utils/fetcher";
import { Button, FormControl, FormLabel, Input, Stack } from "@mui/joy";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { Toaster, toast } from "sonner";

interface FormElements extends HTMLFormControlsCollection {
  username: HTMLInputElement;
  password: HTMLInputElement;
}
interface SignInFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export default function LoginForm() {
  const router = useRouter();

  const onSubmit = useCallback(
    async (event: React.FormEvent<SignInFormElement>) => {
      event.preventDefault();
      const formElements = event.currentTarget.elements;
      const loginData: LoginData = {
        username: formElements.username.value,
        password: formElements.password.value,
      };

      if (await login(loginData)) return router.replace("/");

      formElements.password.value = "";
      toast.error("Krivo korisničko ime ili lozinka.");
    },
    [router]
  );

  return (
    <>
      <Stack gap={4} sx={{ mx: 2 }}>
        <form onSubmit={onSubmit}>
          <FormControl required>
            <FormLabel>Username</FormLabel>
            <Input type="username" name="username" />
          </FormControl>
          <FormControl required>
            <FormLabel>Password</FormLabel>
            <Input type="password" name="password" />
          </FormControl>
          <Button type="submit" fullWidth sx={{ mt: 2 }}>
            Login
          </Button>
        </form>
      </Stack>

      <Toaster position="bottom-right" richColors closeButton />
    </>
  );
}

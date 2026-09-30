import { LoginForm } from "@/components/auth/LoginForm";
import { safeReturnTo } from "@/lib/auth/redirect";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ returnTo?: string | string[] }>;
}) {
  const returnTo = safeReturnTo((await searchParams).returnTo);

  return (
    <main
      id="main-content"
      className="mx-auto w-full max-w-md flex-1 px-4 py-10"
    >
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h1 className="text-2xl font-semibold">Log in</h1>
        <p className="mt-2 text-sm text-slate-600">
          Log in with a Fake Store account to use your cart.
        </p>
        <LoginForm returnTo={returnTo} />
      </div>
    </main>
  );
}

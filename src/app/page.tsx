import Link from "next/link";

export default function Page() {
  return (
    <>
      <div>Hello, its first page</div>
      <Link href="/dashboard">Random build</Link>
    </>
  );
}

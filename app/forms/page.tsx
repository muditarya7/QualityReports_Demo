import Link from 'next/link';
export default function FormList() {
  return (
    <div>
      <h1> this is form list page</h1>
      <Link href={'/forms/1'}>
        <button>linkk</button>
      </Link>
    </div>
  );
}

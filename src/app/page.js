import { redirect } from 'next/navigation'

function page() {
  redirect(`/login`);
}

export default page
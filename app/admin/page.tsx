import { redirect } from 'next/navigation';

export default function Admin() {

    redirect('/admin/dashboard');

    return (
        <div></div>
    );
}
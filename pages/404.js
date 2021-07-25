import Link from 'next/link';

export default function NotFoundPage() {
    return (
        <div className="container">
            <main className="main">
                <div className="mb-3">
                    <span className="h1"><b>Oops!</b></span> <span className="h2"><i>Page Not Found.</i></span>
                </div>
                <div className="link">
                    <Link href="/" ><a>Back To Home</a></Link>
                </div>
            </main>
        </div>
    )
}
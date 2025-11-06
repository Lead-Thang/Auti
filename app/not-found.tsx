import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <div className="text-center p-8 max-w-md">
        <h1 className="text-6xl font-bold mb-4 text-destructive">404</h1>
        <h2 className="text-3xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-lg mb-6 text-muted-foreground">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>
        <Link 
          href="/" 
          className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors inline-block"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
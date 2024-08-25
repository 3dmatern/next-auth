export function ErrorMessage({ message }: { message?: string | string[] }) {
    if (!message) return undefined;
    return (
        <p className="text-sm text-red-600">{message}</p>
    );
};
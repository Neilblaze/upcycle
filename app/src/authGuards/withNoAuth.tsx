import { useAuthStore } from "@/utils/useAuthStore";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { LoadingSpinner } from "./withAuth";

export const withNoAuth = (WrappedComponent: any): React.FC<any> => {
    // eslint-disable-next-line react/display-name
    return () => {
        const { user, error, isLoading } = useAuthStore();
        const router = useRouter();

        if (isLoading) {
            return <div className="min-h-screen grid place-items-center">
                <LoadingSpinner />
            </div>
        } else if (error) {
            return <div>Error</div>;
        } else {
            if (user) {
                // user logged in
                toast.info('This route is only for non-authenticated users! Redirecting to /dash...')
                router.push('/dash');
            } else {
                return <WrappedComponent />;
            }
            return null;
        }
    };
};

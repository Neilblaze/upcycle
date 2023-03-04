import { useAuthStore } from "@/utils/useAuthStore";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export const withNoAuth = (WrappedComponent: any): React.FC<any> => {
    // eslint-disable-next-line react/display-name
    return () => {
        const { user, error, isLoading } = useAuthStore();
        const router = useRouter();

        if (isLoading) {
            return <div>Loading auth status...</div>;
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

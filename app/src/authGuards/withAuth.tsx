import { useAuthStore } from "@/utils/useAuthStore";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "react-toastify";

export const withAuth = (WrappedComponent: any): React.FC<any> => {
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
                return <WrappedComponent />;
            } else {
                toast.info('This route is only for authenticated users! Redirecting to /...')
                router.push('/');
            }
            return null;
        }
    };
};

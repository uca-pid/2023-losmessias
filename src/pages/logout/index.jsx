import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useUserDispatch } from '@/context/UserContext';

export default function Logout() {
    const router = useRouter();
    const dispatch = useUserDispatch();

    useEffect(() => {
        if (router.isReady) {
            dispatch({ type: 'logout' });
            router.push("/")
        }
    }, [router.isReady, dispatch, router]);
}